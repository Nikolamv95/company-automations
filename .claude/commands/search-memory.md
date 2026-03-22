# /search-memory

Search the Pinecone vector store for stored research and copy assets.

## Usage

```
/search-memory "weight loss desires"
/search-memory "weight loss desires" --product "Slim Body"
/search-memory "competitor analysis" --top 10
```

---

## How It Works

Calls the `search_memory` tool from the Pinecone MCP server.

The store contains:
- Research outputs (awareness analysis, avatar docs, competitor research)
- Desire extractions and validated desire stacks
- Hooks, ad copy, advertorials, landing page copy
- Product marketing context files

---

## Parameters

- **query** (required) — What to search for. Use natural language. Examples:
  - `"belly fat desires"`
  - `"anxiety competitor positioning"`
  - `"transformation hook patterns"`

- **`--product "Name"`** (optional) — Filter results to a specific product's namespace. Without this, searches across all products.

- **`--top N`** (optional, default: 5) — Number of results to return. Max: 20.

---

## Output Format

For each result:

```
[{rank}] Score: {similarity_score}
Product: {product_name}
File: {source_filename}
---
{excerpt from the stored content}
```

---

## Saving to Memory

To save files to Pinecone, use the `save_to_memory` MCP tool:

```
Save output/{product}/07_hooks.md to memory
Save all files in output/{product}/ to memory
```

Claude will call `save_to_memory` with the file path(s). Files are stored with their product namespace so they can be filtered later.

**Important:** Never save automatically. Always ask the user which files to save.

---

## Use Cases

- **Re-using research** — Before starting a new product in the same niche, search for existing avatar docs and competitor research
- **Finding proven hooks** — Search for hooks in a niche to see what's been written before
- **Cross-product insights** — Find common desires or objections across products in the same category
- **Quick retrieval** — Pull specific files by product name when local `output/` folder is unavailable
