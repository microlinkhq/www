---
title: 'PDF file to Markdown'
description: 'Use Microlink API to read a direct PDF file URL and return its extracted content as Markdown for search, LLM, and document workflows.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Direct PDF file URLs use the same Markdown extraction rule as web pages. Set the PDF file URL as `url`, then request a Markdown field with `attr: 'markdown'`.

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://cdn.microlink.io/file-examples/sample.pdf',
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
    url: 'https://cdn.microlink.io/file-examples/sample.pdf',
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
https://api.microlink.io?url=https://cdn.microlink.io/file-examples/sample.pdf&data.markdown.attr=markdown&meta=false&embed=markdown
```

## Keep JSON when you need document metadata

Leave `embed` out when your application needs the normal response envelope:

```json
{
  "status": "success",
  "data": {
    "title": "sample.pdf",
    "url": "https://cdn.microlink.io/file-examples/sample.pdf",
    "markdown": "# Instructions for Adding Your Logo..."
  }
}
```

Set `meta: false` for the smallest payload. Keep metadata enabled when the title, publisher, image, or URL fields are useful to your indexer.

## Know the PDF limit

This works best for PDFs with an embedded text layer. If the PDF is only scanned images, the extracted Markdown can be sparse because there is little document text to serialize.

## Next step

Use <Link href='/docs/guides/content-conversion/pdf-url-to-html' children='PDF file to HTML' /> when you need markup instead. Use <Link href='/docs/guides/content-conversion/url-to-markdown' children='Web page to Markdown' /> for web pages.
