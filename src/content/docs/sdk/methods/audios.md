---
title: 'audios'
description: 'Get every audio source on a page as an array of absolute URLs with the Microlink SDK.'
---

Sweeps `audio` elements and their `source` children, returning each `src` as an absolute, deduped URL:

```js
const audios = await microlink.audios('https://example.com')
```

## Options

Override the default rule of `selectorAll: ['audio[src]', 'audio source[src]']`, `attr: 'src'`, and `type: 'url'` with [selectorAll](/docs/sdk/methods/extract/selectorAll), [selector](/docs/sdk/methods/extract/selector), [attr](/docs/sdk/methods/extract/attr), or [type](/docs/sdk/methods/extract/type).

## Examples

Every episode file linked from a podcast archive, where the audio lives in plain links rather than `audio` elements:

```js
const episodes = await microlink.audios('https://example.com/podcast', {
  selectorAll: 'a[href$=".mp3"]',
  attr: 'href'
})
```

This sweeps the markup; a Spotify or SoundCloud page has no `audio` element with a direct source. For the primary track of such a page, resolved through the provider, use [audio](/docs/sdk/methods/audio).
