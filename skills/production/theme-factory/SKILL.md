---
name: theme-factory
version: 1.0.0
description: "Apply a visual theme to a document, slide deck, landing page, or HTML artifact. Use when the user wants to style something, apply a color scheme, pick fonts, or make content look polished and professional."
---

# Theme Factory

Apply professionally curated font + color combinations to any artifact.

## Workflow

1. Show theme options (or describe them)
2. User picks a theme
3. Confirm selection
4. Apply theme's CSS variables and font imports throughout the artifact

## Available Themes

| Theme | Mood | Colors | Fonts |
|-------|------|--------|-------|
| **Ocean Depths** | Professional, trustworthy | Deep navy, teal, white | Merriweather + Source Sans |
| **Midnight Galaxy** | Dramatic, premium | Near-black, purple accent, silver | Playfair Display + Raleway |
| **Forest Path** | Organic, calm | Deep green, warm beige, earth | Lora + Nunito |
| **Solar Minimal** | Clean, confident | Warm white, amber, dark grey | Space Grotesk + Inter |
| **Crimson Authority** | Bold, decisive | Deep red, charcoal, cream | Bebas Neue + Georgia |
| **Arctic Clarity** | Fresh, modern | Ice blue, white, slate | Outfit + Source Serif |
| **Golden Hour** | Warm, aspirational | Gold, warm brown, ivory | Cormorant + Montserrat |
| **Midnight Executive** | Serious, premium | Black, gold accent, white | DM Serif Display + DM Sans |
| **Sage & Stone** | Natural, trustworthy | Sage green, stone grey, cream | Libre Baskerville + Nunito Sans |
| **Electric Modern** | Dynamic, tech | Electric blue, near-black, white | Space Mono + Inter |

## Applying a Theme

```css
/* Example: Ocean Depths */
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Source+Sans+3:wght@400;600&display=swap');

:root {
  --font-display: 'Merriweather', serif;
  --font-body: 'Source Sans 3', sans-serif;
  --color-primary: #0a2342;
  --color-accent: #1a7fa8;
  --color-background: #ffffff;
  --color-text: #1a1a2e;
  --color-muted: #6b7280;
  --color-surface: #f0f7ff;
}
```

## Custom Theme

If no existing theme fits, create one based on:
- Brand colors provided
- Mood/audience description
- Existing visual identity

Follow the same structure as above themes (2 fonts + 6 color variables).

## Self-Check

Before presenting output, verify:
- [ ] Two fonts selected from different type classifications (e.g., serif display + sans-serif body)
- [ ] All 6 CSS color variables defined: --color-primary, --color-accent, --color-background, --color-text, --color-muted, --color-surface
- [ ] Google Fonts @import included if using web fonts (not just the font name)
- [ ] Theme applied to the correct artifact type (CSS variables for HTML, paragraph styles for DOCX, theme settings for Slides)
- [ ] Text color contrasts sufficiently against background color for readability

If any check fails → fix it before presenting.
