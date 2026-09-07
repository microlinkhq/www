---
title: 'html'
description: 'Get the fully rendered HTML of any URL with the Microlink SDK, captured after JavaScript runs and optionally scoped to a CSS selector.'
---

Fully rendered HTML, captured after JavaScript runs. It resolves to a string:

```js
const html = await microlink.html('https://example.com')
```

Unlike a plain `fetch`, the markup reflects the DOM after client-side rendering when [prerender](/docs/api/parameters/prerender) kicks in, so single-page applications return their real content.

## Options

It takes the same scoping options as [markdown](/docs/sdk/methods/markdown):

- [selector](/docs/sdk/mql/data/selector) `<string>` — returns the inner HTML of the first element matching the CSS selector.
- [selectorAll](/docs/sdk/mql/data/selectorAll) `<string> | <string[]>` — returns the inner HTML of every matching element, as an array.
- [type](/docs/sdk/mql/data/type) `<string>` — overrides how the extracted value is normalized, per the [rules grammar](/docs/sdk/mql/rules/basic).

Any [shared option](/docs/sdk/getting-started/options) applies too.

## Examples

Only the main content region:

```js
const html = await microlink.html('https://example.com', {
  selector: 'main'
})
```

Grab every product card of a listing to parse on your side:

```js
const cards = await microlink.html('https://example.com/shop', {
  selectorAll: '.product-card',
  waitForSelector: '.product-card'
})
```

Render a client-side application and inject a stylesheet before capturing the markup:

```js
const html = await microlink.html('https://app.example.com', {
  prerender: true,
  styles: ['.banner { display: none }']
})
```

For the outer HTML of an element, or attributes instead of markup, write the rule yourself with [extract](/docs/sdk/methods/extract) and `attr: 'outerHTML'`.

See [URL to HTML](/docs/guides/content-conversion/url-to-html) in the content conversion guide.
