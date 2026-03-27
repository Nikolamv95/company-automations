# company-automations

Direct-response marketing automation for Claude Code. Zero TypeScript — Claude IS the orchestrator.

**Requirements:** Paid Claude subscription + `git clone`. That's it.

---

## How It Works

This is a Claude Code plugin. Skills auto-load when relevant. Commands run as slash commands. Agents are used only for pipeline orchestration and ambiguity fallback routing. Files on disk are the state.

```
/deep-research "Product"   →   11-step pipeline → output/{product}/
/write-copy "Product"      →   Creative phase only (steps 7–11)
/review copy "Product"     →   Structured copy review
/translate Bulgarian "Product"  →  Translate output files
/search-memory "query"     →   Semantic search (Pinecone)
```

---

## Quick Start

```bash
git clone <this repo>
cd company-automations
claude   # opens Claude Code in this directory
```

Then type:
```
/deep-research "Your Product Name"
```

Claude will ask 11 intake questions, then run all 11 pipeline steps.

---

## Pipeline

```
INTAKE (11 questions)
  ↓
RESEARCH PHASE
  1. Awareness Analysis       ─┐
  2. Competitor Research       ├─ parallel
  3. Avatar Building           ├─ parallel
  5. Desire Extraction        ─┘
  4. Master Document          ← waits for 1, 2, 3
  6. Desire Validation        ← waits for 5
  ↓
CREATIVE PHASE
  7. Hooks         ─┐ parallel
  9. Marketing Angles ─┘
  8. Desire Testing Copy      ← waits for 7
  10. Angle Testing Copy      ← waits for 9
  11. Advertorial             ← waits for 9
  ↓
Pinecone Save (you select files)
  ↓
Google Drive Upload (optional)
```

All outputs saved to `output/{product}/` — gitignored, stays local.

---

## Commands

### `/deep-research "Product"` or `/deep-research "Brand" "Product"`
Full pipeline. Asks intake questions (fewer if `projects/{brand}/brand.md` exists), then runs all 11 steps.
Add `--skip-drive` to skip Google Drive upload at the end.

### `/write-copy "Product"` or `/write-copy "Brand" "Product"`
Creative phase only (steps 7–11). Requires research phase to be complete first.
Add `--automation` to run all creative steps without prompts.

Ad-hoc: `/write-copy "Write 5 hooks about belly fat"` — routes to the right skill automatically.

### `/review {rubric} "Brand" "Product"` or `/review {rubric} @file.md`
Rubrics: `copy` (general DR) / `dr` (full framework compliance) / `conversion` (CRO) / `email` (sequences)

### `/translate {language} "Brand" "Product"`
Translates selected output files. Also works with `@file.md` or `--text "..."`.

### `/search-memory "query"`
Semantic search across Pinecone. Add `--product "Name"` to filter by product.

### `/status`
Shows which pipeline steps are complete for the current product.

---

## Natural Language

You don't need slash commands. Type freely in Bulgarian or English:

```
"напиши копи за бранд thegreenbear продукт Water Out"
"направи research за thegreenbear Water Out"
"прегледай копито на Water Out"
"преведи Water Out на български"
"напиши 5 хука за загуба на тегло"
"напиши имейл sequence за Water Out"
```

Claude recognizes intent and follows the same flow as the slash commands. If brand or copy type isn't clear — it asks one question.

---

## Skills

Skills auto-activate when you describe a task — no slash command needed.

| Skill | Triggers on |
|-------|------------|
| `copywriter` | Writing copy, DR principles |
| `researcher` | Market research, awareness analysis |
| `strategist` | Angles, desires, positioning |
| `hook-writer` | Hooks, headlines |
| `ad-copy-writer` | Facebook/YouTube/TikTok ads |
| `advertorial-writer` | Advertorials, RMBC, native ads |
| `email-writer` | Email sequences |
| `lp-writer` | Landing pages, sales pages |
| `vsl-writer` | VSL scripts, video sales letters |
| `copy-editor` | Editing, improving copy |
| `product-marketing-context` | Creating brand context files |
| `marketing-psychology` | Schwartz, Cialdini, JTBD |
| `social-content` | LinkedIn, Twitter, Instagram posts |
| `competitor-alternatives` | Comparison pages |
| `translator` | Translating copy to another language |
| `gws-drive-upload` | Uploading to Google Drive |
| `docx` | Converting to Word format |

Standalone commands should resolve directly to SKILL.md files. Use agents only for `/deep-research` pipeline orchestration and `copywriter` fallback when request type is ambiguous.

---

## Optional: Pinecone Memory Setup

Skip this if you don't need cross-session memory.

