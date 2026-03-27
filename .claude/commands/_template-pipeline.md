# /your-pipeline-name

> **HOW TO USE THIS TEMPLATE**
> 1. Copy this file to `.claude/commands/your-pipeline-name.md`
> 2. Replace all `{placeholders}` with your values
> 3. Delete this instruction block
> 4. Keep Step 0, Post-Pipeline, and Pipeline State sections as-is — they are standard

Run the {N}-step {description} pipeline for a product.

## Usage

```
/your-pipeline-name "Product Name"
/your-pipeline-name "Brand Name" "Product Name"
```

**Flags:**
- `--skip-drive` — skip Google Drive upload at the end

---

## Step 0: Brand Detection

Before asking intake questions:

1. **Identify brand:** If brand name is in the command → proceed. If not clear → ask: "For which brand is this product?"
2. **Load `projects/{brand}/brand.md`** if it exists:
   - Extract answers for any intake questions that brand.md covers → skip those questions
3. **Note at top of `intake.md`:** which brand this is for + whether brand.md was loaded

---

## Step 1: Intake

Ask these questions one at a time. Wait for answers before proceeding.

1. **{Question 1}** — {description}
2. **{Question 2}** — {description}
3. **{Question N}** — {description}

Save all answers to `output/{product_name}/intake.md`.

---

## Step 2: {Phase Name} (parallel batches)

### Batch A — Run IN PARALLEL:

**Sub-agent: {agent-name}** → Step {N} ({Step Name})
- Input: `intake.md`
- Task: {what this agent does}
- Output: `output/{brand}/{product}/research/0N_{name}.md`

**Sub-agent: {agent-name}** → Step {N} ({Step Name})
- Input: `intake.md`
- Task: {what this agent does}
- Output: `output/{brand}/{product}/research/0N_{name}.md`

### After Batch A:

**Sub-agent: {agent-name}** → Step {N} ({Step Name})
- Input: `0N_{prev}.md` + `0N_{prev2}.md`
- Task: {what this agent does}
- Output: `output/{brand}/{product}/research/0N_{name}.md`

---

## Step 3: {Phase Name}

### Batch B — After Step {N} completes, run IN PARALLEL:

**Sub-agent: {agent-name}** → Step {N} ({Step Name})
- Input: `0N_{prev}.md`
- Task: {what this agent does}
- Output: `output/{brand}/{product}/research/0N_{name}.md`

---

## Post-Pipeline

### Pinecone Save

Ask the user: "Which files would you like to save to Pinecone memory?"
List all generated files. User selects (multi-select). Run `save_to_memory` for each selected file.
Never save automatically — always ask.

### Google Drive Upload

If user provided a Drive folder URL during intake (not "skip"):
Ask: "Ready to upload to Google Drive? Confirm folder: {folder_url}"
On confirm: use `gws drive +upload` for each file in `output/{brand}/{product}/research/`.
If `--skip-drive` was passed, skip this step.

---

## Pipeline State

Write `.pipeline-state-{product_slug}.json` at the start of Step 2 (slug = product name lowercased, spaces → hyphens):

```json
{
  "product": "{product_name}",
  "pipeline": "your-pipeline-name",
  "steps": ["Step 1", "Step 2", "Step 3"],
  "completed_steps": [],
  "failed_steps": [],
  "skipped_steps": []
}
```

Update `completed_steps` after each step completes.
On step failure: see `CLAUDE.md` → Pipeline Step Error Handling for retry/skip/abort protocol.
When all steps done: delete `.pipeline-state-{product_slug}.json`.

---

## Output Summary

After all steps complete, print:

```
Pipeline complete: {product_name}
Files saved: output/{product_name}/
  ✓ intake.md
  ✓ 01_{name}.md
  ✓ 02_{name}.md
  ✓ {N}_{name}.md
  ✓ skill-versions.md
```

Write `output/{brand}/{product}/research/skill-versions.md` listing each step's agent, SKILL.md path, and version.
