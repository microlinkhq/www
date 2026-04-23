---
title: 'Metadata: Extending results'
description: 'Go beyond the standard metadata fields by adding custom extraction rules, ready-to-use oEmbed HTML, color palettes, or site analysis.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

The default metadata fields cover common preview use cases, but sometimes you need more context than `title`, `description`, `image`, and `logo` can provide.

## Choose the right enrichment

| Need | Use | Result |
|------|-----|--------|
| Site-specific fields beyond the normalized metadata set | `data` | Add your own extracted fields alongside the metadata |
| Ready-to-render embed HTML for supported providers | `iframe` | Get `html` and `scripts` from oEmbed-compatible URLs |
| Dominant brand or preview colors from detected images | `palette` | Add color and palette fields to image-like metadata |
| Stack or performance analysis alongside metadata | `insights` | Add technology detection or Lighthouse output |

## Add custom fields with data

Use `data` when you want metadata plus something site-specific:

<MultiCodeEditorInteractive
  height={280}
  mqlCode={{
    url: 'https://microlink.io/docs/api/getting-started/overview',
    data: {
      headings: {
        selectorAll: 'main h2',
        attr: 'text'
      }
    }
  }}
/>

<Figcaption>The standard metadata still comes back, but now you also get a custom <code>headings</code> field tailored to your application.</Figcaption>

This is the right tool when the normalized metadata gets you close, but you still need one or two page-specific fields.

## Get ready-to-use embed HTML

For supported providers, `iframe` adds a ready-to-render embed payload:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://www.youtube.com/watch?v=9P6rdqiybaw',
    iframe: true
  }}
/>

<Figcaption>Use <code>iframe</code> when you want metadata plus embeddable HTML for supported video, audio, and social providers.</Figcaption>

The response adds an `iframe` field with:

- `html`
- `scripts`

See the <Link href='/docs/api/parameters/iframe' children='iframe reference' /> for the supported provider model and optional consumer settings such as `maxWidth`.

## Add color palettes to image metadata

If you need brand colors or accessible overlay colors, enable `palette`:

<MultiCodeEditorInteractive
  height={220}
  mqlCode={{
    url: 'https://github.com/microlinkhq',
    palette: true
  }}
/>

<Figcaption>Palette data is attached to detected image fields such as <code>image</code> or <code>logo</code>.</Figcaption>

This is especially useful for:

- generating UI themes from preview images
- choosing overlay text colors
- grouping links or cards by visual identity

See the <Link href='/docs/api/parameters/palette' children='palette reference' /> for the exact color fields added.

## Add site analysis with insights

If you want analysis rather than just metadata, use `insights`:

<MultiCodeEditorInteractive
  height={240}
  mqlCode={{
    url: 'https://vercel.com',
    insights: {
      technologies: true,
      lighthouse: false
    }
  }}
/>

<Figcaption>Use <code>insights</code> when the workflow needs stack detection or a Lighthouse audit in addition to the standard metadata fields.</Figcaption>

This adds an `insights` field with:

- `technologies`
- `lighthouse`

If you need both, enable both. If you only want one, disable the other to keep the response lighter. See the <Link href='/docs/api/parameters/insights' children='insights reference' /> for the details.

## Next step

Learn how to keep or reshape the final response in [delivery and response shaping](/docs/guides/metadata/delivery-and-response).
