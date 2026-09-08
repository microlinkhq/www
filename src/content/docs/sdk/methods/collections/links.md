---
title: 'links'
description: 'Get every link on a page as an array of absolute, deduplicated URLs with the Microlink SDK, optionally scoped to a CSS selector.'
---

Sweeps every `a` element and returns each `href` as an absolute, deduped URL:

```js
const links = await microlink.links('https://example.com')
```

Relative hrefs are resolved against the page URL, and values that don't parse as a URL — `mailto:`, `javascript:`, empty anchors — are dropped by the `'url'` [type](/docs/sdk/methods/extract/type).

## Options

The [collection options](/docs/sdk/methods/collections#options) override the default rule of `selectorAll: 'a'`, `attr: 'href'`, and `type: 'url'`.

## Examples

Only the navigation links:

```js
const links = await microlink.links('https://example.com', {
  selectorAll: 'nav a'
})
```

Links on a client-side rendered page:

```js
const links = await microlink.links('https://app.example.com', {
  prerender: true,
  waitForSelector: 'main a'
})
```

External links only, filtered on your side:

```js
const { hostname } = new URL('https://example.com')
const links = await microlink.links('https://example.com')
const external = links.filter(link => new URL(link).hostname !== hostname)
```

For each link's text alongside its URL, write a nested rule with [extract](/docs/sdk/methods/extract).
