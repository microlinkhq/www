---
title: 'PDF file to HTML'
description: 'Use Microlink API to read a direct PDF file URL and return extracted HTML markup, either inside JSON or as a direct HTML response.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

When the source URL points directly to a PDF file, Microlink can still expose an HTML DOM for extraction. Request `attr: 'html'` to return the converted markup.

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://cdn.microlink.io/file-examples/sample.pdf',
    data: {
      html: {
        attr: 'html'
      }
    },
    meta: false
  }}
/>

<Figcaption>Read the converted PDF markup from <code>data.html</code>.</Figcaption>

## Return HTML directly

Add `embed: 'html'` when the API URL should return HTML:

<MultiCodeEditorInteractive
  height={320}
  mqlCode={{
    url: 'https://cdn.microlink.io/file-examples/sample.pdf',
    data: {
      html: {
        attr: 'html'
      }
    },
    meta: false,
    embed: 'html'
  }}
/>

<Figcaption>The response body is HTML and can be stored, sanitized, or transformed by your own pipeline.</Figcaption>

The same request as a raw URL:

```bash
https://api.microlink.io?url=https://cdn.microlink.io/file-examples/sample.pdf&data.html.attr=html&meta=false&embed=html
```

## Extract just the body

If your consumer wants an embeddable fragment instead of the full HTML document, scope the rule to the body:

<MultiCodeEditorInteractive
  height={320}
  mqlCode={{
    url: 'https://cdn.microlink.io/file-examples/sample.pdf',
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

## Know the PDF limit

This works best for PDFs with selectable text. Image-only scans may produce little useful HTML because there is no meaningful text layer to convert.

## Next step

Use <Link href='/docs/guides/content-conversion/pdf-url-to-markdown' children='PDF file to Markdown' /> when the consumer is an LLM, search index, or Markdown-native system. Use <Link href='/docs/guides/content-conversion/url-to-html' children='Web page to HTML' /> for web pages.
