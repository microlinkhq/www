---
title: 'Markdown'
description: 'Convert full pages or scoped sections to Markdown with Microlink API, then use the broader data extraction guide whenever you need more of the MQL toolbox.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Markdown extraction is a specialized form of Microlink data extraction. You still declare a `data` field, but the rule uses `attr: 'markdown'` so Microlink serializes HTML into Markdown instead of returning raw text or HTML.

<MultiCodeEditorInteractive
  height={320}
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

<Figcaption>Run the request and inspect <code>data.article</code>. The field name is yours, and <code>attr: 'markdown'</code> controls the serialization format.</Figcaption>

## MQL installation

To run the JavaScript examples with MQL, install `@microlink/mql`:

```bash
npm install @microlink/mql --save
```

It works in Node.js, Edge runtimes, and the browser. See the <Link href='/docs/mql/getting-started/installation' children='MQL installation guide' /> for the environment-specific setup.

If you are using another language, you do not need to install MQL to follow this guide. You can use the terminal examples or call the API directly from any HTTP client.

## The mental model

The same `data` rules from the <Link href='/docs/guides/data-extraction' children='Data extraction guide' /> apply here:

- The field name you declare becomes the response key.
- `attr: 'markdown'` converts the matched HTML into Markdown.
- Omit `selector` to convert the whole page.
- Add `selector` when you only want the main content wrapper.

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

## The response

The converted Markdown appears under the field you declared:

```json
{
  "status": "success",
  "data": {
    "article": "# Overview\n\nMicrolink API lets you..."
  }
}
```

When `meta` is `true` (the default), the Markdown output includes a YAML frontmatter header with normalized metadata — `title`, `description`, `url`, `author`, `publisher`, `image`, `logo`, `date`, `word_count`, `reading_time`, and more. This gives LLMs richer context about the source page. Set `meta: false` to return only the raw Markdown content. See <Link href='/docs/guides/markdown/delivery-and-response#include-metadata-for-richer-context' children='Include metadata for richer context' /> for examples and details.

## Choose a starting pattern

| Need | Best pattern | Why |
|------|--------------|-----|
| Convert the whole document | Omit `selector` and use `attr: 'markdown'` | Fastest way to prototype or feed a full page into another system |
| Keep only the main article or docs body | Add `selector: 'main'` or `selector: 'article'` | Avoid nav, footer, cookie banners, and other chrome |
| Include page metadata for LLM context | Keep `meta: true` (the default) | Adds a YAML frontmatter header with title, description, author, dates, and more |
| Return Markdown plus a few supporting fields | Mix Markdown with other `data` rules | Useful for indexing, CMS imports, and LLM pipelines |
| Return the Markdown body directly | Keep the field in `data`, then use `embed` | Turns the API URL into a direct Markdown response |

## Use this guide for Markdown-specific decisions

This guide stays focused on the choices that are unique to Markdown extraction:

- whole page vs scoped content
- metadata frontmatter vs raw content only
- clean conversion vs noisy page chrome
- JSON vs direct Markdown delivery

When you need the broader rule system, jump to the detailed Data extraction pages:

- <Link href='/docs/guides/data-extraction/defining-rules' children='Defining rules' /> for nested objects, collections, typed fields, fallbacks, and `evaluate`.
- <Link href='/docs/guides/data-extraction/page-preparation' children='Page preparation' /> for the full rendering, waiting, device, and browser-automation toolbox.
- <Link href='/docs/guides/data-extraction/caching-and-performance' children='Caching and performance' /> for deeper cache tuning with `ttl`, `staleTtl`, and `force`.
- <Link href='/docs/guides/data-extraction/private-pages' children='Private pages' /> and <Link href='/docs/guides/data-extraction/troubleshooting' children='Troubleshooting' /> for the shared auth, proxy, and debugging model.

## Free tier and advanced features

The examples here work on the free tier. Custom headers, proxy, and configurable cache remain <ProBadge /> features, exactly as in the <Link href='/docs/guides/data-extraction' children='Data extraction guide' />.

See the <Link href='/docs/api/basics/authentication' children='authentication' /> and <Link href='/docs/api/basics/rate-limit' children='rate limit' /> docs for the plan details.

## What's next

This guide is intentionally small. Pick the next step based on what you need:

- <Link href='/docs/guides/markdown/choosing-scope' children='Choosing scope' /> for choosing the right wrapper, preparing the page state, and fixing noisy or incomplete Markdown.
- <Link href='/docs/guides/markdown/delivery-and-response' children='Delivery and response shaping' /> for JSON vs direct Markdown responses, performance defaults, and safe private-page handling.
- <Link href='/docs/guides/data-extraction' children='Data extraction' /> when you want the full shared MQL workflow beyond Markdown-specific decisions.

## See also

- <Link href='/docs/guides/data-extraction' children='Data extraction' /> — the full MQL workflow for structured extraction beyond Markdown.
- <Link href='/docs/guides/metadata' children='Metadata' /> — if you only need standard link preview fields.
