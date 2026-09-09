---
title: 'audio'
description: 'Get the primary audio track of any URL as a direct asset with the Microlink SDK, with duration, size, and format.'
---

The primary audio track of the page as a direct asset:

```js
const { url } = await microlink.audio('https://open.spotify.com/track/3BovdzfaX4jb5KFQwoPfAw')
```

It resolves to an asset object with `url`, `type`, `duration`, `duration_pretty`, `size`, and `size_pretty`, or `null` when no audio is detected:

```js
const audio = await microlink.audio('https://open.spotify.com/track/1W2919zs8SBCLTrOB1ftQT')

console.log(audio.type) // 'mp3'
console.log(audio.duration_pretty) // '30s'
```

It has no method-specific options; the [shared options](/docs/sdk/getting-started/options) apply. See the [audio parameter](/docs/api/parameters/audio) for the detection details.

## Examples

Build a podcast entry with the track and the episode metadata in one request:

```js
const { title, publisher, audio } = await microlink.metadata(episodeUrl, { audio: true })

player.src = audio.url
caption.textContent = `${title} — ${publisher} (${audio.duration_pretty})`
```

For every `audio` element on a page rather than the primary track, use [audios](/docs/sdk/methods/audios).
