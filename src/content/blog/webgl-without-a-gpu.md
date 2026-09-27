---
title: 'How one Chrome flag made GPU-less WebGL screenshots 4× faster'
subtitle: 'Cutting 3D render time from ~24s to ~6s'
description: 'A deep dive into how Microlink renders WebGL screenshots on a GPU-less fleet: the ANGLE delegation chain, why SwiftShader is slow, how Mesa llvmpipe JIT-compiles the pipeline with LLVM, the Xvfb surface requirement, and the silent 2D fallback we guard against in CI.'
authors:
  - kiko
date: '2026-06-29'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Figcaption } from 'components/markdown/Figcaption'
import { Video } from 'components/markdown/Video'
import { BrowserlessReport } from 'components/pages/blog/webgl-without-a-gpu'

A 3D page used to take ~24s to [screenshot](/docs/api/parameters/screenshot) on Microlink, and now it takes ~6s. The change is a single Chrome flag, `--use-angle=gl`, which moves WebGL rendering from SwiftShader to Mesa llvmpipe on servers that have no GPU at all.

<Video src="/images/screenshot-animated.mp4" />

<Figcaption>A WebGL page (three.js) captured as an [animated screenshot](/tools/website-screenshot/animated), rendered through Mesa llvmpipe on a GPU-less node</Figcaption>

**TL;DR**

- Our servers have no GPU. WebGL still has to render somewhere.
- Chrome's default software path (SwiftShader) took **~24s** per 3D page.
- Pointing ANGLE at Mesa llvmpipe (`--use-angle=gl`) dropped it to **~6s**.
- The one-line flag is the easy part. The display, the from-source Mesa, and proving it stays on the fast path are the rest of the story.

WebGL sits behind 3D maps, seat charts, product configurators, and shader-art landing pages, and it was the slowest thing you could ask us to capture. The flag is the easy part. The rest of this post covers the X display it needs, the Mesa we compile from source, and the CI check that proves every node stays on the fast path.

## Our fleet has no GPU, on purpose

Our browser fleet runs on commodity Linux nodes with no graphics card and no `/dev/dri`, which keeps them cheaper, simpler, and free of drivers to babysit. WebGL is still a GPU API, so something has to emulate it on the CPU. Which emulator we picked was the difference between a 24-second screenshot and a 6-second one.

## ANGLE picks the renderer, not Chrome

