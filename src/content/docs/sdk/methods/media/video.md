---
title: 'video'
description: 'Get the primary video of any URL as a direct, playable asset with the Microlink SDK, with duration, dimensions, size, and format.'
---

The primary video of the page as a direct, playable asset:

```js
const { url, type } = await microlink.video('https://vimeo.com/76979871')
```

It resolves to an asset object with `url`, `type`, `duration`, `duration_pretty`, `width`, `height`, `size`, and `size_pretty`, or `null` when no video is detected. The URL is in a browser-friendly format, so it can be embedded directly:

```js
const video = await microlink.video('https://www.youtube.com/watch?v=9P6rdqiybaw')

console.log(video.type) // 'mp4'
console.log(video.duration_pretty) // '9m'
console.log(video.width, video.height) // 1280 720
```

It has no method-specific options; the [shared options](/docs/sdk/getting-started/options) apply. See the [video parameter](/docs/api/parameters/video) for the detection details.

## Examples

Render the detected video with a poster image from the same page:

```js
const [video, { image }] = await Promise.all([
  microlink.video(url),
  microlink.metadata(url)
])

player.src = video.url
player.poster = image.url
```

Or get both in one request by asking [metadata](/docs/sdk/methods/metadata) for the video field:

```js
const { image, video } = await microlink.metadata(url, { video: true })
```

For every `video` element on a page rather than the primary one, use the [videos](/docs/sdk/methods/collections/videos) collection. To get the provider's own player instead of a raw file, use [embed](/docs/sdk/methods/embed).
