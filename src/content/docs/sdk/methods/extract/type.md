---
title: 'type'
description: 'Validate and cast extracted values into specific data types like strings, numbers, images, or URLs with the Microlink SDK. Ensure data consistency and correctness for your API responses.'
---

import { Type, TypeContainer } from 'components/markdown/Type'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Default: <Type children="'auto'"/><br/>
Values: <TypeContainer><Type children="'audio'"/> | <Type children="'author'"/> | <Type children="'auto'"/> | <Type children="'boolean'"/> | <Type children="'date'"/> | <Type children="'description'"/> | <Type children="'email'"/> | <Type children="'image'"/> | <Type children="'ip'"/> | <Type children="'lang'"/> | <Type children="'logo'"/> | <Type children="'number'"/> | <Type children="'object'"/> | <Type children="'publisher'"/> | <Type children="'regexp'"/> | <Type children="'string'"/> | <Type children="'title'"/> | <Type children="'url'"/> | <Type children="'video'"/></TypeContainer>

It defines how the value extracted should be considered.

```js
import createClient from 'microlink.io'

const microlink = createClient()

const productHunt = id =>
  microlink.extract(`https://www.producthunt.com/posts/${id}`, {
    name: {
      selector: 'h1 a',
      attr: 'text',
      type: 'string'
    },
    upvotes: {
      selector: '.bigButtonCount_10448',
      attr: 'text',
      type: 'number'
    }
  })

const productSlug = 'microlink-2-0'
const { name, upvotes } = await productHunt(productSlug)

console.log(`'${name}' has ${upvotes} upvotes`)
```

The data shape ensures that the extracted value will only be considered as valid when it's of the declared shape: a rule whose value doesn't match its `type` resolves to `null`, which is what lets [fallback rules](/docs/sdk/methods/extract#fallback-rules) move on to the next candidate.

Media types do more than validate. <Type children="'image'"/>, <Type children="'video'"/>, <Type children="'audio'"/>, and <Type children="'logo'"/> resolve the value to an absolute URL and expand it into an asset object with `url`, `type`, `width`, `height`, `size`, and `size_pretty`, the same shape the normalized [data fields](/docs/api/getting-started/data-fields) use:

```js
const { cover } = await microlink.extract('https://www.youtube.com/watch?v=9P6rdqiybaw', {
  cover: {
    selector: 'meta[property="og:image"]',
    attr: 'content',
    type: 'image'
  }
})

console.log(cover.width, cover.height, cover.size_pretty)
```
