---
title: 'Markdown: Delivery and response shaping'
description: 'Serve extracted Markdown in JSON or directly as the response body, then apply the right performance and auth patterns for production use.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Once the Markdown output looks correct, the next questions are operational: how should you serve it, how small can the payload be, how aggressively should it cache, and can that URL be public?

## Choose a response model

| When you need | Use | Why |
|---------------|-----|-----|
| Markdown plus surrounding structure | Default JSON response | Best fit for apps, queues, and ingestion pipelines |
| Smaller JSON with only one or two fields | `filter` | Keeps JSON, trims the payload |
| The Markdown body itself | `embed` | Turns the request into a direct Markdown response |

## Include metadata for richer context

When `meta` is `true` (the default), Microlink prepends a YAML frontmatter block to the Markdown output with normalized page metadata — language, author, title, description, URL, publisher, dates, word count, reading time, and links to the page image and logo:

```yaml
---
lang: "en"
author: "Microlink"
title: "Microlink | Headless Browser API: Screenshot, PDF & Previews"
description: "Turn any URL into structured data. The all-in-one API for browser automation: screenshots, PDFs, scraping, and link previews. No infrastructure to manage."
url: "https://microlink.io/"
publisher: "Microlink"
image_url: "https://cdn.microlink.io/logo/banner.jpeg"
date: "2026-03-24T07:37:06.000Z"
logo_url: "https://cdn.microlink.io/logo/logo.png"
word_count: 654
reading_time: "3 min read"
---

# Page content starts here…
```

This is especially useful for LLM and RAG pipelines — the frontmatter gives the model context about the source (who wrote it, when, what it is about) without requiring a separate metadata request.

<MultiCodeEditorInteractive
  height={280}
  mqlCode={{
    url: 'https://microlink.io',
    data: {
      markdown: {
        attr: 'markdown'
      }
    },
    meta: true,
    embed: 'markdown'
  }}
/>

<Figcaption>With <code>meta: true</code>, the Markdown response includes a YAML frontmatter header with normalized page metadata.</Figcaption>

When `meta` is `false`, the frontmatter is omitted entirely and the response contains only the converted Markdown content:

<MultiCodeEditorInteractive
  height={280}
  mqlCode={{
    url: 'https://microlink.io',
    data: {
      markdown: {
        attr: 'markdown'
      }
    },
    meta: false,
    embed: 'markdown'
  }}
/>

<Figcaption>With <code>meta: false</code>, you get only the raw Markdown — no frontmatter, smaller payload, faster response.</Figcaption>

You can also pass an object to `meta` to include or exclude specific fields. See the <Link href='/docs/api/parameters/meta' children='meta parameter reference' /> for the full syntax.

## Keep JSON when structure still matters

The default response keeps your Markdown field inside the normal payload:

<MultiCodeEditorInteractive
  height={230}
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

<Figcaption>Use normal JSON when your consumer still wants a predictable envelope around the Markdown field.</Figcaption>

For Markdown-only workflows, `meta: false` is usually the right default. If you still need a few normalized fields, leave `meta` enabled or pass a selective object. See the <Link href='/docs/api/parameters/meta' children='meta reference' />.

## Return the Markdown body directly

Set `embed` to the extracted field name when the field already is the final output you want to serve:

<MultiCodeEditorInteractive
  height={230}
  mqlCode={{
    url: 'https://example.com',
    data: {
      content: {
        attr: 'markdown'
      }
    },
    meta: false,
    embed: 'content'
  }}
/>

<Figcaption>With <code>embed</code>, the request behaves like the extracted Markdown itself instead of the full JSON envelope.</Figcaption>

If your rule is named `article`, use `embed: 'article'`. `embed` always points to the response field name, not the selector.

## Use a fast default for production

For most production Markdown endpoints, a good default is:

<MultiCodeEditorInteractive
  height={260}
  mqlCode={{
    url: 'https://example.com',
    data: {
      content: {
        selector: 'main',
        attr: 'markdown'
      }
    },
    meta: false,
    prerender: false,
    ttl: '1d',
    staleTtl: 0
  }}
/>

<Figcaption>Scope the content, skip metadata, avoid browser work when possible, and let cache absorb repeated requests.</Figcaption>

The usual levers are:

- `meta: false` when you only need the Markdown field
- `filter` when you still want JSON but only need one or two fields
- `ttl` <Link href='/docs/api/parameters/ttl' children='cache TTL' /> for freshness control
- `staleTtl` <Link href='/docs/api/parameters/staleTtl' children='stale-while-revalidate' /> when latency matters
- `force` for the occasional fresh uncached run

## Keep private Markdown URLs off the public internet

The biggest Markdown-specific delivery risk is `embed=content`: it is convenient, but it also makes the final URL very shareable.

If the request needs cookies, authorization, or forwarded headers:

- do not expose it as a public `embed` URL
- keep it on your backend whenever possible
- forward secrets with `x-api-header-*`, not query parameters

```bash
curl -G https://pro.microlink.io \
  -d url=https://example.com/private \
  -d data.content.attr=markdown \
  -d meta=false \
  -H 'x-api-key: YOUR_API_TOKEN' \
  -H 'x-api-header-cookie: session=abc123'
```

## Use Data extraction for the deeper dives

Markdown follows the same shared response model as any other extracted field. Continue with Data extraction when you need:

- deeper `filter` coverage, including dot notation
- a fuller cache strategy with `ttl`, `staleTtl`, and `force`
- private-page setup, endpoint choice, and proxy-backed requests
- timeout and response-header debugging

The most relevant deeper pages are:

- <Link href='/docs/guides/data-extraction/delivery-and-response' children='Data extraction: Delivery and response shaping' />
- <Link href='/docs/guides/data-extraction/caching-and-performance' children='Data extraction: Caching and performance' />
- <Link href='/docs/guides/data-extraction/private-pages' children='Data extraction: Private pages' />
- <Link href='/docs/guides/data-extraction/troubleshooting' children='Data extraction: Troubleshooting' />

## Next step

If you need richer structured extraction around the Markdown field, continue with <Link href='/docs/guides/data-extraction' children='Data extraction' />. Otherwise, see the <Link href='/docs/guides' children='guides overview' /> for the rest of the Microlink guide set.
