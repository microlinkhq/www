---
title: 'Function: Troubleshooting'
description: 'Handle function errors, understand resource limit errors, and debug common failure modes in function requests.'
---

import { Link } from 'components/elements/Link'

## Error handling

When a function throws, the result comes back with `isFulfilled: false` and the error details at `result.value`:

```js
const microlink = require('@microlink/function')

const failing = ({ name }) => name()

const fn = microlink(failing)
const result = await fn('https://example.com', { name: 'Kiko' })

console.log(result.isFulfilled)    // false
console.log(result.value.name)     // 'TypeError'
console.log(result.value.message)  // 'name is not a function'
```

Non-Error throws (like `throw 'oh no'`) are normalized into a `NonError` with the thrown value as the message.

## Resource errors

When a function exceeds its plan limits, the API returns a descriptive error instead of failing the entire request:

| Error              | Trigger                                                         |
| ------------------ | --------------------------------------------------------------- |
| `TimeoutError`     | Function wall-clock time exceeded the plan limit                |
| `CpuTimeError`     | Function CPU time exceeded the plan limit                       |
| `MemoryError`      | Function memory usage exceeded the plan limit                   |
| `CodeSizeError`    | Function code exceeds the 1024 bytes free plan limit            |
| `ConcurrencyError` | Too many concurrent function executions for the free plan (1 per IP) |

Each error message is plan-aware:

```json
{
  "isFulfilled": false,
  "value": {
    "name": "TimeoutError",
    "message": "Function exceeded the 5s free plan timeout. Upgrade to pro for up to 28s."
  }
}
```

## Function-specific errors

- **EINVALFUNCTION** — the function string has invalid JavaScript syntax. Check quotes, brackets, template strings, and arrow function formatting.
- **EINVALEVAL** — the function executed but threw at runtime. Check undefined variables, DOM queries that return null, or mistakes inside `page.evaluate`.

## Fixing resource limit errors

**TimeoutError** — the function exceeded its plan timeout (5s free, ~28s pro):

1. Reduce the function to a trivial check such as `({ page }) => page.title()` to confirm the page itself loads in time.
2. Set `meta: false` unless metadata is part of the requirement.
3. Replace fixed waits with `waitForSelector` whenever possible.
4. Move heavy post-processing to your own server.

**CpuTimeError** — the function used too much CPU time:

1. Simplify the computation or break it into smaller steps.
2. Avoid CPU-intensive operations like large JSON parsing or complex regular expressions.
3. Move heavy processing to your own server and use the function only for data extraction.

**MemoryError** — the function exceeded its memory limit (16 MB free, 32 MB pro):

1. Reduce the amount of data held in memory at once.
2. Avoid loading entire pages into memory when you only need a small part.
3. Use streaming or pagination patterns when dealing with large datasets.

**CodeSizeError** — the function code exceeds the 1024 bytes free plan limit:

1. Use the [@microlink/function](https://www.npmjs.com/package/@microlink/function) library, which compresses code automatically.
2. Compress the function body manually with `lz#`, `br#`, or `gz#` prefixes.
3. Upgrade to pro for unlimited code size.

**ConcurrencyError** — too many concurrent function executions (1 per IP on the free plan):

1. Wait for the current function execution to finish before sending another request.
2. Upgrade to pro for unlimited concurrency.

## General debugging

1. Start simple — reduce the function to `({ page }) => page.title()` to isolate whether the problem is in your code or the target page.
2. Disable metadata — set `meta: false` unless metadata is part of the requirement.
3. Check profiling — inspect `result.profiling` to understand where time is being spent.
4. Use the right context — keep orchestration in the outer function and DOM-only code inside `page.evaluate`.
5. Watch for null — DOM queries like `document.querySelector()` return null when the element doesn't exist. Always use optional chaining or null checks.

## See also

- <Link href='/docs/guides/function/profiling-and-performance' children='Profiling and performance' /> — understand execution phases and optimize.
- <Link href='/docs/guides/common/troubleshooting' children='Common troubleshooting' /> — timeouts, blocked sites, auth issues, and debug headers that apply to every workflow.
- <Link href='/docs/api/parameters/function' children='Function reference' /> — response shape, plan limits, and resource errors.
