---
title: 'Defining extraction rules'
description: 'Choose what should become Markdown, prepare the page state when needed, and fix the most common noisy or incomplete conversion issues.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Most Markdown quality issues are really scope issues. The rule decides which HTML becomes Markdown, and the page state decides whether that HTML is clean, complete, and ready to serialize.

## Start with the smallest useful wrapper

Whole-page conversion is fine for a first pass:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://example.com',
    data: {
      content: {
        attr: 'markdown'
      }
    },
    meta: false
  }}
/>

<Figcaption>Use whole-page conversion to prototype quickly or inspect what the site exposes before you tighten the scope.</Figcaption>

For production use, a scoped wrapper is usually better:

<MultiCodeEditorInteractive
  height={250}
  mqlCode={{
    url: 'https://microlink.io/docs/api/getting-started/overview',
    data: {
      article: {
        selector: 'main',
        attr: 'markdown'
      }
    },
    meta: false
  }}
/>

<Figcaption>Start with semantic wrappers like <code>main</code> or <code>article</code>. It is usually more reliable than cleaning the full page after the fact.</Figcaption>

| If you need | Use |
|-------------|-----|
| A quick draft of the entire page | Omit `selector` |
| Cleaner docs or article content | `selector: 'main'` or `selector: 'article'` |
| One specific block or panel | A more precise CSS selector |

## Add supporting fields when Markdown alone is not enough

Markdown is often only one field in a larger payload:

<MultiCodeEditorInteractive
  height={310}
  mqlCode={{
    url: 'https://microlink.io/docs/api/getting-started/overview',
    data: {
      title: {
        selector: 'main h1',
        attr: 'text'
      },
      article: {
        selector: 'main',
        attr: 'markdown'
      },
      headings: {
        selectorAll: 'main h2',
        attr: 'text'
      }
    },
    meta: false
  }}
/>

<Figcaption>Keep the main body as Markdown, then add the extra text fields your indexer, CMS, or LLM pipeline still needs.</Figcaption>

This is usually as far as Markdown-specific rule design needs to go. If you need nested objects, typed collections, or `evaluate`, jump to <Link href='/docs/guides/data-extraction/defining-rules' children='Data extraction: Defining rules' />.

## Prepare the page before conversion

Once the scope is right, make sure the wrapper is actually ready:

<MultiCodeEditorInteractive
  height={320}
  mqlCode={{
    url: 'https://microlink.io',
    data: {
      content: {
        selector: 'main',
        attr: 'markdown'
      }
    },
    meta: false,
    waitUntil: 'domcontentloaded',
    waitForSelector: 'main',
    click: '#features',
    styles: ['header, footer { display: none !important; }']
  }}
/>

<Figcaption>Wait for the content wrapper, open the state you need, and hide the chrome that should not end up in the Markdown.</Figcaption>

Use the preparation tools in this order:

1. Better `selector`
2. `waitForSelector`
3. `click` or `scroll`
4. `styles`

A few good defaults:

- Use `prerender: false` when the HTML already contains the content you need.
- Use `prerender: true` when a client-rendered page stays empty without a browser.
- Prefer `waitForSelector` over `waitForTimeout`.
- Keep `adblock: true` unless you explicitly need banners or ads in the output.

## Use fallbacks when wrappers vary

When the same content lives under different wrappers across pages, define multiple rules in priority order:

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://microlink.io/docs/api/getting-started/overview',
    data: {
      content: [
        {
          selector: 'article',
          attr: 'markdown'
        },
        {
          selector: 'main',
          attr: 'markdown'
        },
        {
          attr: 'markdown'
        }
      ]
    },
    meta: false
  }}
/>

<Figcaption>Try the cleanest wrapper first, then fall back to broader rules only when needed.</Figcaption>

This is the most useful Markdown-specific fallback pattern because it lets you keep the output clean without inventing separate per-site extractors too early.

## Fix the most common Markdown problems

- Empty output: add `waitForSelector`, then try `prerender: true`.
- Noisy output: tighten the `selector` before you reach for CSS cleanup.
- Sticky headers, nav, or banners inside the result: use `click`, `scroll`, or `styles` before conversion.
- Inconsistent wrappers across pages: use fallback rules instead of one fragile selector.

## Use Data extraction for the deeper dives

The Markdown guide should stay focused on scoping and conversion. Continue with Data extraction when you need:

- nested objects or list-of-objects responses
- collections that carry several fields per item
- typed fields such as URLs, dates, images, or numbers
- `evaluate` for custom browser-side extraction logic
- device, viewport, media type, or browser automation details
- timeout, auth, proxy, and advanced troubleshooting paths

The most relevant deeper pages are:

- <Link href='/docs/guides/data-extraction/defining-rules' children='Data extraction: Defining rules' />
- <Link href='/docs/guides/data-extraction/page-preparation' children='Data extraction: Page preparation' />
- <Link href='/docs/guides/data-extraction/troubleshooting' children='Data extraction: Troubleshooting' />

For the low-level syntax, see the MQL references for <Link href='/docs/mql/data/selector' children='selector' />, <Link href='/docs/mql/data/selectorAll' children='selectorAll' />, <Link href='/docs/mql/data/attr' children='attr' />, <Link href='/docs/mql/data/type' children='type' />, and <Link href='/docs/mql/data/evaluate' children='evaluate' />.

## Next step

Learn how to serve Markdown as JSON or a direct response in <Link href='/docs/guides/markdown/delivery-and-response' children='Delivery and response shaping' />.
