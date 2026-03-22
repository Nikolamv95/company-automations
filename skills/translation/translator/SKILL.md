---
name: translator
version: 1.0.0
description: "Translate direct-response marketing copy while preserving conversion mechanics. Use when the user wants to translate copy, files, or text to another language. Triggers on: translate, translation, Bulgarian, German, French, Spanish, Italian, Portuguese, Romanian, Polish, Czech, Hungarian, переведи, превод."
---

# Translator

Translate direct-response marketing copy while preserving all conversion mechanics. A translated hook must still stop the reader. A translated CTA must still feel urgent.

## Brand Context

Voice, tone, formality level, and channel restrictions come from `projects/{brand}/brand.md`.
Load it before translating. If brand.md doesn't exist for this brand, use system defaults.
Note: some brands require formal register ("Вие" in Bulgarian), others casual ("ти") — brand.md specifies this.

## Translation Principles

**Preserve conversion mechanics:**
- Emotional intensity must survive translation — a fear hook must still feel like fear
- Rhetorical questions must still create engagement
- Urgency language must still feel urgent, not stiff
- Reading level must stay at 5th grade equivalent in the target language

**Do NOT translate:**
- Brand names and product names — keep in English
- Section labels: `[HOOK]`, `[PAUSE]`, `[VISUAL:]`, `[Sweep 1]`, etc.
- Placeholder patterns: `{product_name}`, `{avatar_name}`, `{price}`
- Technical acronyms the audience uses (e.g., "CTA", "VSL", "ROI")
- URLs

**Adapt, don't translate literally:**
- Idioms that don't work in the target language → find the equivalent idiom
- Cultural references that won't land → find a culturally relevant substitute
- Numbers and formats → use local convention (decimal separators, date formats)

## Output Format

- Save translated files as `{original_filename}_{language_code}.md`
  - Example: `07_hooks_bg.md` for Bulgarian
- Preserve all markdown formatting: headers, bold, bullet points, tables
- If a section doesn't translate cleanly, add a translator note:
  `[TRANSLATOR NOTE: The phrase "X" doesn't have a direct equivalent in {language}. Adapted as "Y" — consider A/B testing against "Z".]`

## Supported Language Codes

| Language | Code |
|----------|------|
| Bulgarian | bg |
| German | de |
| French | fr |
| Spanish | es |
| Italian | it |
| Portuguese | pt |
| Romanian | ro |
| Polish | pl |
| Czech | cs |
| Hungarian | hu |

For other languages, use ISO 639-1 codes.

## Self-Check

Before delivering translation:
- [ ] Headline re-read in target language — does it still stop the reader?
- [ ] CTA re-read — does it feel low-friction and clear in target language?
- [ ] Reading level appropriate for target language (5th grade equivalent)
- [ ] No brand/product names accidentally translated
- [ ] All markdown formatting preserved (headers, bold, bullets)
- [ ] Formality register matches brand.md specification (formal/casual)

If any check fails → fix it before delivering.
