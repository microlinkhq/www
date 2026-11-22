---
title: 'Introducing Nodebox'
subtitle: 'Ephemeral Node.js for your AI agents'
description: 'Nodebox runs the code your AI agent writes in a fresh Node.js sandbox and throws the sandbox away. Any npm package, installed on the fly. One stateless API call on disposable infrastructure, with no server and no deploy.'
authors:
  - kiko
date: '2026-11-23'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { Iframe } from 'components/markdown/Iframe'
import { RunDiagram, SpinningCube } from 'components/pages/blog/introducing-nodebox'
import { FREE_PLAN_FUNCTION_TIMEOUT_SECONDS, PRO_PLAN_FUNCTION_TIMEOUT_SECONDS } from 'helpers/plan-timeouts'

<SpinningCube />

Today we are releasing [Nodebox](https://nodebox.microlink.io): ephemeral Node.js for your AI agents. The agent writes code, Nodebox runs it in a fresh sandbox and throws the sandbox away. No server, no deploy.

It runs on the Microlink API, the same AI-ready infrastructure behind everything we ship. The code below is a live Nodebox. Run it.

<Iframe
  src='https://nodebox.microlink.io/e?template=showcase&theme=microlink'
  title='Nodebox in 16 lines'
  width='100%'
  height='427px'
  loading='lazy'
  allow='clipboard-write'
/>

<Figcaption>An ESM-only npm package, the Node.js standard library and top-level await, run on the current Node.js LTS.</Figcaption>

**TL;DR**

- **Real Node.js, running remotely.** The current Node.js LTS on Microlink’s servers, not an emulation in the browser.
- **ESM and CommonJS.** `import`, `require` and top-level await.
- **Any npm package.** Installed on the fly. Pin a version with `require('cheerio@1.0.0')`.
- **Ephemeral.** A fresh sandbox on every run, thrown away afterwards.
- **REPL-style output.** The last line is the result.
- **Embeddable anywhere.** One iframe makes a code sample runnable. Free, with no account and no API key.

## Why

Your agent needs to parse a CSV, test a regex or crunch some JSON. Writing that code is the easy part. Running it is not: today it means a server, a container or your own laptop, with whatever the agent wrote running next to your files.

With Nodebox it is one stateless API call on disposable infrastructure. The code runs, the result comes back, the sandbox is gone. There is nothing to provision, nothing to clean up, and nothing left behind for the next run.

Running it in the browser instead does not get you real Node.js. Runtimes that emulate it there turn modules like `fs` and `net` into stand-ins, and it looks like Node.js until a package needs the real thing. Nodebox runs the current Node.js LTS, on Microlink’s servers.

## Any npm package, installed on the fly

Nodebox reads the packages the code requires or imports and installs them before the run. There is no `package.json` and no install step, so the agent writes the code and nothing else:

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

What comes back follows the Node.js REPL. Whatever the code returns is the result, and `console.log` output is kept apart from it. You rarely need the `return`:

| Last line | What comes back |
| --- | --- |
| An expression, `ms('2 days')` | Its value: `172800000`. |
| A declaration, `const res = await fetch(url)` | The declared variables, printed as `console.log(res)` would. |
| A function, a class, a `Map` | Printed the way Node.js prints it: `[Function: curryN]`. |
| An undeclared variable | The `ReferenceError` Node.js throws: `ms is not defined`. |

## How a run works

<RunDiagram />

<Figcaption>One run, from the caller to a fresh sandbox and back.</Figcaption>

1. Your agent, or a reader pressing run in an embed, sends the code to the [Microlink API function parameter](/docs/api/parameters/function).
2. Microlink starts a fresh sandbox, installs the packages the code imports, runs it, and returns the value, the console output and a timing profile.
3. The sandbox is discarded.

The sandbox cannot read host files, write to disk or spawn child processes, so it is safe to run code nobody reviewed. Here is code an agent might write to check untrusted input, shown inside the Microlink API call that runs it:

<Iframe
  src='https://nodebox.microlink.io/e?template=zod&wrap=javascript&theme=microlink'
  title='Validate data'
  width='100%'
  height='427px'
  loading='lazy'
  allow='clipboard-write'
/>

<Figcaption>A Zod schema check, wrapped in the JavaScript call to the Microlink API.</Figcaption>

The same call exists for the CLI, cURL, Python, Ruby, PHP and Go. Next to every result, “Copy Microlink API request” gives you the exact request that just ran, ready to hand to your agent as a tool.

Identical code is answered from the [Microlink cache](/docs/api/basics/cache), which keeps repeated runs fast. When the agent needs a fresh run every time, set [force](/docs/api/parameters/force).

This is the same engine behind every [Microlink Function](/function). We wrote about [how we made it faster](/blog/optimizing-microlink-functions) last month.

## Not just for your AI agent: embed it anywhere

The call your agent makes also powers an embed. Paste one iframe and your docs, tutorial or blog post become runnable: readers edit the code, press run and see the result, on the same disposable infrastructure.

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

It works in plain HTML, React, or any docs platform that accepts an iframe. Six themes, any color, any Google Fonts monospace family. Free to embed: no account, no API key.

## Limits

Every run is a Microlink API call, so the [function plan limits](/docs/api/parameters/function#plan-limits) apply. Embeds always run on the free plan:

- 5 runs per day per IP address, up to 2 at a time. Readers on one office network share them.
- {FREE_PLAN_FUNCTION_TIMEOUT_SECONDS} seconds, 64 MB of memory and 5 KB of code per run.
- No requests to other websites.

Loading a page costs nothing. A run counts only when a reader presses run, so on a page with many snippets, make the key examples runnable and show the rest as plain code.

For your agent, use a Microlink API key: 25 runs per day on the free key, and on a [paid plan](/pricing) from $49 per month, 46,000 runs per month, {PRO_PLAN_FUNCTION_TIMEOUT_SECONDS}-second runs and network access to any website. Signed in to your [Microlink account](https://dashboard.microlink.io/login), the playground runs on those same keys. There is no key to paste, and an embed on someone else’s site can never spend yours.

Treat the code as public. It travels in the request URL, so keep tokens and passwords out of it.

## Prior art

Nodebox is inspired by [RunKit](https://runkit.com), and I’m a big fan of the service. Requiring any npm package and running it on real Node.js, right inside a web page, is the idea that stuck with me. [almostnode](https://almostnode.dev) inspired us too, with how light and instant a Node.js playground on a web page can feel. Nodebox is our take on both.

The name collides with CodeSandbox’s Nodebox, but the products do not. Theirs is the runtime behind Sandpack, and it runs inside the browser, like StackBlitz WebContainers. This Nodebox runs your code on a real Node.js runtime on Microlink’s servers.

## Try it

Open [nodebox.microlink.io](https://nodebox.microlink.io), pick an example and press run. To give it to your agent, copy the API request next to any result. To make your docs runnable, copy the embed. Found a bug? The Feedback button in the playground attaches the snippet and the last run’s request ID, so we can replay exactly what you saw.
