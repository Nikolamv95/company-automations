# /deep-research

Run the full 11-step direct-response research and creative pipeline for a product.

> **Note:** This command loads execution templates from `prompts/` for each pipeline step. No other command or skill reads from `prompts/`.

## Usage

```
/deep-research "Product Name"
/deep-research "Brand Name" "Product Name"
```

**Flags:**
- `--skip-drive` — skip Google Drive upload at the end (can be added to any variant)

## What This Does

Runs all 11 pipeline steps → saves outputs to `output/{brand}/{product}/` → offers Pinecone save → offers Google Drive upload.

---

## Step 0: Brand Detection

Before asking intake questions:

1. **Identify brand:** If brand name is in the command → proceed. If not clear → ask: "For which brand is this product?"

2. **Load `projects/{brand}/brand.md`** if it exists:
   - Extract answers for Q10 (brand guidelines) and Q11 (Google Drive folder) from brand.md
   - These questions are **skipped in intake** if brand.md provides them — do not ask the user again

3. **Note at top of `intake.md`:** which brand this is for + whether brand.md was loaded

---

## Step 1: Intake

Ask these questions one at a time. Wait for answers before proceeding.
Q10 and Q11 are skipped if brand.md was loaded in Step 0.

1. **Product name** — What is the product called?
2. **Product URL** — URL of the sales page or landing page (or "none")
3. **Price point** — e.g. $97, $47/month, $297 one-time
4. **Target audience** — Who is this for? (demographics + psychographics if known)
5. **Key claims** — What are the 3-5 main benefits or claims?
6. **Competitors** — Main competitors (names or URLs, or "none")
7. **Existing assets** — Testimonials, case studies, sales page URL, or "none"
8. **Awareness level hypothesis** — Your guess: Schwartz level 1–5 (1=unaware, 5=most aware), or "unsure"
9. **Primary channel** — Facebook / YouTube / Google / TikTok / Other
10. **Brand guidelines** — *(skip if brand.md loaded)* Paste guidelines, provide file path, or type "no" for defaults
11. **Google Drive folder** — *(skip if brand.md loaded)* Folder URL for upload at the end, or "skip"

Save all answers to `output/{brand}/{product_name}/intake.md`.

---

## Step 2: Research Phase (parallel batches)

### Batch A — Run these 3 sub-agents IN PARALLEL:

**Sub-agent: researcher** → Step 1 (Awareness Analysis)
- Input: `intake.md`
- Task: Analyze Schwartz awareness level. Map where the audience sits on the 5-stage model. Validate or correct the user's hypothesis with reasoning.
- Output: `output/{brand}/{product}/01_awareness.md`

**Sub-agent: researcher** → Step 2 (Competitor Research)
- Input: `intake.md`
- Task: Research the named competitors. For each: positioning, angles used, price, claims, weaknesses. Identify gaps.
- Output: `output/{brand}/{product}/02_competitor.md`

**Sub-agent: researcher** → Step 3 (Avatar Building)
- Input: `intake.md`
- Task: Build the customer avatar. Demographics, psychographics, fears, desires, language patterns, self-perception. Use the Desire Stack model (surface/real/suppressed/identity desires).
- Output: `output/{brand}/{product}/03_avatar.md`

### Batch B — After Batch A completes, run these 2 sub-agents IN PARALLEL:

**Sub-agent: researcher** → Step 4 (Master Document)
- Input: `01_awareness.md` + `02_competitor.md` + `03_avatar.md`
- Task: Synthesize into a comprehensive master document. Include: awareness level (confirmed), avatar summary, competitor landscape, positioning opportunity, key differentiators.
- Also generate: `output/{brand}/{product}/product-marketing-context.md` (shared context for all copy skills)
- Output: `output/{brand}/{product}/04_master_doc.md` + `output/{brand}/{product}/product-marketing-context.md`

**Sub-agent: strategist** → Step 5 (Desire Extraction)
- Input: `intake.md` + `03_avatar.md`
- Task: Extract the full desire stack grounded in the avatar profile. Surface desire → Real desire → Suppressed desire → Identity desire. Also extract fear stack. Use Schwartz + Eugene Schwartz principles.
- Output: `output/{brand}/{product}/05_desire_extraction.md`

