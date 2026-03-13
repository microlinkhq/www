---
title: 'Customizing output'
description: 'Control what your Microlink screenshot captures and how it looks. Full-page mode, element targeting, format selection, transparent backgrounds, browser overlays, and code themes.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

By default, the API captures the visible viewport as a PNG. This section covers every option for changing what gets captured and how the output looks.

## Full-page screenshots

Set `screenshot.fullPage` to capture the entire scrollable content of a page, not just the viewport:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://microlink.io/recipes', screenshot: { fullPage: true }, meta: false }} />

<Figcaption>Full-page screenshots stitch together the entire scrollable area. Response time is longer for tall pages.</Figcaption>

This is useful for capturing landing pages, articles, or any content that extends below the fold. See the <Link href='/docs/api/parameters/screenshot/fullPage' children='fullPage reference' /> for details.

## Targeting a specific element

Use `screenshot.element` with a CSS selector to capture only a specific part of the page:

<MultiCodeEditorInteractive height={230} mqlCode={{ url: 'https://codepen.io/fossheim/full/oNjxrZa', screenshot: { element: '#result-iframe-wrap' }, meta: false }} />

<Figcaption>The API waits for the element to appear and become visible before capturing.</Figcaption>

This is perfect for isolating embedded widgets, hero sections, charts, or any identifiable DOM node. The output image is cropped to the exact bounding box of the matched element.

## Output format

The default format is PNG. Switch to JPEG for smaller file sizes when you don't need transparency:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://www.netflix.com/title/80057281', screenshot: { type: 'jpeg' }, meta: false }} />

<Figcaption>JPEG files are typically 40–60% smaller than PNG. The CDN may also serve WebP automatically to supported browsers.</Figcaption>

| Format | Best for | Transparency |
|--------|----------|:------------:|
| `png`  | Lossless quality, transparent backgrounds | Yes |
| `jpeg` | Smaller file size, photos | No |

## Transparent backgrounds

Remove the default white background with `screenshot.omitBackground`:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://example.com', screenshot: { omitBackground: true }, meta: false }} />

<Figcaption>Combine with <code>type: 'png'</code> (the default) — JPEG does not support transparency.</Figcaption>

This is useful when the target page has transparent or semi-transparent areas and you want to preserve them — for instance, capturing a logo or a UI component to composite over a custom background.

## Browser overlay

The `screenshot.overlay` parameter wraps your screenshot in a realistic browser chrome, creating polished compositions for marketing materials, blog posts, or social cards:

<MultiCodeEditorInteractive height={275} mqlCode={{
  url: 'https://www.apple.com/music',
  screenshot: {
    overlay: {
      background: 'linear-gradient(225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)',
      browser: 'dark'
    }
  },
  meta: false
}} />

<Figcaption>The overlay adds a browser window frame around your screenshot with a custom background.</Figcaption>

The `overlay` object accepts two properties:

- **`browser`** — the window chrome theme: `'light'` or `'dark'`.
- **`background`** — supports hex/rgb/rgba colors, CSS gradients, or image URLs.

Some background examples:

```json
{ "background": "#F76698" }
{ "background": "rgba(0, 0, 0, 0.8)" }
{ "background": "linear-gradient(0deg, #330867 0%, #30CFD0 100%)" }
{ "background": "https://source.unsplash.com/random/1920x1080" }
```

## Code syntax theme

When the target URL returns JSON or plain text (like an API endpoint), the `screenshot.codeScheme` parameter applies syntax highlighting:

<MultiCodeEditorInteractive height={220} mqlCode={{
  url: 'https://api.microlink.io?url=https://github.com/microlinkhq',
  screenshot: { codeScheme: 'dracula' },
  meta: false
}} />

<Figcaption>Any <Link href='https://github.com/PrismJS/prism-themes' children='prism-themes' /> identifier or a remote CSS URL works.</Figcaption>

You can further customize the appearance by combining it with [styles](/docs/api/parameters/styles) to inject additional CSS. See the <Link href='/docs/api/parameters/screenshot/codeScheme' children='codeScheme reference' /> for all available themes.

## Filtering the response

If you only need the screenshot data and want to reduce payload size, use the `filter` parameter:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://github.com/microlinkhq', screenshot: true, meta: false, filter: 'screenshot' }} />

<Figcaption>The response will only include the <code>screenshot</code> field, stripping everything else. See the <Link href='/docs/api/parameters/filter' children='filter reference' /> for dot notation and multiple fields.</Figcaption>

## Custom filename <ProBadge />

The `filename` parameter lets you set a meaningful name for the screenshot asset:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://github.com/microlinkhq', screenshot: true, meta: false, filename: 'github-microlink' }} />

<Figcaption>The CDN-hosted file will use your custom name instead of a generated hash.</Figcaption>

## Next step

Learn how to control the browser environment — viewport, device emulation, and color scheme — in [browser settings](/docs/guides/screenshot/browser-settings).
