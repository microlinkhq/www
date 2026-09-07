---
title: 'videos'
description: 'Get every video source on a page as an array of absolute URLs with the Microlink SDK.'
---

Sweeps `video` elements and their `source` children, returning each `src` as an absolute, deduped URL:

```js
const videos = await microlink.videos('https://example.com')
```

## Options

The [collection options](/docs/sdk/methods/collections#options) override the default rule of `selectorAll: ['video[src]', 'video source[src]']`, `attr: 'src'`, and `type: 'url'`.

## Examples

Only the videos inside the article body:

```js
const videos = await microlink.videos('https://example.com/post', {
  selectorAll: 'article video source'
})
```

Poster images instead of the sources:

```js
const posters = await microlink.videos('https://example.com', {
  selectorAll: 'video[poster]',
  attr: 'poster'
})
```

This sweeps the markup; a YouTube or Vimeo page has no `video` element with a direct source. For the primary video of such a page, resolved through the provider, use [video](/docs/sdk/methods/media/video).
