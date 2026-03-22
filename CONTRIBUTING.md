# Contributing

Architecture standards for extending the system.

## System Workflow

```
Research → Strategy → Copywriting → Production → Analysis → Translation
```

---

## Adding a New Agent + Skill

**2 files. 0 edits to existing files.**

1. Create `skills/{category}/{name}/SKILL.md`
   - Use `skills/system/skill-creator/SKILL.md` → "Templates to Follow" for the exact template
   - Must include: Brand Context, Rules, Output Format, Self-Check (min 3 assertions)
   - No brand-specific content — that comes from `projects/{brand}/brand.md`
   - No duplication — if a rule exists in another skill, reference it

2. Create `agents/{name}.md` with frontmatter:
   ```yaml
   ---
   name: agent-name
   description: "When to invoke. Trigger phrases (BG + EN).
     Triggers: phrase1, phrase2, phrase3."
   skills:
     - skills/{category}/{name}/SKILL.md
   context:
     - projects/{brand}/brand.md
     - output/{product}/product-marketing-context.md  # include only if relevant
   ---
   ```
   - Orchestration only — no writing rules in the agent body
   - Include Pipeline Mode (if used in `/deep-research`) and Standalone Mode
   - Standalone mode must NOT read from `prompts/`

Done. The agent is now discoverable via its `description` frontmatter field.

---

## Testing a New Agent Before Use

Run these 4 checks before using in production:

1. **Should-trigger:** Send a request matching the agent's description triggers.
   Expected: correct agent selected, output in correct format.

2. **Should-not-trigger:** Send a request for a different agent type.
   Expected: different agent selected, not this one.

3. **Brand context:** Run with a brand that has `projects/{brand}/brand.md`.
   Expected: brand voice and restrictions applied correctly.

4. **Self-Check:** Verify the SKILL.md Self-Check catches intentionally bad output
   (e.g., marketing jargon, sentences over 20 words, wrong reading level).

If any check fails → fix the agent `description` or SKILL.md before using.

---

## Updating Existing Skills

**Specialized skill** (hook-writer, email-writer, etc.):
- Edit the SKILL.md
- Bump version: patch `1.0.0 → 1.0.1` for fixes, minor `1.0.0 → 1.1.0` for new rules
- Only this agent is affected. Done.

**Base skill** (`skills/copywriting/copywriter/SKILL.md`):
- Edit + bump version
- Review **all** skills in `skills/copywriting/` for conflicts with the change
- Update any specialized skill that contradicts the new base rule
- Add a comment to the base skill: `<!-- Changed v1.x.x: [what changed] -->`

**Rule: every SKILL.md edit requires a version bump. No exceptions.**
This keeps `output/{product}/skill-versions.md` meaningful.

### prompts/ ↔ SKILL.md sync

`/deep-research` uses `prompts/` execution templates. `/write-copy` uses `SKILL.md` directly.
**These are two separate instruction sets for the same agents — they must stay in sync.**

When you edit a SKILL.md that has a corresponding prompts/ file, update both:

| SKILL.md | prompts/ counterpart |
|----------|---------------------|
| skills/research/researcher/SKILL.md | prompts/01_awareness.md, 02_competitor.md, 03_avatar.md, 04_master_doc.md |
| skills/research/strategist/SKILL.md | prompts/05_desire_extraction.md, 06_desire_validation.md, 09_marketing_angles.md |
| skills/copywriting/hook-writer/SKILL.md | prompts/07_hooks.md |
| skills/copywriting/ad-copy-writer/SKILL.md | prompts/08_desire_testing.md, 10_angle_testing.md |
| skills/copywriting/advertorial-writer/SKILL.md | prompts/11a_advertorial_nightmare.md, 11b_advertorial_authority.md |

**If you skip this step, `/deep-research` and `/write-copy` will produce different results for the same product.**

---

## Adding a New Pipeline

**1 file. 0 edits to existing files.**

1. Copy `.claude/commands/_template-pipeline.md` → `.claude/commands/{name}.md`
2. Replace all `{placeholders}` with your pipeline's values
3. Delete the instruction block at the top

The template includes standard sections: Brand Detection, Intake, Batch execution,
Pipeline State (with error handling), Post-pipeline (Pinecone + Drive), Output Summary.
Do not remove or modify the Pipeline State and Post-Pipeline sections.

---

## Adding a New MCP Server

See `servers/registry.md` for the full guide (6 steps).

Summary:
1. Create `servers/{name}.js` (follow `pinecone-server.js` pattern)
2. Add to `.mcp.json`
3. Add env vars to `.env.example` + `.env`
4. Add entry to `servers/registry.md`
5. Add error handling in `CLAUDE.md` → MCP Server Error Handling
6. Restart Claude Code

---

## Adding a New Brand

```bash
cp -r projects/_template projects/my-brand
# Edit projects/my-brand/brand.md
```

Required fields: Brand name, Voice, Restrictions (write "none" if none).
Optional fields: everything else — system defaults apply when missing.

---

## Architectural Layers

| Layer | Contains | Does NOT contain |
|-------|----------|-----------------|
| `agents/*.md` | Frontmatter (description, skills, context), orchestration, mode detection | Writing rules |
| `skills/*/SKILL.md` | Writing rules, quality standards — single source of truth | Brand-specific content |
| `commands/*.md` | Flow coordination, brand detection, pipeline steps | Writing rules |
| `projects/{brand}/brand.md` | Voice, tone, restrictions, channels | Pipeline outputs |
| `prompts/*.md` | Execution templates — only for `/deep-research` | Everything else |
| `servers/*.js` | MCP tool implementations | Business logic |
