---
title: 'WebGL Without a GPU'
subtitle: 'How one Chrome flag makes 3D pages render 4× faster'
description: 'How Microlink renders WebGL screenshots on a GPU-less fleet: the ANGLE backend, why SwiftShader is slow, how Mesa llvmpipe JIT-compiles the pipeline with LLVM, the Xvfb surface requirement, and the 2D fallback we guard against in CI.'
authors:
  - kiko
date: '2026-06-29'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Figcaption } from 'components/markdown/Figcaption'
import { Video } from 'components/markdown/Video'
import { BrowserlessReport } from 'components/pages/blog/webgl-without-a-gpu'

A lot of the web is WebGL now: 3D maps, seat charts, product configurators, shader-art landing pages. Those were also the slowest pages you could ask Microlink to [screenshot](/docs/api/parameters/screenshot), and the ones most likely to time out. Switching a single Chrome flag fixed most of it. This post walks through why, and the things that flag turned out to depend on.

<Video src="/images/screenshot-animated.mp4" />

<Figcaption>A WebGL page (three.js) captured as an [animated screenshot](/tools/website-screenshot/animated), rendered through Mesa llvmpipe on a GPU-less node</Figcaption>

The short version: our servers have no GPU, but WebGL still has to render somewhere. Chrome's default software path (SwiftShader) took around 24 seconds per 3D page. Pointing Chrome's graphics layer at Mesa llvmpipe instead (`--use-angle=gl`) brought that down to about 6 seconds. The flag is one line; the display setup, the from-source Mesa build, and keeping it on the fast path are the rest of the work.

## The constraint

Our browser fleet runs on commodity Linux nodes with no graphics card and no `/dev/dri`. That keeps the machines cheap and means there are no GPU drivers to maintain. The downside is that WebGL is a GPU API, so without one, something has to emulate it on the CPU. The renderer we pick for that emulation is what separated a 24-second screenshot from a 6-second one.

## How Chrome renders WebGL

Chrome doesn't rasterize WebGL itself. It hands the GL commands to **[ANGLE](https://chromium.googlesource.com/angle/angle/)**, which translates them to whatever backend the platform offers: Direct3D on Windows, Metal on macOS, native OpenGL or Vulkan on Linux, or a software renderer when there's no GPU at all.

