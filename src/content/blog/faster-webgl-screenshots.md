---
title: 'Faster WebGL Screenshots'
subtitle: 'How we made 3D pages render up to 3× faster'
description: 'WebGL-heavy pages — 3D maps, charts, and games — used to be slow and timeout-prone to screenshot. By switching our headless browser from SwiftShader to Mesa llvmpipe, they now render up to 3× faster, with no timeouts.'
authors:
  - kiko
date: '2026-06-15'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Figcaption } from 'components/markdown/Figcaption'

More of the web is rendered with WebGL than you'd think: interactive 3D maps, seating charts, data visualizations, product configurators, even whole games. They look great in a browser — and, until recently, they were the slowest thing you could ask [Microlink](/docs/api/getting-started/overview) to [screenshot](/docs/api/parameters/screenshot).

Today that changes. WebGL pages now render **up to 3× faster**, and the timeouts that used to fail them are gone.

## The problem

A customer running 3D seat maps reported that their thumbnails were painfully slow — around **24 seconds** each — and that some never finished at all, coming back as errors.

When we pulled the traces, the picture was clear: nearly all of that time was spent inside the browser, waiting for the 3D scene to paint. The 2D pages next to them rendered in 2–3 seconds. Only the WebGL ones were slow, and the slowest of them hit our render timeout and failed outright.

## Why it happened

WebGL is GPU technology. But the servers that run a headless browser at scale — ours included — don't have a GPU.

When Chrome can't find a GPU, it falls back to **SwiftShader**, a software renderer that emulates a graphics card on the CPU. It's correct and portable, which is exactly why it's the default. It's also slow: for a geometry-heavy 3D scene, software-emulating a full graphics pipeline on the CPU is brutal. That's the 24 seconds.

2D content (SVG, canvas) doesn't go through this path, which is why only WebGL pages were affected.

## What changed

There's a faster way to render graphics on the CPU: **[Mesa llvmpipe](https://docs.mesa3d.org/drivers/llvmpipe.html)**, a software rasterizer that JIT-compiles the graphics pipeline to native machine code with LLVM and spreads the work across every core. For a geometry-heavy 3D scene, that design churns through the work far faster than SwiftShader.

So we switched [browserless](https://browserless.js.org/) — our own headless browser runner behind the API — to route WebGL through Mesa llvmpipe instead of SwiftShader. We validated it end-to-end on production, on the exact pages that were slow, confirming the renderer was llvmpipe and the output was pixel-identical.

## The numbers

Same 3D chart, same hardware, measured on production:

| | Before (SwiftShader) | After (Mesa llvmpipe) |
| --- | --- | --- |
| Render time | ~23.6s | **7–14s** |
| Failed requests | timed out → errors | none |
| Output | correct 3D | correct 3D |

In isolation — a render with cores to spare — the same chart now finishes in about **6 seconds, a 4× improvement**. Under real production traffic, where many captures share each machine, you can expect closer to **2×**. Either way, the requests that used to time out now comfortably finish.

## What you get

Nothing to configure. If you [screenshot](/docs/api/parameters/screenshot) or [PDF](/docs/api/parameters/pdf) pages that use WebGL — maps, charts, 3D viewers, games — they're simply faster and more reliable now.

<MultiCodeEditorInteractive
  mqlCode={{
    url: 'https://get.webgl.org/',
    screenshot: true
  }}
/>

<Figcaption>A WebGL page captured with Microlink — now rendered through Mesa llvmpipe</Figcaption>

## Under the hood

Chrome doesn't rasterize WebGL itself — it delegates to **ANGLE**, which targets a backend. The change is in the flags [browserless](https://github.com/microlinkhq/browserless) launches Chrome with:

- before: `--use-angle=swiftshader`, the self-contained software path.
- after: `--use-angle=gl`, which binds ANGLE to the system OpenGL stack — Mesa llvmpipe on our GPU-less Linux nodes.

The one catch: the GL path needs a display to bind a surface to, even in headless mode. So our images now boot a virtual display ([Xvfb](https://en.wikipedia.org/wiki/Xvfb)) before the browser starts. No display, and WebGL silently degrades back to a flat 2D fallback — which we specifically guard against in CI by asserting the active renderer is always llvmpipe, never SwiftShader.

If you want the broader context on the stack, see [what is a headless browser?](/blog/what-is-a-headless-browser).

## Final notes

No software renderer will ever match a real GPU. But for the headless, server-side rendering that powers Microlink, moving from SwiftShader to llvmpipe closes most of the gap — and turns WebGL captures from the slowest, most fragile requests we served into ordinary ones.

If you want more context around the stack, read:

- [Microlink API: Browser automation](/blog/browser-automation)
- [What is a headless browser?](/blog/what-is-a-headless-browser)
- [Microlink Proxy: How it works](/blog/microlink-proxy-how-it-works)
