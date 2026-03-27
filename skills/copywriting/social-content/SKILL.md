---
name: social-content
version: 2.0.0
description: "Create social media content for Facebook, Instagram, TikTok, or YouTube. Use when the user wants posts, captions, Reels scripts, carousels, TikTok scripts, content calendars, competitor analysis, or organic social strategy for a DR/DTC brand. Triggers on: social media post, Facebook post, Instagram caption, TikTok script, Reel script, content calendar, social content, organic social."
---

# Social Content

## Brand Context

Voice, tone, channel rules, and restrictions come from `projects/{brand}/brand.md`.
Load it before executing. If brand.md doesn't exist for this brand, use system defaults.

## Mode Detection

**PIPELINE MODE** — `output/{brand}/{product}/research/product-marketing-context.md` exists:
→ Load it. Use avatar, brand voice, and product info from the file.
→ Then confirm: platform, format, goal, and available assets.

**STANDALONE MODE** — no context file:
→ Before writing anything, ask for:
  1. Platform + format (e.g., "Facebook post", "Instagram Reel", "TikTok script", "content calendar")
  2. Product — what does it do, who is it for (2-3 sentences)
  3. Goal (awareness / engagement / soft conversion)
→ Do NOT invent demographics, product details, or desires. Wait for the answer.

---

## Platform Rules (Summary)

Read `references/platforms.md` for full platform guidance. Key rules:

- **Facebook:** Hook in first 2-3 lines (before "See More"). Links go in comments — never in post body. Native video beats everything.
- **Instagram:** Reels get 2-3x reach of static posts. Saves and shares matter more than likes. First slide = hook on carousels.
- **TikTok:** Hook in first 1-2 seconds — spoken AND visual. Authentic beats polished. Under 30-45 seconds to start.
- **All platforms:** No hard sell in organic. Organic = top-of-funnel. Ads handle conversion.

---

## Content Pillars (DR Brand)

Read `references/post-templates.md` for the full distribution. Default split:

```
30% — Educational (mechanism, myth-busting, "why" content)
25% — Social proof (testimonials, before/after, customer stories)
20% — Entertainment / relatability (problem humor, "this is me" content)
15% — Behind the scenes (product, brand, team)
10% — Direct offer (promotions, launches)
```

---

## Post Creation

Read `references/post-templates.md` for ready-to-use templates by platform and format.

Read `references/reverse-engineering.md` when the user asks to analyze competitor content or extract hook patterns.

**Writing rules:**
- 5th grade reading level. Short sentences. One idea per paragraph.
- Avatar language — not marketing speak. Use the words they use to describe their problem.
- Emotion before information. Specificity beats vagueness ("23 lbs" not "significant weight").
- Hook determines everything. If it doesn't stop the scroll, nothing else matters.

---

## Repurposing

One piece of pillar content → multiple formats:

```
Facebook transformation post
  → Instagram Reel script (hook stays, adapts to spoken format)
  → Instagram carousel (hook slide → problem → mechanism → proof → CTA)
  → TikTok "3 Signs" script
```

Never copy-paste across platforms without adapting tone, format, and CTA to each platform's norms.

---

## References

- `references/platforms.md` — Platform-specific strategy: Facebook, Instagram, TikTok, YouTube, Facebook Groups. Algorithm tips, posting frequency, what works / what doesn't.
- `references/post-templates.md` — Ready-to-use templates by platform and format. Hook formulas by platform. DR content pillar distribution.
- `references/reverse-engineering.md` — 6-step framework for analyzing competitor content and extracting proven patterns.

## Self-Check

Before presenting output, verify:
- [ ] Platform and format are clearly labeled for each piece
- [ ] Hook is in the first 1-3 lines (before "See More" on Facebook)
- [ ] No hard sell in organic content — top-of-funnel only
- [ ] Avatar language used — not marketing speak
- [ ] Content pillar type labeled (Educational / Social Proof / Entertainment / BTS / Direct Offer)

If any check fails → fix it before presenting.
