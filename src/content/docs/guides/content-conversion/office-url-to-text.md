---
title: 'docx, xlsx, pptx to Text'
description: 'Use Microlink API to convert a direct docx, xlsx, pptx, odt, rtf, or epub URL into readable plain text, either inside JSON or as a direct text response.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Use `attr: 'text'` when your consumer needs readable plain text instead of Markdown structure or HTML markup. Point `url` at a `docx`, `xlsx`, `pptx`, `odt`, `rtf`, or `epub` file and Microlink converts it, returning its content as a string.

<MultiCodeEditorInteractive
  height={280}
  mqlCode={{
    url: 'https://cdn.microlink.io/file-examples/sample.docx',
    data: {
      text: {
        attr: 'text'
      }
    },
    meta: false
  }}
/>

<Figcaption>Read the converted text from <code>data.text</code>.</Figcaption>

## Return text directly

Add `embed: 'text'` when the API URL itself should return plain text:

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://cdn.microlink.io/file-examples/sample.docx',
    data: {
      text: {
        attr: 'text'
      }
    },
    meta: false,
    embed: 'text'
  }}
/>

<Figcaption>The response body is plain text and the content type is <code>text/plain</code>.</Figcaption>

The same request as a raw URL:

```bash
https://api.microlink.io?url=https://cdn.microlink.io/file-examples/sample.docx&data.text.attr=text&meta=false&embed=text
```

## Supported formats

Conversion works for `docx`, `xlsx`, `pptx`, `odt`, `rtf`, and `epub`. The legacy binary formats (`doc`, `xls`, `ppt`) and OpenDocument spreadsheet and presentation formats (`ods`, `odp`) are not converted: the request still succeeds, but the field is left as the raw response instead of readable text.

## Choose text, Markdown, or HTML

| Need | Use |
|------|-----|
| The smallest readable body | `attr: 'text'` |
| Headings, links, lists, and tables | `attr: 'markdown'` |
| Markup for downstream parsing or rendering | `attr: 'html'` |

## Next step

Use <Link href='/docs/guides/content-conversion/office-url-to-markdown' children='docx, xlsx, pptx to Markdown' /> when you need document structure, or <Link href='/docs/guides/content-conversion/office-url-to-html' children='docx, xlsx, pptx to HTML' /> when you need markup.
