---
name: codebase-analyzer
version: 1.0.0
description: >
  Use when: user wants to audit, analyze, review, or improve the codebase.
  Triggers on: analyze codebase, audit skills, review agents, what's missing,
  codebase health, check consistency, gap analysis, dependency map, what should I build next,
  improve the codebase, what to add next, workflow review.
---

# Codebase Analyzer

## Purpose

Inspect the full company-automations codebase — agents, skills, commands, prompts, MCPs, CLAUDE.md — and produce a structured health report with actionable improvement recommendations. This is the architect's view: what exists, what's missing, what's inconsistent, and what to build next.

---

## Analysis Modes

Choose based on user intent. Ask if unclear.

| Mode | When to use | Scope |
|------|-------------|-------|
| **Full Audit** | "analyze codebase" / "full review" | All layers |
| **Gap Analysis** | "what's missing" / "what should I build" | CLAUDE.md vs actual files |
| **Consistency Check** | "check naming" / "audit versions" | Frontmatter, naming conventions |
| **Dependency Map** | "how does X connect to Y" / "what uses this skill" | Agent → Skill → Command graph |
| **Targeted Analysis** | "review copywriting skills" / "check MCP setup" | Specific layer or category |
| **Improvement Roadmap** | "what to add next" / "how to expand" | Priority-ranked backlog |

---

## Inspection Targets

Read every file in each layer. Map what exists against what CLAUDE.md says should exist.

### Layer 1: Architecture Definition
- `CLAUDE.md` — source of truth for system design, pipeline, rules
- `agents/` — each agent's frontmatter: name, description, skills, context

### Layer 2: Skills
- `skills/***/SKILL.md` — frontmatter: name, version, description. Body: sections present
- Check: does every skill referenced in an agent's frontmatter actually exist?
- Check: does every skill have `version` + `Self-Check` section?

### Layer 3: Commands
- `.claude/commands/*.md` — does each command match a skill in the system guide?
- Check: does each command have a Step 0 Brand Detection (for copy/research commands)?

### Layer 4: Prompts
- `prompts/*.md` — 12 files for `/deep-research`. Are all 11 steps covered?
- Check: Steps 1–11 (including 11a and 11b)

### Layer 5: MCPs
- `.mcp.json` — which servers are registered?
- `servers/` — which server files exist?
- `servers/registry.md` — are all servers documented?
- Check: every MCP referenced in CLAUDE.md has a matching server file and registry entry

### Layer 6: Projects & Brands
- `projects/` — which brands exist? Does each have `brand.md`?
- `projects/_template/brand.md` — is the template up to date?

### Layer 7: Hooks
- `hooks/` — is the Stop hook configured and reading `.pipeline-state-*.json`?

---

## Analysis Framework

For each inspection target, apply these checks:

### Existence Check
> Does it exist where CLAUDE.md says it should?
- Missing file → flag as `[MISSING]`
- Extra file not referenced anywhere → flag as `[ORPHAN]`

### Completeness Check
> Does it have all required sections?

**SKILL.md required sections:** frontmatter (name, version, description), purpose, main rules, output format, self-check
**Agent required sections:** frontmatter (name, description with BG+EN triggers, skills, context), execution block
**Command required sections:** usage, step 0 brand detection (copy/research only), flow steps

### Consistency Check
> Does it follow naming and version conventions?
- Slug format: lowercase, hyphens (e.g., `hook-writer`, not `hookWriter`)
- Version: semver format `X.Y.Z`
- Description: triggers listed in both BG and EN (for agents)
- File location matches category in CLAUDE.md system overview

### Dependency Check
> Cross-reference agents ↔ skills ↔ commands
- Build a graph: `command → agent → skill`
- Find broken references (skill listed in agent but file missing)
- Find orphaned skills (exist but no agent references them)
- Find uncovered pipeline steps (step defined in CLAUDE.md but no prompt file)

### Quality Check
> Structural quality signals
- Self-Check section has minimum 3 assertions
- No rules duplicated across skills (reference instead)
- No brand-specific content in SKILL.md body
- SKILL.md body < 500 lines

---

## Output Format

Structure the report as follows. Use only the sections relevant to the mode requested.

```markdown
# Codebase Analysis Report
Date: {date}
Mode: {mode}

## Executive Summary
3-5 bullet points. What's healthy, what needs attention, what's the #1 priority.

## Layer Status

| Layer | Files Found | Issues |
|-------|-------------|--------|
| Agents | N | N missing, N orphaned |
| Skills | N | N missing self-check, N broken refs |
| Commands | N | N missing brand detection |
| Prompts | N/12 | N missing steps |
| MCPs | N | N unregistered |
| Projects/Brands | N | N incomplete brand.md |

## Issues Found

### [CRITICAL] — Breaks pipeline or produces wrong output
- Issue description + file path + what's missing

### [WARNING] — Inconsistency or quality gap
- Issue description + file path + recommended fix

### [INFO] — Minor, cosmetic, or future consideration
- Issue description

## Dependency Map
Agent → Skill → Command connections. Broken refs highlighted.

## Gap Analysis
What CLAUDE.md says should exist vs. what actually exists.
Each gap listed with: what's missing → which CLAUDE.md section references it → priority.

## Improvement Roadmap
Priority-ranked list of what to build or fix next.

| Priority | Action | Effort | Impact | Rationale |
|----------|--------|--------|--------|-----------|
| 1 | Build X skill | Low | High | Referenced in 3 agents but missing |
| 2 | Add self-check to Y | Low | Medium | Quality gate missing |
| ... | | | | |

## Skills Inventory
Full list of all skills with version and status.

| Skill | Version | Self-Check | Refs | Status |
|-------|---------|------------|------|--------|
```

---

## Improvement Recommendation Rules

When suggesting what to build next, score each item:

**Impact score (1–5):**
- 5 = blocks pipeline or produces wrong output
- 4 = referenced by multiple agents but missing
- 3 = quality gap in frequently used skill
- 2 = inconsistency (naming, version, format)
- 1 = cosmetic or future-proofing

**Effort score (1–5):**
- 1 = add a section to existing file
- 2 = write a new SKILL.md (~100 lines)
- 3 = write SKILL.md + agent + command
- 4 = build new MCP server or integration
- 5 = redesign existing architecture

**Priority = Impact ÷ Effort** — highest ratio first.

Always include rationale: why this matters now, what it unblocks.

---

## Self-Check

Before presenting the report:
- [ ] Every agent in `agents/` was read and checked against CLAUDE.md agent assignments
- [ ] Every SKILL.md file was read and checked for: version, self-check section, and whether any agent references it
- [ ] Every command in `.claude/commands/` was cross-checked against CLAUDE.md commands table
- [ ] All 12 prompt files were verified (Steps 1–11 including 11a and 11b)
- [ ] `.mcp.json` was read and both servers verified against `servers/` directory
- [ ] Improvement roadmap items are ranked by Impact ÷ Effort, not added arbitrarily
- [ ] No invented issues — every flagged item has a file path or CLAUDE.md reference to support it
If any check fails → re-read the relevant files before presenting.
