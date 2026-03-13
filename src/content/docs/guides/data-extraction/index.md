---
title: 'Data extraction'
description: 'Extract exactly the fields you need from any page with Microlink API, understand how MQL rules shape the response, and choose the right next step for dynamic or private targets.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Custom data extraction with Microlink API starts with two things: the target `url` and a `data` object.

Each key inside `data` becomes a field in the response, and each rule tells Microlink how to obtain that field from the page.

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://news.ycombinator.com',
    data: {
      story: {
        selector: '.athing',
        attr: {
          title: { selector: '.titleline > a', attr: 'text' },
          href: { selector: '.titleline > a', attr: 'href', type: 'url' }
        }
      }
    },
    meta: false
  }}
/>

<Figcaption>Run the request and inspect <code>data.story</code>. The field name comes from your key, and the nested object comes from the rule shape you declared.</Figcaption>

Microlink fetches or renders the page, applies your MQL rules, normalizes typed values when needed, and returns the extracted fields inside the normal API response.

## How data extraction works

The `data` object is your output schema. A field can be:

- A single value extracted with `selector` and `attr`.
- A list extracted with `selectorAll`.
- A structured object built with nested `attr` rules.
- A fallback array of rules tried in priority order.
- A computed value produced with `evaluate`.

```js
{
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
}
```

This guide uses the `data` object form consistently because it keeps the response shape and the extraction logic in one place.

## The response

The response contains the fields you declared under `data`:

```json
{
  "status": "success",
  "data": {
    "story": {
      "title": "Launch HN: Example",
      "href": "https://example.com"
    }
  }
}
```

If `meta` stays enabled, your custom fields live alongside normalized metadata such as `title`, `description`, `image`, and `url`.

## Choose an extraction pattern

| Need | Best pattern | Why |
|------|--------------|-----|
| One field from one element | `selector` + `attr` | Smallest and easiest rule to maintain |
| A repeated list of values | `selectorAll` | Returns an array instead of only the first match |
| A structured object or list of objects | Nested `attr` rules | Keeps related fields grouped together |
| Serialized page content | `attr: 'text'`, `attr: 'html'`, or `attr: 'markdown'` | Useful for indexing, content pipelines, and exports |
| A computed or awkward value | `evaluate` or fallback rules | Helps when one selector is not enough |

If your main goal is HTML-to-Markdown conversion, jump to the dedicated <Link href='/docs/guides/markdown' children='Markdown guide' />. This guide focuses on the broader `data` utility.

## Skip metadata for faster responses

By default, the API also extracts normalized metadata. If you only need your custom fields, disable it:

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

<Figcaption>Setting <code>meta: false</code> skips the extra metadata pass and is usually the biggest speedup for data-only requests.</Figcaption>

If you still need a few metadata fields, `meta` also accepts an object for selective extraction. See the <Link href='/docs/api/parameters/meta' children='meta reference' />.

## Using the raw URL

You can call the API directly from your browser address bar or any HTTP client:

```bash
https://api.microlink.io?url=https://example.com&data.title.selector=h1&data.title.attr=text&meta=false
```

That returns JSON. To make the API URL return a single extracted field directly instead, use `embed=title` in [delivery and response shaping](/docs/guides/data-extraction/delivery-and-response).

## Free tier and API key

The Microlink API works without an API key. You get **50 free requests per day**, which is enough to test the full data extraction flow and most of the examples in this guide.

For production usage, you'll usually want a <ProBadge /> plan. It unlocks features such as [configurable TTL](/docs/api/parameters/ttl), [stale-while-revalidate caching](/docs/api/parameters/staleTtl), [custom headers](/docs/api/parameters/headers), and [proxy](/docs/api/parameters/proxy).

To authenticate, pass your API key as the `x-api-key` header:

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
    meta: false,
    apiKey: 'YOUR_API_TOKEN'
  }}
/>

<Figcaption>You can enter your API key in any interactive example by clicking the key icon in the terminal toolbar.</Figcaption>

Throughout this guide, features that require a <ProBadge /> plan are marked inline.

See the <Link href='/docs/api/basics/authentication' children='authentication' /> and <Link href='/docs/api/basics/rate-limit' children='rate limit' /> docs for details.

## What's next

Pick the next step based on the result you want:

- **[Defining rules](/docs/guides/data-extraction/defining-rules)** — model single fields, collections, nested objects, fallbacks, and computed values.
- **[Page preparation](/docs/guides/data-extraction/page-preparation)** — render the right page state, wait for dynamic content, and mutate the DOM before extraction.
- **[Delivery and response shaping](/docs/guides/data-extraction/delivery-and-response)** — choose between full JSON, filtered payloads, and direct field responses.
- **[Caching and performance](/docs/guides/data-extraction/caching-and-performance)** — tune freshness, cache behavior, and extraction speed.
- **[Private pages](/docs/guides/data-extraction/private-pages)** — extract data from logged-in or header-dependent pages safely.
- **[Troubleshooting](/docs/guides/data-extraction/troubleshooting)** — fix empty fields, wrong selectors, timeouts, and blocked sites.
