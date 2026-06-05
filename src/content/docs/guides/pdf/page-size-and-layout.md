---
title: 'PDF: Page size and layout'
description: 'Control the paper size and printed layout of generated PDFs. Choose standard formats or custom dimensions, set margins, switch orientation, scale content, and export specific page ranges.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

For PDFs, the most important decisions are not viewport settings but printed layout settings: paper size, margins, orientation, scaling, and which pages to keep.

## Standard paper formats

Use `pdf.format` when you want a standard paper size such as A4, Letter, or Legal:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://keygen.sh/blog/i-quit', pdf: { format: 'A4' }, meta: false }} />

<Figcaption>Use standard formats when the PDF needs to match common printing or document-sharing expectations.</Figcaption>

Popular options include:

| Format | Common use |
|--------|------------|
| `A4` | International business documents |
| `Letter` | US office and home printing |
| `Legal` | Contracts and legal documents |
| `Tabloid` | Larger layouts and wide content |

See the <Link href='/docs/api/parameters/pdf/format' children='format reference' /> for the full list.

## Custom dimensions

Use `pdf.width` and `pdf.height` when you need an exact custom page size rather than a standard paper format:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://microlink.io', pdf: { width: '8.5in', height: '11in' }, meta: false }} />

<Figcaption>Custom dimensions are useful for receipts, certificates, labels, or any non-standard document size.</Figcaption>

The values accept CSS units such as `px`, `in`, `cm`, and `mm`.

## Choose format vs custom size

| If you need | Use |
|-------------|-----|
| A standard printable document size | `pdf.format` |
| An exact custom paper size | `pdf.width` + `pdf.height` |

Use one sizing strategy at a time so the document intent stays clear.

## Margins

Use `pdf.margin` to control the whitespace around the printed content:

<MultiCodeEditorInteractive height={230} mqlCode={{ url: 'https://basecamp.com/shapeup/0.3-chapter-01', pdf: { margin: '1cm' }, meta: false }} />

<Figcaption>Margins are one of the easiest ways to make a generated PDF feel more intentional and easier to print.</Figcaption>

You can set:

- One value for all sides: `margin: '1cm'`
- Different values per side:

```js
{
  pdf: {
    margin: {
      top: '12mm',
      bottom: '16mm',
      left: '10mm',
      right: '10mm'
    }
  }
}
```

## Landscape orientation

Use `pdf.landscape` when the page is wide and a portrait document would compress it too much:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://www.algolia.com', pdf: { landscape: true }, meta: false }} />

<Figcaption>Landscape is a good fit for wide dashboards, comparison tables, or marketing pages with horizontal sections.</Figcaption>

## Scale the rendered content

Use `pdf.scale` to zoom the rendered page content in or out before it is printed:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://varnish-cache.org/docs/trunk/phk/thatslow.html', pdf: { scale: 0.8 }, meta: false }} />

<Figcaption>Lower values fit more content on each page. Higher values make content larger, but also increase the chance of pagination overflow.</Figcaption>

The supported range is `0.1` to `2`.

## Export only specific pages

Use `pdf.pageRanges` when the final document is longer than what you actually need:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications', pdf: { pageRanges: '1-2' }, meta: false }} />

<Figcaption>Page ranges are useful for previews, partial exports, and document workflows that only need one section of a larger PDF.</Figcaption>

You can specify a single page such as `'1-1'` or intervals such as `'1-5, 8, 11-13'`.

## Choose the right layout control

| If you need | Use |
|-------------|-----|
| Standard office paper sizes | `pdf.format` |
| Exact paper dimensions | `pdf.width` + `pdf.height` |
| More or less whitespace around the content | `pdf.margin` |
| A wide document | `pdf.landscape` |
| More or less content per page | `pdf.scale` |
| Only part of a long PDF | `pdf.pageRanges` |

## Next step

Learn how to prepare the page before Microlink prints it — print vs screen CSS, waits, clicks, and injected styles — in [page preparation](/docs/guides/pdf/page-preparation).
