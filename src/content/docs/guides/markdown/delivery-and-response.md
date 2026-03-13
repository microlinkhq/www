---
title: 'Delivery and response shaping'
description: 'Choose the right way to consume extracted Markdown. Keep the full JSON response, trim it with filter, or return the Markdown body directly.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

After Markdown is extracted, you can either keep the full JSON response, slim it down, or make the API URL return the Markdown body directly. The right choice depends on where the content goes next.

## Three response models

| When you need | Use | Result |
|---------------|-----|--------|
| Full JSON with your extracted fields | Default response | Read `data.content`, `data.article`, and any other fields in JSON |
| Compact JSON with only a few fields | `filter` | Smaller payload, still JSON |
| The Markdown body directly | `embed` | The API URL responds with `text/markdown` |

## Default JSON response

The default response keeps the extracted field in the normal JSON payload:

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

<Figcaption>Use the default JSON response when your application already expects structured data.</Figcaption>

This is usually the best fit for backends, queues, ingestion pipelines, and UI code that wants both the Markdown field and surrounding context.

## Compact JSON with filter

If you still want JSON but only need the Markdown field, add `filter`:

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
    filter: 'content'
  }}
/>

<Figcaption>The response only includes <code>content</code>. This is useful when you want minimal JSON without changing the response format.</Figcaption>

The `filter` parameter uses the field names inside the response payload, so the same idea works for `article`, `headings`, or any other field you define. See the <Link href='/docs/api/parameters/filter' children='filter reference' /> for dot notation and multi-field filters.

## Direct Markdown with embed

Set `embed` to the extracted field name to return the Markdown body as the response itself:

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
    embed: 'content'
  }}
/>

<Figcaption>The API URL now returns the Markdown body directly with a <code>text/markdown</code> content type.</Figcaption>

If your rule is named `article`, use `embed: 'article'`. `embed` always points to the response field name, not the selector.

## Raw URL and cURL

You can call the direct-response version from any HTTP client:

```bash
curl -G https://api.microlink.io \
  -d url=https://example.com \
  -d data.content.attr=markdown \
  -d meta=false \
  -d embed=content
```

That returns the Markdown body directly instead of JSON.

## Metadata strategy

For Markdown-only workflows, `meta: false` is usually the right default.

If you still need normalized fields such as title, description, image, or canonical URL context, leave `meta` enabled or pass a selective `meta` object. The <Link href='/docs/api/parameters/meta' children='meta reference' /> covers the exact field controls.

## Security considerations

If the request needs an API key, cookies, or authorization headers, do not expose those values in public URLs or client-side code, especially when you use `embed` to produce a shareable direct-response URL.

- Keep authenticated extraction requests on your backend whenever possible.
- Use <Link href='https://github.com/microlinkhq/proxy' children='@microlink/proxy' /> for self-hosted protection.
- Use <Link href='https://github.com/microlinkhq/edge-proxy' children='@microlink/edge-proxy' /> for edge-deployed protection.

See the <Link href='/docs/api/basics/authentication' children='authentication' /> docs and [private pages](/docs/guides/markdown/private-pages) for the full setup.

## Next step

Learn how to tune cache behavior and extraction speed in [caching and performance](/docs/guides/markdown/caching-and-performance).
