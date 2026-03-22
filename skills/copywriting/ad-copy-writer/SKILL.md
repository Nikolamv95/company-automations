---
name: ad-copy-writer
version: 1.0.0
description: "Write direct-response ad copy — Facebook ads, YouTube scripts, native ads, desire-testing copy, angle-testing copy (pipeline steps 8, 10). Triggers on: ad copy, Facebook ad, YouTube ad, write an ad, desire testing copy, angle testing copy, short copy, ad script, native ad, step 8, step 10."
---

# Ad Copy Writer

Write direct-response ad copy — short-form Facebook, YouTube, and native ads. You work from validated strategy: a confirmed primary desire and a specific marketing angle.

## Brand Context

Voice, tone, channel rules, and restrictions come from `projects/{brand}/brand.md`.
Load it before executing. If brand.md doesn't exist for this brand, use system defaults.

## Two Copy Types

### Type 1 — Desire-Testing Copy (Step 8)
**Purpose:** Test whether the primary desire resonates before committing to full creative
- Lead with the desire (the promise, not the product)
- 150-300 words
- Single desire activated
- Single CTA
- Tease the mechanism — don't fully explain yet

### Type 2 — Angle-Testing Copy (Step 10)
**Purpose:** Test which marketing angle drives the highest response
- Lead with the angle's hook (from Step 7)
- 200-400 words
- Full mini-story or argument
- Land on the product as the solution
- Single CTA

## Copy Structure

```
HOOK (1-2 sentences)      ← from hook-writer output or write new
BRIDGE (1-2 sentences)    ← "If you've ever tried to X, you know how..."
PROBLEM (2-3 sentences)   ← amplify the pain; make it more real
MECHANISM (2-3 sentences) ← what makes THIS different (no product name yet if possible)
PROOF FLASH (1-2 sentences) ← testimonial fragment, stat, or result
CTA (1 sentence)          ← one clear next step
```

## Platform Character Limits

| Platform | Field | Limit |
|----------|-------|-------|
| Meta/Facebook | Primary text | 125 chars visible, 500 total |
| Meta/Facebook | Headline | 40 chars |
| Google Ads | Headline | 30 chars (up to 15 headlines) |
| Google Ads | Description | 90 chars (up to 4) |
| LinkedIn | Intro text | 150 chars recommended |
| TikTok | Ad text | 80 chars recommended |
| YouTube | Title | 100 chars |

## Awareness Level → Copy Length

| Awareness | Length | Reason |
|-----------|--------|--------|
| Level 1-2 | 300-500 words | Must educate before selling |
| Level 3 | 200-400 words | Must differentiate mechanism |
| Level 4-5 | 100-200 words | Objections + offer only |

## Writing Rules

- 5th grade reading level (Flesch-Kincaid 60-70)
- Sentences: 5-15 words average
- Paragraphs: 1-3 sentences max
- Active voice always
- "you" constantly
- Specific: numbers, timeframes, named results
- No: "innovative," "cutting-edge," "best-in-class," "synergy"
- Product name appears LATE — tease mechanism first

## Creative Testing Hierarchy

When testing ads, test in this order:
1. Concept (different desires/angles)
2. Hook (different opening lines)
3. Visuals (different creative formats)
4. Copy (body variations)

Don't test copy variations until concept and hook are validated.

## Mode Detection

**PIPELINE MODE** — called from `/deep-research` with existing output files:
→ Step 8: Load `output/{product}/07_hooks.md` + `output/{product}/06_desire_validation.md`
→ Step 10: Load `output/{product}/09_marketing_angles.md` + `output/{product}/07_hooks.md`
→ Save to: `output/{product}/08_desire_testing_copy.md` or `output/{product}/10_angle_testing_copy.md`
→ Do NOT ask questions the files already answer.

**STANDALONE MODE** — no pipeline files exist:
→ Before writing anything, ask for:
  1. Copy type — desire-testing (Step 8) or angle-testing (Step 10)
  2. Product — what does it do, who is it for (2-3 sentences)
  3. Primary desire — the "I want to..." statement from the avatar's perspective
  4. Awareness level (1–5)
  5. Hook — if they have one; if not, you will write one
→ Do NOT invent demographics, product names, desires, or angles. Wait for the answer.

## References

Load before writing long-form copy:
- `references/personal-discovery-story.md` — full story arc, section breakdown, UMP/UMS guidance, Step 8 vs Step 10 distinction

## Self-Check

Before presenting output, verify:
- [ ] Word count matches type: desire-testing (150-300 words), angle-testing (200-400 words)
- [ ] Follows HOOK → BRIDGE → PROBLEM → MECHANISM → PROOF → CTA structure
- [ ] Product name appears LATE — not in opening lines
- [ ] Single CTA only — no competing actions
- [ ] 5th grade reading level (short sentences, no jargon)

If any check fails → fix it before presenting.
