---
title: 'embed'
description: 'Get oEmbed-style iframe HTML for any URL with the Microlink SDK: ready-to-render markup and the scripts it needs, for hundreds of providers such as YouTube, X, Spotify, and TikTok.'
---

oEmbed-style iframe HTML for rich cards. It resolves to an object with `html`, the markup to render, and `scripts`, the script tags the markup depends on:

```js
const { html, scripts } = await microlink.embed('https://www.youtube.com/watch?v=9P6rdqiybaw')
```

Any URL implementing the [oEmbed](https://oembed.com/) specification is supported — hundreds of providers, from YouTube and X to Spotify and TikTok. See the [iframe parameter](/docs/api/parameters/iframe) for the list. It resolves to `null` when the provider doesn't expose an embed.

## Options

- `maxWidth` `<number>` — the maximum width of the embedded resource, in pixels.
- `maxHeight` `<number>` — the maximum height of the embedded resource, in pixels.

Both are forwarded per the oEmbed spec, so support depends on each provider. Any [shared option](/docs/sdk/getting-started/options) applies too.

## Examples

Constrain the player to the column it renders in:

```js
const { html } = await microlink.embed('https://www.youtube.com/watch?v=9P6rdqiybaw', {
  maxWidth: 350
})
```

Render a post whose widget needs a script, injecting both:

```js
const { html, scripts } = await microlink.embed('https://x.com/microlinkhq/status/1032664633960800257')

document.querySelector('#post').innerHTML = html

for (const { src, async } of scripts) {
  const script = document.createElement('script')
  script.src = src
  script.async = async
  document.body.append(script)
}
```

For a static card instead of the provider's player, use [metadata](/docs/sdk/methods/metadata) and render the fields yourself. For a drop-in component that does either, see [link preview](/link-preview).

See the [embed guide](/docs/guides/embed) for iframe versus card decisions, caching, and private pages.