Chrome hands WebGL to **[ANGLE](https://chromium.googlesource.com/angle/angle/)**, which translates it to whatever backend the platform has: Direct3D, Metal, native OpenGL or Vulkan, or a software renderer when there is no GPU.

On a GPU-less node, that software renderer decides everything. Chrome can use two of them: **SwiftShader**, its bundled default, or the system OpenGL stack, which on our Linux nodes is **[Mesa llvmpipe](https://docs.mesa3d.org/drivers/llvmpipe.html)**. Both draw the same pixels on the CPU, at very different speeds.

**SwiftShader** emulates the whole pipeline conservatively and optimizes for drawing correctly anywhere. A heavy 3D scene takes ~24s with it, while the 2D pages next to it finish in 2-3s. **llvmpipe** is built differently, and that is where the 4× comes from:

- **It JITs to native code.** LLVM compiles the live shader and GL state into real x86-64, with no interpreter loop.
- **It is tiled and multi-threaded.** It spreads the work across every core on the node.

## The diff is one line

```diff
- '--use-angle=swiftshader',
+ '--use-angle=gl',
```

Two common flags silently undo it, so they must stay out of the launch arguments:

- `--disable-gpu` forces SwiftShader on again. It is the most-copied flag in every headless tutorial.
- `--in-process-gpu` kills the GL surface ANGLE needs.

## Without an X display, WebGL falls back to flat 2D

`--use-angle=gl` has to bind a GL surface, and that needs an X display even when Chrome runs headless. Without one, WebGL **silently degrades to a flat 2D fallback**: the screenshot still succeeds, the request still returns `200`, and the output is wrong but plausible.

Every container therefore boots a virtual display ([Xvfb](https://en.wikipedia.org/wiki/Xvfb)) before Chrome starts, with `LIBGL_ALWAYS_SOFTWARE=1` pinning Mesa to llvmpipe.

## We build Mesa from source

Ubuntu jammy ships a Mesa that is too old for this, and the PPAs that used to backport newer versions are gone. The base image compiles its own:

```bash
meson setup build \
  -Dbuildtype=release -Dgallium-drivers=llvmpipe -Dvulkan-drivers= \
  -Dllvm=enabled -Dshared-llvm=enabled
```

The build enables llvmpipe only, skips Vulkan, and links **shared LLVM**, which is where the JIT speed lives. The toolchain is huge (LLVM, clang, Rust, ~160 `-dev` packages), so the Dockerfile is multi-stage: it compiles Mesa, then copies only the artifacts into a clean image with `COPY`. The result is **2.65GB instead of 4.5GB**.

## browserless.report() reads the live GL context

You cannot tell which renderer a node uses by looking at its packages. `apt list` reports the wrong version because we side-load Mesa over the package, and the real answer lives inside the page. [browserless.report()](https://github.com/microlinkhq/browserless) asks the live GL context directly:

<BrowserlessReport />

<Figcaption>`browserless.report()` from a production node. Expand `gpu` and `cpu` for the full picture.</Figcaption>

The `gpu` block holds the three fields that matter:

- **`type`** is `software` / `llvmpipe` here. `swiftshader` would mean we fell back, and `hardware` would mean a GPU appeared.
- **`mesa`** is read from the loaded `libgallium-<ver>.so`, not from dpkg, which reports the stale package version under our side-load.
- **`simdWidth: 256`** means llvmpipe is using AVX2, which explains most of its speed.

`report({ benchmark: true })` adds a deterministic shader benchmark (~300ms on llvmpipe) for comparing nodes against each other.

The same report is the CI gate. The flat 2D fallback is dangerous because it looks like success, so CI asserts that `gpu.type` is `software` and `gpu.device` is `llvmpipe`. Any drift fails the build instead of shipping flat 3D, and the same call runs against production pods.

## Benchmarking took weeks, the code took one line

Proving `--use-angle=gl` was the right line took weeks of measurement, and most of that time went into two traps:

- **Dev machines lie.** A real GPU renders pages that come back black on prod, so every number had to come from prod-shaped hardware.
- **Single runs lie.** Cold JIT, first-paint races, and shared cores skew results. The fastest-looking result was sometimes the wrong one: the flat fallback shipped ~1s quicker.

The deterministic benchmark exists for this reason. It runs a fixed shader with forced frames and returns one stable number, so the comparison stopped being anecdotal. SwiftShader landed at ~24-31s, and llvmpipe at ~6s warm and correct.

## Production numbers: ~4× isolated, ~2× under load

All numbers below come from the same 3D chart on the same GPU-less hardware, measured on production:

| | SwiftShader (before) | Mesa llvmpipe (after) |
| --- | --- | --- |
| Render time (isolated) | ~24s | **~6s (~4×)** |
| Render time (under load) | ~24s | **7–14s (~2×)** |
| Failed requests | timed out → errors | none |
| Active renderer | SwiftShader | llvmpipe (asserted in CI) |

Isolated, the chart finishes in ~6s. Under real traffic, where captures share cores, expect ~2×. In both cases, the requests that used to time out now finish.

<MultiCodeEditorInteractive
  mqlCode={{
    url: 'https://threejs.org/examples/webgl_animation_skinning_blending',
    screenshot: { animated: true }
  }}
/>

<Figcaption>Try it: a WebGL page captured live through ANGLE → Mesa llvmpipe. See the [animated screenshot docs](/docs/api/parameters/screenshot/animated) for the parameters.</Figcaption>

## Heavy shader heroes can still come back black

Software GL closes most of the gap, not all of it. Heavy fragment-shader heroes can still come back black because the canvas has not painted by capture time. That is a first-paint race, not a renderer problem, and no flag fixes it. The two real fixes are gating capture on first paint or adding real GPUs, and we are building the first one.

For everything else, moving from SwiftShader to llvmpipe turned our slowest, flakiest requests into ordinary ones. Run the example above against your own WebGL page with the [animated screenshot](/docs/api/parameters/screenshot/animated) parameters to see it.
