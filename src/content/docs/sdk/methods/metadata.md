---
title: 'metadata'
description: 'Get unified metadata for any URL with the Microlink SDK: title, description, image, logo, author, publisher, date, and language, normalized from Open Graph, Twitter Cards, JSON-LD, and HTML.'
---

Unified metadata from Open Graph, Twitter Cards, JSON-LD, and the HTML itself, normalized into one predictable shape:

```js
const { title, description, image } = await microlink.metadata('https://vercel.com')
```

It resolves to the [data fields](/docs/api/getting-started/data-fields) object — `title`, `description`, `lang`, `author`, `publisher`, `image`, `logo`, `date`, and `url` — with every image field expanded into an asset object carrying `url`, `type`, `width`, `height`, `size`, and `size_pretty`:

```js
const { image, logo } = await microlink.metadata('https://github.com/microlinkhq')

console.log(image.url, image.width, image.height, image.size_pretty)
console.log(logo.url)
```

Fields that cannot be detected come back as `null`, so destructuring is always safe.

## Options

It has no method-specific options: every key is a top-level API parameter, so the whole [shared options](/docs/sdk/getting-started/options) set applies. A few of them are especially useful here.

- [meta](/docs/api/parameters/meta) `<object>` — restricts detection to specific fields, or excludes some, to make the call cheaper.
- [palette](/docs/api/parameters/palette) `<boolean>` — adds dominant colors and accessible color pairs to every image field (default: `false`).
- [video](/docs/api/parameters/video) `<boolean>` — adds a `video` field with the primary video of the page as a direct asset (default: `false`).
- [audio](/docs/api/parameters/audio) `<boolean>` — adds an `audio` field with the primary audio track as a direct asset (default: `false`).
- [prerender](/docs/api/parameters/prerender) `<boolean> | <string>` — forces a headless browser for client-side rendered pages whose metadata only exists after JavaScript runs (default: `'auto'`).

Only detect the fields you need:

```js
const { title, author } = await microlink.metadata('https://x.com/microlinkhq', {
  meta: { title: true, author: true }
})
```

Add accessible color pairs to every image, ready to theme a preview card:

```js
const { image } = await microlink.metadata('https://vercel.com', {
  palette: true
})

console.log(image.palette, image.background_color, image.color)
```

Get the primary video along with the rest of the metadata, instead of a separate [video](/docs/sdk/methods/media/video) call:

```js
const { title, video } = await microlink.metadata('https://www.youtube.com/watch?v=9P6rdqiybaw', {
  video: true
})

console.log(video.url, video.duration_pretty)
```

## Extending the result

Combine `metadata` with your own [extraction rules](/docs/sdk/mql/rules/basic) when the normalized fields are not enough. [extract](/docs/sdk/methods/extract) returns only your fields; to get both at once, pass the rules as `data` and the normalized fields ride along:

```js
const { title, price } = await microlink.metadata('https://example.com/product', {
  data: {
    price: { selector: '.price', attr: 'text', type: 'number' }
  }
})
```

See the [metadata guide](/docs/guides/metadata) for choosing fields, page preparation, caching, and private pages.
