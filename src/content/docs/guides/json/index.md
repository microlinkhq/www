---
title: 'JSON'
description: 'Parse JSON endpoints and API responses into structured data with Microlink, preserving the original shape without URL rewriting or array compaction.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

JSON extraction is a specialized form of Microlink data extraction. You declare a `data` field with `attr: 'json'`, and Microlink parses the response body as JSON instead of treating it as HTML.

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

## MQL installation

To run the JavaScript examples with MQL, install `@microlink/mql`:

```bash
npm install @microlink/mql --save
```

It works in Node.js, Edge runtimes, and the browser. See the <Link href='/docs/mql/getting-started/installation' children='MQL installation guide' /> for the environment-specific setup.

If you are using another language, you do not need to install MQL to follow this guide. You can use the terminal examples or call the API directly from any HTTP client.

## The mental model

Unlike other `attr` values, `json` is **whole-page only** — it always operates on the entire response body. Do not combine it with `selector` or `selectorAll`.

- The field name you declare becomes the response key.
- `attr: 'json'` parses the body with `JSON.parse` and returns native structured data (objects, arrays, strings, numbers, booleans, or `null`).
- The original shape is preserved exactly — no URL rewriting, no array compaction, no value normalization.

```js
{
  url: 'https://jsonplaceholder.typicode.com/posts/1',
  data: {
    content: {
      attr: 'json'
    }
  },
  meta: false
}
```

## The response

The parsed JSON appears under the field you declared:

```json
{
  "status": "success",
  "data": {
    "content": {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae..."
    }
  }
}
```

Arrays, nested objects, numbers, booleans, and `null` all survive the round trip unchanged.

## When to use JSON extraction

| Need | Best approach |
|------|---------------|
| Consume a REST API or JSON endpoint | `attr: 'json'` on the endpoint URL |
| Combine JSON data with HTML-extracted fields | Mix `attr: 'json'` (no selector) with other `data` rules that use selectors |
| Parse a page that returns `application/json` | `attr: 'json'` handles it whether the body is raw or wrapped in `<pre>` |
| Extract structured data from an HTML page | Use `selector` + other `attr` values — `json` is not designed for HTML documents |

## How the parser works

Microlink tries two strategies depending on how the JSON arrives:

1. **`<pre>` tag present** — when the response is prerendered or browser-rendered, JSON is often wrapped in a `<pre>` element. Microlink extracts the inner HTML, decodes HTML entities (`&lt;` → `<`, `&amp;` → `&`), and parses the result.
2. **Plain body text** — when no `<pre>` exists, Microlink reads the raw body text directly and parses it.

This means `attr: 'json'` works regardless of whether you use `prerender: true` or `prerender: false`.

## Combine JSON with other fields

You can declare JSON fields alongside HTML-extracted fields in the same request:

```js
const mql = require('@microlink/mql')

const { data } = await mql('https://api.example.com/product/42', {
  data: {
    product: {
      attr: 'json'
    }
  },
  meta: false
})

console.log(data.product.name)
console.log(data.product.price)
```

## Values that look like HTML are safe

If the JSON contains strings with angle brackets or HTML-like content, they are preserved as-is:

```json
{
  "note": "<b>important</b>",
  "template": "<div class=\"card\">{{name}}</div>"
}
```

These strings pass through `JSON.parse` unchanged — they are not interpreted as DOM elements.

## Free tier and advanced features

The examples here work on the free tier. Custom headers, proxy, and configurable cache remain <ProBadge /> features, exactly as in the <Link href='/docs/guides/data-extraction' children='Data extraction guide' />.

See the <Link href='/docs/api/basics/authentication' children='authentication' /> and <Link href='/docs/api/basics/rate-limit' children='rate limit' /> docs for the plan details.

## What's next

- <Link href='/docs/guides/json/delivery-and-response' children='Delivery and response shaping' /> for JSON vs direct responses, caching, and production patterns.
- <Link href='/docs/guides/data-extraction' children='Data extraction' /> when you want the full shared MQL workflow beyond JSON-specific decisions.

## See also

- <Link href='/docs/guides/data-extraction' children='Data extraction' /> — the full MQL workflow for structured extraction.
- <Link href='/docs/guides/markdown' children='Markdown' /> — for converting pages to Markdown instead of parsing JSON.
- <Link href='/docs/mql/data/attr' children='attr reference' /> — the MQL reference for all supported `attr` values.
