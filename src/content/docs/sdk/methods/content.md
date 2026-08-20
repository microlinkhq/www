---
title: 'Content'
description: 'Turn any URL into rendered output with the Microlink SDK: unified metadata, Markdown, HTML, plain text, screenshots, PDFs, logos, and embeds.'
---

The content methods turn a URL into rendered output — structured data, documents, and hosted assets. Every method follows the same `method(url, options)` shape: the options listed under each method nest under the right API parameter automatically, and any [shared option](/docs/sdk/getting-started/options) — `device`, `ttl`, `prerender`, and friends — can ride along with them.

## metadata

Unified metadata from Open Graph, Twitter Cards, JSON-LD, and HTML:

```js
const { title, description, image } = await microlink.metadata('https://vercel.com')
```

It has no method-specific options, but the shared ones shine here — for instance, [palette](/docs/api/parameters/palette) adds dominant colors and accessible color pairs to every image field:

```js
const { image } = await microlink.metadata('https://vercel.com', {
  palette: true
})

console.log(image.background_color, image.color)
```

See [data fields](/docs/api/getting-started/data-fields) for everything the response can carry.

## markdown

The page as clean Markdown, ready for LLM context windows:

```js
const markdown = await microlink.markdown('https://example.com', {
  selector: 'article'
})
```

Options:

- [selector](/docs/mql/data/selector) `<string>` — scopes the conversion to the first element matching the CSS selector.
- [selectorAll](/docs/mql/data/selectorAll) `<string> | <string[]>` — scopes the conversion to every matching element.
- [type](/docs/mql/data/type) `<string>` — overrides how the extracted value is normalized, per the [MQL rules grammar](/docs/mql/rules/basic).

## html

Fully rendered HTML, captured after JavaScript runs. It takes the same scoping options as [markdown](#markdown):

```js
const html = await microlink.html('https://example.com', {
  selector: 'main'
})
```

## text

Readable plain text with the markup stripped out, with the same scoping options as [markdown](#markdown):

```js
const text = await microlink.text('https://example.com')
```

## screenshot

Any URL as a hosted image. The result is an asset object with `url`, `type`, `width`, `height`, and `size`:

```js
const { url } = await microlink.screenshot('https://example.com', {
  fullPage: true
})
```

Options:

- [fullPage](/docs/api/parameters/screenshot/fullPage) `<boolean>` — captures the entire scrollable page instead of the visible viewport (default: `false`).
- [type](/docs/api/parameters/screenshot/type) `<string>` — the image format, `'png'` or `'jpeg'` (default: `'png'`).
- [quality](/docs/api/parameters/screenshot/quality) `<number>` — the JPEG compression quality, from `0` to `100`; only applied when type is `'jpeg'` (default: `80`).
- [element](/docs/api/parameters/screenshot/element) `<string>` — captures only the DOM element matching the CSS selector, waiting for it to be visible.
- [omitBackground](/docs/api/parameters/screenshot/omitBackground) `<boolean>` — omits the default white background, producing transparent captures (default: `false`).
- [overlay](/docs/api/parameters/screenshot/overlay) `<object>` — composes the capture over a `browser` frame (`'light'` or `'dark'`) and a `background` color, gradient, or image URL.
- [codeScheme](/docs/api/parameters/screenshot/codeScheme) `<string>` — syntax-highlights JSON and text responses using a Prism theme or a remote CSS URL (default: `'atom-dark'`).
- [animated](/docs/api/parameters/screenshot/animated) `<boolean>` — records a short MP4 of the page instead of a static image (default: `false`).
- `optimizeForSpeed` `<boolean>` — prioritizes capture speed over image size and fidelity (default: `false`).

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

Record the page as a short MP4 — the asset gains an `animated` object pointing to the video:

```js
const { animated } = await microlink.screenshot(
  'https://threejs.org/examples/webgl_animation_skinning_blending',
  { animated: true }
)

console.log(animated.url)
```

Shared options compose naturally here: [device](/docs/api/parameters/device) emulation, custom [styles](/docs/api/parameters/styles), or [waitForSelector](/docs/api/parameters/waitForSelector) timing all apply before the capture happens.

## pdf

Print any URL to PDF. The result is an asset object pointing to the hosted document:

```js
const { url } = await microlink.pdf('https://example.com', { format: 'A4' })
```

Options:

- [format](/docs/api/parameters/pdf/format) `<string>` — the paper format: `'Letter'`, `'Legal'`, `'Tabloid'`, `'Ledger'`, or `'A0'` to `'A6'` (default: `'A4'`).
- [landscape](/docs/api/parameters/pdf/landscape) `<boolean>` — prints in landscape orientation.
- [margin](/docs/api/parameters/pdf/margin) `<string> | <object>` — the paper margins, as a unit-labeled value (`'4mm'`) or an object with `top`/`right`/`bottom`/`left` sides (default: `'0.35cm'`).
- [scale](/docs/api/parameters/pdf/scale) `<number>` — the rendering zoom, between `0.1` and `2` (default: `0.6`).
- [pageRanges](/docs/api/parameters/pdf/pageRanges) `<string>` — the pages to print, e.g. `'1-5, 8, 11-13'`.
- [width](/docs/api/parameters/pdf/width) `<string> | <number>` — a custom paper width, accepting unit-labeled values (`'640px'`).
- [height](/docs/api/parameters/pdf/height) `<string> | <number>` — a custom paper height, accepting unit-labeled values (`'480px'`).
- `printBackground` `<boolean>` — includes background graphics in the printed output.

Print the first three pages on landscape Letter paper with asymmetric margins:

```js
const { url } = await microlink.pdf('https://basecamp.com/shapeup/0.3-chapter-01', {
  format: 'Letter',
  landscape: true,
  margin: { top: '1cm', right: '4mm', bottom: '1cm', left: '4mm' },
  pageRanges: '1-3'
})
```

Or drop the standard formats entirely and print onto custom paper:

```js
const { url } = await microlink.pdf('https://www.raycast.com', {
  width: '640px',
  height: '480px',
  scale: 0.8,
  printBackground: true
})
```

## logo

The brand logo behind any URL:

```js
const { url } = await microlink.logo('https://github.com', { square: true })
```

Options:

- `square` `<boolean>` — prefers a square variant of the logo when available.

## embed

oEmbed-style iframe HTML for rich cards:

```js
const { html } = await microlink.embed('https://www.youtube.com/watch?v=9P6rdqiybaw', {
  maxWidth: 350
})
```

Options:

- `maxWidth` `<number>` — the maximum width of the embedded resource, in pixels.
- `maxHeight` `<number>` — the maximum height of the embedded resource, in pixels.

Both are forwarded per the [oEmbed spec](https://oembed.com/), so support depends on each provider. See the [iframe parameter](/docs/api/parameters/iframe) for the list of supported providers.
