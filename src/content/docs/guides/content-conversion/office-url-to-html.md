---
title: 'docx, xlsx, pptx to HTML'
description: 'Use Microlink API to read a direct docx, xlsx, pptx, odt, rtf, or epub URL and return extracted HTML markup, either inside JSON or as a direct HTML response.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

When the source URL points directly to a `docx`, `xlsx`, `pptx`, `odt`, `rtf`, or `epub` file, Microlink converts it to an HTML DOM for extraction. Request `attr: 'html'` to return the converted markup — an `xlsx` becomes an HTML table, a `docx` becomes headings and paragraphs.

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://cdn.microlink.io/file-examples/sample.docx',
    data: {
      html: {
        attr: 'html'
      }
    },
    meta: false
  }}
/>

<Figcaption>Read the converted document markup from <code>data.html</code>.</Figcaption>

## Return HTML directly

Add `embed: 'html'` when the API URL should return HTML:

<MultiCodeEditorInteractive
  height={320}
  mqlCode={{
    url: 'https://cdn.microlink.io/file-examples/sample.xlsx',
    data: {
      html: {
        attr: 'html'
      }
    },
    meta: false,
    embed: 'html'
  }}
/>

<Figcaption>A spreadsheet URL returns an HTML table your pipeline can store, sanitize, or transform.</Figcaption>

The same request as a raw URL:

```bash
https://api.microlink.io?url=https://cdn.microlink.io/file-examples/sample.docx&data.html.attr=html&meta=false&embed=html
```

## Extract just the body

If your consumer wants an embeddable fragment instead of the full HTML document, scope the rule to the body:

<MultiCodeEditorInteractive
  height={320}
  mqlCode={{
    url: 'https://cdn.microlink.io/file-examples/sample.docx',
    data: {
      html: {
        selector: 'body',
        attr: 'html'
      }
    },
    meta: false,
    embed: 'html'
  }}
/>

<Figcaption>Use the full document for archival or downstream parsing, and a body fragment for insertion into another page.</Figcaption>

## Supported formats

Conversion works for `docx`, `xlsx`, `pptx`, `odt`, `rtf`, and `epub`. The legacy binary formats (`doc`, `xls`, `ppt`) and OpenDocument spreadsheet and presentation formats (`ods`, `odp`) are not converted: the request still succeeds, but the field is left as the raw response instead of HTML markup.

## Next step

Use <Link href='/docs/guides/content-conversion/office-url-to-markdown' children='docx, xlsx, pptx to Markdown' /> when the consumer is an LLM, search index, or Markdown-native system. These documents can also be rendered with <Link href='/docs/guides/pdf' children='PDF' /> and <Link href='/docs/guides/screenshot' children='Screenshot' />.
