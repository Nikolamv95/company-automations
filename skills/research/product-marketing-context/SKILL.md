---
name: product-marketing-context
version: 1.0.0
description: "Create or update a foundational product marketing document. Use when the user wants to define positioning, target audience, messaging, differentiation, or brand voice. Triggers on: product context, marketing brief, positioning, who is the customer, brand voice, ICP, ideal customer, create context file."
---

# Product Marketing Context

Creates and maintains `output/{product}/product-marketing-context.md` — the single source of truth for all marketing work on this product. All other marketing skills read this file first.

## Workflow

### Step 1 — Check for Existing Context
Look for `output/{product}/product-marketing-context.md`. If it exists:
- Show current sections
- Ask: "Which sections need updating?"
- Update only those sections

### Step 2 — Gather Information

Two approaches:

**Auto-draft** (if codebase/landing page available):
- Read README, landing page copy, pricing page
- Draft all 12 sections from what exists
- Ask user to validate each section

**Conversational** (from scratch):
- Ask section by section
- Request specific examples for each answer
- Skip sections that don't apply

### Step 3 — Create the Document

Save to `output/{product}/product-marketing-context.md`:

```markdown
# Product Marketing Context: [Product Name]

## Product Overview
[What it does, core use case, one-sentence positioning]

## Target Audience
[Who buys this — specific, not "small businesses"]

## Customer Personas
[2-3 named personas with role, goals, frustrations]

## Problems & Pain Points
[Specific problems in customer language — from reviews, support, forums]

## Competitive Landscape
[Direct competitors, their positioning, their weaknesses]

## Differentiation
[What you do that they don't — mechanistic, not vague]

## Objections & Anti-Personas
[Top 3 objections + how to handle. Who is NOT a good customer.]

## Switching Dynamics
[What triggers someone to switch FROM a competitor TO you]

## Customer Language
[Verbatim phrases from real customers — forums, reviews, support tickets]

## Brand Voice
[Tone, style, what to say/avoid. Examples of on-brand vs off-brand sentences.]

## Proof Points
[Specific results, testimonials, data points — with numbers]

## Business Goals
[Current focus: acquisition / retention / expansion. Key metrics.]
```

## Core Philosophy

**Customer language beats polished descriptions.**
"I was sick of feeling bloated every afternoon" > "Digestive health improvement solution."

Ask for specific examples. Validate section by section. Do not invent — only document what's real.

## How Other Skills Use This File

Every marketing skill checks for this file first:
- `researcher` — avoids re-deriving established facts
- `strategist` — uses customer language for desire extraction
- `copywriter` — uses brand voice and proof points
- `competitor-alternatives` — uses competitive landscape section
