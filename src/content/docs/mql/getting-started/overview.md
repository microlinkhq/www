---
title: 'Overview'
description: 'Use Microlink Query Language (MQL) to interact with Microlink API. A lightweight HTTP client for metadata extraction, custom data scraping, and browser automation.'
---

import { Figcaption } from 'components/markdown/Figcaption'

**Microlink Query Language** (*MQL*) is the official HTTP client for interacting with [Microlink API](/docs/api/getting-started/overview), being the same query parameters been supported:


```js
const mql = require('@microlink/mql')
const { data } = await mql('https://github.com')

console.log(data.description)
```

Also, it provides you a convenient way to define specific data extraction:

```js
const mql = require('@microlink/mql')

const github = (username) =>
  mql(`https://github.com/${username}`, {
    data: {
      avatar: {
        selector: 'a[itemprop="image"] img',
        attr: 'src',
        type: 'image',
      },
    },
  })

const username = 'kikobeats'
const { data } = await github(username)

console.log(
  `The avatar URL is '${data.avatar.url}' (${data.avatar.size_pretty})`
)
```

<Figcaption children='The only thing you need to do is declare the data you wish to obtain.' />
