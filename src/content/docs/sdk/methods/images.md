---
title: 'images'
description: 'Get every image on a page as an array of absolute URLs with the Microlink SDK, including lazy-loaded galleries via a custom attribute.'
---

Sweeps every `img` element and returns each `src` as an absolute, deduped URL:

```js
const images = await microlink.images('https://example.com')
```

## Options

Override the default rule of `selectorAll: 'img'`, `attr: 'src'`, and `type: 'url'` with [selectorAll](/docs/sdk/methods/extract/selectorAll), [selector](/docs/sdk/methods/extract/selector), [attr](/docs/sdk/methods/extract/attr), or [type](/docs/sdk/methods/extract/type).

## Examples

When a gallery lazy-loads, point `attr` at the attribute carrying the real source:

```js
const images = await microlink.images('https://example.com/gallery', {
  selectorAll: 'img[data-src]',
  attr: 'data-src'
})
```

Or let the page render first so the real `src` is in place:

```js
const images = await microlink.images('https://example.com/gallery', {
  prerender: true,
  scroll: 'footer'
})
```

Open Graph and Twitter Card images live in `meta` tags rather than `img` elements; use [metadata](/docs/sdk/methods/metadata) for the page's representative image, or an [extract](/docs/sdk/methods/extract) rule with `type: 'image'` to get dimensions and size for each URL.
