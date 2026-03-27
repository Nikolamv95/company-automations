# /edit-copy

Polish, improve, or review existing copy using a 7-sweep editing framework.

## Usage

```
/edit-copy                        → paste copy in next message
/edit-copy @output/{product}/07_hooks.md   → edit a specific file
/edit-copy --brand thegreenbear   → specify brand for voice rules
```

## Step 0: Brand Detection

1. Identify brand from command or ask: "For which brand is this copy?"
2. Load `projects/{brand}/brand.md` if it exists — apply voice, tone, and channel restrictions
3. Load `output/{product}/product-marketing-context.md` if it exists

## Flow

1. If no copy provided → ask: "Paste the copy to edit, or provide a file reference."
2. Execute `skills/copywriting/copy-editor/SKILL.md` directly (standalone skill-first dispatch)
3. Run the 7-sweep framework per `skills/copywriting/copy-editor/SKILL.md`
4. Present edited version with a brief change log (what changed and why)