On a GPU-less node that software renderer is all you have, and Chrome ships two. The default is **SwiftShader**, its own bundled rasterizer. The other is the system OpenGL stack, which on our Linux nodes resolves to **[Mesa llvmpipe](https://docs.mesa3d.org/drivers/llvmpipe.html)**. Both draw the same pixels on the CPU, but they are far apart on speed.

## SwiftShader versus llvmpipe

SwiftShader is built to draw correctly anywhere, so it emulates the pipeline conservatively. On a heavy 3D scene that costs around 24 seconds, while the 2D pages next to it finish in 2 to 3.

llvmpipe takes a different approach, and two design choices account for most of the difference. It uses LLVM to JIT-compile the active shader and GL state into native x86-64, so the inner loop runs compiled rather than interpreted. And it rasterizes in tiles spread across worker threads, so it uses all the cores instead of one. The result is the same image, several times faster.

## The flag change

The actual change is a single launch flag:

```diff
- '--use-angle=swiftshader',
+ '--use-angle=gl',
```

Two flags that show up in almost every headless setup quietly break this path, so they have to stay out. `--disable-gpu` forces Chrome back onto SwiftShader, and it's the most-copied flag in the genre. `--in-process-gpu` removes the GPU process that ANGLE binds its GL surface to.

## You also need an X display

`--use-angle=gl` has to bind a GL surface, and on Linux that requires an X display even in headless mode. Without one, WebGL doesn't error: it silently falls back to a flat 2D rasterizer. The screenshot still succeeds and the request still returns `200`, but the output is wrong in a way that's easy to miss.

To avoid that, every container starts a virtual display ([Xvfb](https://en.wikipedia.org/wiki/Xvfb)) before Chrome launches, and sets `LIBGL_ALWAYS_SOFTWARE=1` so Mesa stays on llvmpipe.

## Building Mesa from source

Ubuntu jammy's packaged Mesa is too old for this, and the PPAs that used to backport newer versions are gone. So the base image builds its own:

```bash
meson setup build \
  -Dbuildtype=release -Dgallium-drivers=llvmpipe -Dvulkan-drivers= \
  -Dllvm=enabled -Dshared-llvm=enabled
```

It builds llvmpipe only, skips Vulkan, and links shared LLVM, which is what the JIT relies on. The toolchain to compile it is large (LLVM, clang, Rust, around 160 `-dev` packages), so the Dockerfile is multi-stage: Mesa compiles in a builder stage, and the final image copies only the resulting libraries. That keeps the runtime image at roughly 2.65GB instead of 4.5GB.

## Checking what a node actually renders

You can't tell which renderer a node is using by looking at the machine. `apt list` reports the packaged Mesa, not the one we side-loaded over it, and the real answer is only available inside a running page. So [browserless](https://github.com/microlinkhq/browserless) has a `report()` method that queries the live GL context directly:

<BrowserlessReport />

<Figcaption>`browserless.report()` from a production node. Expand `gpu` and `cpu` for the full picture.</Figcaption>

The fields under `gpu` are the ones that matter here. `type` reads `software` with a `device` of `llvmpipe`; a `device` of `swiftshader` would mean we'd fallen back, and `hardware` would mean a real GPU had appeared. `mesa` comes from the `libgallium-<ver>.so` that's actually loaded, not from dpkg, which still reports the stale packaged version. And `simdWidth: 256` shows llvmpipe running on AVX2, which accounts for a good part of the speed.

Passing `report({ benchmark: true })` adds a `performance` block: a deterministic shader benchmark that runs in about 300ms on llvmpipe and is useful for comparing two nodes.

## Guarding it in CI

The flat 2D fallback is the dangerous case because it looks like success. So CI runs `report()` and asserts that `gpu.type` is `software` and `gpu.device` is `llvmpipe`. If a flag change, a missing display, or a Mesa regression knocks Chrome off the fast path, the build fails instead of shipping flat 3D. The same check runs against production pods.

## How we measured it

The change is one line, but settling on the right line took a while, mostly because two things made measurement misleading.

The first is the dev machine. A laptop or CI runner has a real GPU, so it renders pages that come out black on a GPU-less prod node. Benchmarking on hardware with a GPU tells you nothing about hardware without one, so every number had to come from production-shaped machines.

The second is variance. llvmpipe pays a one-time JIT cost on its first draw, each page has its own first-paint timing, and nodes under load share cores between captures. Some of the fastest results turned out to be the flat fallback, which finished about a second quicker precisely because it rendered nothing real. To get a number we could trust, we added the deterministic benchmark above: a fixed shader, a fixed frame count, each frame forced to complete. With that, the comparison was consistent: SwiftShader around 24 to 31 seconds, llvmpipe around 6 warm and correct.

## Results

Same 3D chart, same GPU-less hardware, measured on production:

| | SwiftShader (before) | Mesa llvmpipe (after) |
| --- | --- | --- |
| Render time (isolated) | ~24s | **~6s (~4×)** |
| Render time (under load) | ~24s | **7–14s (~2×)** |
| Failed requests | timed out → errors | none |
| Active renderer | SwiftShader | llvmpipe (asserted in CI) |

In isolation the chart finishes in about 6 seconds. Under real traffic, where captures share cores, it's closer to 2×. In both cases the requests that used to time out now complete.

<MultiCodeEditorInteractive
  mqlCode={{
    url: 'https://threejs.org/examples/webgl_animation_skinning_blending',
    screenshot: { animated: true }
  }}
/>

<Figcaption>A WebGL page captured live through ANGLE and Mesa llvmpipe. See the [animated screenshot docs](/docs/api/parameters/screenshot/animated) for the parameters.</Figcaption>

## Where it still falls short

Software rendering closes most of the gap to a real GPU, but not all of it. Heavy fragment-shader heroes can still come back black, because the canvas hasn't painted its first frame by the time the capture fires. That's a first-paint timing problem rather than a renderer one, and no backend flag fixes it. The two real fixes are gating the capture on first paint, or putting real GPUs on those nodes; we're working on the first.

For everything short of that, moving from SwiftShader to llvmpipe turned our slowest and flakiest requests into ordinary ones.
