---
title: 'media'
description: 'Get the primary video or audio of any URL as a direct, playable asset with the Microlink SDK, resolved from the page rather than swept from its markup.'
---

The media methods detect the primary media of a page — the video a YouTube URL is about, the track a Spotify URL plays — and return it as a direct, browser-friendly asset. There are two of them:

- [video](/docs/sdk/methods/media/video) — the primary video of the page.
- [audio](/docs/sdk/methods/media/audio) — the primary audio track of the page.

Both follow the same `method(url, options)` shape and resolve to an asset object, or `null` when the page has no detectable media:

```js
const { url, type, duration_pretty } = await microlink.video('https://www.youtube.com/watch?v=9P6rdqiybaw')
```

The asset carries `url`, a direct URL in a browser-friendly format that can be dropped into a `video` or `audio` element; `type`, the container format such as `'mp4'` or `'mp3'`; `duration` in seconds and `duration_pretty`; `size` in bytes and `size_pretty`; and, for video, `width` and `height`.

Neither method has method-specific options; the [shared options](/docs/sdk/getting-started/options) apply. Detection can depend on the user agent the provider sees, so [device](/docs/api/parameters/device) is worth trying when a page returns `null`.

## Detection versus collection

These methods resolve *the* media of a page, using provider-specific extraction that works even when the media isn't in the markup. To sweep every `video` or `audio` element a page contains instead, use the [videos](/docs/sdk/methods/collections/videos) and [audios](/docs/sdk/methods/collections/audios) collections.

To get the media along with the title, description, and image in one call, pass `video: true` or `audio: true` to [metadata](/docs/sdk/methods/metadata).
