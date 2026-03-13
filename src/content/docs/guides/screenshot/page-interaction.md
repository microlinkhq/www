---
title: 'Page interaction'
description: 'Interact with web pages before taking a screenshot. Click buttons, scroll to sections, wait for content, inject CSS and JavaScript, and block ads.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Real-world pages often need interaction before they're ready to capture — a cookie banner to dismiss, a section to scroll to, or dynamic content to wait for. This section covers every parameter that lets you manipulate the page before the screenshot fires.

## Clicking elements

Use `click` with a CSS selector to click DOM elements before capture:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://microlink.io', screenshot: true, click: '#features', meta: false }} />

<Figcaption>Useful for dismissing cookie banners, expanding accordions, or activating tab panels.</Figcaption>

You can click multiple elements by passing an array:

<MultiCodeEditorInteractive height={260} mqlCode={{ url: 'https://microlink.io', screenshot: true, click: ['#cookie-accept', '#features'], meta: false }} />

<Figcaption>Elements are clicked in the order they appear in the array.</Figcaption>

## Scrolling to a section

The `scroll` parameter scrolls the viewport to a specific element before capturing:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://microlink.io', screenshot: true, scroll: '#pricing', meta: false }} />

<Figcaption>The viewport scrolls so the matched element is visible, then the screenshot is taken.</Figcaption>

This is different from `screenshot.element` — scroll positions the viewport but still captures the full viewport, while `element` crops to the matched node.

## Waiting for content

Dynamic pages often load content asynchronously. Microlink provides three levels of wait control.

### Wait for a lifecycle event

The `waitUntil` parameter controls which browser event signals "page ready":

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://dev.to', screenshot: true, waitUntil: 'networkidle0', meta: false }} />

| Value | Waits for |
|-------|-----------|
| `'auto'` | Smart combination of `load` + `networkidle2` (default) |
| `'load'` | All resources (images, stylesheets, scripts) loaded |
| `'domcontentloaded'` | DOM parsed, no wait for resources |
| `'networkidle0'` | Zero network requests for 500ms |
| `'networkidle2'` | At most 2 requests for 500ms |

For heavy pages, a good pattern is to use a fast lifecycle event combined with a selector wait:

<MultiCodeEditorInteractive height={220} mqlCode={{
  url: 'https://dev.to',
  screenshot: true,
  waitUntil: 'domcontentloaded',
  waitForSelector: 'h1',
  meta: false
}} />

<Figcaption>Navigate quickly with <code>domcontentloaded</code>, then wait until the content you care about is in the DOM.</Figcaption>

### Wait for a specific element

Use `waitForSelector` to pause until a CSS selector matches a visible element:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://dev.to', screenshot: true, waitForSelector: 'main', meta: false }} />

<Figcaption>The browser waits until <code>main</code> appears in the DOM before capturing.</Figcaption>

### Wait for a fixed duration

When you need to wait for animations, transitions, or timed content, use `waitForTimeout`:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://dev.to', screenshot: true, waitForTimeout: 3000, meta: false }} />

<Figcaption>Waits 3 seconds. Accepts milliseconds (<code>3000</code>) or humanized strings (<code>'3s'</code>, <code>'3secs'</code>, <code>'3seconds'</code>).</Figcaption>

Use this as a last resort — selector-based waits are more reliable and faster.

## Injecting custom CSS

The `styles` parameter injects CSS into the page before capture:

<MultiCodeEditorInteractive height={280} mqlCode={{
  url: 'https://example.com',
  screenshot: true,
  styles: ['body { background: white; }', 'div { border: 1px solid gray; font-family: "Comic Sans MS", cursive; }'],
  meta: false
}} />

<Figcaption>Accepts inline CSS strings or absolute URLs to external stylesheets.</Figcaption>

Common use cases:

- Hide unwanted elements: `'.cookie-banner { display: none !important; }'`
- Change fonts or colors for branded captures
- Force a specific layout

## Injecting JavaScript

Use `scripts` to inject `<script>` tags or `modules` for ES module syntax:

<MultiCodeEditorInteractive height={230} mqlCode={{
  url: 'https://microlink.io',
  screenshot: true,
  modules: ["document.body.style.backgroundColor = 'red'"],
  meta: false
}} />

<Figcaption>Prefer <code>modules</code> over <code>scripts</code> for modern JavaScript. Both accept inline code or absolute URLs.</Figcaption>

## Running custom functions

For advanced scenarios, the `function` parameter gives you full Puppeteer access to the page:

<MultiCodeEditorInteractive height={220} mqlCode={{
  url: 'https://microlink.io',
  screenshot: true,
  function: "({ page }) => page.evaluate(() => { document.querySelector('header').remove() })",
  meta: false
}} />

<Figcaption>The function receives the Puppeteer <code>page</code> object. You can manipulate the DOM, wait for conditions, or perform any browser action before the screenshot.</Figcaption>

The function has access to:

- `page` — the [Puppeteer page](https://pptr.dev/api/puppeteer.page) instance
- `html` — the page's HTML markup
- `response` — the [Puppeteer response](https://pptr.dev/api/puppeteer.httpresponse) object

You can also `require()` a set of allowed NPM packages at runtime (lodash, cheerio, jsdom, got, and more). See the <Link href='/docs/api/parameters/function' children='function reference' /> for the full list.

## Blocking ads

Ad blocking is **enabled by default**. Ads and third-party trackers are removed before rendering, which produces cleaner screenshots and faster response times:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://www.youtube.com', screenshot: true, adblock: true, meta: false }} />

<Figcaption>Powered by the <Link href='https://github.com/nicedoc/adblocker' children='Cliqz adblocker engine' />. Set <code>adblock: false</code> if you need to capture the page with ads.</Figcaption>

## Combining interactions

These parameters work together. Here's a realistic example — dismiss a cookie banner, scroll to a pricing section, wait for it to render, and hide the sticky nav:

<MultiCodeEditorInteractive height={320} mqlCode={{
  url: 'https://microlink.io',
  screenshot: true,
  click: '#cookie-accept',
  scroll: '#pricing',
  waitForSelector: '#pricing',
  styles: ['.navbar { display: none !important; }'],
  meta: false
}} />

<Figcaption>Parameters are applied in a logical order: click → scroll → wait → inject styles → capture.</Figcaption>

## Next step

Learn how to embed screenshots directly in your HTML, CSS, and Markdown in [embedding](/docs/guides/screenshot/embedding).
