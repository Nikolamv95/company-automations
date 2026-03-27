---
name: copywriter
version: 1.0.0
description: "Base direct-response copywriting principles. Automatically active for all copy tasks — hooks, ads, emails, landing pages, advertorials. Provides shared rules for reading level, voice, structure, and DR frameworks."
---

# Direct-Response Copywriting — Base Skill

These rules apply to ALL copy produced in this system. Every specialized copy skill (hook-writer, ad-copy-writer, advertorial-writer, email-writer, lp-writer, vsl-writer) inherits these principles.

## Brand Context

Voice, tone, channel rules, and restrictions come from `projects/{brand}/brand.md`.
Load it before executing. If brand.md doesn't exist for this brand, use system defaults.
Rules in brand.md override these system defaults.

## The Core Principle (Schwartz)

"The copywriter does not create desire. The desire already exists in the market. The copywriter channels that desire onto the specific product."

Never invent what the customer wants. Find it in the research. Use their exact language.

---

## Reading Level

**Target: 5th grade (Flesch-Kincaid 60-70)**

Rules:
- Sentences: 5-15 words average (max 20)
- Paragraphs: 1-3 sentences max
- Active voice always
- Syllables: prefer 1-2 syllable words over 3+
- "you" constantly — make it personal

**Test:** Would a smart 10-year-old understand this without a dictionary?

---

## Voice Rules

**Always:**
- Direct, confident, conversational
- Specific numbers and timeframes
- Customer's own language (from research, not marketing speak)
- "you" and "your" throughout
- Present tense for benefits ("you feel," not "you will feel")

**Never:**
- "innovative," "cutting-edge," "best-in-class," "synergy," "leverage"
- Corporate "we are excited to announce"
- Passive voice ("has been shown to" → "showed")
- Hedging ("might," "could possibly," "in some cases")
- Vague outcomes ("better health" → "drop 15 lbs in 6 weeks")

---

## Awareness Level → Copy Approach

Based on Eugene Schwartz's 5-stage awareness model:

| Level | State | Lead Copy With |
|-------|-------|---------------|
| 1 — Unaware | Don't know they have a problem | Dramatize the problem first |
| 2 — Problem Aware | Know problem, not solutions | Problem hook + "there's a reason why..." |
| 3 — Solution Aware | Know solutions, not yours | Mechanism hook — what makes yours different |
| 4 — Product Aware | Know you, haven't bought | Proof + objection handling + offer |
| 5 — Most Aware | Ready to buy | Direct offer, close fast |

**Always confirm awareness level from research before writing.**

---

## Universal Copy Structure

Every piece of copy follows some version of:

```
HOOK        → activates desire or fear (stops the scroll)
BRIDGE      → "if you've ever tried to X, you know how..."
PROBLEM     → amplify the pain (2-3 sentences)
MECHANISM   → what makes this different (tease before reveal)
PROOF       → one specific result or testimonial fragment
CTA         → single, clear, low-friction next step
```

Adjust depth per format — hooks are 6-20 words, advertorials are 900-1500 words.

---

## Proof Standards

- Specific beats vague: "23 lbs in 6 weeks" > "amazing results"
- Real names + real results where possible
- Testimonials should mirror the avatar's specific problem
- Data citations: name the source specifically

---

## Context File

Before any copy task:
1. Load `projects/{brand}/brand.md` if it exists (overrides system defaults)
2. Load `output/{brand}/{product}/research/product-marketing-context.md` if it exists
3. If desire validation exists (`06_desire_validation.md`), use that language — do not invent desires

## Natural Voice — All Languages

When writing copy in any language, apply these rules in addition to all general rules above:

**Word order — context before action**
Put the setting or subject first, then the action. In every language, the topic establishes itself before the verb arrives. Follow the natural speech rhythm of that language — do not impose English sentence structure onto other languages.
- ✅ BG: `При мен идват пациенти, които...`
- ❌ BG: `Идват при мен пациенти с...`

**Realistic speech — no theatrical fragments**
Short disconnected fragments are a copywriter trick that reads as artificial in any language. Real human voice describes the scene in full sentences — how a person would actually tell the story out loud.
- ✅ BG: `Отговорът в повечето случаи е объркване.`
- ❌ BG: `Питам ги. Мълчат.`

**Corrections are principles, not patches**
When a sentence is corrected, extract the rule behind it and rewrite all similar sentences in the entire text — do not only replace the corrected sentence.

---

## Self-Check

Before presenting any copy output, verify:
- [ ] 5th grade reading level — sentences average 5-15 words, max 20 per sentence
- [ ] "You" appears at least once per paragraph — copy speaks directly to the reader
- [ ] No banned words: "innovative," "cutting-edge," "best-in-class," "synergy," "leverage," "utilize"
- [ ] Product name does not appear in the hook or bridge — desire is established before the product is named
- [ ] Every proof claim is specific: a number, a name, a timeframe, or a named source
- [ ] Awareness level was confirmed from research — copy approach matches the confirmed level

If any check fails → fix it before presenting.
