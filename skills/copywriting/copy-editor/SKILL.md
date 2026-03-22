---
name: copy-editor
version: 1.0.0
description: "Edit and systematically improve marketing copy using the 7-sweep framework. Use when the user has existing copy that needs improvement — not rewriting from scratch. Triggers on: edit this, improve this copy, make this better, tighten this, review my copy, polish, clean up, this doesn't convert, something's off."
---

# Copy Editor — 7-Sweep Framework

Enhance, don't rewrite. Preserve the author's voice while improving every dimension.

## Brand Context

Voice, tone, channel rules, and restrictions come from `projects/{brand}/brand.md`.
Load it before executing. If brand.md doesn't exist for this brand, use system defaults.

**Check first:** Load `projects/{brand}/brand.md` (if exists) + `output/{product}/product-marketing-context.md` for brand voice.

---

## The Seven Sweeps (Run in Order)

### Sweep 1 — Clarity
*Can a stranger understand this immediately?*
- Break sentences > 20 words into two
- Remove jargon and industry acronyms
- Replace passive voice: "was shown to" → "showed"
- Eliminate double negatives
- One idea per sentence

### Sweep 2 — Voice & Tone
*Does this sound like the brand?*
- Check against brand voice guidelines
- Remove: "leverage," "synergy," "utilize," "innovative," "cutting-edge"
- Replace with direct, human language
- Consistent person throughout (you/we/they)
- Remove hedging: "kind of," "sort of," "basically," "actually"

### Sweep 3 — So What
*Is every claim connected to a reader benefit?*
- Every feature → add "which means you..."
- Replace "we have X" with "you get X"
- Remove anything that doesn't answer "why should I care?"

### Sweep 4 — Prove It
*Is every claim substantiated?*
- Flag unsubstantiated superlatives: "best," "fastest," "most powerful"
- Add proof: specific numbers, testimonials, research
- Replace vague social proof: "many customers" → "2,400 customers"
- Make guarantee specific: "60-day money-back" not "satisfaction guaranteed"

### Sweep 5 — Specificity
*Are there concrete details?*
- "lose weight" → "lose 15-23 lbs in 8 weeks"
- "save time" → "save 3 hours per week"
- "works fast" → "see results in 48 hours"
- Replace vague timeframes: "soon" → "within 3 business days"

### Sweep 6 — Heightened Emotion
*Does this make the reader feel something?*
- Add sensory language near the problem (what they see/feel/hear at their worst moment)
- Strengthen fear/desire language in the problem section
- Make the "after" state vivid and specific
- Mirror the avatar's internal monologue

### Sweep 7 — Zero Risk
*Have you removed all friction near the CTA?*
- Guarantee prominent and specific?
- Single CTA only?
- Top 2 objections handled before buy button?
- Price framed as value (daily rate, comparison)?
- No extra links near CTA (they leak conversions)

---

## After Each Sweep

Go back and check that earlier improvements weren't compromised by later changes. Especially check Sweep 1 after Sweep 6 (adding emotion can sometimes add complexity).

---

## Word-Level Improvements

| Weak | Strong |
|------|--------|
| very good | exceptional |
| a lot of | [use a number] |
| help you | let you / enable you |
| try to | will |
| we think | [just state it] |
| it's important | [show why] |
| utilize | use |
| leverage | use / apply |
| innovative | [describe what's actually new] |
| effective | [how effective: "reduces X by 47%"] |

---

## Quick-Pass Checklist

For fast edits (single ad or email):
- [ ] First sentence earns the second
- [ ] No sentence over 20 words
- [ ] Benefit in first 2 lines
- [ ] Single, clear CTA
- [ ] Specific proof point included
- [ ] No hedging language

**Quick-Pass Output Format:**
Return only the specific changes — not the full copy:
```
[CHANGE] Line/section: "original text" → "revised text"
[REASON] Which checklist item triggered this change
```
If no changes needed for a checklist item, skip it.

---

## Output Format

Return edited copy + brief changelog:
```
[Sweep 1] Broke 3 long sentences, removed passive voice in paragraph 2
[Sweep 3] Added "which means you..." to the feature list
[Sweep 5] Replaced "quickly" with "in 48 hours"
[Sweep 7] Moved guarantee statement above CTA button
```

## Self-Check

Before presenting output, verify:
- [ ] All 7 sweeps were run — changelog has an entry for each sweep that changed something
- [ ] No sentence over 20 words in the edited copy — spot check at least 5 sentences
- [ ] No banned words present: "leverage," "synergy," "innovative," "cutting-edge," "utilize"
- [ ] Every claim has a specific proof point or number (Sweep 4 and 5 applied)
- [ ] Single CTA only — no competing actions in the copy
- [ ] Guarantee is specific ("60-day money-back") not vague ("satisfaction guaranteed")

If any check fails → fix it before presenting.
