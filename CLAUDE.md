# company-automations

End-to-end marketing production platform. You are the orchestrator. No TypeScript pipeline — you coordinate sub-agents directly.

## System Overview

```
Research → Strategy → Copywriting → Production → Analysis → Translation
```

| Workflow stage | Skills location | What it does |
|---------------|-----------------|--------------|
| Research | `skills/research/` | Awareness, competitor, avatar, desire stack |
| Strategy | `skills/strategy/` | Marketing angles, content strategy, ideas |
| Copywriting | `skills/copywriting/` | Hooks, ads, emails, LP, VSL, advertorials, social |
| Production | `skills/production/` | LP design, webapp testing, docx export, themes |
| Analysis | `skills/analysis/` | Analytics tracking, ad performance |
| Translation | `skills/translation/` | Multi-language copy |
| System tools | `skills/system/` | skill-creator, mcp-builder |

---

## Architecture

- **Commands** (`commands/`) — slash command definitions. You follow these when the user types `/deep-research`, `/write-copy`, etc.
- **Agents** (`agents/`) — exist only for pipeline orchestration and routing. Do NOT spawn an agent for standalone tasks — execute directly from the relevant SKILL.md instead.
- **Skills** (`skills/`) — SKILL.md files are the source of execution truth. Match user intent to a skill, read it, execute. Always read the relevant SKILL.md before executing any task.
- **Hooks** (`hooks/`) — Stop hook that checks pipeline completion. Do not fight it; if it fires, continue the pipeline.
- **Servers** (`servers/`) — Pinecone MCP server. Use `save_to_memory` and `search_memory` tools when the user asks for memory operations.

---

## Pipeline: 11 Steps

```
RESEARCH PHASE
  Step 1: Awareness Analysis        ← input: intake          [parallel A]
  Step 2: Competitor Research       ← input: intake          [parallel A]
  Step 3: Avatar Building           ← input: intake          [parallel A]
  Step 4: Master Document           ← input: 1 + 2 + 3       [parallel B, after batch A]
  Step 5: Desire Extraction         ← input: intake + 3      [parallel B, after batch A]
  Step 6: Desire Validation         ← input: 5 + 3           [after step 5]

CREATIVE PHASE
  Step 7: Hooks                     ← input: 4 + 6           [parallel B]
  Step 9: Marketing Angles          ← input: 4 + 6           [parallel B]
  Step 8: Desire Testing Copy       ← input: 7               [after 7]
  Step 10: Angle Testing Copy       ← input: 9               [after 9]
  Step 11: Advertorial              ← input: 9               [after 9]
```

**Agent assignments:**
- Steps 1–4 → `researcher`
- Steps 5, 6, 9 → `strategist`
- Step 7 → `hook-writer`
- Steps 8, 10 → `ad-copy-writer`
- Step 11 → `advertorial-writer`

---

## Output Files

All outputs go to `output/{brand}/{product_name}/`:

- `brand` = brand name slug (lowercased, spaces → hyphens, e.g. "Stoitchkov Nutrition" → `stoitchkov-nutrition`)
- `product_name` = product name slug (same rule, e.g. "Water Goal 6" → `water-goal-6`)

```
output/
  {brand}/
    {product_name}/
      intake.md
      01_awareness.md
      02_competitor.md
      03_avatar.md
      04_master_doc.md
      product-marketing-context.md   ← generated with step 4
      05_desire_extraction.md
      06_desire_validation.md
      07_hooks.md
      08_desire_testing_copy.md
      09_marketing_angles.md
      10_angle_testing_copy.md
      11a_advertorial.md
      11b_advertorial.md
      skill-versions.md
```

---

## Critical Rules

1. **Never save to Pinecone automatically** — always ask the user which files to save at the end of the pipeline.
2. **Always load `product-marketing-context.md`** before generating any copy — if it exists in `output/{brand}/{product}/`, load it as shared brand context. Do not contradict or re-derive established information.
3. **Pipeline dependency order is fixed** — follow the step order above. Do not run step 4 before steps 1+2+3 are complete.
4. **Both advertorial templates always run** — Step 11 always generates both `11a_advertorial.md` (Nightmare) and `11b_advertorial.md` (Authority). Run sequentially: 11a first, then 11b. Note: 11c Listicle is available in standalone mode only (no pipeline prompt template exists).
5. **Reading level: 5th grade** — all generated copy. Flesch-Kincaid 60–70. Short sentences. One idea per paragraph.
6. **No jargon** — use the avatar's language from `03_avatar.md`, not marketing speak.
7. **Google Drive upload** — use `gws drive +upload` (gws CLI). Do not use OAuth flows or API directly.

---

## Brand Projects

Persistent brand data lives in `projects/{brand-slug}/brand.md`. This file contains voice, tone, audience, channels, restrictions, approved claims, compliance notes, and best practices for a specific brand.

- **Template:** `projects/_template/brand.md` — copy and fill in for each new brand
- **Pipeline outputs** for a brand go to `output/{brand}/{product}/` (gitignored)
- **`projects/*/output/`** is gitignored — if you save outputs inside a project folder, they stay local

