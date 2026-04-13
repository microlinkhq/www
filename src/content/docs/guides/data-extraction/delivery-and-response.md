---
title: 'Data extraction: Delivery and response shaping'
description: 'Choose between full JSON, smaller filtered payloads, or direct field responses when consuming extracted data from Microlink API.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'

Once your rules work, the next decision is how much of the response you actually want to keep.

## Choose a response model

You have four common response patterns:

| Need | Best option | Why |
|------|-------------|-----|
| Metadata plus custom fields | Default JSON response | Useful when your app consumes both normalized metadata and extracted data |
| Only your custom fields | `meta: false` | Removes the extra metadata pass and keeps the payload simpler |
| A smaller JSON payload | `filter` | Keeps only the fields you want to return |
| A direct body instead of JSON | `embed` | Makes the API URL behave like the extracted field itself |

If you are extracting more than one field, JSON is usually the right default. Reach for `embed` only when one field is the final output you want to serve.

## Start with normal JSON

This is the most flexible response shape for applications:

<MultiCodeEditorInteractive
  height={250}
  mqlCode={{
    url: 'https://example.com',
    data: {
      title: {
        selector: 'h1',
        attr: 'text'
      },
      description: {
        selector: 'p',
        attr: 'text'
      }
    },
    meta: false
  }}
/>

<Figcaption>Normal JSON is the best fit when you want to consume more than one extracted field.</Figcaption>

## Keep only the fields you need

If the response is still bigger than necessary, use `filter`:

<MultiCodeEditorInteractive
  height={240}
  mqlCode={{
    url: 'https://example.com',
    data: {
      title: {
        selector: 'h1',
        attr: 'text'
      },
      link: {
        selector: 'a',
        attr: 'href',
        type: 'url'
      }
    },
    meta: false,
    filter: 'title'
  }}
/>

<Figcaption>Use <code>filter</code> when your extractor produces several fields but the consumer only needs one or two of them.</Figcaption>

`filter` is especially useful for edge functions, CMS webhooks, or other downstream systems where every byte matters.

It also supports dot notation, so nested fields can be targeted with values such as `story.href`.

## Return one extracted field directly

If one field already is your final response body, use `embed`:

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
    embed: 'title'
  }}
/>

<Figcaption>With <code>embed</code>, the API URL behaves like the selected field instead of returning the full JSON envelope.</Figcaption>

This works best for a single text body, a single serialized field such as Markdown, or an extracted asset URL.

Use dot notation when the field lives inside a nested object, such as `embed: 'story.href'`.

## Using the raw URL

You can call the API directly from a browser or HTTP client:

```bash
https://api.microlink.io?url=https://example.com&data.title.selector=h1&data.title.attr=text&meta=false&embed=title
```

Use raw URLs when you want a shareable endpoint or need to plug Microlink directly into another service.

## JSON vs embed

| If you need | Use |
|-------------|-----|
| Several extracted fields | JSON |
| Extracted fields plus metadata | JSON |
| One field as the final response body | `embed` |
| The smallest JSON that still has structure | `filter` |

## Security considerations

If the request needs authentication, session cookies, or other private headers, do not expose those values in a public URL. See [private pages](/docs/guides/data-extraction/private-pages) for the safe pattern.

## Next step

Learn how to speed up repeated extractions with cache controls in [caching and performance](/docs/guides/data-extraction/caching-and-performance).
