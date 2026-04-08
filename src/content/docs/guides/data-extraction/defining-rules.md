---
title: 'Defining rules'
description: 'Model single fields, collections, nested objects, fallback logic, and computed values so Microlink returns the exact JSON shape you need.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Good extraction starts with good rule design. The goal is not to scrape everything blindly, but to declare the smallest set of fields your application actually needs.

## Start with a single field

The simplest rule targets one element and extracts one value:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://example.com',
    data: {
      title: {
        selector: 'h1',
        attr: 'text'
      }
    },
    meta: false
  }}
/>

<Figcaption>Use <code>selector</code> for one element and <code>attr</code> for the value you want from it.</Figcaption>

This is the best first step when you are learning a new page structure. Once the first field works, add the rest one by one.

## Extract a collection

If the page contains repeated elements, switch to `selectorAll`:

<MultiCodeEditorInteractive
  height={240}
  mqlCode={{
    url: 'https://news.ycombinator.com',
    data: {
      titles: {
        selectorAll: '.titleline > a',
        attr: 'text'
      }
    },
    meta: false
  }}
/>

<Figcaption>Use <code>selectorAll</code> when you need an array instead of only the first match.</Figcaption>

This pattern is ideal for headlines, product cards, search results, table rows, and navigation links.

## Return structured objects

You can group related values into one field by using nested `attr` rules:

<MultiCodeEditorInteractive
  height={320}
  mqlCode={{
    url: 'https://news.ycombinator.com',
    data: {
      stories: {
        selectorAll: '.athing',
        attr: {
          title: { selector: '.titleline > a', attr: 'text' },
          href: { selector: '.titleline > a', attr: 'href', type: 'url' }
        }
      }
    },
    meta: false
  }}
/>

<Figcaption>Nested rules let each matched item become a structured object instead of a single string.</Figcaption>

Use this when a card, row, or result item contains multiple related fields that should stay together.

## Use fallback rules

When the page structure is not consistent, provide more than one rule in priority order:

<MultiCodeEditorInteractive
  height={280}
  mqlCode={{
    url: 'https://example.com',
    data: {
      title: [
        { selector: 'meta[property=\"og:title\"]', attr: 'content' },
        { selector: 'title', attr: 'text' },
        { selector: 'h1', attr: 'text' }
      ]
    },
    meta: false
  }}
/>

<Figcaption>Microlink tries each rule in order and keeps the first one that returns a valid value.</Figcaption>

Fallbacks are especially useful across publisher templates, ecommerce catalogs, or documentation sites where the markup changes from page to page.

## Pick the right output form

`attr` and `type` solve different problems:

| Property | Use it for |
|----------|------------|
| `attr` | Choosing the source value such as `text`, `html`, `markdown`, `json`, `href`, `src`, or `content` |
| `type` | Validating or normalizing the result as `url`, `number`, `date`, `image`, and more |

For example, a link field usually needs both:

<MultiCodeEditorInteractive
  height={230}
  mqlCode={{
    url: 'https://example.com',
    data: {
      link: {
        selector: 'a',
        attr: 'href',
        type: 'url'
      }
    },
    meta: false
  }}
/>

<Figcaption>Think of <code>attr</code> as “where to read from” and <code>type</code> as “what shape this value should have”.</Figcaption>

If you specifically want HTML-to-Markdown serialization, see the <Link href='/docs/guides/markdown' children='Markdown guide' />.

## Extract JSON

When the target URL returns JSON instead of HTML, use `attr: 'json'` to parse the response body into structured data:

<MultiCodeEditorInteractive
  height={280}
  mqlCode={{
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    data: {
      content: {
        attr: 'json'
      }
    },
    meta: false
  }}
/>

<Figcaption>Run the request and inspect <code>data.content</code>. The parsed JSON object is returned as structured data, not a string.</Figcaption>

Unlike other `attr` values, `json` is **whole-page only** — it always operates on the entire response body. Do not combine it with `selector` or `selectorAll`.

Key behaviors:

- The field name you declare becomes the response key.
- `attr: 'json'` parses the body with `JSON.parse` and returns native structured data (objects, arrays, strings, numbers, booleans, or `null`).
- The original shape is preserved exactly — no URL rewriting, no array compaction, no value normalization.
- Strings that contain HTML-like content (e.g. `"<b>bold</b>"`) pass through unchanged — they are not interpreted as DOM elements.

Microlink tries two strategies depending on how the JSON arrives:

1. **`<pre>` tag present** — when the response is browser-rendered, JSON is often wrapped in a `<pre>` element. Microlink extracts the inner HTML, decodes HTML entities, and parses the result.
2. **Plain body text** — when no `<pre>` exists, Microlink reads the raw body text directly and parses it.

This means `attr: 'json'` works regardless of whether you use `prerender: true` or `prerender: false`.

| Need | Best approach |
|------|---------------|
| Consume a REST API or JSON endpoint | `attr: 'json'` on the endpoint URL |
| Combine JSON data with HTML-extracted fields | Mix `attr: 'json'` (no selector) with other `data` rules that use selectors |
| Parse a page that returns `application/json` | `attr: 'json'` handles it whether the body is raw or wrapped in `<pre>` |
| Extract structured data from an HTML page | Use `selector` + other `attr` values — `json` is not designed for HTML documents |

For delivery options (`embed`, `filter`, caching, and private endpoint handling), the same patterns from <Link href='/docs/guides/data-extraction/delivery-and-response' children='delivery and response shaping' /> apply. A common production setup for JSON proxying:

```js
{
  url: 'https://jsonplaceholder.typicode.com/posts/1',
  data: {
    content: {
      attr: 'json'
    }
  },
  meta: false,
  prerender: false,
  ttl: '1d',
  staleTtl: 0
}
```

## Use evaluate for custom values

If selectors are still not enough, `evaluate` can compute a field directly in the browser context:

<MultiCodeEditorInteractive
  height={250}
  mqlCode={{
    url: 'https://example.com',
    data: {
      summary: {
        evaluate: "`${document.querySelector('h1')?.textContent.trim()} — ${document.querySelector('p')?.textContent.trim()}`",
        type: 'string'
      }
    },
    meta: false
  }}
/>

<Figcaption>Use <code>evaluate</code> for values that are awkward to express with selectors alone, but keep it as a last resort.</Figcaption>

Start with plain selectors and fallbacks. Add `evaluate` only when the page needs custom logic.

## Rule references

For the full rule surface, see the MQL reference pages for <Link href='/docs/mql/data/selector' children='selector' />, <Link href='/docs/mql/data/selectorAll' children='selectorAll' />, <Link href='/docs/mql/data/attr' children='attr' />, <Link href='/docs/mql/data/type' children='type' />, <Link href='/docs/mql/data/evaluate' children='evaluate' />, <Link href='/docs/mql/rules/nested' children='nested rules' />, and <Link href='/docs/mql/rules/fallbacks' children='fallback rules' />.

## Next step

Learn how to render the right page state before extraction in [page preparation](/docs/guides/data-extraction/page-preparation).
