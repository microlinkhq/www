---
title: 'markdown'
description: 'Convert any URL to clean Markdown with the Microlink SDK, scoped to a CSS selector when needed. Ready for LLM context windows, RAG pipelines, and documentation imports.'
---

The page as clean Markdown, ready for LLM context windows. It resolves to a string:

```js
const markdown = await microlink.markdown('https://example.com')
```

Headings, links, lists, tables, and code blocks are preserved; navigation chrome, scripts, and styles are dropped. Documents work too: point it at a PDF with a text layer or an office file (`docx`, `xlsx`, `pptx`, `odt`, `rtf`, `epub`) and the content is converted the same way.

## Options

- [selector](/docs/sdk/mql/data/selector) `<string>` — scopes the conversion to the first element matching the CSS selector.
- [selectorAll](/docs/sdk/mql/data/selectorAll) `<string> | <string[]>` — scopes the conversion to every matching element, resolving to an array with one Markdown string per match.
- [type](/docs/sdk/mql/data/type) `<string>` — overrides how the extracted value is normalized, per the [rules grammar](/docs/sdk/mql/rules/basic).

Any [shared option](/docs/sdk/getting-started/options) applies too. [prerender](/docs/api/parameters/prerender) and [waitForSelector](/docs/api/parameters/waitForSelector) matter most here: client-side rendered content only exists after JavaScript runs.

## Examples

Keep just the article body, leaving out headers, footers, and sidebars:

```js
const markdown = await microlink.markdown('https://example.com/blog/post', {
  selector: 'article'
})
```

One string per comment on a discussion page:

```js
const comments = await microlink.markdown('https://news.ycombinator.com/item?id=1', {
  selectorAll: '.comment'
})

console.log(comments.length)
```

Wait for a client-side rendered page to finish before converting:

```js
const markdown = await microlink.markdown('https://app.example.com/docs', {
  prerender: true,
  waitForSelector: 'main h1'
})
```

Under the hood the call is an [extraction rule](/docs/sdk/mql/rules/basic) with `attr: 'markdown'`; use [extract](/docs/sdk/methods/extract) when you want Markdown for one field and other values alongside it.

See [URL to Markdown](/docs/guides/content-conversion/url-to-markdown) in the content conversion guide for scoping strategies, document support, and LLM pipelines.
