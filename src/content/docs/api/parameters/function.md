---
title: 'function'
description: 'Execute custom JavaScript code inside a headless browser to perform advanced scraping or automation tasks. Gain full control over the page lifecycle with Puppeteer access.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type } from 'components/markdown/Type'
import { FREE_PLAN_CONCURRENT_REQUESTS } from 'helpers/free-tier'
import FunctionCompression from 'content/fragments/function-compression.md'

Type: <Type children='<string>'/>

It runs JavaScript code with runtime access to a headless browser.

<MultiCodeEditorInteractive
  mqlCode={{
    url: 'https://microlink.io',
    function: '({ page }) => page.evaluate("jQuery.fn.jquery")',
    scripts: ['https://code.jquery.com/jquery-3.5.0.min.js']
  }}
/>

The function runtime supports `require()` for any npm package:

<MultiCodeEditorInteractive height={200} mqlCode={{
  url: 'https://example.com',
  function: `() => {
  const cheerio = require('cheerio')
  const $ = cheerio.load('<h1>Hello world</h1>')
  return $('h1').text()
}`
}} />

Dependencies are detected automatically from your code and installed on-the-fly during the install phase.

The runtime restricts certain system capabilities for security. Operations such as spawning child processes or writing to the filesystem outside the sandbox are not permitted.

## Request

The function will receive the parameters explained below as part of the user's request code.

### url

The URL you asked for. Available whether or not the function uses `page`, so you do not need a browser just to know which origin you are running against:

<MultiCodeEditorInteractive mqlCode={{
  url: 'https://example.com',
  function: '({ url }) => new URL("/robots.txt", url).href'
}} />

It is the URL you requested, not the one a redirect settles on. A function asked for on its own skips the [ping](/docs/api/parameters/ping) that would resolve that hop, so `data.url` in the response is the same URL, and the two agree.

Use `page.url()` when you need the settled one, which resolves the page:

```js
// requested http://github.com
({ url }) => url                  // => "http://github.com/"
async ({ page }) => page.url()    // => "https://github.com/"
```

Asking for `ping` explicitly settles `data.url` without changing the argument.

<H3>page</H3>