---

## Context Files: brand.md vs product-marketing-context.md

| | `brand.md` | `product-marketing-context.md` |
|---|---|---|
| Location | `projects/{brand}/` | `output/{brand}/{product}/` |
| Contains | Voice, tone, channels, restrictions, best practices | Mechanism, avatar desires, proof points, hooks |
| Created by | Manually (by the user) | Automatically (Step 4 of pipeline) |
| Git tracked | ✓ yes | ✗ no (gitignored) |
| Overrides | System defaults | Does not override `brand.md` |
| Conflict rule | **`brand.md` always wins** | — |

---

## Brand Detection

For every copy, research, or translation task:

1. **Identify the brand:**
   - If mentioned explicitly (e.g. "thegreenbear", "brand-a") → proceed
   - If not clear → ask: "For which brand is this task?"

2. **Load `projects/{brand}/brand.md`:**
   - If it exists → load it before starting. Rules in `brand.md` override system defaults (tone, channels, restrictions).
   - If it doesn't exist → proceed with system defaults

3. **brand.md validation:**
   - Check for Required fields (Brand name, Voice, Restrictions)
   - If any Required field is empty or missing → inform user: "brand.md for [brand] is missing: [field list]. Using system defaults for these fields."
   - Apply everything that exists. Never fail silently. Never ask the user to fill in brand.md mid-task — note it and continue.

4. **Never write copy without knowing the brand.**

---

## Skill Resolution

**Skills are the source of execution truth.** For standalone tasks, skip the agent layer and go directly to the SKILL.md.

### When to use an Agent

Agents exist for two purposes only:

| Reason | Examples |
|--------|---------|
| **Pipeline orchestration** — multi-step work with dependencies, parallel batches, prompt files | `researcher`, `strategist`, `hook-writer`, `ad-copy-writer`, `advertorial-writer` |
| **Routing** — dispatching an ambiguous request to the right specialist | `copywriter` (fallback router) |

For everything else — emails, hooks, Drive uploads, translations, analytics, images, videos, editing, docx — **execute directly from the SKILL.md without spawning an agent.**

### Deprecated standalone wrappers

If an `agents/*.md` file only wraps one SKILL.md and adds no orchestration, treat it as deprecated for standalone use. Keep it only for backward compatibility or migration, and route standalone requests directly to the skill.

### How to resolve intent → skill

1. Read the `description` field in the relevant `SKILL.md` files under `skills/`
2. Match the user's request to the best skill
3. Read that SKILL.md fully before executing
4. Apply brand detection (see Brand Detection section)

SKILL.md files are organized by category — scan the right folder:

| User wants | Scan |
|-----------|------|
| Copy (hooks, ads, emails, LP, VSL, advertorial, social) | `skills/copywriting/` |
| Research or strategy | `skills/research/`, `skills/strategy/` |
| Production (images, video, docx, Drive, Notion, HTML) | `skills/production/`, `skills/google-workspace/`, `skills/notion-mcp/` |
| Analytics, tracking | `skills/analysis/` |
| Translation | `skills/translation/` |
| System (build skills, MCPs, analyze codebase) | `skills/system/` |

### Disambiguation rules

- Slash command always takes priority over natural language
- Ambiguous copy request without format → ask: "What type? Hooks / Facebook ad / Email / Landing page / VSL / Advertorial / Social post"
- Brand detection: if brand not mentioned → search `projects/` for brand whose `brand.md` lists this product → if not found, ask
- If multiple skills could apply → pick the most specific one; mention which skill you're using

---

## Prompts Folder

`prompts/` contains execution templates for the 11-step research and copy pipeline. **Only `/deep-research` loads files from `prompts/`.** Agents in standalone mode, `/write-copy`, and all other commands must NOT read from `prompts/`. They execute directly from SKILL.md rules.

---

## Before Starting Any Task

1. Identify the brand → ask if not clear
2. Load `projects/{brand}/brand.md` if it exists (overrides system defaults)
3. Load `output/{brand}/{product}/product-marketing-context.md` if it exists
4. Read the relevant SKILL.md for the task
5. Check which pipeline steps are already complete in `output/{brand}/{product}/`

---

## Output Self-Validation

After generating any copy output:
1. Re-read the relevant SKILL.md `## Self-Check` section
2. Run through each assertion
3. Self-correct silently if needed
4. If a check fails and cannot be auto-fixed → note it for the user

---

## Skill Versioning

Every SKILL.md has a `version` field in its frontmatter (e.g., `version: 2.0.0`).

**After `/deep-research` completes all 11 steps**, write `output/{brand}/{product}/skill-versions.md`:

