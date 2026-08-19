---
title: 'Collections'
description: 'Sweep any page with the Microlink SDK and get every matching resource back as an array: links, images, videos, audios, and email addresses.'
---

The collection methods sweep a page and return every matching resource as a deduplicated array of absolute URLs. Use `selectorAll` to scope the sweep to a region of the page.

## links

Matching hrefs as absolute, deduped URLs:

```js
const links = await microlink.links('https://example.com', {
  selectorAll: 'nav a'
})
```

## images

Image assets collected from the page:

```js
const images = await microlink.images('https://example.com')
```

## videos

Video sources collected from the page:

```js
const videos = await microlink.videos('https://example.com')
```

## audios

Audio sources collected from the page:

```js
const audios = await microlink.audios('https://example.com')
```

## emails

Addresses found in `mailto:` links and plain text:

```js
const emails = await microlink.emails('https://microlink.io')
```