A [Puppeteer Page](https://pptr.dev/api/puppeteer.page) for the URL you asked for.:

<MultiCodeEditorInteractive mqlCode={{
  url: 'https://example.com',
  function: '({ page }) => page.title()'
}} />

The [page API](https://pptr.dev/api/puppeteer.page) is supported, so any method on that object is available.

Additionally, we provide methods that extend the page:

#### page.extract()

It takes the same rules as [data](/docs/api/parameters/data) and returns one value per rule:

<MultiCodeEditorInteractive height={250} mqlCode={{
  url: 'https://news.ycombinator.com',
  function: `({ page }) => page.extract({
  stories: {
    selectorAll: '.athing',
    attr: {
      title: { selector: '.titleline > a', attr: 'text' },
      href: { selector: '.titleline > a', attr: 'href', type: 'url' }
    }
  }
})`
}} />

#### page.metadata()

It returns the same normalized metadata as [meta](/docs/api/parameters/meta) for the target URL:

<MultiCodeEditorInteractive mqlCode={{
  url: 'https://example.com',
  function: 'async ({ page }) => (await page.metadata()).title'
}} />

#### page.goal()

It drives the page toward a goal written in plain language, over as many clicks, keystrokes and scrolls as it takes, and resolves once the goal is met. Paid plans only:

<MultiCodeEditorInteractive height={200} mqlCode={{
  url: 'https://news.ycombinator.com',
  function: `async ({ page }) => {
  const { status, accuracy } = await page.goal('Open the comments of the first story.')
  return { status, accuracy, url: page.url() }
}`
}} />

It resolves to:

| Field       | Description                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------ |
| `status`    | `success` when the goal was reached, `error` otherwise                                           |
| `error`     | `{ name, message, code, reason }` when `status` is `error`. `reason` is `captcha`, `login_wall`, `unsupported_surface`, `step_budget`, `no_change`, `stale_target` or `model_blocked` when the agent stopped on its own |
| `steps`     | Actions taken on the page                                                                        |
| `decisions` | Model decisions requested                                                                        |
| `trace`     | Every action with its confidence; it includes any text typed into the page                       |
| `accuracy`  | `{ passed, probability }`: a second model reading the final page and judging whether the goal is met |
| `cost`      | Tokens and model calls spent                                                                     |
| `timing`    | `{ totalMs, modelMs, otherMs, evaluationMs }`                                                    |

A goal that fails does not throw, so check `status` before relying on the page. `success` is the model's judgment, and `accuracy` is a second opinion, not a proof.

The second argument takes `maxSteps` (up to 60), `maxDecisions` (up to 120) and `waitMs` (up to 5000).

#### page.extract() with an instruction

Pass an instruction instead of rules and a model writes the rules for the current page. Name the fields you want and leave the selectors out. Paid plans only:

<MultiCodeEditorInteractive height={220} mqlCode={{
  url: 'https://news.ycombinator.com',
  function: `({ page }) => page.extract('get the stories', {
  stories: { attr: { title: { type: 'string' }, href: { type: 'url' } } }
})`
}} />

It resolves to `{ status, data, rules, cost, timing }`, plus `error` when `status` is `error`. The values always come from the page: the model only writes selectors, so a wrong one gives a missing field, never an invented value. `rules` are the rules that ran: pass them back to `page.extract(rules)` to run them again with no model call.

<H3>response</H3>

The [puppeteer#response](https://pptr.dev/api/puppeteer.httpresponse) as result of the implicit [page.goto](https://pptr.dev/api/puppeteer.page.goto). Only available when the function loads the page in a browser:

<MultiCodeEditorInteractive mqlCode={{
  url: 'https://edge-ping.vercel.app',
  function: '({ page, response }) => response.status()'
}} />

<H3>headers</H3>

The request headers used to fetch the target URL:

<MultiCodeEditorInteractive mqlCode={{
  url: 'https://example.com',
  function: '({ headers }) => headers["user-agent"]'
}} />

### Custom parameters

Any extra query parameter is forwarded to the function:

<MultiCodeEditorInteractive height={200} mqlCode={{
  url: 'https://example.com',
  function: '({ greetings }) => greetings',
  greetings: 'hello world'
}} />

## Response

The result is wrapped under `data.function`:

```json
{
  "status": "success",
  "data": {
    "function": {
      "isFulfilled": true,
      "value": "3.5.0",
      "profiling": {
        "phases": { "install": 0, "build": 120, "spawn": 45, "run": 890, "total": 1055 },
        "cpu": 234,
        "memory": { "total": 69996544, "used": 2359296, "heap": 4410880, "external": 1742574 },
        "size": 156
      },
      "logging": {}
    }
  }
}
```

| Field         | Description                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------- |
| `isFulfilled` | `true` when the function completed without errors                                               |
| `value`       | The return value on success, or `{ name, message }` on failure                                  |
| `profiling`   | Execution metrics: phase durations (ms), CPU time (ms), a memory breakdown (bytes), and code size (bytes) |
| `logging`     | Captured console output from the function runtime                                               |

The profiling phases are:

| Phase     | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `install` | Time spent installing npm dependencies detected in your code |
| `build`   | Time spent bundling the function code                        |
| `spawn`   | Time spent starting the isolated runtime process             |
| `run`     | Time spent executing the function itself                     |
| `total`   | Wall-clock time from start to finish                         |

## Plan limits

The function parameter is available on both free and pro plans with different resource limits:

|                   | Free plan                                      | Paid plan    |
| ----------------- | ---------------------------------------------- | ------------ |
| Timeout           | 15 seconds                                     | 60 seconds   |
| Memory            | 64 MB                                          | 128 MB       |
| Code size         | 1024 bytes                                     | Unlimited    |
| Concurrency       | {FREE_PLAN_CONCURRENT_REQUESTS} concurrent requests | Unlimited    |
| Outgoing requests | Same-origin only                               | Unrestricted |
| AI agent          | Not available                                  | `page.goal`, `page.extract` with an instruction |

When a limit is exceeded, the function returns `isFulfilled: false` with a descriptive error instead of failing the entire request:

```json
{
  "data": {
    "function": {
      "isFulfilled": false,
      "value": {
        "name": "TimeoutError",
        "message": "Function exceeded the 15s free plan timeout. Upgrade to pro for up to 60s."
      },
      "profiling": {},
      "logging": {}
    }
  }
}
```

The resource error types are:

| Error                  | Trigger                                                              |
| ---------------------- | -------------------------------------------------------------------- |
| `TimeoutError`         | Function wall-clock time exceeded the plan limit                     |
| `CpuTimeError`         | Function CPU time exceeded the plan limit                            |
| `MemoryError`          | Function memory usage exceeded the plan limit                        |
| `CodeSizeError`        | Function code exceeds the 1024 bytes free plan limit                 |
| `ConcurrencyError`     | The same function is already running against the same URL without a key |
| `OutgoingRequestError` | Function made a cross-origin network request on the free plan        |
| `AgentError`           | Function called `page.goal` or `page.extract` with an instruction on the free plan |

Each error message is plan-aware and tells you the exact limit that was hit.

## Compression

<FunctionCompression />