```markdown
# Skill Versions — {product_name}
Generated: {date}

| Step | Agent | Skill | Version |
|------|-------|-------|---------|
| Step 1 | researcher | skills/research/researcher/SKILL.md | {version} |
| Step 2 | researcher | skills/research/researcher/SKILL.md | {version} |
| Step 3 | researcher | skills/research/researcher/SKILL.md | {version} |
| Step 4 | researcher | skills/research/researcher/SKILL.md | {version} |
| Step 5 | strategist | skills/research/strategist/SKILL.md | {version} |
| Step 6 | strategist | skills/research/strategist/SKILL.md | {version} |
| Step 7 | hook-writer | skills/copywriting/hook-writer/SKILL.md | {version} |
| Step 8 | ad-copy-writer | skills/copywriting/ad-copy-writer/SKILL.md | {version} |
| Step 9 | strategist | skills/research/strategist/SKILL.md | {version} |
| Step 10 | ad-copy-writer | skills/copywriting/ad-copy-writer/SKILL.md | {version} |
| Step 11a | advertorial-writer | skills/copywriting/advertorial-writer/SKILL.md | {version} |
| Step 11b | advertorial-writer | skills/copywriting/advertorial-writer/SKILL.md | {version} |
```

Read the actual `version` value from each SKILL.md frontmatter at the time of generation. This file is gitignored (inside `output/`) but stays local so you know which skill version produced the output.

**For `/write-copy` ad-hoc requests:** include a one-line version note at the bottom of the output:
`<!-- skill: {skill_name} v{version} -->`

---

## Pipeline State

During `/deep-research`, write a `.pipeline-state-{brand_slug}-{product_slug}.json` to the project root, where slugs are name lowercased with spaces replaced by hyphens (e.g. brand "The Green Bear", product "Water Out" → `.pipeline-state-the-green-bear-water-out.json`):

```json
{
  "product": "Product Name",
  "steps": ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6", "Step 7", "Step 8", "Step 9", "Step 10", "Step 11a", "Step 11b"],
  "completed_steps": [],
  "failed_steps": [],
  "skipped_steps": []
}
```

Update `completed_steps` after each step completes. The Stop hook reads this file to check if the pipeline is complete. When all steps are done, delete `.pipeline-state-{brand_slug}-{product_slug}.json`.

**Recovery if `.pipeline-state-{brand_slug}-{product_slug}.json` is missing or corrupt mid-pipeline:**
1. Check which output files exist in `output/{brand}/{product}/`
2. Recreate the file with those steps in `completed_steps`
3. Continue from the first missing step

---

## Pipeline Step Error Handling

**If a step produces empty or clearly wrong output:**
1. Add to `failed_steps`: `{"step": "Step 3", "reason": "empty output"}`
2. Ask the user: "Step 3 (Avatar Building) produced no usable output. [R]etry with same inputs / [S]kip and continue / [A]bort pipeline"
3. **Retry** → re-run the same sub-agent with the same inputs
4. **Skip** → add to `skipped_steps`, note the gap for downstream steps, continue
5. **Abort** → delete `.pipeline-state-{brand_slug}-{product_slug}.json`, list which steps completed

**If a step fails due to tool or API error (not bad output):**
→ Auto-retry once silently. If second attempt also fails → ask user (same R/S/A options).

**Downstream steps that depend on a skipped step:**
→ Note the gap in the output file header: `> Note: This step was generated without [skipped step] data.`

---

## MCP Server Error Handling

The Pinecone MCP server (`servers/pinecone-server.js`) provides `save_to_memory` and `search_memory` tools. If these tools are unavailable or return an error:

**If `search_memory` fails:**
- Inform the user: "Memory search is unavailable right now (Pinecone MCP server is not running). Proceeding without memory context."
- Continue the task without memory results — do not block execution.

**If `save_to_memory` fails:**
- Inform the user: "Could not save to Pinecone — server may not be running. Files are saved locally in `output/{brand}/{product}/`."
- Do not retry automatically. Let the user restart the server and try `/save-to-memory` manually.

**Specific error scenarios:**

| Error | Action |
|-------|--------|
| Server not running | Inform user: "Pinecone MCP server is not running. Restart Claude Code or run `node servers/pinecone-server.js`." |
| Rate limit (429) | Wait 10s, retry once. If fails again: "Pinecone rate limit hit. Run `/save-to-memory` manually when ready." |
| Auth failure (401/403) | Stop immediately. "Pinecone auth failed. Check `PINECONE_API_KEY` in `.env`." Do not retry. |
| Index not found | Stop immediately. "Index '{PINECONE_INDEX}' not found. Check `PINECONE_INDEX` in `.env`." |
| Embedding failure | "Could not generate embeddings. Check `OPENAI_API_KEY` in `.env`." |
| Timeout (>30s) | Retry once. If timeout again: skip and inform user. |

**See `servers/registry.md` for all MCP servers, their tools, and how to add new ones.**

**Never block the pipeline for any MCP error.** Output files are always the source of truth.

---

## Environment Variables

```
PINECONE_API_KEY    — Pinecone vector store
PINECONE_INDEX      — index name (default: company-research)
OPENAI_API_KEY      — used only for text-embedding-ada-002 (Pinecone embeddings)
```

Copy `.env.example` → `.env` and fill in your values. Pinecone and OpenAI keys are only needed if using memory features.
