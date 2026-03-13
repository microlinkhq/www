---
title: 'Browser settings'
description: 'Configure the headless browser before capturing a screenshot. Set viewport dimensions, emulate devices, force dark mode, control CSS media type, and manage animations.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

The headless browser that renders your screenshot can be configured to emulate different devices, screen sizes, and rendering preferences. These settings affect the entire page rendering, not just the screenshot output.

## Device emulation

The fastest way to simulate a specific device is the `device` parameter. It sets the viewport, user agent, and screen resolution in one go:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://microlink.io', screenshot: true, device: 'iPhone 15 Pro', meta: false }} />

<Figcaption>Device names are case-insensitive. The default is <code>'macbook pro 13'</code>.</Figcaption>

Supported devices include:

| Category | Examples |
|----------|---------|
| Mobile | iPhone 15 Pro Max, iPhone 14, Pixel 5, Galaxy S9+ |
| Tablet | iPad, iPad Pro, iPad Mini, Galaxy Tab S4 |
| Desktop | Macbook Pro 13, Macbook Pro 16, iMac 27 5K |

Capturing the same page across devices is as simple as changing the `device` value:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://microlink.io', screenshot: true, device: 'iPad', meta: false }} />

<Figcaption>Tablet viewport with the iPad preset.</Figcaption>

## Custom viewport

For fine-grained control, use `viewport` to set individual properties. Any values you provide are merged with the default device settings:

<MultiCodeEditorInteractive height={300} mqlCode={{
  url: 'https://en.wikipedia.org/wiki/Bob_Dylan',
  screenshot: true,
  viewport: { width: 640, height: 400, deviceScaleFactor: 2, isMobile: true },
  meta: false
}} />

<Figcaption>A custom 640×400 viewport at 2× pixel density with mobile meta viewport enabled.</Figcaption>

Available viewport properties:

| Property | Type | Description |
|----------|------|-------------|
| `width` | `<number>` | Page width in pixels |
| `height` | `<number>` | Page height in pixels |
| `deviceScaleFactor` | `<number>` | Pixel density (1 = standard, 2 = retina) |
| `isMobile` | `<boolean>` | Respect the `<meta viewport>` tag |
| `hasTouch` | `<boolean>` | Enable touch event support |
| `isLandscape` | `<boolean>` | Landscape orientation |

You can also override a single property while keeping the rest from the default device:

<MultiCodeEditorInteractive height={240} mqlCode={{
  url: 'https://en.wikipedia.org/wiki/Bob_Dylan',
  screenshot: true,
  viewport: { deviceScaleFactor: 0.5 },
  meta: false
}} />

<Figcaption>Same default viewport but at half the pixel density — useful for faster, lighter screenshots.</Figcaption>

## Color scheme (dark mode)

Force a page to render in light or dark mode using `colorScheme`:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://googlechromelabs.github.io/dark-mode-toggle/demo', screenshot: true, colorScheme: 'dark', meta: false }} />

<Figcaption>This sets the <code>prefers-color-scheme</code> CSS media feature in the browser.</Figcaption>

Supported values:

| Value | Effect |
|-------|--------|
| `'no-preference'` | Default — uses the site's default scheme |
| `'light'` | Forces light mode |
| `'dark'` | Forces dark mode |

This only works on sites that implement `prefers-color-scheme` media queries. If the site doesn't support it, the parameter has no effect.

## CSS media type

The `mediaType` parameter controls which CSS media rules are applied:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://en.wikipedia.org/wiki/Bob_Dylan', screenshot: true, mediaType: 'print', meta: false }} />

<Figcaption>The <code>'print'</code> media type activates print stylesheets — useful for capturing a cleaner, ad-free layout.</Figcaption>

| Value | Effect |
|-------|--------|
| `'screen'` | Standard web rendering (default for screenshots) |
| `'print'` | Print stylesheet rendering |

## Animations

CSS animations and transitions are **disabled by default** for screenshots, ensuring you capture a stable, deterministic state:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://vercel.com', screenshot: true, animations: false, meta: false }} />

<Figcaption>With <code>animations: false</code> (the default), all CSS animations and transitions are frozen. This also sets <code>prefers-reduced-motion: reduce</code>.</Figcaption>

Set `animations: true` if you want to capture a page mid-animation (for example, a hero section with an entrance effect), but be aware that the result may vary between captures.

## JavaScript execution

JavaScript is enabled by default. Disable it to capture a page as-if the browser had JS turned off:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://microlink.io', screenshot: true, javascript: false, meta: false }} />

<Figcaption>Useful for checking how a page degrades without JavaScript, or for capturing static HTML content faster.</Figcaption>

Disabling JavaScript means SPAs (React, Vue, Angular) will render their initial server-side HTML only.

## Custom headers

For pages that require authentication or serve different content based on headers, use `headers` (pro):

<MultiCodeEditorInteractive height={260} mqlCode={{
  url: 'https://example.com',
  screenshot: true,
  headers: { 'Accept-Language': 'es-ES', 'Cookie': 'session=abc123' },
  meta: false
}} />

<Figcaption>Set cookies, authorization tokens, language preferences, or any custom HTTP headers.</Figcaption>

## Next step

Learn how to interact with the page before capturing — clicking elements, scrolling, waiting, and injecting code — in [page interaction](/docs/guides/screenshot/page-interaction).
