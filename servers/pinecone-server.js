#!/usr/bin/env node
/**
 * Pinecone MCP Server
 *
 * Provides two tools to Claude:
 *   save_to_memory(product, files[])  — embed and upsert files to Pinecone
 *   search_memory(query, product?)    — semantic search across stored files
 *
 * Usage: add to .mcp.json (see root .mcp.json)
 * Requires: PINECONE_API_KEY, PINECONE_INDEX, OPENAI_API_KEY in env
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// ── Config ────────────────────────────────────────────────────────────────────

const PINECONE_API_KEY   = process.env.PINECONE_API_KEY;
const PINECONE_INDEX     = process.env.PINECONE_INDEX || 'company-research';
const OPENAI_API_KEY     = process.env.OPENAI_API_KEY;
const EMBED_MODEL        = 'text-embedding-ada-002';
const CHUNK_SIZE         = 500;   // chars per chunk
const CHUNK_OVERLAP      = 50;    // overlap between chunks
const TOP_K_DEFAULT      = 5;

if (!PINECONE_API_KEY || !OPENAI_API_KEY) {
  console.error('[pinecone-server] Missing PINECONE_API_KEY or OPENAI_API_KEY');
  process.exit(1);
}

// ── Clients ───────────────────────────────────────────────────────────────────

const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
const openai   = new OpenAI({ apiKey: OPENAI_API_KEY });

// ── Helpers ───────────────────────────────────────────────────────────────────

function chunkText(text, size = CHUNK_SIZE, overlap = CHUNK_OVERLAP) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    chunks.push(text.slice(start, start + size));
    start += size - overlap;
  }
  return chunks;
}

async function embed(text) {
  const res = await openai.embeddings.create({
    model: EMBED_MODEL,
    input: text.slice(0, 8000), // ada-002 limit
  });
  return res.data[0].embedding;
}

function fileId(product, filePath) {
  const base = path.basename(filePath);
  return crypto.createHash('md5').update(`${product}:${base}`).digest('hex');
}

async function upsertFile(index, product, filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const filename = path.basename(filePath);
  const chunks = chunkText(content);

  const vectors = [];
  for (let i = 0; i < chunks.length; i++) {
    const embedding = await embed(chunks[i]);
    vectors.push({
      id: `${fileId(product, filePath)}_${i}`,
      values: embedding,
      metadata: {
        product,
        filename,
        chunk_index: i,
        total_chunks: chunks.length,
        text: chunks[i],
      },
    });
  }

  await index.namespace(product).upsert(vectors);
  return vectors.length;
}

// ── MCP Server ────────────────────────────────────────────────────────────────

const server = new McpServer({
  name: 'pinecone-memory',
  version: '1.0.0',
});

// Tool: save_to_memory
server.tool(
  'save_to_memory',
  'Save product research and copy files to Pinecone vector memory for future retrieval.',
  {
    product: z.string().describe('Product name (used as Pinecone namespace)'),
    files: z.array(z.string()).describe('Array of file paths to save, e.g. ["output/MyProduct/07_hooks.md"]'),
  },
  async ({ product, files }) => {
    const index = pinecone.index(PINECONE_INDEX);
    const results = [];

    for (const filePath of files) {
      if (!fs.existsSync(filePath)) {
        results.push(`✗ ${filePath} — file not found`);
        continue;
      }
      try {
        const chunks = await upsertFile(index, product, filePath);
        results.push(`✓ ${path.basename(filePath)} — ${chunks} chunk(s) saved`);
      } catch (err) {
        results.push(`✗ ${path.basename(filePath)} — error: ${err.message}`);
      }
    }

    return {
      content: [{ type: 'text', text: results.join('\n') }],
    };
  }
);

// Tool: search_memory
server.tool(
  'search_memory',
  'Search Pinecone memory for relevant research and copy assets.',
  {
    query: z.string().describe('Natural language search query'),
    product: z.string().optional().describe('Filter results to a specific product namespace. Omit to search all products.'),
    top_k: z.number().optional().default(TOP_K_DEFAULT).describe('Number of results to return (default: 5, max: 20)'),
  },
  async ({ query, product, top_k = TOP_K_DEFAULT }) => {
    const index = pinecone.index(PINECONE_INDEX);
    const queryEmbedding = await embed(query);

    const k = Math.min(top_k, 20);

    let results;
    if (product) {
      results = await index.namespace(product).query({
        vector: queryEmbedding,
        topK: k,
        includeMetadata: true,
      });
    } else {
      results = await index.query({
        vector: queryEmbedding,
        topK: k,
        includeMetadata: true,
      });
    }

    if (!results.matches || results.matches.length === 0) {
      return {
        content: [{ type: 'text', text: 'No results found.' }],
      };
    }

    const formatted = results.matches.map((match, i) => {
      const meta = match.metadata || {};
      return [
        `[${i + 1}] Score: ${match.score?.toFixed(3)}`,
        `Product: ${meta.product || 'unknown'}`,
        `File: ${meta.filename || 'unknown'}`,
        '---',
        meta.text || '',
      ].join('\n');
    });

    return {
      content: [{ type: 'text', text: formatted.join('\n\n') }],
    };
  }
);

// ── Start ─────────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
