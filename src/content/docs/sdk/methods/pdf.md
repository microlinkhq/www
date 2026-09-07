---
title: 'pdf'
description: 'Print any URL to a hosted PDF with the Microlink SDK: paper format, landscape, margins, scale, page ranges, custom paper size, and background graphics.'
---

Print any URL to PDF. The result is an asset object pointing to the hosted document, with `url`, `type`, `size`, and `size_pretty`:

```js
const { url } = await microlink.pdf('https://example.com', { format: 'A4' })
```

The browser renders the page with the `print` media type, so print stylesheets apply. Set [mediaType](/docs/api/parameters/mediaType) to `'screen'` to print the page exactly as it looks on screen.

## Options

- [format](/docs/api/parameters/pdf/format) `<string>` — the paper format: `'Letter'`, `'Legal'`, `'Tabloid'`, `'Ledger'`, or `'A0'` to `'A6'` (default: `'A4'`).
- [landscape](/docs/api/parameters/pdf/landscape) `<boolean>` — prints in landscape orientation.
- [margin](/docs/api/parameters/pdf/margin) `<string> | <object>` — the paper margins, as a unit-labeled value (`'4mm'`) or an object with `top`/`right`/`bottom`/`left` sides (default: `'0.35cm'`).
- [scale](/docs/api/parameters/pdf/scale) `<number>` — the rendering zoom, between `0.1` and `2` (default: `0.6`).
- [pageRanges](/docs/api/parameters/pdf/pageRanges) `<string>` — the pages to print, e.g. `'1-5, 8, 11-13'`.
- [width](/docs/api/parameters/pdf/width) `<string> | <number>` — a custom paper width, accepting unit-labeled values (`'640px'`).
- [height](/docs/api/parameters/pdf/height) `<string> | <number>` — a custom paper height, accepting unit-labeled values (`'480px'`).
- `printBackground` `<boolean>` — includes background graphics in the printed output.

Any [shared option](/docs/sdk/getting-started/options) applies too — [waitForSelector](/docs/api/parameters/waitForSelector) to let charts render, [styles](/docs/api/parameters/styles) to hide navigation, [headers](/docs/api/parameters/headers) to print pages behind a login, or [filename](/docs/api/parameters/filename) to name the download.

## Examples

Print the first three pages on landscape Letter paper with asymmetric margins:

```js
const { url } = await microlink.pdf('https://basecamp.com/shapeup/0.3-chapter-01', {
  format: 'Letter',
  landscape: true,
  margin: { top: '1cm', right: '4mm', bottom: '1cm', left: '4mm' },
  pageRanges: '1-3'
})
```

Or drop the standard formats entirely and print onto custom paper:

```js
const { url } = await microlink.pdf('https://www.raycast.com', {
  width: '640px',
  height: '480px',
  scale: 0.8,
  printBackground: true
})
```

Print an invoice from an authenticated dashboard, hiding the sidebar, and name the file for the download:

```js
const { url } = await microlink.pdf('https://app.example.com/invoices/42', {
  headers: { 'x-api-header-cookie': `session=${sessionId}` },
  styles: ['nav, aside { display: none }'],
  filename: 'invoice-42.pdf'
})
```

## Serving the document

The hosted `url` can be linked or streamed to your users directly. To generate the document at request time without an SDK call, build the API URL with the [embed](/docs/api/parameters/embed) parameter; see [delivery and embedding](/docs/guides/pdf/embedding) in the PDF guide.

See the [PDF guide](/docs/guides/pdf) for page size and layout, page preparation, caching, and private pages.
