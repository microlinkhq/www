---
title: 'screenshot'
description: 'Capture any URL as a hosted image with the Microlink SDK: full page, element, JPEG quality, transparent background, browser overlays, device emulation, and short video recordings.'
---

Any URL as a hosted image. The result is an asset object with `url`, `type`, `width`, `height`, `size`, and `size_pretty`:

```js
const { url } = await microlink.screenshot('https://example.com', {
  fullPage: true
})
```

The image is uploaded to the Microlink CDN and cached according to [ttl](/docs/api/parameters/ttl), so the same call returns the same `url` until the cache expires.

## Options

- [fullPage](/docs/api/parameters/screenshot/fullPage) `<boolean>` — captures the entire scrollable page instead of the visible viewport (default: `false`).
- [type](/docs/api/parameters/screenshot/type) `<string>` — the image format, `'png'` or `'jpeg'` (default: `'png'`).
- [quality](/docs/api/parameters/screenshot/quality) `<number>` — the JPEG compression quality, from `0` to `100`; only applied when type is `'jpeg'` (default: `80`).
- [element](/docs/api/parameters/screenshot/element) `<string>` — captures only the DOM element matching the CSS selector, waiting for it to be visible.
- [omitBackground](/docs/api/parameters/screenshot/omitBackground) `<boolean>` — omits the default white background, producing transparent captures (default: `false`).
- [overlay](/docs/api/parameters/screenshot/overlay) `<object>` — composes the capture over a `browser` frame (`'light'` or `'dark'`) and a `background` color, gradient, or image URL.
- [codeScheme](/docs/api/parameters/screenshot/codeScheme) `<string>` — syntax-highlights JSON and text responses using a Prism theme or a remote CSS URL (default: `'atom-dark'`).
- [animated](/docs/api/parameters/screenshot/animated) `<boolean> | <object>` — records a short video of the page instead of a static image (default: `false`). As an object it takes `duration`, the recording length in milliseconds and also accepting `'5s'` form (default: `5000`, max `10000`), `fps` (default: `30`, max `60`), and `type`, the video container — `'mp4'` or `'webm'` (default: `'mp4'`).
- `optimizeForSpeed` `<boolean>` — prioritizes capture speed over image size and fidelity (default: `false`).

Any [shared option](/docs/sdk/getting-started/options) composes naturally here: [device](/docs/api/parameters/device) emulation, [colorScheme](/docs/api/parameters/colorScheme), custom [styles](/docs/api/parameters/styles), or [waitForSelector](/docs/api/parameters/waitForSelector) timing all apply before the capture happens.

## Examples

Capture a single element with a transparent background:

```js
const { url } = await microlink.screenshot('https://codepen.io/fossheim/full/oNjxrZa', {
  element: '#result-iframe-wrap',
  omitBackground: true
})
```

Compose a compressed JPEG over a browser frame and a gradient:

```js
const { url } = await microlink.screenshot('https://www.apple.com/music', {
  type: 'jpeg',
  quality: 60,
  overlay: {
    browser: 'dark',
    background: 'linear-gradient(225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)'
  }
})
```

Emulate a phone in dark mode, dismiss the cookie banner, and wait for the hero to render:

```js
const { url, width, height } = await microlink.screenshot('https://example.com', {
  device: 'iPhone 11',
  colorScheme: 'dark',
  click: '.cookie-accept',
  waitForSelector: '#hero'
})
```

Record the page as a short video instead of a static image. Passing `animated: true` records with the defaults; passing an object tunes the result:

```js
const { animated } = await microlink.screenshot(
  'https://threejs.org/examples/webgl_animation_skinning_blending',
  { animated: { duration: '8s', fps: 60, type: 'webm' } }
)

console.log(animated.url, animated.type)
```

The asset gains an `animated` object carrying the recording — its `url`, `duration`, `fps`, `type`, and `size`.

## Serving the image

The hosted `url` can go straight into an `img` tag. For a URL you can embed without calling the SDK at request time — an `og:image`, a README badge, a CSS background — build the API URL with the [embed](/docs/api/parameters/embed) parameter instead; see [delivery and embedding](/docs/guides/screenshot/embedding) in the screenshot guide.

See the [screenshot guide](/docs/guides/screenshot) for customizing output, browser settings, page interaction, caching, and private pages.
