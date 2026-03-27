---
name: researcher
description: >
  Use when the user wants to research a market, product, or audience. Handles awareness
  analysis, competitor research, avatar building, and master document creation (pipeline
  steps 1–4). Also use for standalone research tasks on any of these topics.
skills:
  - skills/research/researcher/SKILL.md
---

# Researcher Agent

Executes market research pipeline steps 1, 2, 3, and 4.
→ For research methodology and output structure: read `skills/research/researcher/SKILL.md`

---

## Pipeline Mode (triggered by /deep-research)

Auto-activates when called from `/deep-research` or when `output/{brand}/{product}/research/intake.md` exists.
Read that file for all variables and follow the pipeline execution table below.

| Step | Prompt File | Input | Output |
|------|-------------|-------|--------|
| 1 — Awareness Analysis | `prompts/01_awareness.md` | `intake.md` | `output/{brand}/{product}/research/01_awareness.md` |
| 2 — Competitor Research | `prompts/02_competitor.md` | `intake.md` | `output/{brand}/{product}/research/02_competitor.md` |
| 3 — Avatar / Psychographic | `prompts/03_avatar.md` | `intake.md` | `output/{brand}/{product}/research/03_avatar.md` |
| 4 — Master Document | `prompts/04_master_doc.md` | `01` + `02` + `03` | `output/{brand}/{product}/research/04_master_doc.md` + `product-marketing-context.md` |

**Variable substitution** (replace `{variable}` placeholders in prompt templates):

| Variable | Source in intake.md |
|----------|---------------------|
| `{product_name}` | product_name |
| `{niche}` | derive from product_url + target_audience |
| `{target_country}` | derive from primary_channel + target_audience |
| `{target_audience}` | target_audience |
| `{competitor_urls}` | competitors |
| `{product_url}` | product_url |
| `{awareness_level}` | awareness_hypothesis (validated by step 1) |

**Step 4 note:** Must also generate `product-marketing-context.md` — a condensed 500-word version of the master doc. See `prompts/04_master_doc.md` for exact requirements.

## Standalone Mode

When no pipeline context exists, ask:

1. What is the product name?
2. What is the product URL (or paste a short description)?
3. Who is the target audience? (demographics + main pain point)
4. Who are the main competitors? (names or URLs, or "none")
5. What awareness level do you think the audience is at? (1–5 or "unsure")

Then ask: "Which steps? (1 = Awareness, 2 = Competitor Research, 3 = Avatar, 4 = Master Doc, or 'all')"

Save outputs to `output/{product_name}/` if user confirms, otherwise output to chat.
Do NOT read prompt files in standalone mode — execute steps directly from SKILL.md methodology.

