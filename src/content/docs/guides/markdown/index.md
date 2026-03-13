---
title: 'Markdown'
description: 'Extract whole pages or specific sections as Markdown with Microlink API, understand the response model, and choose the right next step for cleaner content extraction.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Extracting Markdown with Microlink API requires two things: the target `url` and a `data` rule that uses `attr: 'markdown'`.

<MultiCodeEditorInteractive
  height={260}
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

<Figcaption>Run the request and look for the converted Markdown under <code>data.content</code>.</Figcaption>

Microlink fetches the page, renders it when needed, applies your `data` rules, converts the chosen HTML into Markdown, and returns the extracted fields inside the normal response payload.

## How Markdown extraction works

The `data` object defines your output fields. Each key becomes a field in the response:

```js
{
  url: 'https://microlink.io/docs/api/getting-started/overview',
  data: {
    article: {
      selector: 'main',
      attr: 'markdown'
    }
  },
  meta: false
}
```

This guide uses the `data` object form consistently because it makes the extraction rule explicit: field name, selector, and output format all live together.

- Omit `selector` to convert the whole page.
- Add `selector` to scope the conversion to one part of the DOM.
- Rename the field (`content`, `article`, `body`, etc.) to match your application.

## The response

The extracted Markdown appears under the field name you declared:

```json
{
  "status": "success",
  "data": {
    "url": "https://example.com/",
    "content": "# Example Domain\n\nThis domain is for use in documentation examples without needing permission. Avoid use in operations.\n\n[Learn more](https://iana.org/domains/example)"
  }
}
```

Most workflows read `data.content` or `data.article` directly. If `meta` stays enabled, your Markdown field sits alongside normalized metadata such as `title`, `description`, `image`, and `url`.

## Choose an extraction mode

| Need | Best pattern | Why |
|------|--------------|-----|
| Convert the entire page into Markdown | Omit `selector` and use `attr: 'markdown'` | Fastest way to prototype or feed a full document into another system |
| Extract only the main article or content area | Add `selector: 'main'` or `selector: 'article'` | Avoid nav, footer, cookie banners, and other page chrome |
| Return Markdown plus supporting fields | Mix Markdown with `text`, `url`, `date`, or list rules inside `data` | Better for indexing, CMS imports, and LLM pipelines |

If you are not sure where to start, begin with whole-page extraction, inspect the result, and then tighten the selector in [defining extraction rules](/docs/guides/markdown/defining-extraction-rules).

## Skip metadata for faster responses

By default, the API also extracts normalized metadata. If you only need your custom Markdown field, disable it:

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

<Figcaption>Setting <code>meta: false</code> skips the extra metadata pass and is usually the biggest speedup for Markdown-only requests.</Figcaption>

If you still need a few metadata fields, `meta` also accepts an object for selective extraction. See the <Link href='/docs/api/parameters/meta' children='meta reference' />.

## Using the raw URL

You can call the API directly from your browser address bar or any HTTP client:

```bash
https://api.microlink.io?url=https://example.com&data.content.attr=markdown&meta=false
```

That returns JSON. To make the API URL return the extracted Markdown body directly instead, use `embed=content` in [delivery and response shaping](/docs/guides/markdown/delivery-and-response).

## Free tier and API key

The Microlink API works without an API key. You get **50 free requests per day**, which is enough to test the full Markdown extraction flow and the examples in this guide.

For production usage, you'll usually want a <ProBadge /> plan. It unlocks features such as [configurable TTL](/docs/api/parameters/ttl), [stale-while-revalidate caching](/docs/api/parameters/staleTtl), [custom headers](/docs/api/parameters/headers), and [proxy](/docs/api/parameters/proxy).

To authenticate, pass your API key as the `x-api-key` header:

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
    apiKey: 'YOUR_API_TOKEN'
  }}
/>

<Figcaption>You can enter your API key in any interactive example by clicking the key icon in the terminal toolbar.</Figcaption>

Throughout this guide, features that require a <ProBadge /> plan are marked inline.

See the <Link href='/docs/api/basics/authentication' children='authentication' /> and <Link href='/docs/api/basics/rate-limit' children='rate limit' /> docs for details.

## What's next

Pick the next step based on the result you want:

- **[Defining extraction rules](/docs/guides/markdown/defining-extraction-rules)** — choose between whole-page conversion, scoped selectors, fallback rules, and supporting fields.
- **[Page preparation](/docs/guides/markdown/page-preparation)** — render the right version of the page, wait for dynamic content, and mutate the DOM before conversion.
- **[Delivery and response shaping](/docs/guides/markdown/delivery-and-response)** — choose between full JSON, filtered payloads, and direct Markdown responses.
- **[Caching and performance](/docs/guides/markdown/caching-and-performance)** — tune freshness, cache behavior, and extraction speed.
- **[Private pages](/docs/guides/markdown/private-pages)** — extract Markdown from logged-in or header-dependent pages safely.
- **[Troubleshooting](/docs/guides/markdown/troubleshooting)** — fix empty output, wrong selectors, timeouts, and blocked sites.
