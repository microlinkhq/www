---
title: attr
description: 'Extract HTML attributes, text, inner HTML, Markdown, or JSON from any URL with the attr primitive of extract in the Microlink SDK, and nest rules under it to build objects.'
---

import { Type, TypeContainer } from 'components/markdown/Type'
import { Link } from 'components/elements/Link'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Default: <Type children="'html'"/><br/>
Values: <TypeContainer><Type><Link href="https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName">tagName</Link></Type> | <Type><Link href="https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName">nodeName</Link></Type> | <Type children="'html'"/> | <Type children="'outerHTML'"/> | <Type children="'text'"/> | <Type children="'markdown'"/> | <Type children="'json'"/> | <Type children="'val'"/></TypeContainer>

It specifies how the value should be extracted from the matched [selector](/docs/sdk/methods/extract/selector):

```js
import createClient from 'microlink.io'

const microlink = createClient()

const github = username =>
  microlink.extract(`https://github.com/${username}`, {
    avatar: {
      selector: 'meta[property="og:image"]:not([content=""])',
      attr: 'content',
      type: 'image'
    }
  })

const username = 'kikobeats'
const { avatar } = await github(username)

console.log(`GitHub avatar for @${username}: ${avatar.url} (${avatar.size_pretty})`)
```

Any [HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) is supported, plus the following special cases:

- <Type children="'html'"/>: Get the inner HTML content of the matched selector.
- <Type children="'outerHTML'"/>: Get the outer HTML of the matched selector, including the element itself.
- <Type children="'text'"/>: Returns the combined text content, including its descendants, by removing leading, trailing, and repeated whitespace.
- <Type children="'markdown'"/>: Converts the HTML content into Markdown, preserving headings, links, and formatting.
- <Type children="'json'"/>: Parses the page body as JSON and returns structured data. Whole-page only — do not combine with `selector`. See <Link href='/docs/guides/data-extraction/defining-rules#extract-json' children='Extract JSON' /> in the Data extraction guide.
- <Type children="'val'"/>: Get the current value of the matched selector, oriented for select or input fields.

## Whole-page serialization

When [selector](/docs/sdk/methods/extract/selector) is omitted, `attr` operates on the entire page. This is useful for serializing a full page into a new output format:

```js
const { content } = await microlink.extract('https://example.com', {
  content: {
    attr: 'markdown'
  }
})

console.log(content)
// => '# Example Domain\n\nThis domain is for use in illustrative examples…'
```

The [markdown](/docs/sdk/methods/markdown), [html](/docs/sdk/methods/html), and [text](/docs/sdk/methods/text) methods are shortcuts over exactly this rule.

You can also scope the conversion to a specific element by combining `selector` with `attr`:

```js
const { article } = await microlink.extract('https://example.com', {
  article: {
    selector: 'article',
    attr: 'markdown'
  }
})

console.log(article)
// => '# Article Title\n\nArticle content as markdown…'
```

For JSON endpoints, use `attr: 'json'` to parse the response body as structured data:

```js
const { content } = await microlink.extract('https://pokeapi.co/api/v2/pokemon', {
  content: {
    attr: 'json'
  }
})

console.log(content)
// => { count: 1302, next: '…', results: [ … ] }
```

`json` is whole-page only — it cannot be combined with `selector`. See <Link href='/docs/guides/data-extraction/defining-rules#extract-json' children='Extract JSON' /> for the full walkthrough.

## Nested rules

An object under `attr` maps a data structure over the same property key. Each nested rule is evaluated relative to the element matched by the parent `selector`, and the result is an object with one key per nested rule:

```js
const github = username =>
  microlink.extract(`https://github.com/${username}`, {
    stats: {
      selector: '.application-main',
      attr: {
        followers: {
          selector: '.js-profile-editable-area a[href*="tab=followers"] span',
          type: 'number'
        },
        following: {
          selector: '.js-profile-editable-area a[href*="tab=following"] span',
          type: 'number'
        },
        stars: {
          selector: '.js-responsive-underlinenav a[data-tab-item="stars"] span',
          type: 'number'
        }
      }
    }
  })

const username = 'kikobeats'
const { stats } = await github(username)

console.log(`GitHub stats for @${username}:`, stats)
// => { followers: 1234, following: 56, stars: 789 }
```

The same structure applies to every item of a list when the parent uses [selectorAll](/docs/sdk/methods/extract/selectorAll), which is how you turn repeated markup into an array of objects:

```js
const { stories } = await microlink.extract('https://news.ycombinator.com', {
  stories: {
    selectorAll: '.athing',
    attr: {
      title: { selector: '.titleline > a', attr: 'text' },
      url: { selector: '.titleline > a', attr: 'href', type: 'url' }
    }
  }
})

console.log(stories[0]) // => { title: '…', url: 'https://…' }
```

Nested rules can nest again, so a parent rule can describe a whole section of a page as one JSON document.

## Fallback values

Multiple `attr` values use the same [fallback](/docs/sdk/methods/extract#fallback-rules) form: the first attribute that resolves a value is used.
