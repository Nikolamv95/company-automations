# /review

Review copy using a rubric and provide structured feedback with an actionable improvement plan.

## Usage

```
/review copy "Product Name"
/review copy "Brand Name" "Product Name"
/review copy @output/ProductName/07_hooks.md
/review dr "Product Name"
/review conversion @output/ProductName/11_advertorial.md
```

---

## Step 0: Brand Detection

Before reviewing:

1. **Identify brand:** If brand name is in the command → proceed. If not clear → ask: "For which brand is this?"
2. **Load `projects/{brand}/brand.md`** if it exists — use brand voice, restrictions, and approved claims as the benchmark for the review
3. If no brand context → review against system defaults only

---

## Available Rubrics

### `copy` — Direct-response copy review
Checks: clarity, voice/tone, benefit orientation, proof points, specificity, emotional resonance, CTA strength.
Best for: hooks, ad copy, advertorials, landing pages, emails.

### `dr` — Full DR framework compliance
Checks: Schwartz awareness level match, desire stack alignment, RMBC structure, reading level (5th grade), objection handling, guarantee specificity.
Best for: full pipeline output review.

### `conversion` — CRO-focused review
Checks: above-fold value prop, friction points, CTA placement, social proof positioning, price framing, objection handling before buy button.
Best for: landing pages, opt-in pages, checkout pages.

### `email` — Email sequence review
Checks: subject line length (2-5 words), open-worthy subject, no filler openers, single CTA, correct length per type, follow-up angle variety.
Best for: email sequences.

---

## Mode 1: Product review

`/review {rubric} "Product Name"`

1. List all `.md` files in `output/{brand}/{product}/research/`
2. Ask which files to review (or "all")
3. For each file: apply the rubric, output structured feedback

---

## Mode 2: Single file review

`/review {rubric} @path/to/file.md`

Load the file and apply the rubric directly.

---

## Output Format

For each file reviewed:

```
## Review: {filename}
**Rubric:** {rubric name}
**Overall Score:** X/10

### What's Working
- [specific strength with line reference]

### Needs Improvement
- [specific issue] → [specific fix]

### Priority Changes (Top 3)
1. [highest impact change]
2. [second highest]
3. [third highest]
```

After all files: provide a one-paragraph summary of the biggest pattern across the reviewed set.

---

## After Review

Ask: "Would you like me to apply these changes? I can run the copy-editor skill on any of these files."
If yes → invoke `copy-editor` skill on the selected file(s).
