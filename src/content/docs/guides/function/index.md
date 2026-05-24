---
title: 'Function'
description: "Run custom JavaScript remotely inside Microlink's headless browser, return exactly the result you need, and know when to reach for functions over simpler workflows."
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

The [function](/docs/api/parameters/function) parameter lets you run any JavaScript remotely with full Puppeteer access, npm packages, and zero infrastructure to manage.

Send a function, get the result back. No Lambda bundle, no browser fleet, no server. Microlink handles the headless browser, installs dependencies on-the-fly, and executes your code in a sandboxed runtime.

## Install

The [@microlink/function](https://www.npmjs.com/package/@microlink/function) library lets you write normal JavaScript functions and run them remotely. It handles serialization, compression, and the API call for you:

```bash
npm install @microlink/function
```

## Your first function

Pass a JavaScript function and a target URL. The library sends it to the Microlink API and returns the result:

```js
const microlink = require('@microlink/function')

const getTitle = ({ page }) => page.title()
const fn = microlink(getTitle)

const result = await fn('https://example.com')

console.log(result.isFulfilled) // true
console.log(result.value)       // 'Example Domain'
```

<Figcaption>The function runs remotely after the page loads. The result includes the returned value at <code>result.value</code> and execution metrics at <code>result.profiling</code>.</Figcaption>

You can also try it interactively without installing anything:

<MultiCodeEditorInteractive mqlCode={{
  url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/title',
  function: '({ page }) => page.title()',
  meta: false
}} />

## Return any value

Functions can return strings, numbers, booleans, arrays, or plain objects:

```js
const microlink = require('@microlink/function')

const getStats = ({ page }) =>
  page.title().then(title => ({
    title,
    length: title.length,
    words: title.split(/\s+/)
  }))

const fn = microlink(getStats)
const result = await fn('https://example.com')

console.log(result.value)
// { title: 'Example Domain', length: 14, words: ['Example', 'Domain'] }
```

Simple computed values work the same way:

```js
const fn = microlink(() => 40 + 2)
const result = await fn('https://example.com')
console.log(result.value) // 42
```

## Pass your own parameters

Any extra parameter you include in the request is forwarded to the function as a property on the first argument:

```js
const microlink = require('@microlink/function')

const greet = ({ name, greeting }) => `${greeting}, ${name}!`
const fn = microlink(greet)

const result = await fn('https://example.com', {
  name: 'Kiko',
  greeting: 'Hello'
})

console.log(result.value) // 'Hello, Kiko!'
```

<Figcaption>This is the simplest way to make one function reusable across different requests without changing the function code.</Figcaption>

<MultiCodeEditorInteractive height={250} mqlCode={{
  url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/title',
  function: `({ page, label }) =>
  page.title().then(title => ({ label, title }))`,
  label: 'Current page title',
  meta: false
}} />

## Choose the lightest tool

Use [function](/docs/api/parameters/function) when the built-in parameters stop being expressive enough, not as the default for every workflow.

| If you need | Best option | Why |
|-------------|-------------|-----|
| Simple field extraction from the DOM | [data](/docs/api/parameters/data) | Declarative rules are shorter, easier to maintain, and easier to reuse |
| Inject CSS or JavaScript before another workflow | [styles](/docs/api/parameters/styles), [modules](/docs/api/parameters/modules), or [scripts](/docs/api/parameters/scripts) | Lighter than full browser automation |
| Click, wait, compute, reshape, or orchestrate custom logic | [function](/docs/api/parameters/function) | You get Puppeteer access plus any npm package |

For simpler extraction flows, start with <Link href='/docs/guides/data-extraction' children='data extraction' /> and only escalate to [function](/docs/api/parameters/function) when the declarative approach becomes limiting.

## What's next

- **[Page interaction](/docs/guides/function/page-interaction)** — Puppeteer helpers, execution contexts, and `page.evaluate`.
- **[NPM packages](/docs/guides/function/npm-packages)** — use any npm dependency inside your function.
- **[Profiling and performance](/docs/guides/function/profiling-and-performance)** — understand execution phases, plan limits, and optimization.
- **[Troubleshooting](/docs/guides/function/troubleshooting)** — error handling, resource errors, and common failure modes.
