---
title: 'PDF'
description: 'Generate your first PDF from any website with Microlink API, understand the PDF response, and choose the right next step for layout, delivery, and caching.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Generating a PDF with Microlink API requires two parameters: the target `url` and `pdf`.

Use `pdf: true` for the default behavior, or pass an object when you need PDF-specific options such as `format`, `margin`, `scale`, or `pageRanges`.

<MultiCodeEditorInteractive mqlCode={{ url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications', pdf: true }} />

<Figcaption>Run the request and look for the generated asset under <code>data.pdf.url</code>.</Figcaption>

Microlink renders the page in a headless browser, prints it to PDF, stores the result on the CDN, and returns the PDF asset metadata in the response.

## How PDF options work

As soon as you want to customize paper size, margins, or scale, switch from `true` to a `pdf` object:

```js
{
  url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications',
  pdf: {
    format: 'A4',
    margin: '1cm',
    scale: 0.8
  },
  meta: false
}
```

This guide uses the nested object form consistently because it keeps PDF-specific options grouped together. In raw query strings, the same options are expressed with dot notation such as `pdf.format=A4`.

## The response

The `pdf` field in the response contains the generated asset you will usually reuse:

```json
{
  "status": "success",
  "data": {
    "pdf": {
      "url": "https://microlink-cdn.s3.amazonaws.com/pdf/...",
      "type": "pdf",
      "size": 1357350,
      "size_pretty": "1.36 MB"
    }
  }
}
```

Most application workflows use `data.pdf.url` directly. It is a CDN-hosted PDF URL you can store, cache, download, or embed elsewhere.

## Choose a delivery mode

You have two main ways to consume generated PDFs:

| Need | Best option | Why |
|------|-------------|-----|
| You want JSON plus PDF metadata | Default response | You get `data.pdf.url`, type, and size |
| You want the API URL itself to return the PDF file | `embed: 'pdf.url'` | The API URL behaves like a direct PDF download or preview URL |

If you already know you want a direct download link or embedded PDF preview, skip to [delivery and embedding](/docs/guides/pdf/embedding).

## Skip metadata for faster responses

By default, the API also extracts metadata from the target page. If you only need the PDF, disable it:

<MultiCodeEditorInteractive height={200} mqlCode={{ url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications', pdf: true, meta: false }} />

<Figcaption>Setting <code>meta: false</code> skips metadata extraction and is usually the biggest speedup for PDF-only requests.</Figcaption>

If you still need a few metadata fields, `meta` also accepts an object for selective extraction. See the <Link href='/docs/api/parameters/meta' children='meta reference' />.

## One important default: print CSS

When Microlink generates a PDF, the default `mediaType` is `'print'`. That means print stylesheets are applied automatically.

If the page looks better in its normal on-screen layout, switch to `mediaType: 'screen'` in [page preparation](/docs/guides/pdf/page-preparation).

## Using the raw URL

You can call the API directly from your browser address bar or any HTTP client:

```bash
https://api.microlink.io?url=https://rauchg.com/2014/7-principles-of-rich-web-applications&pdf=true&meta=false
```

That returns JSON. To make the API URL return the PDF file directly instead, use `embed=pdf.url` in the [delivery and embedding](/docs/guides/pdf/embedding) guide.

## Free tier and API key

The Microlink API works without an API key. You get **50 free requests per day**, which is enough to test the full PDF flow and the examples in this guide.

For production usage, you'll usually want a <ProBadge /> plan. It unlocks features such as [configurable TTL](/docs/api/parameters/ttl), [stale-while-revalidate caching](/docs/api/parameters/staleTtl), [custom filenames](/docs/api/parameters/filename), [custom headers](/docs/api/parameters/headers), and [proxy](/docs/api/parameters/proxy).

To authenticate, pass your API key as the `x-api-key` header:

<MultiCodeEditorInteractive height={200} mqlCode={{ url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications', pdf: true, meta: false, apiKey: 'YOUR_API_TOKEN' }} />

<Figcaption>You can enter your API key in any interactive example by clicking the key icon in the terminal toolbar.</Figcaption>

Throughout this guide, features that require a <ProBadge /> plan are marked inline.

See the <Link href='/docs/api/basics/authentication' children='authentication' /> and <Link href='/docs/api/basics/rate-limit' children='rate limit' /> docs for details.

## What's next

Pick the next step based on the result you want:

- **[Page size and layout](/docs/guides/pdf/page-size-and-layout)** — control paper format, custom dimensions, margins, orientation, scale, and page ranges.
- **[Page preparation](/docs/guides/pdf/page-preparation)** — choose print or screen CSS, wait for content, click UI elements, and inject CSS before printing.
- **[Delivery and embedding](/docs/guides/pdf/embedding)** — choose between JSON + CDN URLs and direct PDF responses for downloads and previews.
- **[Caching and performance](/docs/guides/pdf/caching-and-performance)** — tune freshness, cache behavior, and PDF generation speed.
- **[Private pages](/docs/guides/pdf/private-pages)** — generate PDFs from logged-in or header-dependent pages safely.
- **[Troubleshooting](/docs/guides/pdf/troubleshooting)** — fix missing content, wrong layout, timeouts, blocked sites, and plan-related errors.
