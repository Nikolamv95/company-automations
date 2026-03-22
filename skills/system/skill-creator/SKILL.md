---
name: skill-creator
version: 1.0.0
description: "Create, test, and refine a new Claude Code skill (SKILL.md file). Use when the user wants to build a new skill, improve an existing skill's description, or create reusable agent instructions."
---

# Skill Creator

## Core Workflow

1. **Intent Capture** — What should the skill do? When should it trigger? What's the expected output?
2. **Research** — Ask about edge cases, formats, success criteria, dependencies
3. **Write SKILL.md** — Metadata + instructions
4. **Test** — Run with and without skill enabled in parallel
5. **Evaluate** — Grade outputs, compare quality
6. **Iterate** — Improve based on results
7. **Optimize description** — Refine trigger accuracy

## SKILL.md Structure

```markdown
---
name: skill-name
version: 1.0.0
description: "When to use this skill. List trigger phrases users might say."
---

# Skill Title

## Purpose
One paragraph on what this skill does and why.

## [Main Section]
Instructions, rules, frameworks.

## Output Format
What the output should look like.
```

## Key Principles

**Progressive disclosure** — Skills load in 3 tiers:
1. Metadata only (`name` + `description`) — always in context
2. Full SKILL.md body — loads on trigger
3. Bundled resources (`scripts/`, `references/`) — loads when needed

**Keep under 500 lines.** Remove anything that isn't actively shaping output.

**Explain why, not just what.** "Write short sentences because 5th grade reading level converts better" beats "USE SHORT SENTENCES."

**Description is the trigger.** Write it as a list of exact phrases users might say. Test with should-trigger and should-not-trigger examples.

## Testing Protocol

Run the same prompt with and without the skill active. Compare outputs side by side. Focus on:
- Does the skill actually change behavior?
- Does the Self-Check catch issues before output is shown?
- Does the skill trigger correctly on its target phrases and NOT trigger on unrelated prompts?

## Description Optimization

Good description triggers:
```yaml
description: >
  Use when: user wants hooks, headlines, opening lines, attention grabbers.
  Triggers on: hooks, write hooks, give me hooks, ad opener, hook writing,
  headline ideas, opening line for ad.
```

Bad description (too abstract):
```yaml
description: "Helps with writing marketing content"
```

## Skill File Location

```
skills/
└── my-skill-name/
    ├── SKILL.md          ← required
    ├── references/       ← optional: reference docs
    └── scripts/          ← optional: helper scripts
```

---

## Templates to Follow

### New SKILL.md must include:

```markdown
---
name: skill-name
version: 1.0.0
description: "When to use. List trigger phrases."
---

# Skill Title

## Brand Context
Voice, tone, channel rules, and restrictions come from `projects/{brand}/brand.md`.
Load it before executing. If brand.md doesn't exist for this brand, use system defaults.

## [Main Rules Section]
Writing rules, frameworks, quality standards — this is the single source of truth.
Do NOT duplicate rules from another skill. Reference them instead.

## Output Format
Clear schema of what the output looks like.

## Self-Check
Before presenting output, verify:
- [ ] [assertion 1]
- [ ] [assertion 2]
- [ ] [assertion 3]
If any check fails → fix it before presenting.
```

Rules:
- **No brand-specific content** — brand context comes from `projects/{brand}/brand.md`
- **No duplication** — if a rule exists in another SKILL.md, reference it, don't copy it
- **Self-Check is required** — minimum 3 assertions Claude runs before showing output

---

### New agent.md must include:

```markdown
---
name: agent-name
description: "When to invoke this agent. List exact trigger phrases (BG + EN).
  Triggers: phrase1, phrase2, phrase3."
skills:
  - skills/{category}/{name}/SKILL.md
context:
  - projects/{brand}/brand.md
  - output/{product}/product-marketing-context.md  # include only if agent uses product context
---

# Agent Name
One sentence — what this agent does.

## Execution
Read all SKILL.md files listed in frontmatter. Follow their rules exactly.
Load context files listed in frontmatter before executing.

## Pipeline Mode  ← include only if agent runs in /deep-research
Input: [list input files]
Output: output/{product}/XX_name.md
Prompt file: prompts/XX_name.md  ← only for pipeline mode

## Standalone Mode
Ask only minimum required questions. Do NOT read prompts/ files.
Load projects/{brand}/brand.md if it exists.
```

Rules:
- **Frontmatter is required** — name, description with BG+EN triggers, skills, context
- **Orchestration only** — no writing rules in agent body (those live in SKILL.md)
- **Never reference `prompts/`** in standalone mode — only pipeline mode agents read prompts/
- **Description = discovery** — Claude finds this agent via its description triggers, not a routing table

---

### New command must include:

```markdown
# /command-name

## Usage
[usage examples]

## Step 0: Brand Detection
1. Identify brand from command or ask: "For which brand is this?"
2. Load `projects/{brand}/brand.md` if it exists
3. Pass brand context to every sub-agent or skill invoked

## [Flow steps]
[which agents are called, in what order, input → output]
```

Rules:
- **Brand detection is required** as Step 0 for any copy or research command
- **No writing rules** — commands coordinate flow, rules live in SKILL.md

---

## Self-Check

Before presenting a new skill, agent, or command:
- [ ] SKILL.md includes: Brand Context, Rules, Output Format, Self-Check (min 3 assertions)
- [ ] SKILL.md has `version` in frontmatter (start at `1.0.0`)
- [ ] Agent has frontmatter: name, description (BG+EN triggers), skills, context
- [ ] Agent is orchestration-only — no writing rules in body
- [ ] Command has Step 0 Brand Detection
- [ ] No brand-specific content in SKILL.md or agent
- [ ] No rules duplicated from another skill — reference instead
- [ ] Agent tested: should-trigger, should-not-trigger, brand context, self-check (see CONTRIBUTING.md)

If any check fails → revise before presenting.
