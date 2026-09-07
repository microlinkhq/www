---
title: 'Overview'
description: 'Microlink Query Language (MQL) is the HTTP client beneath the Microlink SDK and the grammar for custom data extraction rules. Use it for raw API responses, streams, and declarative scraping.'
---

import { Figcaption } from 'components/markdown/Figcaption'

**Microlink Query Language** (*MQL*) is two things at once: the HTTP client the [SDK](/docs/sdk/getting-started/overview) is built on, published as [@microlink/mql](https://www.npmjs.com/package/@microlink/mql), and the grammar you use to declare custom data extraction rules — the [data](/docs/api/parameters/data) parameter of [Microlink API](/docs/api/getting-started/overview).

As a client, it takes a [url](/docs/api/parameters/url) and any API parameter, and returns the raw API response:

```js
const mql = require('@microlink/mql')
const { status, data, response } = await mql('https://github.com')

console.log(data.description)
```

As a language, it lets you declare the data you want from a page and get it back typed:

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

## MQL and the SDK

Every SDK method is an MQL call with the parameters set for you and the result unwrapped: [extract](/docs/sdk/methods/extract) is `data` rules, [markdown](/docs/sdk/methods/markdown) is a rule with `attr: 'markdown'`, the [collections](/docs/sdk/methods/collections) are rules with `selectorAll`. The same [rules grammar](/docs/sdk/mql/rules/basic) applies in both places, so everything under [rules definition](/docs/sdk/mql/rules) and [data definition](/docs/sdk/mql/data) is what you pass to `extract` too.

Reach for MQL directly when you need something the semantic methods don't expose:

- The full API envelope — [status](/docs/api/basics/format#status), [data](/docs/api/basics/format#data), and the HTTP `response` with its headers.
- Several products in one request, such as a screenshot and a PDF of the same page.
- An API parameter the SDK doesn't route for a given method.
- The binary body as a [stream or buffer](/docs/sdk/mql/getting-started/api) instead of a hosted URL.

The SDK installs `@microlink/mql` as a dependency, so it's already available next to it. See [installation](/docs/sdk/mql/getting-started/installation), [usage](/docs/sdk/mql/getting-started/usage), and the [API](/docs/sdk/mql/getting-started/api) to get started.
