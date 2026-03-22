---
name: frontend-design
version: 1.0.0
description: "Design and build distinctive, production-grade frontend UI. Use when the user wants to create a landing page, web page, HTML artifact, UI component, or any visual interface. Triggers on: landing page, build a page, design a page, create UI, make it look good, frontend, HTML page."
---

# Frontend Design

Build distinctive, production-grade interfaces. Avoid generic AI aesthetics.

## Before You Code

Establish context:
1. **Purpose** — what action should the page drive?
2. **Audience** — who is this for?
3. **Tone** — minimalist, bold, luxury, playful, authoritative?
4. **Constraints** — framework, existing brand colors, fonts?

Then commit to a **bold aesthetic direction** and execute it with precision.

## Typography

- Use characterful, distinctive fonts — not Inter, Roboto, or Open Sans as primary
- Pair a striking display font with a refined body font
- Load from Google Fonts or system fonts

```css
/* Example: authoritative + clean */
--font-display: 'Playfair Display', serif;
--font-body: 'Inter', sans-serif;
```

## Color Systems

Use CSS custom properties. Always define a cohesive palette:

```css
:root {
  --color-primary: #1a1a2e;
  --color-accent: #e94560;
  --color-background: #f8f7f4;
  --color-text: #2d2d2d;
  --color-muted: #6b7280;
}
```

## Layout & Composition

- Embrace asymmetry over predictable grids
- Use whitespace as a design element
- Strategic animations on high-impact moments only (hero, CTA hover)

## Landing Page Structure (for marketing use)

```html
<!-- Above fold: value prop + CTA in < 5 seconds -->
<section class="hero">
  <h1><!-- Primary headline --></h1>
  <p class="subhead"><!-- One sentence benefit --></p>
  <a class="cta-primary" href="#"><!-- Action verb + outcome --></a>
</section>

<!-- Social proof near top -->
<section class="proof-bar"><!-- Logos / numbers --></section>

<!-- Features/benefits -->
<section class="features"><!-- 3-4 key points --></section>

<!-- Testimonials -->
<section class="testimonials"><!-- Real quotes --></section>

<!-- Offer + CTA repeated -->
<section class="cta-section"><!-- Price / guarantee / CTA --></section>
```

## What to Avoid

- Generic gradients (blue-to-purple, orange-to-red)
- Predictable hero layout (centered text, stock photo)
- Overused font families as the only font
- Animations on every element
- Designs that look like every other AI-generated page

## Maximalist vs Minimalist

Both work. The key is **intentionality**:
- Maximalist: elaborate effects, rich textures, layered typography — execute fully
- Minimalist: extreme precision in spacing, one perfect font, restrained palette — no half-measures

## Self-Check

Before presenting output, verify:
- [ ] CSS custom properties (--color-*, --font-*) defined in :root before use
- [ ] Primary font is NOT Inter, Roboto, or Open Sans used alone — a distinctive display font is paired
- [ ] Value proposition is visible above the fold — headline + subhead + CTA in first viewport
- [ ] Mobile-first CSS used (min-width breakpoints) — not max-width
- [ ] No placeholder text or lorem ipsum in the final output
- [ ] A bold aesthetic direction was committed to — not a generic centered-text + stock-photo layout

If any check fails → fix it before presenting.
