---
title: 'Collections'
description: 'Sweep any page with the Microlink SDK and get every matching resource back as an array: links, images, videos, audios, and email addresses.'
---

The collection methods sweep a page and return every matching resource as a deduplicated array. `links`, `images`, `videos`, and `audios` resolve their values to absolute URLs; `emails` returns bare address strings. Each method ships a sensible default rule — which elements to sweep and which attribute to read — and the same four options override it:

- [selectorAll](/docs/mql/data/selectorAll) `<string> | <string[]>` — the CSS selector(s) whose every match gets swept.
- [selector](/docs/mql/data/selector) `<string>` — sweeps only the first element matching the CSS selector.
- [attr](/docs/mql/data/attr) `<string>` — the attribute read from each matched element.
- [type](/docs/mql/data/type) `<string>` — how each value is validated and normalized, e.g. `'url'` or `'email'`.

Any [shared option](/docs/sdk/getting-started/options) applies too — `prerender`, `waitForSelector`, and friends.

## links

Sweeps every `a` element and returns each `href` as an absolute, deduped URL. Scope it with `selectorAll`:

```js
const links = await microlink.links('https://example.com', {
  selectorAll: 'nav a'
})
```

## images

Sweeps every `img` element and returns each `src`:

```js
const images = await microlink.images('https://example.com')
```

When a gallery lazy-loads, point `attr` at the attribute carrying the real source:

```js
const images = await microlink.images('https://example.com/gallery', {
  selectorAll: 'img[data-src]',
  attr: 'data-src'
})
```

## videos

Sweeps `video` elements and their `source` children, returning each `src`:

```js
const videos = await microlink.videos('https://example.com')
```

## audios

Sweeps `audio` elements and their `source` children, returning each `src`:

```js
const audios = await microlink.audios('https://example.com')
```

## emails

Scans the whole document — `mailto:` links and plain text — and returns every address found as a bare string, with any `mailto:` prefix stripped:

```js
const emails = await microlink.emails('https://microlink.io')

console.log(emails)
// => ['hello@microlink.io', 'you@domain.com']
```
