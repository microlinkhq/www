---
title: 'Introducing Nodebox'
subtitle: 'Embed Node.js anywhere'
description: 'Nodebox is a Node.js sandbox you embed in any website with one iframe. Every run happens on a real Node.js 24 runtime with npm packages, in an isolated sandbox that is thrown away afterwards. Nothing runs on your servers or in the reader’s browser.'
authors:
  - kiko
date: '2026-11-23'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { Iframe } from 'components/markdown/Iframe'
import { RunDiagram, WhereCodeRunsDiagram } from 'components/pages/blog/introducing-nodebox'
import { FREE_PLAN_FUNCTION_TIMEOUT_SECONDS, PRO_PLAN_FUNCTION_TIMEOUT_SECONDS } from 'helpers/plan-timeouts'

![Nodebox: Embed Node.js anywhere. Drop an isolated, ephemeral Node.js sandbox into any website.](/images/nodebox-og.png)

Today we are releasing [Nodebox](https://nodebox.microlink.io): a Node.js sandbox you embed in any website with one iframe. Readers edit the code, press run, and see the result. The code below is a live Nodebox. Run it.

<Iframe
  src='https://nodebox.microlink.io/e?template=showcase&theme=microlink'
  title='Nodebox in 16 lines'
  width='100%'
  height='427px'
  loading='lazy'
  allow='clipboard-write'
/>

<Figcaption>An ESM-only npm package, the Node.js standard library and top-level await, run on Node.js 24.</Figcaption>

**TL;DR**

- **Real Node.js.** Node.js 24, with the standard library, `require`, ES modules and top-level await.
- **Any npm package.** Import it and it installs on the first run. Pin a version with `require('cheerio@1.0.0')`.
- **Ephemeral.** Every run starts a fresh sandbox, returns the result and throws the sandbox away.
- **No infrastructure.** It is an iframe. Execution, scaling and isolation run on [Microlink Functions](/function).
- **Free for you and your readers.** No account and no API key to embed it.

## Code samples that run

A code sample in documentation is a promise: copy this and it works. Most of the time the reader has to leave the page to check, open a terminal, create a project and install the dependencies, before they know whether the promise holds.

Interactive samples fix that, at a price. Either you host a sandbox yourself, with its servers, its isolation and its bill, or you ship a runtime that emulates Node.js inside the browser. The second option downloads that runtime before the first run, and modules like `fs` and `net` become browser stand-ins. It looks like Node.js until a package needs the real thing.

Nodebox takes neither path. The code runs on a real Node.js 24 runtime, on Microlink’s servers. Your site serves an iframe. The reader’s browser renders the editor and the result. That is the whole footprint.

<WhereCodeRunsDiagram />

<Figcaption>Where the code runs in each approach. Nodebox keeps the real runtime and drops the servers.</Figcaption>

## Any npm package, installed on the fly

Nodebox reads the packages your code requires or imports and installs them before the run. There is no `package.json` and no install step:

<Iframe
  src='https://nodebox.microlink.io/e?template=lodash&theme=microlink'
  title='Use any npm package'
  width='100%'
  height='271px'
  loading='lazy'
  allow='clipboard-write'
/>

<Figcaption>lodash is installed on the first run and cached for the next ones.</Figcaption>

Any public package written in JavaScript works, scoped ones included. Packages that load native binaries, such as `bcrypt` or `sharp`, are blocked by the sandbox, so reach for a pure JavaScript alternative like `bcryptjs`.

What the reader sees follows the Node.js REPL. Whatever the code returns is the result, and `console.log` output is shown above it. You rarely need the `return`:

| Last line | What the reader sees |
| --- | --- |
| An expression, `ms('2 days')` | Its value: `172800000`. |
| A declaration, `const res = await fetch(url)` | The declared variables, printed as `console.log(res)` would. |
| A function, a class, a `Map` | Printed the way Node.js prints it: `[Function: curryN]`. |
| An undeclared variable | The `ReferenceError` Node.js throws: `ms is not defined`. |

## One iframe

Open the [playground](https://nodebox.microlink.io/p?template=showcase&title=Nodebox+demo&description=An+ESM-only+npm+package%2C+Node+built-ins+and+parallel+top-level+await%2C+in+real+Node.js.), write your code, pick a theme and copy the snippet:

```html
<iframe
  src="https://nodebox.microlink.io/e?template=hello&amp;theme=microlink"
  title="Hello Node.js"
  width="100%"
  height="271"
  style="border:0;background:transparent"
  loading="lazy"
  allow="clipboard-write"
></iframe>
```

It works in plain HTML, React, or any docs platform that accepts an iframe. If your site sets a Content-Security-Policy, add `https://nodebox.microlink.io` to `frame-src`.

Everything lives in the query string, so an embed is a URL:

| Parameter | Value |
| --- | --- |
| `q` | The code to run, URL-encoded. |
| `template` | A built-in example: `hello`, `lodash`, `esm`, `zod`, `cheerio`, `streams`, `sandbox` and nine more. |
| `theme` | `microlink`, `vercel`, `tailwind`, `openai`, `spacex` or `cloudflare`. |
| `background`, `color`, `accent` | A hex color without `#`, overriding the theme. Every syntax token has its own parameter too. |
| `font` | A built-in monospace font, or any Google Fonts family name. |
| `wrap` | Show the code as a Microlink API call: `javascript`, `cli`, `curl`, `python`, `ruby`, `php` or `go`. |
| `lines`, `border` | `0` hides line numbers or the frame border. |

The playground writes all of it for you. A playground URL is also a share link: add a `title` and a `description` and it gets its own page title and social card.

## How a run works

<RunDiagram />

<Figcaption>One run, from the embed to a fresh sandbox and back.</Figcaption>

1. The reader presses run. The embed compresses the code and sends it to the [Microlink API `function` parameter](/docs/api/parameters/function), straight from the frame.
2. Microlink starts a fresh sandbox, installs the packages the code imports, runs it, and returns the value, the console output and a timing profile.
3. The sandbox is discarded.

The sandbox cannot read host files, write to disk or spawn child processes, so it is safe to let readers edit the code. Each run starts from scratch:

<Iframe
  src='https://nodebox.microlink.io/e?template=sandbox&theme=microlink'
  title='Stay inside the sandbox'
  width='100%'
  height='427px'
  loading='lazy'
  allow='clipboard-write'
/>

<Figcaption>Reading a host file and writing to disk both fail, and a global set by an earlier run is gone.</Figcaption>

Identical code is answered from the [Microlink cache](/docs/api/basics/cache), which every visitor shares. That keeps repeated runs fast, and it means a `Math.random()` snippet shows the same number until its code changes. In the playground, “Skip the cache on every run” runs it fresh each time.

This is the same engine behind every [Microlink Function](/function). We wrote about [how we made it faster](/blog/optimizing-microlink-functions) last month.

## The same code, from your backend

A snippet that works in the docs should work in production without a rewrite. Set `wrap` and the embed shows the code inside the Microlink API call that runs it:

<Iframe
  src='https://nodebox.microlink.io/e?template=zod&wrap=javascript&theme=microlink'
  title='Validate data'
  width='100%'
  height='427px'
  loading='lazy'
  allow='clipboard-write'
/>

<Figcaption>The Zod example wrapped in a JavaScript call to the Microlink API.</Figcaption>

The wrapper exists for JavaScript, the CLI, cURL, Python, Ruby, PHP and Go. Next to every result, “Copy Microlink API request” gives you the exact request the embed just made, ready for your backend or an AI agent.

## Limits

Embeds are free for you and your readers, and they always run on the Microlink free plan:

- 5 runs per day per IP address, up to 2 at a time. Readers on one office network share them.
- {FREE_PLAN_FUNCTION_TIMEOUT_SECONDS} seconds, 64 MB of memory and 5 KB of code per run.
- No requests to other websites from an embed.

Loading a page costs nothing. A run counts only when a reader presses run, so on a page with many snippets, make the key examples runnable and show the rest as plain code.

Sign in to your [Microlink account](https://dashboard.microlink.io/login) and the playground runs on your own keys: 25 runs per day on the free key, and on a [paid plan](/pricing) from $49 per month, 46,000 runs per month, {PRO_PLAN_FUNCTION_TIMEOUT_SECONDS}-second runs and network access to any website. There is no key to paste, and an embed on someone else’s site can never spend yours.

Treat the code as public. It travels in the embed URL and in the API request, so keep tokens and passwords out of snippets.

## Not CodeSandbox’s Nodebox

The names collide, the products do not. CodeSandbox’s Nodebox, the runtime behind Sandpack, runs inside the browser, like StackBlitz WebContainers. This Nodebox runs your code on a real Node.js runtime on Microlink’s servers.

## Try it

Open [nodebox.microlink.io](https://nodebox.microlink.io), pick an example and press run. When you have a snippet worth sharing, copy the embed into your docs, your tutorial or your blog post. Found a bug? The Feedback button in the playground attaches the snippet and the last run’s request ID, so we can replay exactly what you saw.
