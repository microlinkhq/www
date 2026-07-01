---
title: 'URL to Text'
description: 'Use Microlink API to convert any URL — a web page, a PDF, or a docx, xlsx, or pptx document — into readable plain text, either inside JSON or as a direct text response.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Use [attr](/docs/mql/data/attr) with `text` when your consumer needs readable plain text instead of Markdown structure or HTML markup. Point [url](/docs/api/parameters/url) at any source — a web page, a PDF file, or an office document — and Microlink returns the content as a string.

<MultiCodeEditorInteractive
  height={280}
  mqlCode={{
    url: 'https://example.com',
    data: {
      text: {
        attr: 'text'
      }
    },
    meta: false
  }}
/>

<Figcaption>Read the converted text from <code>data.text</code>.</Figcaption>

## Any source URL works the same way

The rule does not change with the source document. Microlink converts a PDF or office file to an HTML DOM at fetch time, then serializes it to text, so the same `attr: 'text'` request reads a `.pdf` or `.docx` file just like a web page:

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

<Figcaption>Swap the URL for a <code>.pdf</code>, <code>.xlsx</code>, or <code>.pptx</code> file and the request is identical.</Figcaption>

## Return text directly

Add [embed](/docs/api/parameters/embed) with `text` when the API URL itself should return plain text:

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://example.com',
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
https://api.microlink.io?url=https://example.com&data.text.attr=text&meta=false&embed=text
```

## Scope text extraction

For HTML pages, use a [selector](/docs/mql/data/selector) when the page has navigation, footers, or other text that should not be included:

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://microlink.io/docs/api/getting-started/overview',
    data: {
      text: {
        selector: 'main',
        attr: 'text'
      }
    },
    meta: false,
    embed: 'text'
  }}
/>

<Figcaption>Use <code>main</code>, <code>article</code>, or a page-specific selector to keep only the useful text.</Figcaption>

## Supported source formats

Any HTML page works. Direct file URLs are converted first: PDFs with a text layer, and the office formats `docx`, `xlsx`, `pptx`, `odt`, `rtf`, and `epub`. Image-only PDF scans, the legacy binary formats (`doc`, `xls`, `ppt`), and the OpenDocument spreadsheet and presentation formats (`ods`, `odp`) are not converted: the request still succeeds, but the field is left as the raw response instead of readable text.

## Choose text, Markdown, or HTML

| Need | Use |
|------|-----|
| The smallest readable body | `attr: 'text'` |
| Headings, links, lists, and tables | `attr: 'markdown'` |
| Markup for downstream parsing or rendering | `attr: 'html'` |

## Next step

Use <Link href='/docs/guides/content-conversion/url-to-markdown' children='URL to Markdown' /> when you need document structure, or <Link href='/docs/guides/content-conversion/url-to-html' children='URL to HTML' /> when you need markup.
