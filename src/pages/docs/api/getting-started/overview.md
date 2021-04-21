---
title: 'Overview'
---

Microlink provides a powerful API for automating any browser action.

You can hit the API from any environment that allows you perform a HTTP request.

That includes any programming language:

```js
const mql = require('@microlink/mql')

const { status, data } = await mql('https://github.com/microlinkhq')

console.log(status, data)
```

or from your terminal:

```bash
curl https://api.microlink.io?url=https://github.com/microlinkhq
```

even using [Microlink CLI](/docs/api/getting-started/cli):

```bash
microlink https://github.com/microlinkhq
```

You just need to provide a URL as input, outputting the structured data back.

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

The following documentation is going to teach you how to do things like:

- Get structured data from any link.
- Take a [screenshot](/docs/api/parameters/screenshot) of the website (partial or full page).
- Get a predominant color [palette](/docs/api/parameters/palette) per each image detected.
- Make easy [embed](/docs/api/parameters/embed) content directly in your HTML markup.
- [prerender](/docs/api/parameters/prerender) mode, useful for getting more information from websites that use client-side frameworks.
