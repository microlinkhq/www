---
title: 'Metadata: Delivery and response shaping'
description: 'Keep the full metadata payload, trim it with filter, or return a single field directly with embed.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Once metadata has been extracted, the next decision is how much of the response you want to keep and how directly you want to consume it.

## Three response models

| When you need | Use | Result |
|---------------|-----|--------|
| Full metadata plus any enriched fields | Default response | The full JSON payload under `data` |
| A smaller JSON payload with only a few fields | `filter` | Still JSON, but trimmed to the selected fields |
| One field as the response body | `embed` | The API URL returns that field directly |

## Keep the full JSON response

The default response is best when your application already expects structured data:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://github.com/microlinkhq'
  }}
/>

<Figcaption>Use the default JSON response when your app wants the full normalized payload and any optional enriched fields.</Figcaption>

This is the best fit for backends, queues, automation jobs, and UI code that wants more than one field.

## Trim the payload with filter

If you only need a few metadata fields, add `filter`:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://github.com/microlinkhq',
    filter: 'title,description,url'
  }}
/>

<Figcaption>The response stays JSON, but only the selected fields are returned.</Figcaption>

This is useful when you want minimal bandwidth without changing the response format. See the <Link href='/docs/api/parameters/filter' children='filter reference' /> for dot notation and multi-field filters.

## Return one field directly with embed

Use `embed` when you want the API URL itself to behave like a direct field endpoint:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://github.com/microlinkhq',
    embed: 'title'
  }}
/>

<Figcaption>The API URL now returns the <code>title</code> field directly instead of the full JSON payload.</Figcaption>

This is especially useful for:

- text fields such as `title` or `description`
- direct asset fields such as `image.url` or `logo.url`

For example, a direct preview image URL looks like:

```html
<img
  src="https://api.microlink.io?url=https://github.com/microlinkhq&embed=image.url"
  alt="Preview image"
/>
```

## Choose filter vs embed

| If you need | Use |
|-------------|-----|
| More than one field | `filter` |
| Exactly one field as a direct response | `embed` |
| The full payload and future flexibility | Default response |

## Security considerations

If the request needs an API key, cookies, or authorization headers, do not expose those values in public URLs or client-side code, especially when you use `embed` to create shareable direct-response URLs.

- Keep authenticated metadata requests on your backend whenever possible.
- Use <Link href='https://github.com/microlinkhq/proxy' children='@microlink/proxy' /> for self-hosted protection.
- Use <Link href='https://github.com/microlinkhq/edge-proxy' children='@microlink/edge-proxy' /> for edge-deployed protection.

See the <Link href='/docs/api/basics/authentication' children='authentication' /> docs and [private pages](/docs/guides/metadata/private-pages) for the full setup.

## Next step

Learn how to handle dynamic pages, SPAs, and timing-sensitive targets in [page preparation](/docs/guides/metadata/page-preparation).
