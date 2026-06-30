---
title: 'Content conversion'
description: 'Convert web page URLs, direct PDF file URLs, and JSON endpoints into text, Markdown, HTML, or structured JSON with Microlink API.'
---

import { Link } from 'components/elements/Link'

Microlink can turn a URL into the format your downstream system needs. The same `data` rule model works for normal web pages, direct PDF file URLs, and JSON endpoints:

- use `attr: 'text'` when the consumer wants readable plain text
- use `attr: 'markdown'` when the consumer wants clean Markdown
- use `attr: 'html'` when the consumer wants HTML markup
- use `attr: 'json'` when the target URL already returns JSON and the consumer wants parsed structured data
- keep the default JSON response when an application needs metadata around the field
- add `embed` when the API URL itself should return the converted field

A PDF file URL and a JSON endpoint are still passed through the same `url` parameter. The difference is the source document: use the PDF file guides when the URL points directly to a PDF, such as a `.pdf` file or an `application/pdf` response. Use the JSON endpoint guide when the URL returns a JSON response, such as `application/json`.

## Choose the guide

| Source | Output | Guide |
|--------|--------|-------|
| Web page URL | Text | <Link href='/docs/guides/content-conversion/url-to-text' children='Web page to Text' /> |
| Web page URL | Markdown | <Link href='/docs/guides/content-conversion/url-to-markdown' children='Web page to Markdown' /> |
| Web page URL | HTML | <Link href='/docs/guides/content-conversion/url-to-html' children='Web page to HTML' /> |
| Direct PDF file URL | Markdown | <Link href='/docs/guides/content-conversion/pdf-url-to-markdown' children='PDF file to Markdown' /> |
| Direct PDF file URL | HTML | <Link href='/docs/guides/content-conversion/pdf-url-to-html' children='PDF file to HTML' /> |
| JSON endpoint URL | JSON | <Link href='/docs/guides/content-conversion/json-endpoint-to-json' children='JSON endpoint to JSON' /> |

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

Change the field name from `content` to anything your application expects. Change `attr` to switch the output format. For JSON endpoints, use `attr: 'json'` without a selector so Microlink parses the full response body.

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

- <Link href='/docs/guides/data-extraction' children='Data extraction' /> for selectors, scoping, nested fields, collections, typed values, JSON endpoints, and browser-side evaluation.
- <Link href='/docs/guides/common/private-pages' children='Private pages' /> for cookies, authorization headers, and server-side proxying.
