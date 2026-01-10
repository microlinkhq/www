---
title: 'Overview'
description: Get started with Microlink API. Learn how to automate browser actions, extract metadata, take screenshots, generate PDFs with a simple HTTP GET request.
---

import { Link } from 'components/elements/Link/base'
import { mqlCode } from 'helpers/mql-code'
import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'

Microlink API provides a powerful API for automating any browser action.

<MultiCodeEditorInteractive 
  mqlCode={mqlCode('https://github.com/microlinkhq')} 
/>

You can hit the API directly from your browser or any environment that allows you to perform a simple HTTP GET request.

<Figcaption>The <Link href='/docs/api/getting-started/cli' children='Microlink CLI' /> is helpful to explore the API under local development.</Figcaption>

Giving a [url](/docs/api/parameters/url) as input, you get structured data as output.

```json
{
  "status": "success",
  "data": {
    "title": "microlink.io",
    "description": "Turn websites into data. microlink.io has 34 repositories available. Follow their code on GitHub.",
    "lang": "en",
    "author": null,
    "publisher": "GitHub",
    "image": {
      "url": "https://avatars0.githubusercontent.com/u/29799436?s=280&v=4",
      "type": "png",
      "size": 4118,
      "height": 280,
      "width": 280,
      "size_pretty": "4.12 kB"
    },
    "date": "2020-09-22T09:33:36.000Z",
    "url": "https://github.com/microlinkhq",
    "logo": {
      "url": "https://logo.clearbit.com/github.com",
      "type": "png",
      "size": 6313,
      "height": 128,
      "width": 128,
      "size_pretty": "6.31 kB"
    }
  }
}
```

There are some of the most common workflow you can do with Microlink API:

- Retrieve [meta](/docs/api/parameters/meta) data from any link.
- Take a [screenshot](/docs/api/parameters/screenshot) or generate a [pdf](/docs/api/parameters/pdf) of the target website.
- Get a predominant color [palette](/docs/api/parameters/palette) per each image detected.
- Make easy [embed](/docs/api/parameters/embed) content directly in your HTML markup.
- Identify [technologies](/docs/api/parameters/insights/technologies) behind a target URL.
- [prerender](/docs/api/parameters/prerender) mode, useful for getting more information from websites that use client-side frameworks.

The following documentation is going to teach you all these things and more.
