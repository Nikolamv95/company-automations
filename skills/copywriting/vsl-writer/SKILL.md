---
name: vsl-writer
version: 2.0.0
description: "Write video ad scripts for Facebook, TikTok, YouTube, and Instagram. Covers all paid video ad formats: 6s bumper, 15s, 30s, 60s, 3-min, and long-form VSL (10min+). Use when the user wants a video ad script, VSL script, TikTok ad, Facebook video ad, YouTube pre-roll, Instagram Reel ad, or any spoken video copy. Triggers on: video ad script, VSL, video sales letter, Facebook video ad, TikTok ad script, YouTube ad, Instagram Reel ad, video script, UGC script."
---

# VSL & Video Ad Writer

Write spoken video scripts for paid advertising across Facebook, TikTok, YouTube, and Instagram.

## Brand Context

Voice, tone, channel rules, and restrictions come from `projects/{brand}/brand.md`.
Load it before executing. If brand.md doesn't exist for this brand, use system defaults.

## References

Load before writing:
- `references/ad-formats.md` — full script templates for each platform and length
- `references/hook-bank.md` — hook formulas by platform, awareness level, and format

---

## Mode Detection

**PIPELINE MODE** — `output/{brand}/{product}/research/product-marketing-context.md` exists:
→ Load it. Use avatar, desires, proof points, and awareness level from the file.
→ Do NOT ask questions the file already answers.

**STANDALONE MODE** — no context file:
→ Before writing anything, ask for:
  1. Platform + format (e.g., "Facebook 30s", "TikTok 15s", "YouTube pre-roll")
  2. Product — what does it do, who is it for (2-3 sentences)
  3. Primary desire or pain (what does the avatar want / what are they frustrated by)
  4. Awareness level (1–5)
→ Do NOT invent demographics, product details, or desires. Wait for the answer.

---

## Platform Selection Guide

| Platform | Best Format | Primary Goal | Audience Temperature |
|----------|-------------|--------------|---------------------|
| Facebook | 30s, 60s, 3–5min | DR conversion | Cold → warm |
| TikTok | 15s, 30s, 60s | Awareness + soft conversion | Cold (discovery) |
| YouTube | 6s bumper, 15s, 30s skippable | Awareness + retargeting | Cold → warm |
| Instagram | 15–30s Reels ad, 30–60s feed | Awareness + warm retargeting | Cold → warm |

---

## Core Principle: Muted-First Design

**Facebook, Instagram, TikTok:** Autoplay is muted by default.
- Design visuals and text overlays to carry the full message without sound
- Captions are mandatory — not optional
- The first 3 seconds must work with zero audio

**YouTube:** Viewer chose to watch — sound is on. Hook with spoken word immediately.

---

## Format Decision Tree

**Ask:** What platform? What length? What traffic temperature?

```
Facebook cold traffic  →  30s or 60s (pattern interrupt hook, problem, mechanism, CTA)
Facebook retargeting   →  60s or 3-5min (proof-heavy, overcome objections)
TikTok in-feed ad      →  15s or 30s (native feel, authentic, scroll-stop hook)
YouTube pre-roll       →  Must hook before 5-second skip — treat first 5s as a standalone ad
YouTube bumper         →  6 seconds max — single message only
Instagram Reels ad     →  15–30s (visual-first, text overlay heavy, native to platform)
Instagram feed video   →  30–60s (similar to Facebook but more visual)
Long-form VSL          →  3-min (warm/retargeting) or 10-min+ (landing page / conversion)
```

---

## Script Structure by Length

Read `references/ad-formats.md` for full templates. Summary:

### 6s Bumper (YouTube only — no skip)
```
[0-2s] Bold visual or text claim — must read before sound loads
[2-5s] Single benefit or result
[5-6s] Brand/CTA
```
Rule: One message only. No setup. No story.

### 15s (Facebook, TikTok, Instagram — cold traffic awareness)
```
[0-3s]   Pattern interrupt hook (spoken + visual)
[3-10s]  Problem or desire — visceral, 1 sentence
[10-14s] Mechanism tease or result tease
[14-15s] CTA (soft: "Learn more" or "Link in bio")
```

