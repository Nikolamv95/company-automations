---
name: gws-docs-write
version: 1.0.0
description: "Append text to a Google Doc. Use when the user wants to write, add, or append content to a Google document."
---

# Google Docs — Append Text

> **PREREQUISITE:** Requires `gws` CLI installed and authenticated. See `../gws-shared/SKILL.md`.

## Usage

```bash
gws docs +write --document <DOC_ID> --text <TEXT>
```

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `--document` | ✓ | Google Doc ID |
| `--text` | ✓ | Plain text to append |

## Getting Document ID from URL

```
https://docs.google.com/document/d/1ABC123XYZ/edit
                                   ^^^^^^^^^^^
                                   This is the document ID
```

## Examples

```bash
gws docs +write --document 1ABC123XYZ --text 'Hello, world!'

# Append research output to a shared doc
gws docs +write --document 1ABC123XYZ --text "$(cat output/ProductX/01_awareness.md)"
```

## Tips

- Text is appended at the end of the document body
- Plain text only — no rich formatting via this command
- For rich formatting use the raw batchUpdate API

> ⚠️ **Write operation** — confirm document ID and content with user before executing.

## Self-Check

Before executing, verify:
- [ ] Document ID extracted correctly from URL (only the ID segment — not the full URL)
- [ ] Content to append is plain text — no markdown or HTML formatting
- [ ] User confirmed the document ID and content before execution
- [ ] Append completed — confirm text appears at end of document

If any check fails → fix it before executing.
