Save output files for a product to Pinecone vector memory.

Usage:
- `/save-to-memory "Product Name"` — shows numbered list of files, you pick (comma-separated or "all")
- `/save-to-memory "Product Name" all` — saves all files without asking
- `/save-to-memory "Product Name" 01,02,07` — saves files matched by number prefix

Steps:
1. List all `.md` files in `output/{product}/`
2. Show numbered list (if no "all" flag)
3. Ask: "Which files to save? (numbers, comma-separated, or 'all')"
4. For each selected file: call `save_to_memory` MCP tool with the file path
5. Confirm: "Saved X file(s) to Pinecone namespace '{product}'"

Never save files automatically — always confirm with user first.
