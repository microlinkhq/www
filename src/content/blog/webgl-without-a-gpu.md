---
title: 'WebGL Without a GPU'
subtitle: 'How one Chrome flag makes 3D pages render 4× faster'
description: 'A deep dive into how Microlink renders WebGL screenshots on a GPU-less fleet: the ANGLE delegation chain, why SwiftShader is slow, how Mesa llvmpipe JIT-compiles the pipeline with LLVM, the Xvfb surface requirement, and the silent 2D fallback we guard against in CI.'
authors:
  - kiko
date: '2026-06-29'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Figcaption } from 'components/markdown/Figcaption'
import { Video } from 'components/markdown/Video'
import { BrowserlessReport } from 'components/pages/blog/webgl-without-a-gpu'

WebGL is everywhere now: 3D maps, seat charts, product configurators, shader-art landing pages. It was also the slowest thing you could ask Microlink to [screenshot](/docs/api/parameters/screenshot). One Chrome flag fixed that.

<Video src="/images/screenshot-animated.mp4" />

<Figcaption>A WebGL page (three.js) captured as an [animated screenshot](/tools/website-screenshot/animated), rendered through Mesa llvmpipe on a GPU-less node</Figcaption>

**TL;DR**

- Our servers have no GPU. WebGL still has to render somewhere.
- Chrome's default software path (SwiftShader) took **~24s** per 3D page.
- Pointing ANGLE at Mesa llvmpipe (`--use-angle=gl`) dropped it to **~6s**.
- The one-line flag is the easy part. The display, the from-source Mesa, and proving it stays on the fast path are the rest of the story.

## No GPU, on purpose

Our browser fleet runs on commodity Linux nodes with no graphics card and no `/dev/dri`. Cheaper, simpler, fewer drivers to babysit. But WebGL is a GPU API, so without one, something has to emulate it on the CPU. *Which* something was the difference between a 24-second screenshot and a 6-second one.

## Chrome doesn't render WebGL. ANGLE does.

Chrome hands WebGL to **[ANGLE](https://chromium.googlesource.com/angle/angle/)**, which translates it to whatever backend the platform has: Direct3D, Metal, native OpenGL or Vulkan, or a software renderer when there's no GPU.

With no GPU, that software renderer is the whole ballgame. Chrome ships two: **SwiftShader**, its bundled default, or the system OpenGL stack, which on our Linux nodes is **[Mesa llvmpipe](https://docs.mesa3d.org/drivers/llvmpipe.html)**. Same pixels on the CPU, wildly different speed.

## Why the gap is 4×

**SwiftShader** emulates the whole pipeline conservatively, optimizing for "draws correctly anywhere." A heavy 3D scene takes ~24s; the 2D pages next to it, 2-3s.

**llvmpipe** is built differently:

- **It JITs to native code.** LLVM compiles the live shader and GL state into real x86-64. No interpreter loop.
- **It is tiled and multi-threaded.** It actually uses every core.

Several times faster, same output.

## The change: one line

```diff
- '--use-angle=swiftshader',
+ '--use-angle=gl',
```

What you must **not** add back:

- `--disable-gpu` silently forces SwiftShader on again. It is the most-copied flag in every headless tutorial.
- `--in-process-gpu` kills the GL surface ANGLE needs.

## The catch: you need a display

`--use-angle=gl` has to bind a GL surface, which needs an X display, even headless. No display, and WebGL **silently degrades to a flat 2D fallback**: the screenshot still succeeds, the request still returns `200`, and the output is wrong but plausible.

So every container boots a virtual display ([Xvfb](https://en.wikipedia.org/wiki/Xvfb)) before Chrome starts, with `LIBGL_ALWAYS_SOFTWARE=1` pinning Mesa to llvmpipe.

## Why Mesa is built from source

Ubuntu jammy's Mesa is too old for this, and the PPAs that used to backport it are gone. So the base image compiles its own:

```bash
meson setup build \
  -Dbuildtype=release -Dgallium-drivers=llvmpipe -Dvulkan-drivers= \
  -Dllvm=enabled -Dshared-llvm=enabled
```

llvmpipe only, no Vulkan, **shared LLVM** (that's where the JIT speed lives). The build toolchain is huge (LLVM, clang, Rust, ~160 `-dev` packages), so the Dockerfile is multi-stage: compile Mesa, then `COPY` only the artifacts into a clean image. **2.65GB instead of 4.5GB.**

## Proving it: browserless.report()

You can't tell which renderer a node uses by looking at it. `apt list` lies (we side-load Mesa over the package), and the real answer lives inside the page. So [browserless.report()](https://github.com/microlinkhq/browserless) asks the live GL context directly:

<BrowserlessReport />

<Figcaption>`browserless.report()` from a production node. Expand `gpu` and `cpu` for the full picture.</Figcaption>

The `gpu` block is the whole story:

- **`type`** is `software` / `llvmpipe` here. `swiftshader` would mean we fell back; `hardware` would mean a GPU appeared.
- **`mesa`** is read from the loaded `libgallium-<ver>.so`, not dpkg, which reports the stale package version under our side-load.
- **`simdWidth: 256`** means llvmpipe is using AVX2, which is most of why it's fast.

`report({ benchmark: true })` adds a deterministic shader benchmark (~300ms on llvmpipe) for comparing nodes.

## That report is also the CI gate

The flat-2D fallback is dangerous because it looks like success. So CI asserts on `report()`: `gpu.type` must be `software`, `gpu.device` must be `llvmpipe`. Any drift fails the build instead of shipping flat 3D. The same call runs against production pods.

## Most of the work was benchmarking, not coding

The diff is one line. Proving it was the *right* line took weeks of measurement, mostly fighting two traps:

- **Dev machines lie.** A real GPU renders pages that come back black on prod. Every number had to come from prod-shaped hardware.
- **Single runs lie.** Cold JIT, first-paint races, shared cores. The fastest-looking result was sometimes the *wrong* one: the flat fallback shipped ~1s quicker.

That's why the deterministic benchmark exists: fixed shader, forced frames, one stable number. With it, the comparison stopped being anecdotal. SwiftShader landed at ~24-31s; llvmpipe at ~6s warm and correct.

## The numbers

Same 3D chart, same GPU-less hardware, measured on production:

| | SwiftShader (before) | Mesa llvmpipe (after) |
| --- | --- | --- |
| Render time (isolated) | ~24s | **~6s (~4×)** |
| Render time (under load) | ~24s | **7–14s (~2×)** |
| Failed requests | timed out → errors | none |
| Active renderer | SwiftShader | llvmpipe (asserted in CI) |

Isolated, the chart finishes in ~6s. Under real traffic, where captures share cores, expect ~2×. Either way, the requests that used to time out now finish.

<MultiCodeEditorInteractive
  mqlCode={{
    url: 'https://threejs.org/examples/webgl_animation_skinning_blending',
    screenshot: { animated: true }
  }}
/>

<Figcaption>Try it: a WebGL page captured live through ANGLE → Mesa llvmpipe. See the [animated screenshot docs](/docs/api/parameters/screenshot/animated) for the parameters.</Figcaption>

## The honest limit

Software GL closes most of the gap, not all. Heavy fragment-shader heroes can still come back black, because the canvas hasn't painted by capture time. That's a first-paint race, not a renderer problem, and no flag fixes it. The real fixes are gating capture on first paint, or real GPUs. We're doing the first.

For everything else, moving from SwiftShader to llvmpipe turned our slowest, flakiest requests into ordinary ones.
