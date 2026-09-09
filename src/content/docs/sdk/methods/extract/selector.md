---
title: 'selector'
description: 'Define CSS selectors to target and extract specific HTML elements from any URL with the Microlink SDK. Support for IDs, classes, pseudo-classes, and fallback logic for resilient scraping.'
---

import { Type, TypeContainer } from 'components/markdown/Type'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Values: [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

It defines the [HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) you want to pick from the HTML markup over the [url](/docs/api/parameters/url):

```js
import createClient from 'microlink.io'

const microlink = createClient()

const github = username =>
  microlink.extract(`https://github.com/${username}`, {
    avatar: {
      selector: 'meta[property="og:image"]:not([content=""])',
      attr: 'content',
      type: 'image'
    }
  })

const username = 'kikobeats'
const { avatar } = await github(username)

console.log(`GitHub avatar for @${username}: ${avatar.url} (${avatar.size_pretty})`)
```

It's equivalent to [Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) and any [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be specified, such as:

- An HTML tag (e.g., <Type children="'img'"/>).
- A CSS class or pseudo-class, id or data-attribute (e.g., <Type children="'#avatar'"/>).
- A combination of both (e.g., <Type children="'img:first'"/>).

When `selector` is omitted, [attr](/docs/sdk/methods/extract/attr) operates on the entire page — see [whole-page serialization](/docs/sdk/methods/extract/attr#whole-page-serialization). The same `selector` is what the [markdown](/docs/sdk/methods/markdown), [html](/docs/sdk/methods/html), [text](/docs/sdk/methods/text), and [links](/docs/sdk/methods/links) methods accept as an option to scope their extraction.

## Fallback selectors

A collection of selectors is an array of [fallback rules](/docs/sdk/methods/extract#fallback-rules): the first selector that yields a typed value wins.
