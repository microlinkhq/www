---
title: 'Microlink API: Introducing Microlink PDF'
description: 'Turn any URL into a high-quality PDF using the Microlink API. Learn how to customize margins, scale, and media types, and serve PDFs directly via our global CDN.'
date: '2020-01-08'
---

import { Iframe } from 'components/markdown/Iframe'
import { Link } from 'components/elements/Link'
import { Figcaption } from 'components/markdown/Figcaption'

Six months ago we launched [Microlink screenshot](https://www.producthunt.com/posts/microlink-screenshot) as part of our product iteration to offer browser capabilities ready to be used directly consuming our [API](/docs/api/getting-started/overview).

Today, we’re thrilled to announce [Microlink PDF](/pdf) 🔥.

[![](/images/owPghHJ.png)](/pdf)

<Figcaption>See live demo at <Link href='/pdf' children='microlink.io/pdf' />.</Figcaption>

**Microlink PDF**  is based on the same engineering principles as the rest of the functionality behind [Microlink API](/docs/api/getting-started/overview): making it trivial to get something back from any URL.

Enabling the new [pdf](/docs/api/parameters/pdf) query parameter will add a `pdf` data field as part of the response payload:

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

The PDF file created as output of the process is hosted on [Microlink CDN](/blog/edge-cdn/) and it can be combined with [ttl](/docs/api/parameters/ttl) to automatically refresh in the background, providing an updated PDF representation of the target URL.

Additionally, a set of new query parameters have been added for better PDF accommodation, such as [scale](/docs/api/parameters/pdf/scale), [margin](/docs/api/parameters/pdf/margin) and [mediaType](/docs/api/parameters/mediaType).

These query parameters are specially helpful when the target URL is not actually prepared to be properly exported as PDF.

Another thing worth mentioning is the ability to consume the PDF directly from HTML markup using [embed](/docs/api/parameters/embed) mode:

<Iframe src='https://cdn.microlink.io/pdf/basecamp.pdf' />

```html
<iframe frameborder='0'	target='_parent' src='https://api.microlink.io/?url=https://basecamp.com/shapeup/0.3-chapter-01&pdf&embed=pdf.url'
></iframe>
```

Also as a `button`

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

This way, the PDF file will be created on the fly, making it a *backendless* solution: just HTML.
