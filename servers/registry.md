# MCP Server Registry

Single source of truth for all MCP servers in this system.
Reference this file when adding new servers or debugging existing ones.

---

## Active Servers

### pinecone-memory

| Field | Value |
|-------|-------|
| File | `servers/pinecone-server.js` |
| Purpose | Cross-session vector memory for research outputs |
| Registered in | `.mcp.json` as `"pinecone-memory"` |

**Tools:**

```
save_to_memory(product: string, files: string[])
  — Chunks files, embeds with OpenAI ada-002, upserts to Pinecone
  — Stored in namespace: {product}

search_memory(query: string, product?: string, top_k?: number = 5)
  — Embeds query, searches Pinecone (filtered by product if given)
  — Returns top K results with metadata + text
```

**Env vars required:**

```
PINECONE_API_KEY   — Pinecone API key
PINECONE_INDEX     — Index name (default: company-research)
OPENAI_API_KEY     — Used only for text-embedding-ada-002 embeddings
```

**Error handling:** See `CLAUDE.md` → MCP Server Error Handling

---

## Adding a New MCP Server

### Step 1 — Write the server

Create `servers/{name}.js`. Follow `pinecone-server.js` as reference:

```js
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// 1. Validate env vars at startup — exit with error message if missing
const MY_KEY = process.env.MY_KEY;
if (!MY_KEY) {
  console.error('[{name}] Missing MY_KEY');
  process.exit(1);
}

// 2. Define tools with Zod schemas
const server = new McpServer({ name: '{name}', version: '1.0.0' });

server.tool('{tool_name}', { param: z.string() }, async ({ param }) => {
  try {
    // your logic
    return { content: [{ type: 'text', text: result }] };
  } catch (err) {
    // 3. Handle errors explicitly — never throw unhandled
    return { content: [{ type: 'text', text: `Error: ${err.message}` }], isError: true };
  }
});

// 4. Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Step 2 — Register in `.mcp.json`

```json
"{name}": {
  "command": "node",
  "args": ["servers/{name}.js"],
  "env": {
    "MY_KEY": "${MY_KEY}"
  }
}
```

### Step 3 — Add env vars

Add to `.env.example`:
```
MY_KEY=your-key-here
```

Add to `.env` (fill in real value).

### Step 4 — Add entry to this file

Copy the "Active Servers" format above. Document: file, purpose, tools (with params), env vars.

### Step 5 — Add error handling

Add a section in `CLAUDE.md` → MCP Server Error Handling describing:
- What errors this server can return
- How Claude should respond to each

### Step 6 — Restart Claude Code

MCP servers initialize at startup. Restart Claude Code to load the new server.
