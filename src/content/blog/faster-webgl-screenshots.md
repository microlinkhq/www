---
title: 'How we made WebGL screenshots up to 3× faster'
subtitle: 'Cutting 3D render time from ~23.6s to 7–14s'
description: 'WebGL-heavy pages (3D maps, charts, and games) used to be slow and timeout-prone to screenshot. By switching our headless browser from SwiftShader to Mesa llvmpipe, they now render up to 3× faster, with no timeouts.'
authors:
  - kiko
date: '2026-06-15'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Figcaption } from 'components/markdown/Figcaption'

WebGL pages now render **up to 3× faster** when you ask [Microlink](/docs/api/getting-started/overview) to [screenshot](/docs/api/parameters/screenshot) them, and the timeouts that used to fail them are gone. That covers interactive 3D maps, seating charts, data visualizations, product configurators, and even whole games.

**TL;DR**

- WebGL pages now render **up to 3× faster** when you screenshot them, and the timeouts that used to fail them are gone.
- The fix was one renderer swap in the headless Chrome behind the API: from SwiftShader to Mesa llvmpipe.
- The same 3D chart went from **~23.6s** to **7–14s** on production, with no failed requests.
- In isolation it finishes in about **6 seconds, a 4× improvement**. Under real production traffic, expect closer to **2×**.
- There is nothing to configure: any screenshot or PDF of a WebGL page goes through llvmpipe.

Until this change, those pages were the slowest thing you could ask the API to capture. The fix was one renderer swap in the headless Chrome behind the API: from SwiftShader to [Mesa llvmpipe](https://docs.mesa3d.org/drivers/llvmpipe.html).

## A 3D seat map took 24 seconds to screenshot

A customer running 3D seat maps reported that their thumbnails were painfully slow, around **24 seconds** each, and that some never finished at all and came back as errors.

When we pulled the traces, nearly all of that time was spent inside the browser, waiting for the 3D scene to paint. The 2D pages next to them rendered in 2–3 seconds. Only the WebGL ones were slow, and the slowest of them hit our render timeout and failed outright.

## Without a GPU, Chrome falls back to SwiftShader

WebGL is GPU technology: the browser hands the 3D scene to a graphics card to draw. The Linux servers that run a headless browser at scale, ours included, don't have a GPU.

When Chrome can't find a GPU, it falls back to **SwiftShader**, a software renderer that emulates a graphics card on the CPU. It is correct and portable, which is why it is the default. It is also slow: for a geometry-heavy 3D scene, emulating a full graphics pipeline on the CPU is what cost those 24 seconds.

2D content such as SVG and canvas doesn't go through this path, which is why only WebGL pages were affected.

## llvmpipe compiles the graphics pipeline to machine code

[Mesa llvmpipe](https://docs.mesa3d.org/drivers/llvmpipe.html) is also a software rasterizer, but it JIT-compiles the graphics pipeline to native machine code with LLVM and spreads the work across every core. For a geometry-heavy 3D scene, that design gets through the work far faster than SwiftShader.

Chrome doesn't rasterize WebGL itself. It delegates to **ANGLE**, which targets a backend. [browserless](https://browserless.js.org/) is our own headless browser runner behind the API, so the change lives in the flags [browserless](https://github.com/microlinkhq/browserless) launches Chrome with:

- **Before:** `--use-angle=swiftshader`, the self-contained software path.
- **After:** `--use-angle=gl`, which binds ANGLE to the system OpenGL stack, meaning Mesa llvmpipe on our GPU-less Linux nodes.

We validated the switch end-to-end on production, on the exact pages that were slow, confirming the renderer was llvmpipe and the output was pixel-identical.

## The same chart now renders in 7–14s

Same 3D chart, same hardware, measured on production:

| | Before (SwiftShader) | After (Mesa llvmpipe) |
| --- | --- | --- |
| Render time | ~23.6s | **7–14s** |
| Failed requests | timed out → errors | none |
| Output | correct 3D | correct 3D |

In isolation, a render with cores to spare, the same chart now finishes in about **6 seconds, a 4× improvement**. Under real production traffic, where many captures share each machine, you can expect closer to **2×**. Either way, the requests that used to time out now finish well inside the render timeout.

## The GL path needs a display, even headless

`--use-angle=gl` needs a display to bind a surface to, even in headless mode. So our images now boot a virtual display ([Xvfb](https://en.wikipedia.org/wiki/Xvfb)) before the browser starts.

Without that display, WebGL silently degrades back to a flat 2D fallback. We guard against it in CI by asserting the active renderer is always llvmpipe, never SwiftShader.

No software renderer will match a real GPU. For the headless, server-side rendering that powers Microlink, moving from `--use-angle=swiftshader` to `--use-angle=gl` on llvmpipe closes most of the gap and turns WebGL captures from the slowest, most fragile requests we served into ordinary ones.

For the rest of the stack, read [Microlink API: Browser automation](/blog/browser-automation), [What is a headless browser?](/blog/what-is-a-headless-browser), and [Microlink Proxy: How it works](/blog/microlink-proxy-how-it-works).

## Try it on a WebGL page

There is nothing to configure. Any [screenshot](/docs/api/parameters/screenshot) or [PDF](/docs/api/parameters/pdf) of a page that uses WebGL, whether a map, a chart, a 3D viewer, or a game, goes through llvmpipe. Run this request against the WebGL test page at `get.webgl.org`:

<MultiCodeEditorInteractive
  mqlCode={{
    url: 'https://get.webgl.org/',
    screenshot: true
  }}
/>

<Figcaption>A WebGL page captured with Microlink, rendered through Mesa llvmpipe.</Figcaption>
