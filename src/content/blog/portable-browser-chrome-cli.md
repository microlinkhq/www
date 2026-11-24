---
title: 'The Portable Browser: ./chrome html <url>'
subtitle: 'Chrome already ships one-shot commands for DOM, screenshots, and PDFs'
description: 'Use Chrome Headless from the command line to render a page and emit its DOM, a screenshot, or a PDF, then learn when a production browser API is the better boundary.'
authors:
  - kiko
date: '2026-09-17'
---

Sometimes the right browser API is a process.

Chrome Headless can load a page, execute its JavaScript, produce one artifact, and exit. No Puppeteer script. No DevTools client. No server to keep alive.

## Rendered HTML

```shell
chrome --headless --dump-dom https://example.com
```

`--dump-dom` serializes the DOM after Chrome has parsed the page and run scripts. It is different from downloading the original HTML source.

Save it like any other command output:

```shell
chrome --headless --dump-dom https://example.com > page.html
```

## Screenshot

```shell
chrome --headless --screenshot=page.png https://example.com
```

Set a viewport when the default is not the page shape you want:

```shell
chrome --headless --window-size=1440,900   --screenshot=page.png https://example.com
```

## PDF

```shell
chrome --headless --print-to-pdf=page.pdf https://example.com
```

The output comes from Chrome's print pipeline. It respects the page's print CSS and can be tuned with other Headless command-line flags.

## Give the page time

Pages often update after the initial load. Chrome provides flags for two common cases.

```shell
chrome --headless   --timeout=5000   --dump-dom https://example.com
```

`--timeout` lets the page run for the given number of milliseconds before capturing. `--virtual-time-budget` advances virtual time, which can be useful for timer-driven pages:

```shell
chrome --headless   --virtual-time-budget=5000   --screenshot=page.png https://example.com
```

These are capture controls, not a replacement for application-specific readiness. If correctness depends on a selector, network response, or user action, use a browser automation API that can wait for that condition explicitly.

## `chrome-headless-shell`

Google also publishes `chrome-headless-shell`, a standalone binary based on Chrome's old Headless implementation. It is a smaller automation-focused program built around Chromium's content layer rather than the full Chrome application.

Puppeteer supports it with:

```js
const browser = await puppeteer.launch({ headless: 'shell' })
```

It is useful when the old Headless feature set is enough and startup or package size matters. It is not the same as current Chrome Headless, which shares Chrome's browser code and behavior more closely.

## Put a tiny interface around it

The three commands are enough to make a small portable tool:

```shell
#!/usr/bin/env sh
set -eu

command=$1
url=$2

case "$command" in
  html) chrome --headless --dump-dom "$url" ;;
  screenshot) chrome --headless --screenshot=page.png "$url" ;;
  pdf) chrome --headless --print-to-pdf=page.pdf "$url" ;;
  *) echo "usage: $0 {html|screenshot|pdf} <url>" >&2; exit 1 ;;
esac
```

Now the interface is exactly the idea:

```shell
./chrome html https://example.com
```

## When one-shot is enough

Use the CLI when:

- one machine processes a bounded number of URLs;
- a file or stdout is the whole result;
- default navigation behavior is sufficient;
- failure can be handled by the surrounding script;
- you control the environment and Chrome version.

It is excellent for local tools, CI jobs, cron tasks, debugging, and the first version of an internal pipeline.

## When you need an API

The process becomes infrastructure when it must handle untrusted URLs continuously.

You may need explicit readiness checks, retries, browser pooling, request blocking, proxies, authentication, cache keys, concurrency control, timeouts, artifact storage, stable response schemas, and telemetry. You also need to keep browser crashes and hostile pages away from the caller.

At that point the useful interface is still one operation, but the machinery behind it should be shared:

```text
URL + options -> data or artifact URL
```

That is the layer [Microlink API](/api) provides. It runs the browser work remotely and exposes [metadata](/metadata), [screenshots](/screenshot), [PDFs](/pdf), [Markdown](/markdown), and [Functions](/function) through the same HTTP boundary.

Start with Chrome's CLI. Move to an API when operating Chrome becomes more work than the browser result.

## Sources

- [Chrome Headless command-line reference](https://developer.chrome.com/docs/automation-and-testing/headless-cli)
- [Chrome Headless mode](https://developer.chrome.com/docs/automation-and-testing/headless)
- [`chrome-headless-shell`](https://developer.chrome.com/docs/automation-and-testing/headless-chrome-shell)
