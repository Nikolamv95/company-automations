---
name: lp-writer
version: 1.0.0
description: "Write landing page copy, sales pages, or opt-in pages. Use when the user wants a landing page, sales page, opt-in page, or checkout page copy. Triggers on: landing page, sales page, opt-in page, write a page, page copy, above the fold, hero section, checkout copy, order form."
---

# Landing Page Writer

Write conversion-optimized landing page copy. Three page types for different goals.

## Brand Context

Voice, tone, channel rules, and restrictions come from `projects/{brand}/brand.md`.
Load it before executing. If brand.md doesn't exist for this brand, use system defaults.

## References

Load before writing:
- `references/page-templates.md` — full section-by-section templates for opt-in, sales page, and checkout
- `references/cro-checklist.md` — CRO rules, friction reduction, headline formulas, pre-launch audit checklist

## Mode Detection

**PIPELINE MODE** — `output/{brand}/{product}/research/product-marketing-context.md` exists:
→ Load it. Also load `output/{brand}/{product}/research/06_desire_validation.md` for primary desire and avatar language.
→ Do NOT ask questions the files already answer.

**STANDALONE MODE** — no context file:
→ Before writing anything, ask for:
  1. Page type — opt-in page, sales page, or checkout page
  2. Product — what does it do, who is it for (2-3 sentences)
  3. Primary desire — the "I want to..." statement from the avatar
  4. Awareness level (1–5)
  5. Offer details — price, bonuses, guarantee (for sales/checkout pages)
→ Do NOT invent product names, demographics, prices, or proof points. Wait for the answer.

---

## Three Page Types

### Type 1 — Short-Form Opt-In Page (100-200 words)

Goal: capture email in exchange for a lead magnet

**Above-fold structure (everything visible before scroll):**
```
HEADLINE     — primary desire in customer's language (6-12 words)
SUBHEADLINE  — expand the promise + mechanism hint (1-2 sentences)
BULLET LIST  — 3-5 specific outcomes they get (benefit-forward)
FORM         — First name + Email only (each field = 7-10% drop)
CTA BUTTON   — "[Action verb] + [outcome]" ("Get My Free Guide")
```

**Social proof bar** (below form): logos, number of subscribers, a quote

---

### Type 2 — Long-Form Sales Page (1500-3000 words)

Goal: convert cold or warm traffic to purchase

Full RMBC structure:

```
HEADLINE            ← primary desire, awareness-appropriate
SUBHEADLINE         ← expand promise
SOCIAL PROOF BAR    ← logos or quick-stat credibility
HOOK STORY          ← avatar's problem moment (mirror their pain)
FAILED ATTEMPTS     ← validate why they haven't solved it yet
MECHANISM           ← what makes this different
PROOF SECTION       ← testimonials + specific results
WHAT YOU GET        ← deliverables with benefits (not just features)
FOR WHO             ← ideal customer description (creates self-selection)
OBJECTION SECTION   ← top 3 objections handled directly
PRICING             ← anchored price with value stack
GUARANTEE           ← specific risk reversal
FINAL CTA           ← repeat offer + urgency reason
FAQ                 ← 5-7 questions that handle remaining objections
```

---

### Type 3 — Checkout / Order Form Page

Goal: minimize abandonment at the final step

```
HEADLINE           ← reinforce the decision they just made ("Yes! I'm ready to...")
ORDER SUMMARY      ← clear, simple, what they're getting
TRUST SIGNALS      ← lock icon, payment logos, guarantee badge
OBJECTION HANDLER  ← one short paragraph addressing biggest fear (before payment fields)
FORM FIELDS        ← only what's absolutely required (name, email, card)
CTA BUTTON         ← "Complete My Order" or "Yes, I Want This"
GUARANTEE REMINDER ← visible near submit button
```

---

## CRO Rules (Apply to All Pages)

**Above fold:**
- Headline + subheadline + CTA visible in first 5 seconds
- Value prop understood without scrolling
- Mobile: CTA button must be thumb-reachable

**Social proof placement:**
- Near top (before scroll) AND near CTA (before purchase)
- Specific beats vague: "23 lbs in 6 weeks" > "amazing results"

**Friction reduction:**
- Each form field reduces completion by 7-10% → ask only what's necessary
- One CTA per page section
- No exit links on sales/checkout pages

**Price framing:**
- Show value stack before revealing price
- Anchor with higher original price or competitor comparison
- Daily rate: "$3/day" feels cheaper than "$97/month"
- Guarantee: "60-day money-back" > "satisfaction guaranteed"

**Objection handling:**
- Address top 3 objections before the buy button
- Use real language from customer research (not invented objections)

---

## Headline Formulas

```
Desire-led:    "[Specific result] in [timeframe] — without [sacrifice]"
Curiosity:     "The [mechanism] that [unexpected result]"
Identity:      "For [avatar identity] who are ready to [transformation]"
Authority:     "How [source] discovered [counterintuitive insight]"
Direct:        "[Benefit] — [proof point]"
```

## Output Format

For each page: full copy with section labels, headline variants (3), CTA variants (2), and a brief note on awareness level targeted.

## Self-Check

Before presenting output, verify:
- [ ] 3 headline variants included
- [ ] 2 CTA variants included
- [ ] Above-fold value prop is clear (headline + subheadline + CTA visible without scrolling)
- [ ] Social proof appears near top AND near CTA
- [ ] Top 3 objections handled before the buy button
- [ ] Each form field is justified (remove any unnecessary fields)

If any check fails → fix it before presenting.
