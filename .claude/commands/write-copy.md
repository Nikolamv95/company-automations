# /write-copy

Generate copy for a specific product (creative phase only) or handle an ad-hoc copy request.

## Usage

```
/write-copy "Product Name"
/write-copy "Brand Name" "Product Name"
/write-copy "Brand Name" "Product Name" --automation
/write-copy "Write 5 hooks about belly fat"
/write-copy "Write 5 hooks about belly fat" --file output/ProductName/03_avatar.md
```

---

## Step 0: Brand Detection

Before routing to any skill or running any step:

1. **Identify brand:** If brand name is in the command → proceed. If not clear → ask: "For which brand is this?"
2. **Load `projects/{brand}/brand.md`** if it exists → pass brand context to every sub-agent or skill invoked
3. **Never write copy without knowing the brand.**

---

## Mode 1: Product Copy (creative phase, steps 7–11)

When given a product name that has existing output files:

1. Check `output/{brand}/{product}/` — does `04_master_doc.md` and `06_desire_validation.md` exist?
   - No → tell user to run `/deep-research "{product}"` first (research phase must complete first)
   - Yes → proceed

2. Load `output/{brand}/{product}/product-marketing-context.md` as shared brand context.

3. Unless `--automation` flag is set, ask which steps to run:
   - [ ] Step 7 — Hooks
   - [ ] Step 8 — Desire Testing Copy
   - [ ] Step 9 — Marketing Angles
   - [ ] Step 10 — Angle Testing Copy
   - [ ] Step 11 — Advertorial
   - [ ] All (default)

4. Run selected steps using the same sub-agent assignments as `/deep-research`:
   - Step 7 → hook-writer
   - Step 8 → ad-copy-writer (waits for 7)
   - Step 9 → strategist
   - Step 10 → ad-copy-writer (waits for 9)
   - Step 11 → advertorial-writer (waits for 9)

5. Save outputs to `output/{brand}/{product}/` (overwrites existing files for selected steps).

**`--automation` flag:** Skip all prompts. Run all 5 steps in the correct order without asking.

---

## Mode 2: Ad-Hoc Copy

When given a plain text description (not a product name with existing files):

Read the `description` field in each `agents/*.md` frontmatter and match it to the request.
Each agent lists its trigger keywords (BG + EN) — invoke the matching agent.
If no clear match → invoke `copywriter` as fallback.

If `--file` is provided, load that file as additional context before generating.

Output: print directly to console. Do not save to `output/` unless user asks.

---

## Brand Context

Loading order:
1. `projects/{brand}/brand.md` — voice, tone, restrictions (overrides system defaults)
2. `output/{brand}/{product}/product-marketing-context.md` — avatar, desires, proof points

If `product-marketing-context.md` doesn't exist in ad-hoc mode, ask: "Do you have a product-marketing-context.md I should load? Or should I proceed without it?"
