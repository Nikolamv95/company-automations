---
name: email-writer
version: 2.0.0
description: "Write email sequences and individual emails — welcome, promotional launch, re-engagement, post-purchase. Use when the user wants email sequences, individual emails, follow-up emails, nurture sequences, or automated email flows. Triggers on: email sequence, email copy, write emails, follow-up emails, welcome sequence, launch emails, nurture emails, re-engagement, onboarding emails, single email."
---

# Email Writer

Write direct-response email sequences and individual emails.

## Brand Context

Voice, tone, channel rules, and restrictions come from `projects/{brand}/brand.md`.
Load it before executing. If brand.md doesn't exist for this brand, use system defaults.

## References

Load before writing:
- `references/email-templates.md` — individual email templates with story arc, bridge, offer, and P.S.
- `references/deliverability.md` — spam words to avoid, send times, list hygiene rules

## Mode Detection

**PIPELINE MODE** — `output/{brand}/{product}/research/product-marketing-context.md` exists:
→ Load it. Use avatar, desires, brand voice, and proof points from the file.
→ Do NOT ask questions the file already answers.

**STANDALONE MODE** — no context file:
→ Before writing anything, ask for:
  1. Email type (welcome sequence / single email / launch / re-engagement / post-purchase)
  2. Product — what does it do, who is it for (2-3 sentences)
  3. Primary desire or pain (what does the avatar want / what are they frustrated by)
→ Do NOT invent demographics, product details, or desires. Wait for the answer.

---

## Four Sequence Types

> **P.S. is required in every email across all sequence types.** See Individual Email Structure for P.S. strategy and placement rules.

### Type 1 — Welcome / Indoctrination (3-5 emails, 7-10 days)

Goal: build relationship, establish beliefs, prime for purchase.

```
Email 1 (Day 0):  The story — who you are, why you care, the origin
Email 2 (Day 2):  The belief shift — challenge a common belief they hold
Email 3 (Day 4):  The proof — specific result + mechanism explanation
Email 4 (Day 6):  The enemy — name what's been working against them
Email 5 (Day 9):  Soft offer — introduce product as the logical next step
```

### Type 2 — Promotional Launch (5-7 emails, 7-10 days)

Goal: drive purchases during launch window.

```
Email 1 (Day 0):   Tease — "something big is coming"
Email 2 (Day 1):   Open cart — announce with full offer
Email 3 (Day 3):   Content/value — teach something related to product
Email 4 (Day 5):   Urgency 1 — reason why (deadline, bonus expiry)
Email 5 (Day 6):   Social proof — testimonials + results
Email 6 (Day 7):   Urgency 2 — 24 hours left
Email 7 (Day 7):   Last chance — cart closes tonight
```

### Type 3 — Re-Engagement (3 emails, 1 week)

Goal: reactivate cold subscribers.

```
Email 1: Pattern interrupt subject line + "We've missed you" + value
Email 2: Reason to return — new feature, new content, special offer
Email 3: Last chance — "Should we remove you from the list?"
```

### Type 4 — Post-Purchase Onboarding (3 emails, 7 days)

Goal: reduce refunds, increase activation, generate testimonials.

```
Email 1 (Day 0):  Celebrate — confirm purchase, set expectations, first step
Email 2 (Day 3):  Quick win — guide them to the first result
Email 3 (Day 7):  Next step — deepen usage, ask for feedback/testimonial
```

---

## Individual Email Structure

Every email follows this anatomy. Read `references/email-templates.md` for full templates.

```
SUBJECT LINE   ← 2-5 words, lowercase, curiosity or direct benefit
PREVIEW TEXT   ← 40-90 chars, extends subject without repeating it
─────────────────────────────────────────────────────
OPENING HOOK   ← first 1-2 sentences. Must earn the next line.
STORY BODY     ← situation → problem → discovery arc. Short paragraphs.
BRIDGE         ← connects story to offer. 1-2 sentences.
CTA            ← single, clear, hyperlinked. Repeat once at bottom.
P.S.           ← restate the strongest benefit, urgency, or reveal
─────────────────────────────────────────────────────
```

**P.S. strategy:** P.S. lines are read almost as often as the subject line — many people skim to P.S. first. Use it to:
- Restate the core desire or result in one punchy sentence
- Add or reinforce urgency ("Offer expires tonight at midnight")
- Reveal something not in the body ("P.S. This works even if you've tried X before")
- Never use P.S. for a new CTA — keep the single CTA consistent

---

## Subject Line Rules

- **2-5 words** — shorter outperforms longer
- **Lowercase** — looks internal, less like marketing
- **Curiosity or direct benefit** — not both in the same line
- Never start with the product name
- Test: would you open this if a friend sent it?

```
Good:  "i was wrong"  /  "23 lbs in 6 weeks"  /  "quick question"
Bad:   "Our Amazing New Product Launch!"  /  "Check out this incredible offer"
```

**Preview text rules:**
- 40-90 characters — most clients truncate after 90
- Never repeat the subject line word-for-word
- Extend the curiosity or add urgency
- If not set, email clients pull first body text — so write the opening hook accordingly

```
Subject:     "i was wrong about belly fat"
Preview:     "It wasn't calories. Here's what my doctor told me..."
```

---

## Body Copy Rules

- **NO** "Hope this finds you well" — start in the story or the point
- **One CTA per email** — never two competing actions
- Short paragraphs (1-3 sentences)
- 5th grade reading level
- Write as if to one specific person (the avatar)
- Follow-ups: new angle, resource, or insight every time — never just "following up"
- Avatar language — use the words they use, not marketing terms

### Length Guidelines
| Email Type | Length |
|-----------|--------|
| Promotional / offer | 150-300 words |
| Story / educational | 200-400 words |
| Follow-up / re-engagement | 50-150 words |
| Last chance | 75-150 words |

---

## Deliverability

Read `references/deliverability.md` for the full list. Key rules:

- Avoid spam trigger words (free, guarantee, act now, limited time, buy now)
- Plain text or minimal HTML — heavy design signals promotional
- Send from a named person ("Sarah from [Brand]") not a brand email
- Unsubscribe link must be present and working
- Never buy or rent lists — only send to opted-in subscribers

---

## Output Format

For each email or sequence, output:
- All emails numbered and dated (for sequences)
- Subject line + preview text for each
- Body copy with P.S. at end
- A/B test subject line variant for Email 1 and any key conversion email

## Self-Check

Before presenting output, verify:
- [ ] Subject line is 2-5 words and lowercase
- [ ] One CTA per email — no competing actions
- [ ] Opening does NOT start with "Hope this finds you well" or any filler
- [ ] Word count matches type (150-300 promo, 200-400 story, 50-150 follow-up)
- [ ] P.S. line included in each email
- [ ] A/B subject line variant provided for Email 1

If any check fails → fix it before presenting.
