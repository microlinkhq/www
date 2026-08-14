---
title: 'Content'
description: 'Turn any URL into rendered output with the Microlink SDK: unified metadata, Markdown, HTML, plain text, screenshots, PDFs, logos, and embeds.'
---

The content methods turn a URL into rendered output — structured data, documents, and hosted assets. Every method follows the same `method(url, options)` shape, and [options are routed automatically](/docs/sdk/getting-started/options).

## metadata

Unified metadata from Open Graph, Twitter Cards, JSON-LD, and HTML:

```js
const { title, description, image } = await microlink.metadata('https://vercel.com')
```

See [data fields](/docs/api/getting-started/data-fields) for everything the response can carry.

## markdown

The page as clean Markdown, ready for LLM context windows. Use `selector` to scope what gets converted:

```js
const markdown = await microlink.markdown('https://example.com', {
  selector: 'article'
})
```

## html

Fully rendered HTML, captured after JavaScript runs:

```js
const html = await microlink.html('https://example.com')
```

## text

Readable plain text with the markup stripped out:

```js
const text = await microlink.text('https://example.com')
```

## screenshot

Any URL as a hosted image. The result is an asset object with `url`, `type`, `width`, `height`, and `size`:

```js
const { url } = await microlink.screenshot('https://example.com', {
  fullPage: true
})
```

Pass `animated: true` to capture the page as an animation, or any other [screenshot parameter](/docs/api/parameters/screenshot) such as `device` emulation or custom styles.

## pdf

Print any URL to PDF with format, margin, and scale control:

```js
const { url } = await microlink.pdf('https://example.com', { format: 'A4' })
```

See the [pdf parameters](/docs/api/parameters/pdf) for every knob.

## logo

The brand logo behind any URL. Use `square: true` to prefer a square variant:

```js
const { url } = await microlink.logo('https://github.com', { square: true })
```

## embed

oEmbed-style iframe HTML for rich cards, with `maxWidth`/`maxHeight` support:

```js
const { html } = await microlink.embed('https://www.youtube.com/watch?v=9P6rdqiybaw')
```

See the [iframe parameter](/docs/api/parameters/iframe) for the list of supported providers.
