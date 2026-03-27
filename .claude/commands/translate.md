# /translate

Translate output files or raw text to a target language.

## Usage

```
/translate Bulgarian "Product Name"
/translate Bulgarian "Brand Name" "Product Name"
/translate Bulgarian @output/ProductName/07_hooks.md
/translate Bulgarian --text "Your copy here"
```

---

## Step 0: Brand Detection

Before translating:

1. **Identify brand:** If brand name is in the command → proceed. If not clear → ask: "For which brand is this?"
2. **Load `projects/{brand}/brand.md`** if it exists — apply tone, voice, and any channel-specific restrictions to the translated output
3. If no brand context is available → translate using system defaults

---

## Mode 1: Product file selection

`/translate {language} "Product Name"`

1. List all `.md` files in `output/{brand}/{product}/research/`
2. Show numbered list — ask user to select files (comma-separated numbers, or "all")
3. For each selected file:
   - Translate preserving markdown formatting
   - Save as `output/{brand}/{product}/research/{filename}_{language_code}.md`
   - e.g. `07_hooks_bg.md` for Bulgarian

---

## Mode 2: Specific files

`/translate {language} @file1.md @file2.md`

Translate each listed file directly. Save alongside original with language suffix.

---

## Mode 3: Raw text

`/translate {language} --text "..."`

Translate the provided text. Print result to console. Do not save to disk.

---

→ For all translation rules, language codes, and quality standards: read `skills/translation/translator/SKILL.md`
