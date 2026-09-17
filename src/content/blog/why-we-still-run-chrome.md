---
title: 'Why We Still Run Chrome'
subtitle: 'Light browsers are getting good. Correct browsers are still hard.'
description: 'Lightpanda, Obscura, and Cloudflare Kitesurf remove parts of the browser that agents do not need. We compare the trade-offs, what Chrome already offers, and why Chrome remains Microlink’s source of truth.'
authors:
  - kiko
date: '2026-09-17'
---

A browser built for a person does a lot of work that an agent may never use.

It resolves styles, computes layout, paints layers, composites frames, supports hundreds of Web APIs, and carries years of compatibility fixes. If the job is only to load a page, run its JavaScript, and return structured data, much of that machinery looks like overhead.

A new group of browser engines is testing how much can be removed. [Lightpanda](https://lightpanda.io), [Obscura](https://github.com/h4ckf0r0day/obscura), and [Cloudflare Kitesurf](https://blog.cloudflare.com/kitesurf/) all start from a similar question: what would a browser look like if machines, rather than people, were its primary users?

We think this work is exciting. We also still run Chrome.

**TL;DR**

- Lightpanda removes the graphical rendering pipeline entirely. Obscura and Kitesurf build smaller rendering stacks for the work agents need.
- That can produce major efficiency gains, but compatibility and visual fidelity become explicit trade-offs.
- Chrome already has a lighter official binary, `chrome-headless-shell`, plus direct CLI primitives for DOM, screenshot, and PDF output.
- Microlink needs one engine to cover extraction, JavaScript, screenshots, PDFs, and browser APIs correctly across the open web. Chrome remains that contract today.

## Three ways to make a browser lighter

These projects do not put a thin API in front of Chromium. They replace it.

### Lightpanda: do not draw the page

[Lightpanda](https://lightpanda.io/docs/core-concepts/architecture-overview) is a browser written in Zig with V8 for JavaScript, its own DOM and Web API implementation, and a Chrome DevTools Protocol endpoint for Puppeteer and Playwright compatibility.

Its defining decision is what it leaves out: there is no graphical rendering engine. Lightpanda parses HTML, executes JavaScript, and updates an in-memory DOM, but does not run a normal layout, paint, and compositing pipeline.

That is a strong fit for crawling and extraction. It is not a fit for pixel-accurate screenshots, PDFs, or automation that depends on real element geometry. Lightpanda documents that element positions are simulated rather than produced by visual layout.

The payoff can be large. In [Lightpanda's own benchmark](https://lightpanda.io/blog/posts/from-local-to-real-world-benchmarks), a 933-page JavaScript crawl at 25-way concurrency used 123 MB instead of Chrome's 2 GB and finished in 5 seconds instead of 46. Those are project-published results on its demo workload, not a promise for the wider web, but they show what becomes possible when rendering is removed rather than optimized.

### Obscura: build the missing pieces again

[Obscura](https://github.com/h4ckf0r0day/obscura) takes a broader approach. It is a young Rust engine with V8 through `deno_core`, its own DOM, networking, cookies, storage, and a CPU renderer. It exposes CDP, a CLI, a Rust API, and MCP. It can return HTML, text, Markdown, links, screenshots, and rasterized PDFs.

That makes Obscura more visual than Lightpanda without inheriting Chromium's full stack. Its Apache-2.0 license also makes it easy to evaluate.

The trade-off is maturity. Obscura's current releases are still filling basic CDP, Playwright, forms, context isolation, CSS, Web API, media, GPU, and compositor gaps. Its published startup and memory figures are its own benchmarks. The architecture is promising; it is not yet evidence of Chrome-level compatibility.

That is not a criticism. Reimplementing a browser means choosing which decade of edge cases to build first.

### Kitesurf: a browser made of isolates

Cloudflare says [Kitesurf](https://blog.cloudflare.com/kitesurf/) started from Obscura's ideas, then was rebuilt for Cloudflare Workers.

Each page runs in isolated components. An Engine exposes CDP and stores session state. PageScript parses HTML and CSS and runs page code. PageRenderer turns a scene into PNG, JPEG, or PDF output. Cloudflare uses parts of Blitz and Firefox's Stylo, with JavaScript running in Workers isolates and Boa covering dynamic evaluation where needed.

The result is ephemeral by design: start a browser for a request, isolate it, then throw it away. Existing Puppeteer and Playwright clients can select Kitesurf through Cloudflare Browser Run.

Cloudflare is direct about the boundary. Kitesurf is for agents and quick actions that can accept the trade-offs of not using a full-featured, pixel-perfect Chromium browser. It renders TodoMVC variants, Wikipedia, Hacker News, the Cloudflare Blog, and much of Cloudflare's dashboard today, while the team continues to grow its Web Platform Test coverage.

## Speed comes from deleting work

The important idea across all three projects is not a faster selector API. It is a smaller definition of "browser."

Lightpanda deletes visual rendering. Obscura implements a younger renderer with a narrower surface. Kitesurf splits the browser into disposable isolates and targets agent-shaped workloads.

That creates a useful spectrum:

| Engine | JavaScript and DOM | Visual output | Main trade-off |
| --- | --- | --- | --- |
| Lightpanda | Own DOM and Web APIs, V8 | No real layout or paint | Fast extraction, no pixel fidelity |
| Obscura | Own DOM, state, network, and CDP, V8 | CPU screenshots and raster PDFs | Broad surface, young compatibility layer |
| Kitesurf | Isolated engine, page script, and renderer | Screenshots and PDFs for compatible pages | Ephemeral scale, not pixel-perfect Chromium |
| Chrome | Full Blink, V8, Web APIs, layout, paint, and compositor | Browser-reference output | Higher resource cost |

If an agent only needs article text, paying for a complete compositor is wasteful. If it needs to click the button a person sees, capture an exact screenshot, print a faithful PDF, run Lighthouse, or use a new browser API, the supposedly unnecessary parts become the product.

## Chrome has a lightweight mode too

The choice is not only full desktop Chrome or a new engine.

Google maintains [`chrome-headless-shell`](https://developer.chrome.com/blog/chrome-headless-shell/), the standalone version of Chrome's old Headless implementation. It is a lightweight wrapper around Chromium's `//content` module with fewer dependencies than full Chrome. Puppeteer supports it with `headless: 'shell'`.

Chrome also exposes the common one-shot jobs directly from its CLI:

```shell
chrome --headless --dump-dom https://example.com
chrome --headless --screenshot https://example.com
chrome --headless --print-to-pdf https://example.com
```

These commands execute the page before serializing its DOM, screenshot, or PDF. They do not remove Blink's rendering model, but they remove application code and protocol choreography for simple jobs.

Around that, production systems can block images, fonts, media, or stylesheets when they are unnecessary; pool warm browsers; reuse processes; and use pipes instead of WebSockets. Those optimizations narrow the gap without changing the engine that defines correctness.

They cannot match an engine that never computes layout. They also do not inherit the compatibility cost of pretending layout does not exist.

## Why Chrome is Microlink's contract

Microlink does more than extract text.

The same API produces [metadata](/docs/api/parameters/meta), [screenshots](/docs/api/parameters/screenshot), [PDFs](/docs/api/parameters/pdf), [data rules](/docs/api/parameters/data), and [insights](/docs/api/parameters/insights). A URL may need JavaScript execution, font loading, responsive layout, shadow DOM, media inspection, or a browser API that shipped recently.

For that product surface, fidelity is not an optional final step. It is the result.

Chrome gives us:

- **One behavior across visual and non-visual work.** The DOM we extract and the pixels we capture come from the same engine.
- **Web compatibility.** Blink and V8 carry years of fixes for real sites, standards, frameworks, and malformed pages.
- **A complete automation surface.** CDP, Puppeteer, tracing, network control, isolated worlds, emulation, accessibility, and new Web APIs arrive on the same platform.
- **A reference we can test.** When an optimization changes output, Chrome remains the source of truth rather than another approximation to compare.

Our API sits above the engine. That means we can benchmark another backend, route a suitable workload to it, and fall back to Chrome without changing the public contract. It does not mean we should make a younger engine the default before it produces equivalent results on the workloads our customers send us.

The honest evaluation is not "how fast is this demo?" It is success rate across real URLs, DOM and Markdown equivalence, visual diffs for screenshots and PDFs, Web API coverage, memory, latency, crashes, and anti-bot behavior. Efficiency only wins when the answer is still correct.

## The browser is being unbundled

Lightpanda proves how cheap browser automation can become when pixels disappear. Obscura asks how much visual and stateful behavior can be rebuilt without Chromium. Kitesurf shows how that smaller browser can map onto an isolate platform.

All three move the category forward. They also make the trade-off easier to see: the expensive parts of Chrome are often the same parts that make arbitrary websites work.

For agent workloads with a narrow contract, a lightweight engine may be the right answer. For Microlink's contract today, Chrome is still the browser we trust when correctness reaches the DOM, the network, and the pixel.
