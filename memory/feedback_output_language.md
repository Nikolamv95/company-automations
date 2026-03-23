---
name: Output language default
description: All files in output/ and projects/ folders must be in English unless user explicitly requests Bulgarian or runs /translate
type: feedback
---

All files written to the `output/` folder AND the `projects/` folder must be in English by default.

**Why:** User wants English as the working language across the entire project — both pipeline outputs and brand/project files (brand.md, etc.).

**How to apply:** Write all files in both `output/` and `projects/` in English unless:
1. The user explicitly asks for Bulgarian output, OR
2. The user runs the `/translate` command on a file
