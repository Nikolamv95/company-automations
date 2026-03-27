---
name: notion-mcp
version: 1.2.0
description: "Work with Notion via MCP — read pages, update block content, translate multilingual fields, query databases, navigate workspace. Use when: reading or writing Notion pages, translating text in Notion, updating database entries, bulk editing blocks. Triggers: notion, notion page, update notion, translate in notion, read from notion, write to notion, Notion database."
metadata:
  mcp-server: notion
  category: production
---

# Notion MCP

Workflow guidance for working with the Notion MCP server. Covers navigation, reading, writing, and translating content across pages and databases.

## Step 1: Navigate workspace

**Always start with a blank search if the page is not found immediately.**

```
API-post-search { query: "" }   ← returns ALL accessible pages
```

Keyword search often misses pages due to language or title mismatch. Use it as a secondary attempt only — never try more than 2 keyword variations before falling back to blank search.

To get a database's structure (properties, columns): use `API-retrieve-a-database`.
To query database rows with filters: use `API-query-data-source`.

## Step 2: Read block content

For each page, fetch blocks with `API-get-block-children`.

**Always run reads in parallel** when working with multiple pages:
```
PARALLEL:
  API-get-block-children { block_id: page_1 }
  API-get-block-children { block_id: page_2 }
```

Each block has a `type` (paragraph, divider, etc.) and `plain_text` content inside its type object.

## Step 3: Update block content

**CRITICAL — `update-a-block` cannot change text content.** Passing content returns a 400 error.

**Correct pattern — archive + patch:**
```
Step A — Archive the old block:
  API-update-a-block { block_id: "...", archived: true }

Step B — Add new block with correct content:
  API-patch-block-children {
    block_id: parent_page_id,
    children: [{ type: "paragraph", paragraph: { rich_text: [{ type: "text", text: { content: "new text" } }] } }]
  }
```

Run archive and patch calls in parallel when updating multiple blocks.

## Step 4: Bold text and divider blocks

The MCP schema declares `additionalProperties: false` on `richTextRequest` and does not list `divider` in `blockObjectRequest`. **Both work in practice** — Notion accepts them, the MCP passes them through without blocking. Use them directly without testing.

**Bold paragraph (confirmed working):**
```json
{
  "type": "paragraph",
  "paragraph": {
    "rich_text": [{ "type": "text", "text": { "content": "Bulgarian" }, "annotations": { "bold": true } }]
  }
}
```

**Divider (confirmed working):**
```json
{ "type": "divider", "divider": {} }
```

## Multilingual Content Format (Standard)

All multilingual description fields in Notion use this structure:

```
**Bulgarian**
Текстът на Български.

---

**English**
(empty — to be translated)

---

**Spanish**
(empty — to be translated)

---
```

**Block structure in Notion API:**
- `paragraph` block with bold `rich_text` → language label
- `paragraph` block with plain `rich_text` → language content (may be empty)
- `divider` block → section separator

**Detection logic:**
- Label block = paragraph where `annotations.bold == true`
- Content block = paragraph immediately after a bold label
- **Source** = content block with non-empty `plain_text`
- **Target** = content block with empty `plain_text` (or missing)

**Send all blocks in a single `API-patch-block-children` call** — no need to split into multiple requests.

## Create a new database task

Do this directly — no sub-agents. 3 steps total:

```
1. API-post-search { query: "" }
   → Identify the target database ID from results

2. API-retrieve-a-database { database_id: "..." }
   → Read the schema: property names, types, and available options

3. API-create-a-page {
     parent: { database_id: "..." },
     properties: { ...mapped from schema }
   }
```

Map the user's intent to whatever properties exist in that database — don't assume field names. Each database is different.

**Important:** Always use English for page titles — Cyrillic breaks encoding when sent via MCP.

## Translation workflow

```
1. Blank search → find target page
2. PARALLEL: get-block-children for all relevant pages
3. For each page:
   - Find bold paragraph blocks (language labels)
   - Find content block after each label (next paragraph)
   - Source = label whose content block has text
   - Targets = labels whose content block is empty
4. Translate source text into each target language
5. PARALLEL: archive all empty target content blocks
6. PARALLEL: patch new content blocks with translations
```

## Troubleshooting

### Search returns 0 results
Use blank query immediately: `API-post-search { query: "" }`. Never try more than 2 specific keywords before falling back.

### update-a-block returns 400 validation error
**Cause:** Passing text content via `update-a-block` — not supported by the API.
**Solution:** Use archive + patch pattern (see Step 3).

### patch-block-children fails
**Cause:** Incorrect block structure.
**Solution:** Paragraph blocks require:
```json
{
  "type": "paragraph",
  "paragraph": {
    "rich_text": [{ "type": "text", "text": { "content": "your text" } }]
  }
}
```

## Self-Check

Before completing any Notion task:
- [ ] If page not found immediately — tried blank search before giving up?
- [ ] All content updates used archive + patch (never update-a-block with text)?
- [ ] All reads (get-block-children) executed in parallel?
- [ ] All writes executed in parallel where possible?
- [ ] If translation: bold label blocks preserved, only content blocks replaced?
- [ ] If multilingual structure: all blocks sent in a single patch call?
