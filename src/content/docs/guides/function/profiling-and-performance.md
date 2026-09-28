---
title: 'Function: Profiling and performance'
description: 'Understand execution phases, plan limits, and optimization techniques for function requests. Use profiling data to find bottlenecks and reduce execution time.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { Link } from 'components/elements/Link'

Every function response includes profiling data with phase-level timing and resource usage.

## Profiling

```js
import createClient from 'microlink.io'

const microlink = createClient()

const { profiling } = await microlink.function('https://example.com', ({ page }) => page.title())

console.log(profiling)
// {
//   phases: { install: 0, build: 120, spawn: 45, run: 890, total: 1055 },
//   cpu: 234,
//   memory: { total: 69996544, used: 2359296, heap: 4410880, external: 1742574 },
//   size: 156
// }
```

| Field            | Description                                                     |
| ---------------- | --------------------------------------------------------------- |
| `phases.install` | Time spent installing npm dependencies (0 when none are used)   |
| `phases.build`   | Time spent bundling the function code                           |
| `phases.spawn`   | Time spent starting the isolated process                        |
| `phases.run`     | Time spent executing the function                               |
| `phases.total`   | Wall-clock time from start to finish                            |
| `cpu`            | Peak CPU time in milliseconds                                   |
| `memory.total`   | Resident memory of the sandbox, Node.js baseline included, in bytes |
| `memory.used`    | Resident memory attributable to your function, in bytes         |
| `memory.heap`    | V8 heap in use, in bytes. The only field the memory limit bounds |
| `memory.external`| Off-heap `Buffer`/`ArrayBuffer` memory, in bytes                 |
| `size`           | Bundled code size in bytes                                      |

Use profiling to understand where time is spent. If install is high, your dependencies are being installed for the first time — subsequent runs use the cache. If run is high, the function itself is doing heavy work.

## Plan limits

The function parameter is available on both free and pro plans:

|                   | Free             | Pro              |
| ----------------- | ---------------- | ---------------- |
| Timeout           | 15 seconds       | Up to 60 seconds |
| Memory            | 64 MB            | 128 MB           |
| Code size         | 1024 bytes       | Unlimited        |
| Concurrency       | 1 in-flight per IP | Unlimited      |
| Outgoing requests | Same-origin only | Unrestricted     |

The free plan is enough to prototype workflows and run the examples in this guide. For production workloads that need more time or memory, or parameters such as `headers`, `proxy`, `ttl`, or `staleTtl`, use a pro plan.

To authenticate, pass your API key:

```js
import createClient from 'microlink.io'

const microlink = createClient({
  apiKey: process.env.MICROLINK_API_KEY
})

const { value } = await microlink.function('https://example.com', ({ page }) => page.title())
```

See the <Link href='/docs/api/basics/authentication' children='authentication' /> and <Link href='/docs/api/basics/rate-limit' children='rate limit' /> docs for endpoint and quota details.

## When the page is fetched

A function-only request pays for the function and nothing else: normalized metadata is off by
default, and the page is resolved only when your code needs it.

| your function | what the request does |
| --- | --- |
| never mentions `page` | nothing is fetched |
| calls `page.content()`, `page.extract()` or `page.metadata()` | the page is fetched for you |
| drives the browser, such as `page.click()` or `page.evaluate()` | the page is loaded once and your function runs on it |

Destructure `page` itself rather than its methods. `({ page }) => page.content()` is answered from
fetched HTML with no browser, while `({ page: { content } }) => content()` cannot be read ahead of
time and starts a full browser.

Ask for [meta](/docs/api/parameters/meta) explicitly when you want normalized metadata alongside the
function, or call `page.metadata()` inside it to get the same data for one page load:

```js
import createClient from 'microlink.io'

const microlink = createClient()

const { value } = await microlink.function('https://example.com', ({ page }) => page.title())
```

<Figcaption>Skipping metadata is usually the biggest speedup for function requests. If you still need the rendered markup, call <code>page.content()</code> inside the function.</Figcaption>

## Compress large functions

Large function bodies are compressed before they are sent. The SDK handles this automatically — `microlink.function()` compresses the code with brotli in Node.js and lz-string in browsers, so the call stays the same:

```js
import createClient from 'microlink.io'

const microlink = createClient()

const { value, profiling } = await microlink.function('https://example.com', ({ page }) => page.title())

console.log(profiling.size)
```

If you call the API directly, prefix the compressed payload with the algorithm alias: `lz#` for lz-string, `br#` for brotli, `gz#` for gzip. See the [compression reference](/docs/api/parameters/function#compression) for details.

## Optimization checklist

1. Leave metadata off — a function-only request already skips it. Ask for `meta: true` only when you genuinely want it, since it is usually the largest cost in the request.
2. Use `page.title()` and `page.$eval()` instead of `page.evaluate()` when possible — they are faster and easier to debug.
3. Replace fixed waits like `page.waitForTimeout(3000)` with `page.waitForSelector()` — they resolve as soon as the element appears.
4. Check `profiling.phases` to find the bottleneck — a high install on first run is normal, but a high run means the function itself needs work.
5. Minimize dependencies — each `require()` adds install and build time. Use only what you need.

## See also

- <Link href='/docs/guides/function/troubleshooting' children='Troubleshooting' /> — error handling, resource errors, and debugging.
- <Link href='/docs/guides/common/caching' children='Common caching patterns' /> — reduce cost and improve response speed.
- <Link href='/docs/api/parameters/function' children='Function reference' /> — response shape, plan limits, and compression.
