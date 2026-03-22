---
name: gws-shared
version: 1.0.0
description: "gws CLI shared authentication, global flags, and security rules. Read this before using any gws-drive or gws-docs skill."
---

# gws — Shared Reference

The `gws` binary must be on your system PATH.

## Authentication

```bash
gws auth login                          # interactive OAuth (browser)
GOOGLE_APPLICATION_CREDENTIALS=key.json # service account
```

## Command Structure

```bash
gws <service> <resource> [sub-resource] <method> [flags]
```

## Output Formats

```bash
--format json    # default
--format table
--format yaml
--format csv
```

## Key Flags

| Flag | Description |
|------|-------------|
| `--dry-run` | Validate locally without executing |
| `--sanitize` | Screen response through Model Armor |
| `--page-all` | Auto-paginate all results |
| `--page-limit N` | Limit pages returned |
| `-o file` | Save response to file |
| `--upload file` | Multipart file upload |

## Security Rules

- **Never** output API keys or tokens directly
- **Always** confirm with user before write/delete operations
- Use `--dry-run` for destructive operations when possible

## Shell Notes

- Zsh: escape `!` in ranges with double quotes
- JSON params: use single quotes to preserve inner double-quotes

## Self-Check

Before any gws operation, verify:
- [ ] `gws` binary is on system PATH — confirm with `gws --version`
- [ ] Authentication is active: `gws auth login` for interactive use, `GOOGLE_APPLICATION_CREDENTIALS` for service account / automation
- [ ] `--dry-run` used for destructive operations when available
- [ ] No API keys or tokens will appear in command output
- [ ] For write/delete operations: user confirmed before execution

If any check fails → fix it before executing.
