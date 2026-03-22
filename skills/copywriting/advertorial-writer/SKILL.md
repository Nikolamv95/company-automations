---
name: advertorial-writer
version: 1.0.0
description: "Write long-form advertorials using the RMBC framework (pipeline step 11). Use when the user wants advertorials, long-form article ads, native article ads, pre-sell pages, or RMBC copy. Triggers on: advertorial, long-form, RMBC, article ad, native article, pre-sell, long copy, write an advertorial, step 11."
---

# Advertorial Writer

Write 900-1500 word advertorials using the RMBC framework. Choose template based on the primary marketing angle.

## Brand Context

Voice, tone, channel rules, and restrictions come from `projects/{brand}/brand.md`.
Load it before executing. If brand.md doesn't exist for this brand, use system defaults.

## RMBC Framework

```
R = Reason Why    (why is this information being shared?)
M = Mechanism     (what is the unique thing that makes this work?)
B = Benefits      (what specific outcomes does the mechanism deliver?)
C = Call to Action (specific, low-friction next step)
```

## Template Selection

**Use 11a Nightmare** when: angle leads with pain, before/after, transformation, "I used to..."
**Use 11b Authority** when: angle leads with expert insight, research, counterintuitive truth
**Use 11c Listicle** when: angle is curiosity-led, "X reasons why," "X mistakes," shareable *(Standalone mode only — no pipeline prompt template exists for 11c)*

---

## Universal Writing Rules

- 5th grade reading level throughout
- Subheadings every 150-200 words
- Bold key phrases (mechanism name, primary desire, proof highlights)
- **Product name appears in Section 5 or later** — never in the headline or opening
- First and last sentence of every section creates a pull to the next
- **Disclaimer required at the bottom:** add a single line — `"This is an advertorial. Results may vary."` — after the final CTA. Do not embed it mid-copy.
- Platform word count targets:
  - Facebook native: 600-900 words
  - Taboola/Outbrain: 800-1200 words
  - Email advertorial: 400-600 words

## Mode Detection

**PIPELINE MODE** — called from `/deep-research` with existing output files:
→ Load `output/{product}/09_marketing_angles.md` — primary angle determines template (11a / 11b / 11c)
→ Load `output/{product}/03_avatar.md` — for sensory details and exact language
→ Load `output/{product}/06_desire_validation.md` — primary desire and validated language
→ Save to: `output/{product}/11_advertorial.md`
→ Do NOT ask questions the files already answer.

**STANDALONE MODE** — no pipeline files exist:
→ Before writing anything, ask for:
  1. Template — 11a (Nightmare/transformation), 11b (Authority/expert), or 11c (Listicle/curiosity) — or describe the options and let them choose
  2. Product — what does it do, who is it for (2-3 sentences)
  3. Primary desire — the "I want to..." statement from the avatar
  4. UMP — what is the unique mechanism of the PROBLEM (why does the problem exist?)
  5. UMS — what is the unique mechanism of the SOLUTION (how does the product fix it?)
→ Do NOT invent product names, demographics, mechanisms, or expert credentials. Wait for the answer.

## References

Load before writing — select based on template chosen:
- `references/rmbc-framework.md` — full section-by-section structure for 11a (Nightmare) and 11c (Listicle), RMBC principles, Heath Wilcock PAS flow, subheadline strategy
- `references/authority-framework.md` — full 8-section structure for 11b (Authority), UMP/UMS requirements, psychological levers, transition phrases

## Self-Check

Before presenting output, verify:
- [ ] Word count within range: 11a (600-1200 words), 11b (800-1500 words)
- [ ] Product name appears in Section 5 or later — NOT in headline or opening
- [ ] At least 3 CTAs throughout (not only at the end)
- [ ] UMP and UMS clearly established in the copy
- [ ] Subheadings present every 150-200 words
- [ ] Disclaimer included at the bottom

If any check fails → fix it before presenting.
