---
title: 'Metadata: Page preparation'
description: 'Render the right version of the page before metadata extraction. Choose fetch mode, waits, and JavaScript behavior for dynamic or SPA targets.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'

Metadata extraction is only as good as the page Microlink sees. On static sites, the default behavior is usually enough. On dynamic or hydration-heavy sites, you may need to control how the page is fetched and when extraction happens.

## Choose fetch mode first

The biggest rendering decision is `prerender`:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://vercel.com',
    meta: {
      title: true,
      description: true
    },
    prerender: false
  }}
/>

<Figcaption>Use <code>prerender: false</code> when the metadata is already present in the initial HTML and you do not need a browser render.</Figcaption>

| If the page | Use |
|-------------|-----|
| Is static HTML or simple server-rendered markup | `prerender: false` |
| Might need a browser, but you are not sure | `prerender: 'auto'` (default) |
| Is client-rendered and comes back incomplete without browser execution | `prerender: true` |

`prerender` is often the difference between getting real metadata and getting a generic shell.

## Wait for dynamic pages to settle

If the page needs browser rendering, you can control when Microlink considers it ready:

<MultiCodeEditorInteractive
  height={260}
  mqlCode={{
    url: 'https://dev.to',
    meta: {
      title: true,
      description: true
    },
    waitUntil: 'domcontentloaded',
    waitForSelector: 'main'
  }}
/>

<Figcaption>Start with a fast lifecycle event, then wait for a stable selector that signals the page is really ready.</Figcaption>

Use the wait controls in this order:

| Need | Best option |
|------|-------------|
| A good default navigation signal | `waitUntil: 'auto'` |
| Faster navigation before a selector wait | `waitUntil: 'domcontentloaded'` |
| A stable signal that the page has rendered | `waitForSelector` |
| A last-resort fixed wait | `waitForTimeout` |

You can also pass an array to `waitUntil` when one event alone is not enough.

## Disable JavaScript when it is not helping

If the site already exposes the metadata you need in the HTML, JavaScript can be unnecessary:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://news.ycombinator.com',
    meta: {
      title: true,
      description: true
    },
    javascript: false
  }}
/>

<Figcaption>Disabling JavaScript can reduce rendering work when the target site already exposes the right metadata in the initial document.</Figcaption>

This is most useful for static sites, classic server-rendered pages, and pages where JavaScript adds noise rather than value.

## Use fixed waits sparingly

If there is no stable selector to wait for, use `waitForTimeout` as a last resort:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://dev.to',
    meta: {
      title: true,
      description: true
    },
    waitForTimeout: '3s'
  }}
/>

<Figcaption>Fixed waits work, but selector-based waits are usually faster and more reliable.</Figcaption>

If you still cannot get the right result, continue with [troubleshooting](/docs/guides/metadata/troubleshooting).

## Next step

Learn how to keep metadata requests fast and fresh in [caching and performance](/docs/guides/metadata/caching-and-performance).
