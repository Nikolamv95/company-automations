# /product-context

Create or update the `product-marketing-context.md` file for a product.

This file is the shared context that all copy skills load before writing. Create it once, update it when positioning or messaging changes.

## Usage

```
/product-context "Brand Name" "Product Name"   → create or update context file
/product-context "Brand Name" "Product Name" --auto  → auto-draft from existing output files
```

---

## Step 0: Brand Detection

1. **Identify brand:** If brand name is in the command → proceed. If not clear → ask: "For which brand is this?"
2. **Load `projects/{brand}/brand.md`** if it exists — apply voice, tone, and restrictions
3. **Check for existing files** in `output/{brand}/{product}/research/`:
   - If `product-marketing-context.md` exists → show current sections, ask which need updating
   - If `04_master_doc.md` or `03_avatar.md` exist → offer to auto-draft from them (`--auto`)

---

## Flow

1. Execute `skills/research/product-marketing-context/SKILL.md` directly
2. Use `--auto` mode if pipeline output files exist: auto-draft all 12 sections from `04_master_doc.md` + `03_avatar.md` + `06_desire_validation.md`
3. Otherwise: gather information conversationally, section by section
4. Save to `output/{brand}/{product}/research/product-marketing-context.md`
5. Confirm: "Context file saved. All copy skills will now load this automatically."
