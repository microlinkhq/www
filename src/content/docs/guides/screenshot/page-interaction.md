---
title: 'Page interaction'
description: 'Interact with web pages before taking a screenshot. Click buttons, scroll to sections, wait for content, inject CSS and JavaScript, and block ads.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Real-world pages often need preparation before they are ready to capture: a cookie banner to dismiss, a tab to open, a section to scroll to, or dynamic content to wait for. This section covers every parameter that lets you manipulate the page before the screenshot fires.

## Start with the cleanest page

Ad blocking is **enabled by default** (`adblock: true`). It removes ads, third-party trackers, and many cookie consent banners before the page renders, which means screenshots often come out clean without any extra work:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://www.youtube.com', screenshot: true, adblock: true, meta: false }} />

<Figcaption>Ads, trackers, and many consent popups are blocked at the network level before the page is captured.</Figcaption>

If you need to capture the page exactly as a first-time visitor would see it, disable it:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://www.youtube.com', screenshot: true, adblock: false, meta: false }} />

<Figcaption>Set <code>adblock: false</code> when you explicitly want banners, ads, or consent flows to remain visible.</Figcaption>

For first-party cookie banners that still slip through, use `click` or `styles` later in this guide.

## Waiting for content

Dynamic pages often load content asynchronously. Microlink gives you three levels of wait control.

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

You can also pass an array when a page needs to satisfy more than one lifecycle event:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://dev.to', screenshot: true, waitUntil: ['load', 'networkidle2'], meta: false }} />

<Figcaption>Use an array when one event alone is too early but waiting for a single strict event is unreliable.</Figcaption>

### Wait for a specific element

Use `waitForSelector` to pause until a CSS selector matches a visible element:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://dev.to', screenshot: true, waitForSelector: 'main', meta: false }} />

<Figcaption>The browser waits until <code>main</code> appears in the DOM before capturing.</Figcaption>

If you are already using `screenshot.element` to capture that same node, you usually do not need an extra `waitForSelector` because element capture already waits for visibility.

### Wait for a fixed duration

When you need to wait for animations, transitions, or timed content, use `waitForTimeout`:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://dev.to', screenshot: true, waitForTimeout: 3000, meta: false }} />

<Figcaption>Waits 3 seconds. Accepts milliseconds (<code>3000</code>) or humanized strings (<code>'3s'</code>, <code>'3secs'</code>, <code>'3seconds'</code>).</Figcaption>

Use this as a last resort — selector-based waits are more reliable and faster.

## Clicking elements

Use `click` with a CSS selector to click DOM elements before capture:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://microlink.io', screenshot: true, click: '#features', meta: false }} />

<Figcaption>Useful for dismissing cookie banners, expanding accordions, opening tabs, or triggering lazy sections.</Figcaption>

You can click multiple elements by passing an array:

<MultiCodeEditorInteractive height={260} mqlCode={{ url: 'https://microlink.io', screenshot: true, click: ['#cookie-accept', '#features'], meta: false }} />

<Figcaption>Elements are clicked in array order, so you can dismiss one UI layer before opening the next.</Figcaption>

## Scrolling to a section

The `scroll` parameter scrolls the viewport to a specific element before capturing:

<MultiCodeEditorInteractive height={210} mqlCode={{ url: 'https://microlink.io', screenshot: true, scroll: '#pricing', meta: false }} />

<Figcaption>The viewport scrolls so the matched element is visible, then the screenshot is taken.</Figcaption>

This is different from `screenshot.element`: `scroll` keeps the normal viewport-sized capture, while `element` crops the final image to the matched node.

## Injecting custom CSS

The `styles` parameter injects CSS into the page before capture:

<MultiCodeEditorInteractive height={280} mqlCode={{
  url: 'https://example.com',
  screenshot: true,
  styles: ['header, .cookie-banner { display: none !important; }', 'main { padding-top: 0 !important; }'],
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
  modules: ["document.querySelector('header')?.remove()"],
  meta: false
}} />

<Figcaption>Prefer <code>modules</code> over <code>scripts</code> for modern JavaScript. Both accept inline code or absolute URLs.</Figcaption>

Reach for `styles` first when CSS alone can solve the problem. Use `modules` or `scripts` when you need to mutate the page state with JavaScript. See the <Link href='/docs/api/parameters/scripts' children='scripts' /> and <Link href='/docs/api/parameters/modules' children='modules' /> references for details.

## Use function for last-resort automation

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

Reach for `function` when CSS, `modules`, and `scripts` are no longer enough. You can also `require()` a set of allowed NPM packages at runtime. See the <Link href='/docs/api/parameters/function' children='function reference' /> for the full list and the compression options for large functions.

## Combining interactions

These parameters work together. Here is a realistic sequence: wait for the target section, scroll to it, and remove the sticky header before capture:

<MultiCodeEditorInteractive height={280} mqlCode={{
  url: 'https://microlink.io',
  screenshot: true,
  waitForSelector: '#pricing',
  scroll: '#pricing',
  styles: ['header, .navbar { display: none !important; }'],
  meta: false
}} />

<Figcaption>Think in terms of page state: clean the page, wait until the right content exists, move the viewport, apply final cosmetic fixes, then capture.</Figcaption>

## Next step

Learn how to deliver screenshots as JSON or direct image responses in [delivery and embedding](/docs/guides/screenshot/embedding).
