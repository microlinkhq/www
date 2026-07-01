---
title: 'docx, xlsx, pptx to Markdown'
description: 'Use Microlink API to read a direct docx, xlsx, pptx, odt, rtf, or epub URL and return its content as Markdown for search, LLM, and document workflows.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

A `docx`, `xlsx`, `pptx`, `odt`, `rtf`, or `epub` URL uses the same Markdown extraction rule as web pages and PDF files. Set the document URL as `url`, then request a Markdown field with `attr: 'markdown'`. Microlink converts the document to HTML at fetch time, so a `.docx`, `.xlsx`, or `.pptx` file becomes readable Markdown.

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://cdn.microlink.io/file-examples/sample.docx',
    data: {
      markdown: {
        attr: 'markdown'
      }
    },
    meta: false
  }}
/>

<Figcaption>Read the extracted document text from <code>data.markdown</code>.</Figcaption>

## Return Markdown directly

Add `embed: 'markdown'` when the API URL should behave like a Markdown file:

<MultiCodeEditorInteractive
  height={320}
  mqlCode={{
    url: 'https://cdn.microlink.io/file-examples/sample.docx',
    data: {
      markdown: {
        attr: 'markdown'
      }
    },
    meta: false,
    embed: 'markdown'
  }}
/>

<Figcaption>The response body is Markdown, so a worker, crawler, or LLM pipeline can consume it without unpacking JSON.</Figcaption>

The same request as a raw URL:

```bash
https://api.microlink.io?url=https://cdn.microlink.io/file-examples/sample.docx&data.markdown.attr=markdown&meta=false&embed=markdown
```

## Supported formats

Conversion works for the modern office formats Microlink reads natively:

| Format | Extensions |
|--------|------------|
| Word | `docx` |
| Excel | `xlsx` |
| PowerPoint | `pptx` |
| OpenDocument Text | `odt` |
| Rich Text | `rtf` |
| EPUB | `epub` |

The legacy binary formats (`doc`, `xls`, `ppt`) and OpenDocument spreadsheet and presentation formats (`ods`, `odp`) are not converted: the request still succeeds, but the field is left as the raw response instead of readable Markdown.

## Keep JSON when you need document metadata

Leave `embed` out when your application needs the normal response envelope:

```json
{
  "status": "success",
  "data": {
    "title": "sample.docx",
    "url": "https://cdn.microlink.io/file-examples/sample.docx",
    "markdown": "# Demonstration of DOCX support..."
  }
}
```

Set `meta: false` for the smallest payload. Keep metadata enabled when the title or URL fields are useful to your indexer.

## Next step

Use <Link href='/docs/guides/content-conversion/office-url-to-html' children='docx, xlsx, pptx to HTML' /> when you need markup, or <Link href='/docs/guides/content-conversion/office-url-to-text' children='docx, xlsx, pptx to Text' /> for the smallest readable body.
