---
name: gws-drive-upload
version: 1.0.0
description: "Upload files to Google Drive. Use when the user wants to upload, send, or save files to Google Drive or a Drive folder."
---

# Google Drive — Upload File

> **PREREQUISITE:** Requires `gws` CLI installed and authenticated. See `../gws-shared/SKILL.md`.

## Usage

```bash
gws drive +upload <file>
gws drive +upload <file> --parent FOLDER_ID
gws drive +upload <file> --name 'Custom Name.pdf'
```

## Flags

| Flag | Required | Description |
|------|----------|-------------|
| `<file>` | ✓ | Local file path to upload |
| `--parent` | — | Target folder ID (from Drive URL) |
| `--name` | — | Custom filename (defaults to local filename) |

## Getting Folder ID from URL

```
https://drive.google.com/drive/folders/1ABC123XYZ
                                        ^^^^^^^^^^^
                                        This is the folder ID
```

## Examples

```bash
# Upload to root Drive
gws drive +upload ./output/ProductX/07_hooks.md

# Upload to specific folder
gws drive +upload ./output/ProductX/07_hooks.md --parent 1ABC123XYZ

# Upload with custom name
gws drive +upload ./output/ProductX/07_hooks.md --parent 1ABC123XYZ --name 'ProductX Hooks.md'
```

## Tips

- MIME type is detected automatically
- Filename defaults to the local filename unless `--name` is given
- To upload multiple files, run once per file

> ⚠️ **Write operation** — confirm folder and file selection with user before executing.

## Self-Check

Before executing, verify:
- [ ] Folder ID extracted correctly from URL (only the ID segment — not the full URL)
- [ ] Local file path exists and is the correct file
- [ ] `--name` flag used if the local filename needs to be changed (e.g., adding a readable title)
- [ ] User confirmed folder and file selection before execution
- [ ] File visible in Drive folder after upload completes

If any check fails → fix it before executing.
