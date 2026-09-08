---
title: 'logo'
description: 'Get the brand logo behind any URL with the Microlink SDK, as a hosted image asset, with an optional square variant and color palette.'
---

The brand logo behind any URL. The result is an asset object with `url`, `type`, `width`, `height`, `size`, and `size_pretty`:

```js
const { url } = await microlink.logo('https://github.com', { square: true })
```

The logo is detected from the page markup — favicons, Apple touch icons, manifest icons, structured data — and falls back to a logo service when the page doesn't declare one. It resolves to `null` when nothing usable is found.

## Options

- `square` `<boolean>` — prefers a square variant of the logo when available, the right pick for avatars and app icons.

Any [shared option](/docs/sdk/getting-started/options) applies too; [palette](/docs/api/parameters/palette) is the one to know about here.

## Examples

A square logo with its dominant colors, ready to tint a card or a favicon background:

```js
const { url, palette, background_color, color } = await microlink.logo('https://stripe.com', {
  square: true,
  palette: true
})
```

The logo is one of the [data fields](/docs/api/getting-started/data-fields) `metadata` returns, so when you need the title and description too, one [metadata](/docs/sdk/methods/metadata) call covers all of them.
