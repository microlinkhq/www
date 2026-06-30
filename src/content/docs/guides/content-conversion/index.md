---
title: 'Content conversion'
description: 'Convert public URLs or PDF URLs into text, Markdown, or HTML with Microlink API, then choose JSON or a direct response.'
---

import { Link } from 'components/elements/Link'

Microlink can turn a URL into the format your downstream system needs. The same `data` rule model works for normal web pages and for PDF URLs:

- use `attr: 'text'` when the consumer wants readable plain text
- use `attr: 'markdown'` when the consumer wants clean Markdown
- use `attr: 'html'` when the consumer wants HTML markup
- keep the default JSON response when an application needs metadata around the field
- add `embed` when the API URL itself should return text, Markdown, or HTML

## Choose the guide

| Source | Output | Guide |
|--------|--------|-------|
| Public URL | Text | <Link href='/docs/guides/content-conversion/url-to-text' children='URL to Text' /> |
| Public URL | Markdown | <Link href='/docs/guides/content-conversion/url-to-markdown' children='URL to Markdown' /> |
| Public URL | HTML | <Link href='/docs/guides/content-conversion/url-to-html' children='URL to HTML' /> |
| PDF URL | Markdown | <Link href='/docs/guides/content-conversion/pdf-url-to-markdown' children='PDF URL to Markdown' /> |
| PDF URL | HTML | <Link href='/docs/guides/content-conversion/pdf-url-to-html' children='PDF URL to HTML' /> |

## The shared pattern

The shortest useful request has three parts:

```js
{
  url: 'https://example.com',
  data: {
    content: {
      attr: 'markdown'
    }
  },
  meta: false
}
```

Change the field name from `content` to anything your application expects. Change `attr` to switch the output format.

## JSON or direct output

The default response is JSON:

```json
{
  "status": "success",
  "data": {
    "content": "# Example Domain\n\nThis domain is for use..."
  }
}
```

When the converted field is the final response, set `embed` to that field name:

```js
{
  url: 'https://example.com',
  data: {
    content: {
      attr: 'markdown'
    }
  },
  meta: false,
  embed: 'content'
}
```

That makes the API URL return the converted body directly instead of a JSON envelope.

## When to use the deeper guides

These pages are direct conversion recipes. Use the broader guides when you need more control:

- <Link href='/docs/guides/markdown' children='Markdown' /> for scoping, frontmatter, and production Markdown delivery.
- <Link href='/docs/guides/data-extraction' children='Data extraction' /> for nested fields, collections, typed values, and browser-side evaluation.
- <Link href='/docs/guides/common/private-pages' children='Private pages' /> for cookies, authorization headers, and server-side proxying.
