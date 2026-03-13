---
title: 'Screenshot'
description: 'Take your first website screenshot with Microlink API in under a minute. Learn the basics of the screenshot parameter with live, runnable examples.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Taking a screenshot with Microlink API requires two parameters: the target `url` and `screenshot: true`.

<MultiCodeEditorInteractive mqlCode={{ url: 'https://github.com/microlinkhq', screenshot: true }} />

<Figcaption>Hit Run to see the live result. The screenshot URL is returned under <code>data.screenshot.url</code>.</Figcaption>

That's it. The API spins up a headless browser, navigates to the URL, captures the visible viewport, and returns a CDN-hosted image you can use right away.

## The response

The `screenshot` field in the response contains everything you need:

```json
{
  "status": "success",
  "data": {
    "screenshot": {
      "url": "https://microlink-cdn.s3.amazonaws.com/s/...",
      "type": "png",
      "size": 183864,
      "width": 1920,
      "height": 1080,
      "size_pretty": "184 kB"
    }
  }
}
```

The image is served from a global CDN, cached for 24 hours by default, and automatically optimized — modern browsers receive WebP when supported.

## Skip metadata for faster responses

By default, the API also extracts page metadata (title, description, images, etc.). If you only need the screenshot, disable it:

<MultiCodeEditorInteractive height={200} mqlCode={{ url: 'https://github.com/microlinkhq', screenshot: true, meta: false }} />

<Figcaption>Setting <code>meta: false</code> skips metadata extraction, reducing response time.</Figcaption>

## Using the raw URL

You can call the API directly from your browser address bar:

```bash
https://api.microlink.io?url=https://github.com/microlinkhq&screenshot&meta=false
```

This returns JSON. To get the image directly (useful for embedding), see the [embedding](/docs/guides/screenshot/embedding) section.

## What's next

Now that you have a basic screenshot working, the following sections will help you get exactly the result you need:

- **[Customizing output](/docs/guides/screenshot/customizing-output)** — full-page captures, element targeting, format, overlays, and more.
- **[Browser settings](/docs/guides/screenshot/browser-settings)** — viewport size, device emulation, dark mode, and media type.
- **[Page interaction](/docs/guides/screenshot/page-interaction)** — click, scroll, wait, inject CSS/JS before the capture.
- **[Embedding](/docs/guides/screenshot/embedding)** — use screenshots in HTML, CSS, Markdown, and OG tags.
- **[Caching and performance](/docs/guides/screenshot/caching-and-performance)** — cache control, stale-while-revalidate, and optimization tips.
