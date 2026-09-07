---
title: 'collections'
description: 'Sweep any page with the Microlink SDK and get every matching resource back as an array: links, images, videos, audios, and email addresses, with the same four options to override the default rule.'
---

The collection methods sweep a page and return every matching resource as a deduplicated array. There are five of them:

- [links](/docs/sdk/methods/collections/links) — every `href` on the page, as absolute URLs.
- [images](/docs/sdk/methods/collections/images) — every image `src`.
- [videos](/docs/sdk/methods/collections/videos) — every `video` source.
- [audios](/docs/sdk/methods/collections/audios) — every `audio` source.
- [emails](/docs/sdk/methods/collections/emails) — every email address, as bare strings.

`links`, `images`, `videos`, and `audios` resolve their values to absolute URLs; `emails` returns address strings. All of them resolve to an empty array when nothing matches, never to `null`:

```js
const links = await microlink.links('https://example.com')

console.log(links) // ['https://www.iana.org/domains/example']
```

## Options

Each method ships a sensible default rule — which elements to sweep and which attribute to read — and the same four options override it:

- [selectorAll](/docs/sdk/mql/data/selectorAll) `<string> | <string[]>` — the CSS selector(s) whose every match gets swept.
- [selector](/docs/sdk/mql/data/selector) `<string>` — sweeps only the first element matching the CSS selector.
- [attr](/docs/sdk/mql/data/attr) `<string>` — the attribute read from each matched element.
- [type](/docs/sdk/mql/data/type) `<string>` — how each value is validated and normalized, e.g. `'url'` or `'email'`.

Any [shared option](/docs/sdk/getting-started/options) applies too — [prerender](/docs/api/parameters/prerender) and [waitForSelector](/docs/api/parameters/waitForSelector) for content rendered on the client, or [headers](/docs/api/parameters/headers) for pages behind a login.

Scope a sweep to one region of the page:

```js
const links = await microlink.links('https://example.com', {
  selectorAll: 'nav a'
})
```

Under the hood every collection is an [extraction rule](/docs/sdk/mql/rules/basic) with `selectorAll`, `attr`, and `type`; when you need a shape these five don't cover, write the rule yourself with [extract](/docs/sdk/methods/extract).
