---
title: 'Function: Profiling and performance'
description: 'Understand execution phases, plan limits, and optimization techniques for function requests. Use profiling data to find bottlenecks and reduce execution time.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { Link } from 'components/elements/Link'

Every function response includes profiling data with phase-level timing and resource usage.

## Profiling

```js
const microlink = require('@microlink/function')

const fn = microlink(({ page }) => page.title())
const result = await fn('https://example.com')

console.log(result.profiling)
// {
//   phases: { install: 0, build: 120, spawn: 45, run: 890, total: 1055 },
//   cpu: 234,
//   memory: 8,
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
| `memory`         | Peak memory usage in MB                                         |
| `size`           | Bundled code size in bytes                                      |

Use profiling to understand where time is spent. If install is high, your dependencies are being installed for the first time — subsequent runs use the cache. If run is high, the function itself is doing heavy work.

## Plan limits

The function parameter is available on both free and pro plans:

|             | Free       | Pro              |
| ----------- | ---------- | ---------------- |
| Timeout     | 5 seconds  | Up to 28 seconds |
| Memory      | 16 MB      | 32 MB            |
| Code size   | 1024 bytes | Unlimited        |
| Concurrency | 1 per IP   | Unlimited        |

The free plan is enough to prototype workflows and run the examples in this guide. For production workloads that need more time or memory, or parameters such as `headers`, `proxy`, `ttl`, or `staleTtl`, use a pro plan.

To authenticate, pass your API key:

```js
const microlink = require('@microlink/function')

const fn = microlink(
  ({ page }) => page.title(),
  {},
  { headers: { 'x-api-key': 'YOUR_API_KEY' } }
)

const result = await fn('https://example.com')
```

See the <Link href='/docs/api/basics/authentication' children='authentication' /> and <Link href='/docs/api/basics/rate-limit' children='rate limit' /> docs for endpoint and quota details.

## Skip metadata

Most function-only workflows do not need normalized metadata. Set `meta: false` to skip it:

```js
const microlink = require('@microlink/function')

const fn = microlink(({ page }) => page.title(), { meta: false })
const result = await fn('https://example.com')
```

<Figcaption>Disabling metadata is usually the biggest speedup for function requests. If you still need the rendered markup, call <code>page.content()</code> inside the function.</Figcaption>

## Compress large functions

When using MQL directly, large function bodies can be compressed before sending. The `@microlink/function` library handles compression automatically, but if you prefer the raw MQL approach:

```js
const { compressToURI } = require('lz-ts')
const mql = require('@microlink/mql')

const code = ({ page }) => page.title()

const { data } = await mql('https://example.com', {
  function: `lz#${compressToURI(code.toString())}`,
  meta: false
})

console.log(data.function.value)
```

Prefix the compressed payload with the algorithm alias: `lz#` for lz-string, `br#` for brotli, `gz#` for gzip.

## Optimization checklist

1. Set `meta: false` unless you need normalized metadata — this is usually the biggest win.
2. Use `page.title()` and `page.$eval()` instead of `page.evaluate()` when possible — they are faster and easier to debug.
3. Replace fixed waits like `page.waitForTimeout(3000)` with `page.waitForSelector()` — they resolve as soon as the element appears.
4. Check `result.profiling.phases` to find the bottleneck — a high install on first run is normal, but a high run means the function itself needs work.
5. Minimize dependencies — each `require()` adds install and build time. Use only what you need.

## See also

- <Link href='/docs/guides/function/troubleshooting' children='Troubleshooting' /> — error handling, resource errors, and debugging.
- <Link href='/docs/guides/common/caching' children='Common caching patterns' /> — reduce cost and improve response speed.
- <Link href='/docs/api/parameters/function' children='Function reference' /> — response shape, plan limits, and compression.
