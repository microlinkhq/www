---
title: 'URL to HTML'
description: 'Use Microlink API to fetch, render, and return HTML from any URL — a web page, a PDF, or a docx, xlsx, or pptx document — either as JSON or as a direct HTML response.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Use [attr](/docs/mql/data/attr) with `html` when your consumer needs markup instead of Markdown or plain text. Microlink can fetch the source document, optionally render it in a browser, and expose the resulting HTML through a [data](/docs/api/parameters/data) field.

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

## Any source URL works the same way

Direct file URLs are converted to an HTML DOM for extraction. Request `attr: 'html'` to return the converted markup: an `xlsx` becomes an HTML table, a `docx` becomes headings and paragraphs.

<MultiCodeEditorInteractive
  height={280}
  mqlCode={{
    url: 'https://cdn.microlink.io/file-examples/sample.xlsx',
    data: {
      html: {
        attr: 'html'
      }
    },
    meta: false
  }}
/>

<Figcaption>Swap the URL for a <code>.pdf</code>, <code>.docx</code>, or <code>.pptx</code> file and the request is identical.</Figcaption>

## Return HTML directly

Add [embed](/docs/api/parameters/embed) with `html` when the API URL itself should return HTML:

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

Use a [selector](/docs/mql/data/selector) when you only need one part of the page:

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

<Figcaption>Use <Link href='/docs/api/parameters/prerender' children='prerender' /> only when the page needs browser execution before HTML extraction.</Figcaption>

## Supported source formats

Any HTML page works. Direct file URLs are converted first: PDFs with a text layer, and the office formats `docx`, `xlsx`, `pptx`, `odt`, `rtf`, and `epub`. Image-only PDF scans, the legacy binary formats (`doc`, `xls`, `ppt`), and the OpenDocument spreadsheet and presentation formats (`ods`, `odp`) are not converted: the request still succeeds, but the field is left as the raw response instead of HTML markup.

## Next step

Use <Link href='/docs/guides/data-extraction/page-preparation' children='Data extraction: Page preparation' /> for waits, clicks, scrolling, browser settings, and CSS cleanup. Use <Link href='/docs/guides/content-conversion/url-to-text' children='URL to Text' /> when the consumer only needs readable text, or <Link href='/docs/guides/content-conversion/url-to-markdown' children='URL to Markdown' /> when the consumer is an LLM or Markdown-native system.
