---
title: 'extract'
description: 'Pull typed values from any URL with your own CSS selector rules using the Microlink SDK: selectors, attributes, types, nested rules, fallbacks, and JavaScript evaluation.'
---

Typed values pulled with CSS selector rules, using the [rules grammar](/docs/sdk/mql/rules/basic). It takes the rules as its second argument and resolves to an object with one key per rule:

```js
const { image } = await microlink.extract('https://microlink.io', {
  image: {
    selector: 'meta[property="og:image"]',
    attr: 'content',
    type: 'image'
  }
})

console.log(image.url, image.width, image.height)
```

A rule is defined by three primitives: a DOM query ([selector](/docs/sdk/mql/data/selector) or [selectorAll](/docs/sdk/mql/data/selectorAll)), the [attr](/docs/sdk/mql/data/attr) to read from the matched element, and the [type](/docs/sdk/mql/data/type) the value is validated and normalized as. Rules can be [nested](/docs/sdk/mql/rules/nested) to build objects, listed as [fallbacks](/docs/sdk/mql/rules/fallbacks), or replaced by JavaScript with [evaluate](/docs/sdk/mql/data/evaluate).

## Options

A third argument takes the [shared options](/docs/sdk/getting-started/options), useful for pairing rules with [prerender](/docs/api/parameters/prerender), [waitForSelector](/docs/api/parameters/waitForSelector), or [headers](/docs/api/parameters/headers):

```js
const { price } = await microlink.extract(
  'https://example.com/product',
  { price: { selector: '.price', type: 'number' } },
  { waitForSelector: '.price' }
)
```

## Examples

A list of objects — one per story — with [selectorAll](/docs/sdk/mql/data/selectorAll) and a nested `attr`:

```js
const { stories } = await microlink.extract('https://news.ycombinator.com', {
  stories: {
    selectorAll: '.athing',
    attr: {
      title: { selector: '.titleline > a', attr: 'text' },
      href: { selector: '.titleline > a', attr: 'href', type: 'url' }
    }
  }
})
```

Fallback rules, evaluated in order until one yields a value:

```js
const { avatar } = await microlink.extract('https://github.com/kikobeats', {
  avatar: [
    { selector: 'meta[name="twitter:image:src"]', attr: 'content', type: 'image' },
    { selector: 'meta[property="og:image"]', attr: 'content', type: 'image' }
  ]
})
```

A value that only exists in JavaScript, read with [evaluate](/docs/sdk/mql/data/evaluate):

```js
const { version } = await microlink.extract('https://vercel.com', {
  version: { evaluate: 'window.next.version', type: 'string' }
})
```

A JSON endpoint parsed into structured data, with `attr: 'json'` on the whole page:

```js
const { content } = await microlink.extract('https://pokeapi.co/api/v2/pokemon', {
  content: { attr: 'json' }
})
```

`extract` returns only your fields. To get the normalized [metadata](/docs/sdk/methods/metadata) alongside them, pass the same rules as the `data` option of `metadata` instead. The [markdown](/docs/sdk/methods/markdown), [html](/docs/sdk/methods/html), [text](/docs/sdk/methods/text), and [collection](/docs/sdk/methods/collections) methods are shortcuts over rules like these.

See the [data extraction guide](/docs/guides/data-extraction) for defining rules, page preparation, response shaping, and troubleshooting.
