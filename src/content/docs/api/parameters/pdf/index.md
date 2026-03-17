---
title: 'pdf'
description: 'Generate high-quality PDFs from any website using Microlink headless browser infrastructure.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Iframe } from 'components/markdown/Iframe'
import { Type, TypeContainer } from 'components/markdown/Type'

Type: <TypeContainer><Type children='<boolean>'/> | <Type children='<object>'/></TypeContainer><br/>
Default: <Type children='false'/>

It generates a PDF over the target [url](/docs/api/parameters/url).

<Iframe src="https://cdn.microlink.io/pdf/rauchg.pdf" />

<MultiCodeEditorInteractive mqlCode={{ url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications', pdf: true }} />

When it's enabled, a new `pdf` data field will be part of the response payload.

```json
{
  "data": {
    "title": "7 Principles of Rich Web Applications",
    "description": "November 4, 2014",
    "lang": "en",
    "author": null,
    "publisher": "rauchg.com",
    "image": null,
    "url": "https://rauchg.com/2014/7-principles-of-rich-web-applications",
    "date": "2019-11-27T18:34:47.000Z",
    "logo": {
      "url": "https://logo.clearbit.com/rauchg.com",
      "type": "png",
      "size": 17675,
      "height": 128,
      "width": 128,
      "size_pretty": "17.7 kB"
    },
    "pdf": {
      "size_pretty": "1.36 MB",
      "size": 1357350,
      "type": "pdf",
      "url": "https://microlink.nyc3.digitaloceanspaces.com/vIQctxsDTujq0b_f8AnldH7YMYs_"
    }
  },
  "status": "success"
}
```

In MQL and SDKs, use `pdf: true` for the default behavior or pass an object when you need PDF-specific options:

```js
{
  pdf: {
    format: 'A4',
    margin: '1cm',
    scale: 0.8
  }
}
```

In raw query strings, the same options are expressed with dot notation such as `pdf.format=A4`.

You can configure different specific options, such as [scale](/docs/api/parameters/pdf/scale) or [margin](/docs/api/parameters/pdf/margin):

<MultiCodeEditorInteractive mqlCode={{ url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications', pdf: { scale: 1, margin: '0.4cm' } }} />

The `data.pdf.url` field is a CDN-hosted PDF URL you can reuse directly. If you want the API URL itself to return the PDF file, combine PDF generation with [embed](/docs/api/parameters/embed) and return `pdf.url` as the response body.

<Container textAlign='center'>
  <a href="https://api.microlink.io/?url=https://rauchg.com/2014/7-principles-of-rich-web-applications&pdf&embed=pdf.url&scale=1&margin=0.4cm" download="How-to-download-file.pdf">
    <Button bg='black' color='white'>Download File</Button>
  </a>
</Container>

```html
<a
  href="https://api.microlink.io/?url=https://rauchg.com/2014/7-principles-of-rich-web-applications&pdf&embed=pdf.url&scale=1&margin=0.4cm"
  download="How-to-download-file.pdf"
>
  <button>Download File</button>
</a>
```

When you generate a PDF, the default [mediaType](/docs/api/parameters/mediaType) is `'print'`.
