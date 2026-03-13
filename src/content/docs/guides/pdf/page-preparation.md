---
title: 'Page preparation'
description: 'Prepare a page before Microlink prints it to PDF. Choose print or screen CSS, wait for dynamic content, click UI controls, inject CSS, and clean up unwanted elements.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Microlink does not just save raw HTML as a PDF. It renders the page in a browser first, which means CSS media rules, dynamic content, banners, and timing all affect the final document.

## Choose print or screen CSS

PDF generation uses `mediaType: 'print'` by default, which usually produces a cleaner document-oriented layout.

If a page looks better in its normal on-screen layout, switch to `screen`:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://blog.alexmaccaw.com/advice-to-my-younger-self', pdf: true, mediaType: 'screen', meta: false }} />

<Figcaption>Use <code>screen</code> when the site’s print stylesheet removes too much or changes the design in ways you do not want.</Figcaption>

| Value | Best for |
|-------|----------|
| `'print'` | Printable, document-first layouts |
| `'screen'` | Preserving the normal web design |

## Wait for the right content

Dynamic pages often need a little preparation before the PDF is printed.

### Use a lifecycle event

The `waitUntil` parameter controls what the browser considers “ready”:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://dev.to', pdf: true, meta: false, waitUntil: 'domcontentloaded' }} />

<Figcaption>For dynamic sites, a faster lifecycle event often works best when paired with a selector wait.</Figcaption>

### Wait for a specific element

A reliable pattern is to navigate quickly, then wait for the exact content you need:

<MultiCodeEditorInteractive height={230} mqlCode={{
  url: 'https://dev.to',
  pdf: true,
  meta: false,
  waitUntil: 'domcontentloaded',
  waitForSelector: 'article'
}} />

<Figcaption>Use <code>waitForSelector</code> when the content you care about appears later than the initial page shell.</Figcaption>

### Use a fixed delay as a last resort

When there is no stable selector to wait for, use `waitForTimeout`:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://dev.to', pdf: true, meta: false, waitForTimeout: '3s' }} />

<Figcaption>Prefer selector-based waits when possible. Fixed delays are slower and less reliable.</Figcaption>

## Click before printing

If the page needs one interaction before it is ready, use `click`:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://microlink.io', pdf: true, meta: false, click: '#features' }} />

<Figcaption>Useful for opening tabs, expanding accordions, or dismissing UI before the PDF is printed.</Figcaption>

## Clean up the layout with CSS

The `styles` parameter lets you inject CSS before Microlink prints the page:

<MultiCodeEditorInteractive height={280} mqlCode={{
  url: 'https://microlink.io',
  pdf: true,
  meta: false,
  styles: ['header, .navbar, .cookie-banner { display: none !important; }', 'main { max-width: 900px !important; margin: 0 auto !important; }']
}} />

<Figcaption>CSS injection is the fastest way to remove sticky navigation, banners, or layout elements that make a PDF look like a website instead of a document.</Figcaption>

Common uses:

- Hide cookie banners or sticky headers
- Narrow wide layouts to improve page breaks
- Adjust fonts, spacing, or max-width for cleaner print output

## Keep the page clean by default

Ad blocking is enabled by default (`adblock: true`). That helps remove third-party ads, trackers, and many cookie banners before the page is rendered.

If you need to capture the page exactly as a first-time visitor would see it, disable it:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://www.youtube.com', pdf: true, meta: false, adblock: false }} />

<Figcaption>Leave <code>adblock</code> enabled for cleaner PDFs unless you explicitly need the original noisy page state.</Figcaption>

## Disable JavaScript when you do not need it

JavaScript is enabled by default. Turn it off when the page is already fully useful without client-side execution:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://news.ycombinator.com', pdf: true, meta: false, javascript: false }} />

<Figcaption>Disabling JavaScript can simplify the page and reduce rendering work, especially for static or server-rendered content.</Figcaption>

## Use function as a last resort

For advanced cleanup or automation, the `function` parameter gives you full Puppeteer access before the PDF is printed:

<MultiCodeEditorInteractive height={230} mqlCode={{
  url: 'https://microlink.io',
  pdf: true,
  meta: false,
  function: "({ page }) => page.evaluate(() => { document.querySelector('header')?.remove() })"
}} />

<Figcaption>Reach for <code>function</code> only after trying media type, waits, clicks, and CSS injection. It is the most flexible, but also the most complex option.</Figcaption>

See the <Link href='/docs/api/parameters/function' children='function reference' /> for the available runtime context and advanced options.

## Next step

Learn how to deliver generated PDFs as JSON, direct downloads, or embedded previews in [delivery and embedding](/docs/guides/pdf/embedding).
