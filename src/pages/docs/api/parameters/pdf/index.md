---
title: 'pdf'
---

import { Iframe } from 'components/markdown/Iframe'
import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>

It generates a PDF over the target [url](/docs/api/parameters/url).

<Iframe src="https://cdn.microlink.io/pdf/rauchg.pdf" />

<MultiCodeEditorInteractive mqlCode={mqlCode('https://rauchg.com/2014/7-principles-of-rich-web-applications', { pdf: true })} />

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

You can configure different specific options, such as [scale](/docs/api/parameters/pdf/scale) or [margin](/docs/api/parameters/pdf/margin):

<MultiCodeEditorInteractive mqlCode={mqlCode('https://rauchg.com/2014/7-principles-of-rich-web-applications', { pdf: true, scale: 1, margin: '0.4cm' })} />

Also, combine it with [embed](/docs/api/parameters/embed) for inserting it as HTML markup and refresh it asynchronously in the background (known as _stale_).

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
