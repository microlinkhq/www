---
title: 'extract'
description: 'Pull typed values from any URL with your own CSS selector rules using the Microlink SDK: selectors, attributes, types, nested rules, fallbacks, JavaScript evaluation, and rules alongside metadata.'
---

import Selector from './selector.md'
import SelectorAll from './selectorAll.md'
import Attr from './attr.md'
import TypeDoc from './type.md'
import Evaluate from './evaluate.md'

Typed values pulled with your own rules. Declare the data you want from a page — a CSS selector, the attribute to read, the type to validate it as — and get it back normalized. It takes the rules as its second argument and resolves to an object with one key per rule:

```js
import createClient from 'microlink.io'

const microlink = createClient()

const { image } = await microlink.extract('https://microlink.io', {
  image: {
    selector: 'meta[property="og:image"]',
    attr: 'content',
    type: 'image'
  }
})

console.log(image.url, image.width, image.height)
```

For any [url](/docs/api/parameters/url), [Microlink API](/docs/api/getting-started/overview) already returns normalized [data fields](/docs/api/getting-started/data-fields) extracted from Open Graph, JSON-LD, and a series of DOM fallbacks. Rules let you go further: extract any value present on any website, overwrite a normalized field whose source is wrong, and build your own API on top of any site. Every example on this page assumes the `microlink` client above.

## A rule

A rule is defined by a handful of primitives. Each one answers a single question about the value you want:

| Primitive | Question it answers | Example |
|-----------|---------------------|---------|
| [selector](#selector) | Which element? The first match of a CSS selector | `'meta[property="og:image"]'` |
| [selectorAll](#selectorall) | Which elements? Every match, returning a collection | `'.athing'` |
| [attr](#attr) | What to read from it: an HTML attribute, or `text`, `html`, `markdown`, `json` | `'content'` |
| [type](#type) | How to validate and normalize the value | `'image'` |
| [evaluate](#evaluate) | Run JavaScript in the page instead of querying the DOM | `'window.next.version'` |

A rule needs at least a query — `selector`, `selectorAll`, or `evaluate` — or an `attr` alone to serialize the whole page. Omitted primitives fall back to `attr: 'html'` and `type: 'auto'`.

Rules compose in two ways: an object under `attr` builds [nested](#nested-rules) structures, and an array of rules defines [fallbacks](#fallback-rules) evaluated in order until one yields a value.

## selector

<Selector />

## selectorAll

<SelectorAll />

## attr

<Attr />

## type

<TypeDoc />

## evaluate

<Evaluate />

## Options

A third argument takes the [shared options](/docs/sdk/getting-started/options), useful for pairing rules with [prerender](/docs/api/parameters/prerender), [waitForSelector](/docs/api/parameters/waitForSelector), [ttl](/docs/api/parameters/ttl), or [headers](/docs/api/parameters/headers) forwarded to the target page:

```js
const { price } = await microlink.extract(
  'https://example.com/product',
  { price: { selector: '.price', attr: 'text', type: 'number' } },
  { prerender: true, waitForSelector: '.price', ttl: '1h' }
)
```

## Result

It resolves to an object with one key per rule. Values are normalized by their [type](#type): a `'string'` is a string, a `'number'` is a number, and `'image'`, `'video'`, `'audio'`, and `'logo'` become asset objects carrying `url`, `type`, `width`, `height`, `size`, and `size_pretty`. A rule that matches nothing, or whose value fails its type, resolves to `null`, so destructuring is always safe.

The complete API response — its [status](/docs/api/basics/format#status), the payload, and the HTTP response with its headers — stays available on `microlink.last` after every call; see [inspect the last request](/docs/sdk/getting-started/errors#inspect-the-last-request). Failures throw a [`MicrolinkError`](/docs/sdk/getting-started/errors) like every other method.

## Rules alongside metadata

`extract` returns only your fields. To evaluate rules next to the normalized [data fields](/docs/api/getting-started/data-fields) in one request, pass them as the `data` option of [metadata](/docs/sdk/methods/metadata):

```js
const { title, description, price } = await microlink.metadata('https://example.com/product', {
  data: {
    price: { selector: '.price', attr: 'text', type: 'number' }
  }
})
```

A rule named after a normalized field — `title`, `image`, `author` — overrides that field, which is how you fix a page whose metadata is wrong or missing.

## Fallback rules

A field can be defined by more than one rule. Pass an array and the rules are evaluated respecting the order: if the first one fails, the second is tried, then the third, and so on. The value is the one obtained by the first rule that succeeds:

```js
const github = username =>
  microlink.extract(`https://github.com/${username}`, {
    avatar: [
      {
        selector: 'meta[name="twitter:image:src"]:not([content=""])',
        attr: 'content',
        type: 'image'
      },
      {
        selector: 'meta[property="og:image"]:not([content=""])',
        attr: 'content',
        type: 'image'
      }
    ]
  })

const username = 'kikobeats'
const { avatar } = await github(username)

console.log(`GitHub avatar for @${username}: ${avatar.url} (${avatar.size_pretty})`)
```

A rule fails when its query matches nothing or when the value doesn't pass its [type](#type), so a fallback chain is also how you make a rule resilient to pages whose markup varies. The same array form works for [selector](#fallback-selectors) and [attr](#fallback-values) on their own.

## Everywhere else

The [markdown](/docs/sdk/methods/markdown), [html](/docs/sdk/methods/html), [text](/docs/sdk/methods/text), and [links](/docs/sdk/methods/links) methods are shortcuts over rules like these, and accept the same primitives as options to scope their extraction. The same grammar — historically known as MQL, the Microlink Query Language — is what the [data](/docs/api/parameters/data) query parameter takes when you call the API directly, and what the [CLI](/docs/sdk/getting-started/cli) accepts as JSON through `extract --data`.

Underneath, the SDK talks to the API through [@microlink/mql](https://github.com/microlinkhq/mql), the low-level client it ships as a dependency; you never need to install or import it yourself. Reading a response body as a stream or a buffer is the one thing that still lives there rather than in the SDK.

See the [data extraction guide](/docs/guides/data-extraction) for defining rules, page preparation, response shaping, and troubleshooting.
