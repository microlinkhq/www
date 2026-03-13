---
title: 'Page preparation'
description: 'Prepare pages before Markdown extraction. Choose prerendering, wait for dynamic content, emulate the right device, and mutate the DOM when needed.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

The quality of your Markdown depends on the DOM Microlink sees. This page covers the rendering and interaction options that change that DOM before conversion happens.

## Choose fetch mode first

The biggest rendering decision is `prerender`:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://example.com',
    data: {
      content: {
        attr: 'markdown'
      }
    },
    meta: false,
    prerender: false
  }}
/>

<Figcaption>Use <code>prerender: false</code> when the page already contains the content in its initial HTML and does not need a browser render.</Figcaption>

| If the page | Use |
|-------------|-----|
| Is static HTML or a simple server-rendered document | `prerender: false` |
| Might need a browser, but you are not sure | `prerender: 'auto'` (default) |
| Is client-rendered and comes back empty without browser execution | `prerender: true` |

If you still need a browser render but the page does not require scripts, `javascript: false` can be another useful speed and reliability lever.

## Extract the right page variant

Responsive layouts, print styles, and language-specific UIs can all change the extracted Markdown.

<MultiCodeEditorInteractive
  height={240}
  mqlCode={{
    url: 'https://microlink.io',
    data: {
      content: {
        selector: 'main',
        attr: 'markdown'
      }
    },
    meta: false,
    device: 'iPhone 15 Pro'
  }}
/>

<Figcaption>Use <code>device</code> when the target site renders a different mobile or tablet experience.</Figcaption>

The main rendering controls are:

- `device` — loads a known device preset, including viewport and user agent.
- `viewport` — overrides width, height, scale factor, and mobile flags when the preset is not enough.
- `mediaType` — switches between `'screen'` (default) and `'print'`, which matters when the site ships print-specific CSS.
- `headers` <ProBadge /> — can shape locale or other request-dependent variants. See [private pages](/docs/guides/markdown/private-pages).

Choose these settings before you tweak selectors. Often the best selector is the same, but the wrong page variant is being rendered.

## Wait for dynamic content

Dynamic pages often need time before the final article or documentation body exists in the DOM.

<MultiCodeEditorInteractive
  height={260}
  mqlCode={{
    url: 'https://dev.to',
    data: {
      content: {
        selector: 'main',
        attr: 'markdown'
      }
    },
    meta: false,
    waitUntil: 'domcontentloaded',
    waitForSelector: 'main'
  }}
/>

<Figcaption>Navigate quickly, then wait for the exact content wrapper you care about.</Figcaption>

Use the wait controls in this order:

| Need | Best option |
|------|-------------|
| A good default navigation signal | `waitUntil: 'auto'` |
| Faster navigation before a selector wait | `waitUntil: 'domcontentloaded'` |
| Wait for a specific content wrapper to appear | `waitForSelector` |
| Handle animation or delayed hydration with no stable selector | `waitForTimeout` |

You can also pass an array to `waitUntil` when a page needs more than one lifecycle event.

## Clean the page before conversion

Ad blocking is **enabled by default** (`adblock: true`). That removes many ads, trackers, and consent layers before the page is processed.

When that is not enough, mutate the page state first:

<MultiCodeEditorInteractive
  height={320}
  mqlCode={{
    url: 'https://microlink.io',
    data: {
      content: {
        attr: 'markdown'
      }
    },
    meta: false,
    click: '#features',
    scroll: '#pricing',
    styles: ['header, footer { display: none !important; }']
  }}
/>

<Figcaption>Think in page state: click what needs opening, scroll if lazy content loads on view, and hide chrome before conversion.</Figcaption>

Reach for these tools from simplest to most powerful:

- `adblock` — keep the default `true` unless you explicitly need ads or consent flows visible.
- `click` — dismiss banners, open accordions, or switch tabs.
- `scroll` — trigger content that only loads when a section enters the viewport.
- `styles` — hide page chrome or adjust layout with CSS before extraction.

## Use scripts, modules, and function only when needed

If CSS and the basic interaction parameters are still not enough, you can inject JavaScript or run a full browser function:

<MultiCodeEditorInteractive
  height={280}
  mqlCode={{
    url: 'https://microlink.io',
    data: {
      content: {
        attr: 'markdown'
      }
    },
    meta: false,
    function: "({ page }) => page.evaluate(() => { document.querySelector('header')?.remove() })"
  }}
/>

<Figcaption>Use <code>function</code> only for last-resort DOM automation. It runs with Puppeteer access before the extraction result is finalized.</Figcaption>

The progression is usually:

1. `styles` when CSS alone can solve it.
2. `modules` or `scripts` when you need a little JavaScript in the page.
3. `function` when you need full browser control.

See the <Link href='/docs/api/parameters/scripts' children='scripts' />, <Link href='/docs/api/parameters/modules' children='modules' />, and <Link href='/docs/api/parameters/function' children='function reference' /> docs for the advanced details.

## Next step

Learn how to shape the final response as JSON or direct Markdown in [delivery and response shaping](/docs/guides/markdown/delivery-and-response).
