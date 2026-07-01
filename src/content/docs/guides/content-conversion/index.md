---
title: 'Content conversion'
description: 'Convert any URL — a web page, a PDF, a docx, xlsx, or pptx document, or a JSON endpoint — into text, Markdown, HTML, or structured JSON with Microlink API.'
---

import { Link } from 'components/elements/Link'

Point [url](/docs/api/parameters/url) at anything and pick the output with [attr](/docs/mql/data/attr). Documents are converted to an HTML DOM at fetch time, so the same rule reads a PDF or `.docx` just like a web page.

## Supported source formats

| Type | Extension |
|------|-----------|
| Web page | `html` |
| PDF | `pdf` |
| Word document | `docx` |
| Spreadsheet | `xlsx` |
| Presentation | `pptx` |
| OpenDocument text | `odt` |
| Rich text | `rtf` |
| Ebook | `epub` |
| JSON endpoint | `json` |

## Choose the output

| Output | attr | Guide |
|--------|--------|-------|
| Plain text | `text` | <Link href='/docs/guides/content-conversion/url-to-text' children='URL to Text' /> |
| Markdown | `markdown` | <Link href='/docs/guides/content-conversion/url-to-markdown' children='URL to Markdown' /> |
| HTML | `html` | <Link href='/docs/guides/content-conversion/url-to-html' children='URL to HTML' /> |
| Structured JSON | `json` | <Link href='/docs/guides/content-conversion/json-endpoint-to-json' children='JSON endpoint to JSON' /> |

Each guide shows the same recipe across a web page, a PDF, and an office document.

## The shared pattern

```js
{
  url: 'https://example.com',
  data: {
    content: {
      attr: 'markdown'
    }
  },
  meta: false
}
```

Rename `content` to whatever your app expects, and switch `attr` to change the output. By default the field comes back inside a JSON envelope:

```json
{
  "status": "success",
  "data": {
    "content": "# Example Domain\n\nThis domain is for use..."
  }
}
```

Add [embed](/docs/api/parameters/embed) with the field name to return the converted body directly instead:

```js
{
  url: 'https://example.com',
  data: {
    content: {
      attr: 'markdown'
    }
  },
  meta: false,
  embed: 'content'
}
```

## Go deeper

- <Link href='/docs/guides/data-extraction' children='Data extraction' /> for selectors, scoping, nested fields, collections, typed values, and browser-side evaluation.
- <Link href='/docs/guides/common/private-pages' children='Private pages' /> for cookies, authorization headers, and server-side proxying.