### 30s (Facebook, TikTok, YouTube — primary prospecting format)
```
[0-3s]   Hook — spoken + text overlay
[3-10s]  Problem — one specific pain point, story-style
[10-20s] Mechanism or proof — what makes this different
[20-28s] Social proof teaser (one result with numbers)
[28-30s] CTA — single action
```

### 60s (Facebook, Instagram — mid-funnel / retargeting)
```
[0-5s]   Hook — pattern interrupt
[5-20s]  Problem story — specific avatar moment
[20-35s] Failed attempts — validate the struggle
[35-50s] Mechanism — the discovery, one clear differentiator
[50-58s] Proof + guarantee
[58-60s] CTA
```

### 3-Minute (Facebook retargeting, landing page VSL — warm traffic)
```
[0-10s]   Hook — curiosity or fear
[10-45s]  Problem — story format, specific moment
[45-90s]  Failed attempts — they've tried X, here's why it failed
[90-120s] Mechanism — the discovery that changes everything
[120-165s] Proof — specific results with numbers
[165-180s] Offer + CTA — what they get, guarantee, next step
```

### 10-Minute VSL (Landing page — cold or warm conversion)
```
[0-30s]    Hook — bold claim + promise of revelation
[30s-2min] Problem story — visceral before state
[2-4min]   Failed attempts — "it's not your fault"
[4-6min]   The discovery — how mechanism was found (story)
[6-8min]   Mechanism explained — why it's different, how it works
[8-9min]   Proof — testimonials, results, clinical backing if any
[9-10min]  Offer + CTA — stack, price, guarantee, urgency
```

---

## Script Writing Rules

**Spoken rhythm — not written copy:**
```
Written:  "The primary mechanism by which cortisol drives fat accumulation..."
Spoken:   "Cortisol. [PAUSE] It's the reason the weight won't move. [PAUSE] And most diets make it worse."
```

- Average sentence: 5-10 words
- Fragments are intentional: "Gone. Just like that."
- Rhetorical questions create engagement: "Sound familiar?"
- Repetition lands points: "It's not your fault. It was never your fault."
- Never two complex ideas in one sentence — one idea, one sentence, full stop

**Pacing markers:**
```
[PAUSE]          — breath, let the line land
[SLOW DOWN]      — emphasize this phrase
[SPEED UP]       — transitional filler, pace through it
[CUT TO: X]      — edit instruction
[VISUAL: X]      — what appears on screen
[TEXT OVERLAY: X] — caption or graphic shown
[B-ROLL: X]      — suggested footage
```

---

## Awareness Level Adaptation

| Level | Ad Opening |
|-------|-----------|
| 1–2 | Open with the problem (they don't know solutions exist) |
| 3 | Open with "you've probably tried X — here's why it didn't work" |
| 4–5 | Open with proof or new mechanism — they know the category |

---

## Output Format

For each script, output:
- Platform and format clearly labeled (e.g., "Facebook 30s — Cold Traffic")
- Full script with timestamps and pacing markers
- [VISUAL] and [TEXT OVERLAY] suggestions throughout
- Three hook variants (test A/B/C on cold traffic)
- CTA variants: urgency-led, benefit-led, guarantee-led

> **Pacing markers** ([PAUSE], [SLOW DOWN], [SPEED UP], [CUT TO: X], [VISUAL: X], [TEXT OVERLAY: X], [B-ROLL: X]) are **included in the final script output**. They are production instructions for the director/editor — not internal notes. Every script must have them.

## Self-Check

Before presenting output, verify:
- [ ] Platform and format clearly labeled
- [ ] Timestamps included throughout the script
- [ ] Pacing markers ([PAUSE], [VISUAL], [TEXT OVERLAY]) present at key moments
- [ ] 3 opening hook variants included
- [ ] 3 CTA variants included (urgency-led, benefit-led, guarantee-led)
- [ ] Average sentence length is 5-10 words (spot check 5 random sentences)

If any check fails → fix it before presenting.
