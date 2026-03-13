---
title: 'Customizing output'
description: 'Control what your Microlink screenshot captures and how it looks. Full-page mode, element targeting, format selection, transparent backgrounds, browser overlays, and code themes.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Once you have a working screenshot, the next step is deciding what to capture and how polished the final image should look. All of these options live under the `screenshot` object.

## Full-page screenshots

Set `screenshot.fullPage` to capture the entire scrollable content of a page instead of just the visible viewport:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://microlink.io/recipes', screenshot: { fullPage: true }, meta: false }} />

<Figcaption>Full-page screenshots stitch together the entire scrollable area. Response time is longer for tall pages.</Figcaption>

This is ideal for landing pages, long articles, and changelog pages. If you only need one section of a page, `screenshot.element` is usually faster and produces a smaller image. See the <Link href='/docs/api/parameters/screenshot/fullPage' children='fullPage reference' /> for details.

## Targeting a specific element

Use `screenshot.element` with a CSS selector to crop the output to one DOM node:

<MultiCodeEditorInteractive height={230} mqlCode={{ url: 'https://codepen.io/fossheim/full/oNjxrZa', screenshot: { element: '#result-iframe-wrap' }, meta: false }} />

<Figcaption>The API waits for the element to appear and become visible before capturing.</Figcaption>

This is the best option for widgets, charts, hero sections, pricing tables, or embedded components. Unlike `scroll`, which repositions the viewport, `element` changes the captured area itself.

## Output format

PNG is the default. Switch to JPEG when you care more about file size than lossless quality or transparency:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://github.com/microlinkhq', screenshot: { type: 'jpeg' }, meta: false }} />

<Figcaption><code>screenshot.type</code> controls the generated asset format. When that asset is later served through the Microlink CDN, compatible browsers may still receive an optimized format such as WebP.</Figcaption>

| Format | Best for | Transparency |
|--------|----------|:------------:|
| `png`  | Lossless quality, transparent backgrounds | Yes |
| `jpeg` | Smaller file size, photos | No |

## Transparent backgrounds

Remove the default white background with `screenshot.omitBackground`:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://example.com', screenshot: { omitBackground: true }, meta: false }} />

<Figcaption>Combine with <code>type: 'png'</code> (the default) — JPEG does not support transparency.</Figcaption>

This is useful when the target page has transparent or semi-transparent areas and you want to preserve them, for example when capturing a logo or UI component to composite over a custom background.

## Browser overlay

The `screenshot.overlay` parameter wraps your screenshot in a realistic browser chrome, creating polished compositions for marketing materials, blog posts, or social cards:

<MultiCodeEditorInteractive height={275} mqlCode={{
  url: 'https://microlink.io',
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

Use it when the screenshot itself is not enough and you want a presentation-ready asset for docs, social cards, announcements, or landing pages.

Some background examples:

```json
{ "background": "#F76698" }
{ "background": "rgba(0, 0, 0, 0.8)" }
{ "background": "linear-gradient(0deg, #330867 0%, #30CFD0 100%)" }
{ "background": "https://source.unsplash.com/random/1920x1080" }
```

## Code syntax theme

When the target URL returns JSON, HTML, or plain text, the `screenshot.codeScheme` parameter applies syntax highlighting before the screenshot is taken:

<MultiCodeEditorInteractive height={220} mqlCode={{
  url: 'https://api.microlink.io?url=https://github.com/microlinkhq',
  screenshot: { codeScheme: 'dracula' },
  meta: false
}} />

<Figcaption>Any <Link href='https://github.com/PrismJS/prism-themes' children='prism-themes' /> identifier or a remote CSS URL works.</Figcaption>

You can further customize the appearance by combining it with [styles](/docs/api/parameters/styles) to inject additional CSS. See the <Link href='/docs/api/parameters/screenshot/codeScheme' children='codeScheme reference' /> for all available themes.

## Next step

Learn how to control the browser environment — viewport, device emulation, and color scheme — in [browser settings](/docs/guides/screenshot/browser-settings).
