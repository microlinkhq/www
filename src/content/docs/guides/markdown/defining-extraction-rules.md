---
title: 'Defining extraction rules'
description: 'Define Markdown extraction rules with selectors, lists, fallback logic, and supporting fields so the API returns the content shape you actually need.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Markdown extraction starts with the shape of your `data` rules. The goal is not to scrape everything blindly, but to declare exactly which part of the page should become Markdown and which supporting fields should travel with it.

## Convert the whole page

The simplest rule omits `selector` and converts the entire document:

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

<Figcaption>Omitting <code>selector</code> tells Microlink to serialize the whole page into Markdown.</Figcaption>

This is the best first pass when you are prototyping, indexing static documentation, or feeding a full page into another system.

## Scope extraction to the main content

Once the whole-page result includes too much chrome, add a selector:

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

<Figcaption>Scoping the rule to <code>main</code> avoids navigation, footer, and other layout chrome.</Figcaption>

Start with semantic containers like `main`, `article`, or a stable content wrapper. This is usually more reliable than trying to remove page chrome after the fact.

## Whole page vs scoped content

| If you need | Use |
|-------------|-----|
| A quick draft of the entire document | Omit `selector` |
| Cleaner article or docs content | `selector: 'main'` or `selector: 'article'` |
| A very specific block, tab, or section | A more precise CSS selector |

If the target markup varies across pages, add [fallback rules](#use-fallback-rules) instead of relying on a single fragile selector.

## Add supporting fields and lists

Markdown is often just one field in a larger structured payload:

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://microlink.io/docs/api/getting-started/overview',
    data: {
      article: {
        selector: 'main',
        attr: 'markdown'
      },
      headings: {
        selectorAll: 'main h1, main h2, main h3',
        attr: 'text'
      }
    },
    meta: false
  }}
/>

<Figcaption>Use <code>selectorAll</code> for repeated values such as headings, links, or table rows, while keeping the main article as Markdown.</Figcaption>

The key rule properties are:

| Property | Use it for |
|----------|------------|
| `selector` | A single element |
| `selectorAll` | A collection of matching elements |
| `attr` | The output form, including `markdown`, `text`, `html`, or an attribute like `href` |
| `type` | Validation and casting for values such as URLs, numbers, dates, and images |
| `evaluate` | Custom browser-side extraction logic when selectors are not enough |

See the <Link href='/docs/mql/data/selector' children='selector' />, <Link href='/docs/mql/data/selectorAll' children='selectorAll' />, <Link href='/docs/mql/data/attr' children='attr' />, <Link href='/docs/mql/data/type' children='type' />, and <Link href='/docs/mql/data/evaluate' children='evaluate' /> references for the full rule surface.

## Use fallback rules

When page structures vary, define multiple rules in priority order:

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

<Figcaption>Microlink tries each rule in order and returns the first one that produces a valid value.</Figcaption>

Fallbacks are especially useful across blog platforms, documentation sites, or publisher templates where the main content wrapper is not consistent.

## Use evaluate for custom extraction

If selectors still are not enough, `evaluate` can compute a field directly in the browser context:

<MultiCodeEditorInteractive
  height={260}
  mqlCode={{
    url: 'https://example.com',
    data: {
      content: {
        attr: 'markdown'
      },
      title: {
        evaluate: "document.querySelector('h1')?.textContent.trim()",
        type: 'string'
      }
    },
    meta: false
  }}
/>

<Figcaption>Use <code>evaluate</code> for custom values that are awkward to express with plain selectors.</Figcaption>

Keep `evaluate` as a last resort. Start with plain selectors and `attr: 'markdown'`, then add `evaluate` only when the page needs custom logic.

## Structured outputs

If you need grouped objects or list-of-objects results in addition to Markdown, continue with the <Link href='/docs/mql/rules/nested' children='nested rules' /> docs. That is the right tool for building richer JSON shapes on top of your Markdown field.

## Next step

Learn how to render the right page state before conversion in [page preparation](/docs/guides/markdown/page-preparation).