### After Batch B (Step 5 must be complete):

**Sub-agent: strategist** → Step 6 (Desire Validation)
- Input: `05_desire_extraction.md` + `03_avatar.md`
- Task: Validate the desire stack against real market data and competitor language. Rank desires by intensity and specificity. Identify the single primary desire to lead all copy with.
- Output: `output/{brand}/{product}/06_desire_validation.md`

---

## Step 3: Creative Phase (parallel batches)

### Batch C — After Step 4 + Step 6 complete, run IN PARALLEL:

**Sub-agent: hook-writer** → Step 7 (Hooks)
- Input: `04_master_doc.md` + `06_desire_validation.md` + `product-marketing-context.md`
- Task: Write 15 hooks (6–20 words each) across 4 types (curiosity, fear, desire, identity). Adapt for the confirmed awareness level. Rank top 3.
- Output: `output/{brand}/{product}/07_hooks.md`

**Sub-agent: strategist** → Step 9 (Marketing Angles)
- Input: `04_master_doc.md` + `06_desire_validation.md`
- Task: Develop 7+ distinct marketing angles. For each: angle name, core claim, target awareness level, why it works, hook direction. Select the primary angle.
- Output: `output/{brand}/{product}/09_marketing_angles.md`

### Batch D — Sequential:

**Sub-agent: ad-copy-writer** → Step 8 (Desire Testing Copy)
- Input: `07_hooks.md` + `06_desire_validation.md` + `product-marketing-context.md`
- Task: Write 3 desire-testing ad copy variants (150–300 words each). Each tests a different desire from the desire stack. Facebook + YouTube format.
- Output: `output/{brand}/{product}/08_desire_testing_copy.md`

**Sub-agent: ad-copy-writer** → Step 10 (Angle Testing Copy)
- Input: `09_marketing_angles.md` + `product-marketing-context.md`
- Task: Write 3 angle-testing ad copy variants (200–400 words each). One per top angle. Include hooks embedded in copy.
- Output: `output/{brand}/{product}/10_angle_testing_copy.md`

**Sub-agent: advertorial-writer** → Step 11a (Advertorial — Nightmare)
- Input: `09_marketing_angles.md` + `03_avatar.md` + `06_desire_validation.md` + `product-marketing-context.md`
- Task: Write one full advertorial (900–1500 words) using the Nightmare template (personal pain story → transformation → product as solution).
- Prompt: `prompts/11a_advertorial_nightmare.md`
- Output: `output/{brand}/{product}/11a_advertorial.md`

**Sub-agent: advertorial-writer** → Step 11b (Advertorial — Authority)
- Input: `09_marketing_angles.md` + `03_avatar.md` + `06_desire_validation.md` + `product-marketing-context.md`
- Task: Write one full advertorial (900–1500 words) using the Authority template (expert reveals hidden truth → research/insight → product as mechanism).
- Prompt: `prompts/11b_advertorial_authority.md`
- Output: `output/{brand}/{product}/11b_advertorial.md`

> Both 11a and 11b are always generated. Run them sequentially (11a first, then 11b).

---

## Step 4: Post-Pipeline

### Pinecone Save

Ask the user: "Which files would you like to save to Pinecone memory?"
List all generated files. User selects (multi-select). Run `save_to_memory` for each selected file.

### Google Drive Upload

If user provided a Drive folder URL during intake (not "skip"):
Ask: "Ready to upload to Google Drive? Confirm folder: {folder_url}"
On confirm: use `gws drive +upload` for each file in `output/{brand}/{product}/`.
If `--skip-drive` was passed, skip this step.

---

## Output Summary

After all steps complete, print:

```
Pipeline complete: {product_name}
Files saved: output/{brand}/{product_name}/
  ✓ 01_awareness.md
  ✓ 02_competitor.md
  ✓ 03_avatar.md
  ✓ 04_master_doc.md
  ✓ product-marketing-context.md
  ✓ 05_desire_extraction.md
  ✓ 06_desire_validation.md
  ✓ 07_hooks.md
  ✓ 08_desire_testing_copy.md
  ✓ 09_marketing_angles.md
  ✓ 10_angle_testing_copy.md
  ✓ 11a_advertorial.md
  ✓ 11b_advertorial.md
  ✓ skill-versions.md
```
