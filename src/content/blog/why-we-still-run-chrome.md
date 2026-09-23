---
title: 'Why we still run Chrome'
subtitle: 'Light browsers are getting good. Correct browsers are still hard.'
description: 'Lightpanda, Obscura, and Cloudflare Kitesurf remove parts of the browser that agents do not need. We compare the trade-offs, what Chrome already offers, and why Chrome remains Microlink’s source of truth.'
authors:
  - kiko
date: '2026-09-17'
---

[Lightpanda](https://lightpanda.io), [Obscura](https://github.com/h4ckf0r0day/obscura), and [Cloudflare Kitesurf](https://blog.cloudflare.com/kitesurf/) make browsers lighter by removing layout, paint, and compositing work that an agent may never use. Microlink still runs Chrome, because that same work produces the screenshots, PDFs, and DOM our API returns.

**TL;DR**

- Lightpanda removes the graphical rendering pipeline entirely. Obscura and Kitesurf build smaller rendering stacks for the work agents need.
- That can produce major efficiency gains, but compatibility and visual fidelity become explicit trade-offs.
- Chrome already has a lighter official binary, `chrome-headless-shell`, plus direct CLI primitives for DOM, screenshot, and PDF output.
- Microlink needs one engine to cover extraction, JavaScript, screenshots, PDFs, and browser APIs correctly across the open web. Chrome remains that contract today.

## Three ways to make a browser lighter

Chrome resolves styles, computes layout, paints layers, composites frames, supports hundreds of Web APIs, and carries years of compatibility fixes. If your job is to load a page, run its JavaScript, and return structured data, much of that machinery looks like overhead.

All three projects ask what a browser looks like if machines, rather than people, are its primary users. None puts a thin API in front of Chromium: Lightpanda is written in Zig, Obscura in Rust, and Kitesurf runs on Cloudflare Workers.

### Lightpanda: do not draw the page

[Lightpanda](https://lightpanda.io/docs/core-concepts/architecture-overview) is a browser written in Zig with V8 for JavaScript, its own DOM and Web API implementation, and a Chrome DevTools Protocol (CDP) endpoint for Puppeteer and Playwright compatibility.

It has no graphical rendering engine. Lightpanda parses HTML, executes JavaScript in V8, and updates an in-memory DOM, but does not run a normal layout, paint, and compositing pipeline.

Crawling and extraction fit that model. Pixel-accurate screenshots, PDFs, and automation that depends on real element geometry do not: Lightpanda documents that element positions are simulated rather than produced by visual layout.

The payoff can be large. In [Lightpanda's own benchmark](https://lightpanda.io/blog/posts/from-local-to-real-world-benchmarks), a 933-page JavaScript crawl at 25-way concurrency used **123 MB instead of Chrome's 2 GB** and finished in 5 seconds instead of 46.

The setups used different parallelism models: 25 independent Lightpanda processes versus 25 Chrome tabs in one browser process. These are project-published results on its demo workload, not a promise for the wider web. They show what becomes possible when rendering is removed rather than optimized.

### Obscura: build the missing pieces again

[Obscura](https://github.com/h4ckf0r0day/obscura) is a young Rust engine with V8 through `deno_core`, its own DOM, networking, cookies, storage, and a CPU renderer. It exposes CDP, a CLI, a Rust API, and MCP. It returns HTML, text, Markdown, links, screenshots, and rasterized PDFs.

That makes Obscura more visual than Lightpanda without inheriting Chromium's full stack. Its Apache-2.0 license makes it easy to evaluate.

The trade-off is maturity. Obscura's current releases are still filling basic CDP, Playwright, forms, context isolation, CSS, Web API, media, GPU, and compositor gaps. Its published startup and memory figures come from its own benchmarks, not evidence of Chrome-level compatibility. Reimplementing a browser means choosing which decade of edge cases to build first.

### Kitesurf: a browser made of isolates

Cloudflare says [Kitesurf](https://blog.cloudflare.com/kitesurf/) started from Obscura's ideas, then was rebuilt for Cloudflare Workers.

Each page runs in isolated components. An Engine exposes CDP and stores session state. PageScript parses HTML and CSS and runs page code. PageRenderer turns a scene into PNG, JPEG, or PDF output. Cloudflare uses parts of Blitz and Firefox's Stylo, with JavaScript running in Workers isolates and Boa covering dynamic evaluation where needed.

A Kitesurf browser starts for a request, runs isolated, and is thrown away. Existing Puppeteer and Playwright clients can select Kitesurf through Cloudflare Browser Run.

Cloudflare states the boundary directly: Kitesurf is for agents and quick actions that can accept not using a full-featured, pixel-perfect Chromium browser. It renders TodoMVC variants, Wikipedia, Hacker News, the Cloudflare Blog, and much of Cloudflare's dashboard today, while the team grows its Web Platform Test coverage.

## Speed comes from deleting work

None of the three wins with a faster selector API. Each one wins with a smaller definition of "browser."

Lightpanda deletes layout and paint. Obscura replaces them with a younger CPU renderer and a narrower Web API surface. Kitesurf splits the browser into Engine, PageScript, and PageRenderer isolates that are thrown away after the request.

Together with Chrome, they form a spectrum:

| Engine | JavaScript and DOM | Visual output | Main trade-off |
| --- | --- | --- | --- |
| Lightpanda | Own DOM and Web APIs, V8 | No real layout or paint | Fast extraction, no pixel fidelity |
| Obscura | Own DOM, state, network, and CDP, V8 | CPU screenshots and raster PDFs | Broad surface, young compatibility layer |
| Kitesurf | Isolated engine, page script, and renderer | Screenshots and PDFs for compatible pages | Ephemeral scale, not pixel-perfect Chromium |
| Chrome | Full Blink, V8, Web APIs, layout, paint, and compositor | Browser-reference output | Higher resource cost |

If your agent only needs article text, paying for a complete compositor is wasteful. If it needs to click the button a person sees, capture an exact screenshot, print a faithful PDF, run Lighthouse, or use a new browser API, the supposedly unnecessary parts become the product.

## Chrome has a lightweight mode too

You do not have to pick between full desktop Chrome and a new engine.

Google maintains [`chrome-headless-shell`](https://developer.chrome.com/blog/chrome-headless-shell/), the standalone version of Chrome's old Headless implementation. It is a lightweight wrapper around Chromium's `//content` module with fewer dependencies than full Chrome. Puppeteer runs it with `headless: 'shell'`.

Chrome also exposes the common one-shot jobs directly from its CLI:

```shell
chrome --headless --dump-dom https://example.com
chrome --headless --screenshot https://example.com
chrome --headless --print-to-pdf https://example.com
```

Each command executes the page before serializing its DOM, screenshot, or PDF. They keep Blink's rendering model, but remove application code and protocol choreography for simple jobs.

In production you can go further: block images, fonts, media, or stylesheets when they are unnecessary, pool warm browsers, reuse processes, and use pipes instead of WebSockets. Those optimizations narrow the gap without changing the engine that defines correctness.

They cannot match an engine that never computes layout. They also do not inherit the compatibility cost of pretending layout does not exist.

## Why Chrome is Microlink's contract

The same Microlink API produces [metadata](/docs/api/parameters/meta), [screenshots](/docs/api/parameters/screenshot), [PDFs](/docs/api/parameters/pdf), [data rules](/docs/api/parameters/data), and [insights](/docs/api/parameters/insights). A URL may need JavaScript execution, font loading, responsive layout, shadow DOM, media inspection, or a browser API that shipped recently.

For that product surface, fidelity is the result, not an optional final step.

Chrome gives us:

- **One behavior across visual and non-visual work:** the DOM we extract and the pixels we capture come from the same engine.
- **Web compatibility:** Blink and V8 carry years of fixes for real sites, standards, frameworks, and malformed pages.
- **A complete automation surface:** CDP, Puppeteer, tracing, network control, isolated worlds, emulation, accessibility, and new Web APIs arrive on the same platform.
- **A reference we can test:** when an optimization changes output, Chrome remains the source of truth rather than another approximation to compare.

Our API sits above the engine. We can benchmark another backend, route a suitable workload to it, and fall back to Chrome without changing the public contract. We will not make a younger engine the default before it produces equivalent results on the workloads our customers send us.

## Measure correctness before speed

A fast demo is not the evaluation. If you are choosing an engine for your own workload, measure what we measure:

- Success rate across real URLs
- DOM and Markdown equivalence against Chrome
- Visual diffs for screenshots and PDFs
- Web API coverage
- Memory, latency, and crashes
- Anti-bot behavior

Lightpanda proves how cheap browser automation can become when pixels disappear. Obscura asks how much visual and stateful behavior can be rebuilt without Chromium. Kitesurf shows how that smaller browser maps onto an isolate platform. The expensive parts of Chrome are often the same parts that make arbitrary websites work.

For agent workloads with a narrow contract, a lightweight engine may be the right answer. For Microlink's contract today, Chrome is still the browser we trust when correctness reaches the DOM, the network, and the pixel.
