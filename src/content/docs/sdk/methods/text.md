---
title: 'text'
description: 'Get readable plain text from any URL with the Microlink SDK, with the markup stripped out and optionally scoped to a CSS selector.'
---

Readable plain text with the markup stripped out. It resolves to a string:

```js
const text = await microlink.text('https://example.com')
```

Leading, trailing, and repeated whitespace is collapsed, which keeps the output compact for indexing, search, or token-budgeted prompts. PDFs with a text layer and office documents are converted too.

## Options

It takes the same scoping options as [markdown](/docs/sdk/methods/markdown):

- [selector](/docs/sdk/mql/data/selector) `<string>` — returns the text of the first element matching the CSS selector.
- [selectorAll](/docs/sdk/mql/data/selectorAll) `<string> | <string[]>` — returns the text of every matching element, as an array.
- [type](/docs/sdk/mql/data/type) `<string>` — overrides how the extracted value is normalized, per the [rules grammar](/docs/sdk/mql/rules/basic).

Any [shared option](/docs/sdk/getting-started/options) applies too.

## Examples

Skip navigation and footers by scoping to the article:

```js
const text = await microlink.text('https://example.com/blog/post', {
  selector: 'article'
})
```

Every headline on a news front page:

```js
const headlines = await microlink.text('https://news.ycombinator.com', {
  selectorAll: '.titleline > a'
})
```

Prefer [markdown](/docs/sdk/methods/markdown) when structure matters — headings, lists, and links survive there — and `text` when only the words do.

See [URL to Text](/docs/guides/content-conversion/url-to-text) in the content conversion guide.
