---
name: hook-writer
version: 1.0.0
description: "Write hooks, headlines, and opening lines for direct-response ads. Use when the user wants hooks, headlines, attention grabbers, or ad openers. Triggers on: hooks, write hooks, give me hooks, hook writing, headlines, opening line, attention grabber, ad opener, 6-20 words, step 7."
---

# Hook Writer

Write opening hooks for direct-response ads. Every hook is 6-20 words. Every hook creates an irresistible urge to read the next sentence.

## Brand Context

Voice, tone, channel rules, and restrictions come from `projects/{brand}/brand.md`.
Load it before executing. If brand.md doesn't exist for this brand, use system defaults.

## The Hook's One Job

Activate ONE of these:
1. **Curiosity** — withhold information the reader desperately wants
2. **Fear** — make them feel a threat they can't ignore
3. **Desire** — make them feel the specific outcome they crave
4. **Identity / Pattern Interrupt** — say something so unexpected they must stop scrolling

## Awareness Level → Hook Type

| Awareness Level | Best Hook Type |
|-----------------|---------------|
| 1-2 (Unaware / Problem) | Fear/Pain hooks — dramatize the problem |
| 3 (Solution Aware) | Curiosity hooks — tease the mechanism |
| 4 (Product Aware) | Desire/Proof hooks — show the transformation |
| 5 (Most Aware) | Direct / Identity hooks — speak to who they're becoming |

## Rules

- **6-20 words. No exceptions.**
- Specific > vague always. Numbers, timeframes, named outcomes.
- Pull language directly from the avatar's vocabulary — never marketing speak
- No clickbait that doesn't pay off in the ad
- No punctuation tricks

## Deliverable

**Count:** User-specified if given ("write me 5 hooks", "give me 20 hooks"). Otherwise use defaults:
- Pipeline default: **15 hooks**
- Standalone default: **10 hooks**

**Distribution (pipeline default, scale proportionally for other counts):**
- ~27% curiosity hooks
- ~27% fear/pain hooks
- ~27% desire/outcome hooks
- ~19% identity/pattern interrupt hooks

At minimum: at least 1 of each type regardless of total count.

**Top 3 Recommended** (ranked with one sentence rationale each)

## Mode Detection

**PIPELINE MODE** — `output/{brand}/{product}/research/06_desire_validation.md` exists:
→ Load it. Use validated primary desire and exact language patterns from the file.
→ Do NOT invent new desires not present in the file.
→ Produce hooks per user-specified count, or 15 if not specified.
→ Save to `output/{brand}/{product}/research/07_hooks.md`.

**STANDALONE MODE** — no pipeline files:
→ Before writing anything, ask for:
  1. Product — what does it do, who is it for (2-3 sentences)
  2. Primary desire — the "I want to..." statement from the avatar
  3. Awareness level (1–5)
→ Produce hooks per user-specified count, or 10 if not specified.
→ Do NOT invent product details, demographics, or desires. Wait for the answer.

## References

Load before writing hooks:
- `references/hook-patterns.md` — formula templates by type (curiosity/fear/desire/identity) and platform variants
- `references/hook-examples.md` — real-world example bank for tone and structure reference

## Self-Check

Before presenting output, verify:
- [ ] Hook count matches user-specified number, or default (15 pipeline / 10 standalone)
- [ ] Every hook is 6-20 words — count each one
- [ ] No hook contains the product name
- [ ] All 4 types represented: curiosity, fear, desire, identity
- [ ] Top 3 Recommended section exists with one-sentence rationale each

If any check fails → fix it before presenting.
