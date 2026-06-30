---
title: 'Web page to HTML'
description: 'Use Microlink API to fetch, render, and return HTML from a web page URL, either as JSON or as a direct HTML response.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Use `attr: 'html'` when your consumer needs markup instead of Markdown or plain text. Microlink can fetch the source document, optionally render it in a browser, and expose the resulting HTML through a `data` field.

<MultiCodeEditorInteractive
  height={280}
  mqlCode={{
    url: 'https://example.com',
    data: {
      html: {
        attr: 'html'
      }
    },
    meta: false
  }}
/>

<Figcaption>Read the HTML document from <code>data.html</code>.</Figcaption>

## Return HTML directly

Add `embed: 'html'` when the API URL itself should return HTML:

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://example.com',
    data: {
      html: {
        attr: 'html'
      }
    },
    meta: false,
    embed: 'html'
  }}
/>

<Figcaption>The response body is HTML and the content type is <code>text/html</code>.</Figcaption>

The same request as a raw URL:

```bash
https://api.microlink.io?url=https://example.com&data.html.attr=html&meta=false&embed=html
```

## Extract a fragment instead of the full document

Use a selector when you only need one part of the page:

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://microlink.io/docs/api/getting-started/overview',
    data: {
      html: {
        selector: 'main',
        attr: 'html'
      }
    },
    meta: false,
    embed: 'html'
  }}
/>

<Figcaption>With a selector, <code>attr: 'html'</code> returns the matched element HTML for the selected page region.</Figcaption>

## Render JavaScript pages

When the initial HTML is empty because the page is client-rendered, turn on browser rendering and wait for the content wrapper:

<MultiCodeEditorInteractive
  height={340}
  mqlCode={{
    url: 'https://microlink.io',
    data: {
      html: {
        selector: 'main',
        attr: 'html'
      }
    },
    prerender: true,
    waitForSelector: 'main',
    meta: false,
    embed: 'html'
  }}
/>

<Figcaption>Use <code>prerender</code> only when the page needs browser execution before HTML extraction.</Figcaption>

## Next step

Use <Link href='/docs/guides/data-extraction/page-preparation' children='Data extraction: Page preparation' /> for waits, clicks, scrolling, browser settings, and CSS cleanup. Use <Link href='/docs/guides/content-conversion/url-to-text' children='Web page to Text' /> when the consumer only needs readable text, or <Link href='/docs/guides/content-conversion/pdf-url-to-html' children='PDF file to HTML' /> when the source URL points directly to a PDF file.