1. Create a free [Pinecone](https://pinecone.io) account
2. Create an index named `company-research` (dimensions: 1536, metric: cosine)
3. Copy `.env.example` → `.env` and fill in your keys:

```bash
cp .env.example .env
```

4. Install the MCP server dependencies:

```bash
cd servers && npm install
```

5. The `.mcp.json` in this repo auto-registers the server with Claude Code.

After setup, `save_to_memory` and `search_memory` tools become available to Claude.

---

## Optional: Google Drive Upload

Uses the `gws` CLI — no OAuth setup in this repo.

```bash
# Install gws CLI
npm install -g @googleapis/gws

# Authenticate
gws auth login
```

After auth, `/deep-research` will offer Drive upload at the end automatically.

---

## File Structure

```
company-automations/
├── .claude/
│   └── commands/
│       ├── deep-research.md     ← /deep-research command
│       ├── write-copy.md        ← /write-copy command
│       ├── translate.md         ← /translate command
│       ├── review.md            ← /review command
│       ├── search-memory.md     ← /search-memory command
│       ├── save-to-memory.md    ← /save-to-memory command
│       └── status.md            ← /status command
├── agents/
│   ├── researcher.md            ← steps 1–4
│   ├── strategist.md            ← steps 5–6, 9
│   ├── copywriter.md            ← routing agent
│   ├── hook-writer.md           ← step 7
│   ├── ad-copy-writer.md        ← steps 8, 10
│   ├── advertorial-writer.md    ← step 11
│   ├── email-writer.md
│   ├── lp-writer.md
│   ├── vsl-writer.md
│   └── translator.md
├── skills/
│   ├── copywriting/
│   │   ├── copywriter/          ← base DR principles
│   │   ├── hook-writer/
│   │   ├── ad-copy-writer/
│   │   ├── advertorial-writer/
│   │   ├── email-writer/
│   │   ├── lp-writer/
│   │   ├── vsl-writer/
│   │   ├── copy-editor/
│   │   └── social-content/
│   ├── research/
│   │   ├── researcher/
│   │   ├── strategist/
│   │   ├── marketing-psychology/
│   │   └── product-marketing-context/
│   ├── strategy/
│   │   ├── marketing-ideas/
│   │   ├── content-strategy/
│   │   └── competitor-alternatives/
│   ├── translation/
│   │   └── translator/
│   ├── google-workspace/
│   │   ├── gws-shared/
│   │   ├── gws-drive-upload/
│   │   └── gws-docs-write/
│   ├── production/
│   │   ├── docx/
│   │   ├── frontend-design/
│   │   ├── theme-factory/
│   │   └── webapp-testing/
│   ├── analysis/
│   │   └── analytics-tracking/
│   └── system/
│       ├── mcp-builder/
│       └── skill-creator/
├── prompts/                     ← execution templates for /deep-research only
│   ├── 01_awareness.md … 11b_advertorial_authority.md
├── hooks/
│   ├── hooks.json               ← Stop hook config
│   └── check-pipeline.js        ← pipeline continuation script
├── servers/
│   ├── pinecone-server.js       ← Pinecone MCP server
│   └── package.json
├── projects/
│   ├── _template/
│   │   └── brand.md             ← copy this for each new brand
│   └── {brand-slug}/
│       └── brand.md             ← brand guidelines (versioned)
├── output/                      ← pipeline outputs (gitignored)
├── CONTRIBUTING.md              ← architecture standards for contributors
├── .mcp.json                    ← MCP server registration
├── .env.example
└── CLAUDE.md                    ← instructions for Claude
```

---

## Adding a New Brand

Each brand gets a folder in `projects/` with its own guidelines file:

```bash
cp -r projects/_template projects/my-brand
```

Then edit `projects/my-brand/brand.md` — fill in voice, tone, audience, channels, restrictions, approved claims, compliance notes, and best practices.

Claude will automatically load this file before any copy task for that brand. Rules in `brand.md` override system defaults.

Pipeline outputs still go to `output/{product}/` (gitignored). The `brand.md` file is versioned — everything else stays local.

---

## Adding New Automations

To add a new automation (e.g. Krea.ai creatives):

1. `.claude/commands/krea-creatives.md` — slash command definition
2. `skills/krea/SKILL.md` — execution logic (source of truth)
3. `agents/krea-agent.md` (optional) — only if you need multi-step orchestration or ambiguity routing
4. `servers/krea-server.js` (optional) — MCP server if API needed

Nothing existing is modified. See `CONTRIBUTING.md` for architecture standards.

**Planned future automations (architecture already supports these):**
- `/create-ads` — hooks + copy + image generation (kie.ai) + Google Drive upload
- `/translate-texts` — Google Sheets column translation (requires Sheets MCP or gws CLI)
- `/publish` — direct social post publishing
