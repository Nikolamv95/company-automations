# /analyze

Analyze the company-automations codebase and produce a structured health report with improvement recommendations.

## Usage

```
/analyze                          → Full audit of all layers
/analyze gaps                     → What's in CLAUDE.md but not yet built
/analyze skills                   → Audit all SKILL.md files
/analyze agents                   → Audit all agents
/analyze commands                 → Audit all slash commands
/analyze mcp                      → Audit MCP servers and registry
/analyze dependencies             → Build agent → skill → command graph
/analyze roadmap                  → Priority-ranked improvement backlog
/analyze [specific area]          → Targeted analysis of any layer
```

## Execution

Execute `skills/system/codebase-analyzer/SKILL.md` directly. Pass the argument (if any) as the analysis mode.

**No brand detection needed** — this command analyzes system files, not brand copy.

## Flow

1. Determine analysis mode from argument or ask user
2. Read all relevant files per SKILL.md Inspection Targets
3. Apply SKILL.md Analysis Framework
4. Output structured report per SKILL.md Output Format
5. Run SKILL.md Self-Check before presenting
