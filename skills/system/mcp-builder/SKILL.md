---
name: mcp-builder
version: 1.0.0
description: "Build a new MCP server to integrate an external API or service. Use when the user wants to add a new tool, API integration, or external service as an MCP server."
---

# MCP Server Development Guide

Use TypeScript — it has the best SDK support and is familiar to most AI models.

## Four Development Phases

### Phase 1: Research & Planning
- Study MCP design principles (API coverage vs. workflow tools balance)
- Review target service API documentation
- List tools to implement, prioritize by usage frequency
- Plan authentication approach

### Phase 2: Implementation

```bash
npm install @modelcontextprotocol/sdk zod
```

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { z } from 'zod';

const server = new Server({ name: 'my-server', version: '1.0.0' });

server.tool(
  'tool_name',
  'Clear description of what this tool does',
  { param: z.string().describe('Parameter description') },
  async ({ param }) => {
    // implementation
    return { content: [{ type: 'text', text: result }] };
  }
);
```

**Implementation checklist:**
- Use Zod schemas for all input validation
- Add `readOnlyHint: true` for read-only tools
- Add `destructiveHint: true` for write/delete tools
- Return actionable error messages ("try X instead of Y")
- Handle pagination for list endpoints

### Phase 3: Review & Test

```bash
npx @modelcontextprotocol/inspector node server.js
```

- Check for code duplication
- Ensure full TypeScript type coverage
- Verify error messages guide toward solutions

### Phase 4: Evaluations

Write 10 test questions:
- Complex and realistic (not "list all items")
- Independent (each stands alone)
- Read-only (no state mutation in tests)
- Clearly correct answers

## Tool Naming Convention

```
# Good: clear, action-oriented, consistent prefix
upload_file_to_drive
search_pinecone_memory
save_product_research

# Bad: vague, inconsistent
do_thing
file
process
```

## .mcp.json Registration

```json
{
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["${CLAUDE_PLUGIN_ROOT}/servers/server.js"],
      "env": { "API_KEY": "${API_KEY}" }
    }
  }
}
```

## Self-Check

Before presenting output, verify:
- [ ] All tool names follow action_noun convention (e.g., upload_file, search_memory, get_document)
- [ ] Every tool has a Zod schema for all input parameters with descriptions
- [ ] `readOnlyHint: true` set on read-only tools; `destructiveHint: true` on write/delete tools
- [ ] .mcp.json updated with the new server registration
- [ ] servers/registry.md updated with tool list, descriptions, and required env vars
- [ ] 10 evaluation questions written (complex, independent, read-only, with clearly correct answers)
- [ ] MCP inspector test passed: `npx @modelcontextprotocol/inspector node server.js`

If any check fails → fix it before presenting.
