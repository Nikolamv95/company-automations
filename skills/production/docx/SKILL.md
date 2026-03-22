---
name: docx
version: 1.0.0
description: "Create, read, edit, or convert Word documents (.docx). Use when the user wants to generate a Word file, convert markdown to Word, or edit an existing .docx."
---

# Word Document (.docx) Skill

A `.docx` file is a ZIP archive containing XML files. You can create, read, edit, and convert them.

## Reading / Analyzing

```bash
# Extract text via pandoc
pandoc document.docx -t plain

# Unpack to inspect XML
mkdir doc_unpacked && cd doc_unpacked
unzip ../document.docx
# Edit word/document.xml then repack
```

## Creating New Documents

Use the `docx` npm library:

```bash
npm install -g docx
```

```javascript
const { Document, Paragraph, TextRun, HeadingLevel } = require('docx');

const doc = new Document({
  sections: [{
    properties: {
      page: { size: { width: 12240, height: 15840 } }  // US Letter in DXA
    },
    children: [
      new Paragraph({
        text: "Title",
        heading: HeadingLevel.HEADING_1
      }),
      new Paragraph({ children: [new TextRun("Body text")] })
    ]
  }]
});
```

## Critical Rules

| Rule | Correct | Wrong |
|------|---------|-------|
| Page size | Explicit DXA values | Rely on defaults |
| Table widths | Dual: columnWidths array + cell width | Single spec |
| Width units | DXA only | WidthType.PERCENTAGE (breaks Google Docs) |
| Bullet lists | `LevelFormat.BULLET` with numbering config | Unicode bullet chars |
| Smart quotes | XML entities `&#x201C;` `&#x201D;` | Straight quotes in XML |

## Editing Existing Documents

1. Unpack: `unzip document.docx -d unpacked/`
2. Edit: `unpacked/word/document.xml`
3. Repack: `cd unpacked && zip -r ../document_edited.docx .`
4. Validate: `python scripts/office/validate.py document_edited.docx`

## Converting Markdown → DOCX

```bash
pandoc input.md -o output.docx
# For styled output:
pandoc input.md -o output.docx --reference-doc=template.docx
```

## Tracked Changes

Use `<w:ins>` and `<w:del>` elements with author/date metadata in the XML.

## Dependencies

- `pandoc` — text extraction and conversion
- `docx` npm package — programmatic creation
- `LibreOffice` — PDF conversion
- `Poppler` — PDF utilities

## Self-Check

Before presenting output, verify:
- [ ] Page size uses explicit DXA values — not default reliance
- [ ] Table widths specify both columnWidths array and individual cell widths
- [ ] WidthType.PERCENTAGE is NOT used (breaks Google Docs compatibility)
- [ ] Bullet lists use LevelFormat.BULLET with numbering config — not Unicode bullet characters
- [ ] Smart quotes use XML entities (&#x201C; &#x201D;) — not straight quotes in XML
- [ ] If editing: file was unpacked, edited in XML, and repacked correctly

If any check fails → fix it before presenting.
