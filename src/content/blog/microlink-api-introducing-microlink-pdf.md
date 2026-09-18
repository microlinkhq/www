---
title: 'Microlink PDF: turn any URL into a PDF'
subtitle: 'Any URL to a hosted PDF with one query parameter'
description: 'Turn any URL into a high-quality PDF using the Microlink API. Learn how to customize margins, scale, and media types, and serve PDFs directly via our global CDN.'
authors:
  - kiko
date: '2020-01-08'
---

import { Iframe } from 'components/markdown/Iframe'
import { Link } from 'components/elements/Link'
import { Figcaption } from 'components/markdown/Figcaption'

Today we're introducing [Microlink PDF](/pdf): add the `pdf` query parameter to any [Microlink API](/docs/api/getting-started/overview) request and the response includes a PDF of the target URL, hosted and ready to link.

It follows [Microlink screenshot](https://www.producthunt.com/posts/microlink-screenshot), which we launched six months ago as part of offering browser capabilities you can use directly from the API.

[![](/images/owPghHJ.png)](/pdf)

<Figcaption>See live demo at <Link href='/pdf' children='microlink.io/pdf' />.</Figcaption>

## One parameter adds a pdf field to the response

Microlink PDF is built on the same principle as the rest of the Microlink API: getting something back from any URL should be trivial. Enabling `pdf` adds a `pdf` data field to the response payload, with the file size in bytes, a human-readable `size_pretty`, the `type`, and the `url` of the generated file:

```json
{
  "pdf": {
    "size_pretty": "62.5 kB",
    "size": 62450,
    "type": "pdf",
    "url": "https://microlink.nyc3.digitaloceanspaces.com/wEjulsXuSQxZhZcm5BKmUoiyDcc_"
  }
}
```

The file is hosted on [Microlink CDN](/blog/edge-cdn/), so the `url` field is a link you can hand straight to a user. Combine it with [ttl](/docs/api/parameters/ttl) and the PDF refreshes in the background, so the link keeps pointing at an up-to-date representation of the target URL.

## Parameters for pages that were not built to print

When the target URL is not prepared to be exported as a PDF, three new query parameters change how the headless browser prints it:

- **[scale](/docs/api/parameters/pdf/scale):** resizes the rendered page to fit the PDF.
- **[margin](/docs/api/parameters/pdf/margin):** sets the space around the content on each page.
- **[mediaType](/docs/api/parameters/mediaType):** chooses which CSS media type the page is rendered with.

## Serve the PDF straight from HTML

With [embed](/docs/api/parameters/embed) mode, the API responds with the file itself instead of JSON. Setting `embed=pdf.url` makes the request URL the PDF, so it works anywhere HTML accepts a link. This is the first chapter of Basecamp's Shape Up, rendered in an `<iframe>`:

<Iframe src='https://cdn.microlink.io/pdf/basecamp.pdf' />

```html
<iframe frameborder='0'	target='_parent' src='https://api.microlink.io/?url=https://basecamp.com/shapeup/0.3-chapter-01&pdf&embed=pdf.url'
></iframe>
```

The same URL also works as the `href` of a download button:

<Container textAlign='center'>
  <a href="https://api.microlink.io/?url=https://basecamp.com/shapeup/0.3-chapter-01&pdf&embed=pdf.url">
    <Button bg='black' color='white'>Download File</Button>
  </a>
</Container>

```html
<a href="https://api.microlink.io/?url=https://basecamp.com/shapeup/0.3-chapter-01&pdf&embed=pdf.url">
	<button>Download File</button>
</a>
```

Either way, the PDF is created on the fly when the request arrives. That makes it a *backendless* solution: no server code, just HTML.

## Try it

Add `&pdf` to any API request, or open the live demo at microlink.io/pdf to generate a PDF from a URL of your own. The [pdf parameter reference](/docs/api/parameters/pdf) documents every option.
