---
title: 'Metadata: Choosing fields'
description: 'Request only the normalized metadata fields you actually need, and understand how Microlink represents text, media, and missing values.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

The default metadata payload is a great starting point, but most production workflows do better when they only request the fields they actually use.

## Start with the default field set

By default, Microlink can return fields such as:

- `title`
- `description`
- `lang`
- `author`
- `publisher`
- `date`
- `url`
- `image`
- `logo`
- `video`

This is the right choice when you are exploring a new source or building a generic preview card system that needs a broad set of metadata.

## Include only specific fields

Use a `meta` object with `true` values when you know exactly which fields you want:

<MultiCodeEditorInteractive
  height={230}
  mqlCode={{
    url: 'https://github.com/microlinkhq',
    meta: {
      title: true,
      description: true,
      image: true
    }
  }}
/>

<Figcaption>This keeps the response focused on the three fields you actually care about.</Figcaption>

This pattern is ideal for search indexing, link previews, or backend jobs that only depend on one or two fields.

## Exclude heavy or unnecessary fields

Use `false` values when you want the default field set except for a few omissions:

<MultiCodeEditorInteractive
  height={230}
  mqlCode={{
    url: 'https://github.com/microlinkhq',
    meta: {
      image: false,
      logo: false
    }
  }}
/>

<Figcaption>Exclude media fields when you only need text metadata and want to avoid unnecessary payload weight.</Figcaption>

This is useful when your workflow needs most of the normalized text fields but not preview images or logos.

## Include vs exclude

| If you need | Use |
|-------------|-----|
| Only a few specific fields | Set those fields to `true` |
| Almost everything except one or two fields | Set those fields to `false` |
| Maximum visibility while exploring a new site | Leave `meta` at its default behavior |

The `meta` object is the main control surface for metadata extraction performance and payload size.

## Media fields are richer objects

Text fields such as `title`, `description`, `publisher`, or `lang` are returned as strings.

Media fields such as `image`, `logo`, and `video` include more context:

- `url`
- `type`
- `size`
- `size_pretty`
- `width`
- `height`

Playable media can also include duration fields. See the <Link href='/docs/api/getting-started/data-fields' children='data fields reference' /> for the full shape.

## Missing values are signals, not necessarily errors

Some sites simply do not expose every field. For example, `author` or `date` can be `null` even when the request succeeds.

If one field is consistently missing:

- Try the default metadata set first, not a narrowed one.
- If the site is client-rendered, continue with [page preparation](/docs/guides/metadata/page-preparation).
- If the field is site-specific, add a custom fallback with `data` in [extending results](/docs/guides/metadata/extending-results).

## Next step

Learn how to add custom fields, embed HTML, palettes, and other enriched outputs in [extending results](/docs/guides/metadata/extending-results).
