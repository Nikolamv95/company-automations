---
name: competitor-alternatives
version: 1.0.0
description: "Create competitor comparison or alternative pages for SEO and sales. Use when the user wants to build a vs page, alternative page, comparison page, battle card, or competitor teardown. Triggers on: alternative page, vs page, competitor comparison, how do we compare to X, battle card, competitor teardown, alternatives to."
---

# Competitor & Alternative Pages

Build pages that rank for competitive search terms and position your product effectively.

## Check Context First

Read `output/{brand}/{product}/research/product-marketing-context.md` if it exists — use competitive landscape section.

## Four Page Formats

### Format 1: [Competitor] Alternative (Singular)
**Intent:** User actively looking to switch from a specific competitor
**URL:** `/alternatives/[competitor]`
**Keywords:** "[Competitor] alternative", "switch from [Competitor]"

Structure:
1. Why people look for alternatives (validate their pain)
2. You as the alternative (quick positioning)
3. Detailed comparison (features, service, pricing)
4. Who should switch (and who shouldn't)
5. Migration path
6. Social proof from switchers
7. CTA

---

### Format 2: [Competitor] Alternatives (Plural)
**Intent:** Early-stage researcher exploring options
**URL:** `/alternatives/[competitor]-alternatives`
**Keywords:** "[Competitor] alternatives", "best [Competitor] alternatives"

Structure:
1. Why people look for alternatives
2. What to look for in an alternative (criteria)
3. List of 4-7 real alternatives (you first, but include genuine options)
4. Comparison table
5. Detailed breakdown of each
6. Recommendation by use case
7. CTA

**Important:** Include real alternatives. Being genuinely helpful builds trust and ranks better.

---

### Format 3: You vs [Competitor]
**Intent:** Direct comparison
**URL:** `/vs/[competitor]`
**Keywords:** "[You] vs [Competitor]"

Structure:
1. TL;DR (key differences in 2-3 sentences)
2. Comparison table (at-a-glance)
3. Detailed comparison: Features / Pricing / Support / UX / Integrations
4. Who you're best for
5. Who competitor is best for (be honest)
6. Testimonials from switchers
7. Migration support
8. CTA

---

### Format 4: [Competitor A] vs [Competitor B]
**Intent:** User comparing two competitors, not you
**URL:** `/compare/[a]-vs-[b]`

Structure:
1. Overview of both
2. Category-by-category comparison
3. Who each is best for
4. "The third option" — introduce yourself
5. Three-way comparison table
6. CTA

---

## Core Principles

**Honesty builds trust.** Acknowledge competitor strengths. Be accurate about your limitations. Readers will verify.

**Depth over surface.** Go beyond feature checklists. Explain *why* differences matter in real scenarios.

**Help them decide.** Be explicit about who each tool is best for. Reduce evaluation friction.

---

## Essential Sections for Every Page

**TL;DR Summary** — 2-3 sentences. Key differences at a glance. Start every page with this.

**Feature Comparison Table** — Side-by-side. Include pricing tier breakdown. Flag hidden costs.

**Migration Section** — What transfers automatically, what needs manual work, support offered, timeline.

**Social Proof** — Testimonials specifically from people who switched. With specific results.

---

## Research Process

For each competitor:
1. Sign up and use the product
2. Document features, UX, limitations
3. Mine G2 / Capterra / Trustpilot for common complaints
4. Check their pricing page monthly (it changes)
5. Read their comparison pages (see what they claim)

---

## SEO

- Internal link between all competitor pages
- Create hub page: `/alternatives/` linking to all
- FAQ schema for "What is the best alternative to [Competitor]?"
- Update pages when competitor changes pricing or features

## Self-Check

Before presenting output, verify:
- [ ] Correct format selected (singular alternative / plural alternatives / vs page / competitor-vs-competitor)
- [ ] Comparison table covers ≥5 meaningful differences — not just feature checkboxes
- [ ] Tone is honest and neutral — competitor strengths are acknowledged where they exist
- [ ] Migration section is included (required for Format 1 and Format 3)
- [ ] TL;DR summary is present at the top of the page
- [ ] product-marketing-context.md was loaded if it exists — competitive landscape section used

If any check fails → fix it before presenting.
