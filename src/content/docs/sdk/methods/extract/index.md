---
title: 'extract'
description: 'Pull typed values from any URL with your own CSS selector rules using the Microlink SDK: selectors, attributes, types, nested rules, fallbacks, JavaScript evaluation, and rules alongside metadata.'
---

import { Type, TypeContainer } from 'components/markdown/Type'
import { Figcaption } from 'components/markdown/Figcaption'
import { Link } from 'components/elements/Link'

Typed values pulled with your own rules. Declare the data you want from a page — a CSS selector, the attribute to read, the type to validate it as — and get it back normalized. It takes the rules as its second argument and resolves to an object with one key per rule:

```js
import createClient from 'microlink.io'

const microlink = createClient()

const { image } = await microlink.extract('https://microlink.io', {
  image: {
    selector: 'meta[property="og:image"]',
    attr: 'content',
    type: 'image'
  }
})

console.log(image.url, image.width, image.height)
```

For any [url](/docs/api/parameters/url), [Microlink API](/docs/api/getting-started/overview) already returns normalized [data fields](/docs/api/getting-started/data-fields) extracted from Open Graph, JSON-LD, and a series of DOM fallbacks. Rules let you go further: extract any value present on any website, overwrite a normalized field whose source is wrong, and build your own API on top of any site. Every example on this page assumes the `microlink` client above.

## A rule

A rule is defined by a handful of primitives. Each one answers a single question about the value you want:

| Primitive | Question it answers | Example |
|-----------|---------------------|---------|
| [selector](#selector) | Which element? The first match of a CSS selector | `'meta[property="og:image"]'` |
| [selectorAll](#selectorall) | Which elements? Every match, returning a collection | `'.athing'` |
| [attr](#attr) | What to read from it: an HTML attribute, or `text`, `html`, `markdown`, `json` | `'content'` |
| [type](#type) | How to validate and normalize the value | `'image'` |
| [evaluate](#evaluate) | Run JavaScript in the page instead of querying the DOM | `'window.next.version'` |

A rule needs at least a query — `selector`, `selectorAll`, or `evaluate` — or an `attr` alone to serialize the whole page. Omitted primitives fall back to `attr: 'html'` and `type: 'auto'`.

Rules compose in two ways: an object under `attr` builds [nested](#nested-rules) structures, and an array of rules defines [fallbacks](#fallback-rules) evaluated in order until one yields a value.

## selector

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Values: [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

It defines the [HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) you want to pick from the HTML markup over the [url](/docs/api/parameters/url):

```js
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

It's equivalent to [Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) and any [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) can be specified, such as:

- An HTML tag (e.g., <Type children="'img'"/>).
- A CSS class or pseudo class, id or data-attribute (e.g., <Type children="'#avatar'"/>).
- A combination of both (e.g., <Type children="'img:first'"/>).

When `selector` is omitted, the [attr](#attr) operates on the entire page. This is useful for whole-page serialization (including formats like <Type children="'markdown'"/>):

```js
const { content } = await microlink.extract('https://example.com', {
  content: {
    attr: 'markdown'
  }
})

console.log(content)
// => '# Example Domain\n\nThis domain is for use in…'
```

<Figcaption children='Omitting selector with attr is useful for LLM pipelines, content indexing, or feeding page content into downstream processing. Unsupported attr values fall back to HTML.' />

The same `selector` is what the [markdown](/docs/sdk/methods/markdown), [html](/docs/sdk/methods/html), [text](/docs/sdk/methods/text), and [collection](/docs/sdk/methods/collections) methods accept as an option to scope their extraction.

### Fallback selectors

If you pass a collection of selectors, they are considered as fallback values:

```js
const github = username =>
  microlink.extract(`https://github.com/${username}`, {
    avatar: [
      {
        selector: 'meta[name="twitter:image:src"]:not([content=""])',
        attr: 'content',
        type: 'image'
      },
      {
        selector: 'meta[property="og:image"]:not([content=""])',
        attr: 'content',
        type: 'image'
      }
    ]
  })

const username = 'kikobeats'
const { avatar } = await github(username)

console.log(`GitHub avatar for @${username}: ${avatar.url} (${avatar.size_pretty})`)
```

<Figcaption children='Using multiple selectors makes the data rule more generic.' />

The position into the collection matters: The first data rule that returns a truthy value after applying type will be used, discarding the rest of the selectors.

## selectorAll

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Values: [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

It's the same than [selector](#selector) but it returns your a collection of results, being equivalent to [Document.querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll):

```js
const hackerNews = () =>
  microlink.extract('https://news.ycombinator.com/', {
    posts: {
      selectorAll: '.athing',
      attr: {
        title: {
          type: 'title',
          selector: '.titleline > a',
          attr: 'text'
        },
        url: {
          type: 'url',
          selector: '.titleline > a',
          attr: 'href'
        }
      }
    }
  })

const { posts } = await hackerNews()

console.log('latest hacker news posts:', posts)
```

Without a nested `attr`, each match contributes one plain value, which is how the [collection](/docs/sdk/methods/collections) methods sweep a page:

```js
const { links } = await microlink.extract('https://news.ycombinator.com/', {
  links: {
    selectorAll: '.titleline > a',
    attr: 'href',
    type: 'url'
  }
})

console.log(links) // => ['https://…', 'https://…', …]
```

## attr

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Default: <Type children="'html'"/><br/>
Values: <TypeContainer><Type><Link href="https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName">tagName</Link></Type> | <Type><Link href="https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName">nodeName</Link></Type> | <Type children="'html'"/> | <Type children="'outerHTML'"/> | <Type children="'text'"/> | <Type children="'markdown'"/> | <Type children="'json'"/> | <Type children="'val'"/></TypeContainer>

It specifies how the value should be extracted from the matched [selector](#selector):

```js
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

### Whole-page serialization

When [selector](#selector) is omitted, `attr` operates on the entire page. This is useful for serializing a full page into a new output format:

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

### Nested rules

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

The same structure applies to every item of a list when the parent uses [selectorAll](#selectorall), which is how you turn repeated markup into an array of objects:

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

### Fallback values

If you specify more than one value, they will be used as fallback values:

```js
const github = username =>
  microlink.extract(`https://github.com/${username}`, {
    avatar: [
      {
        selector: 'meta[name="twitter:image:src"]:not([content=""])',
        attr: 'content',
        type: 'image'
      },
      {
        selector: 'meta[property="og:image"]:not([content=""])',
        attr: 'content',
        type: 'image'
      }
    ]
  })

const username = 'kikobeats'
const { avatar } = await github(username)

console.log(`GitHub avatar for @${username}: ${avatar.url} (${avatar.size_pretty})`)
```

<Figcaption children="The first attribute that resolves a value will be used." />

## type

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Default: <Type children="'auto'"/><br/>
Values: <TypeContainer><Type children="'audio'"/> | <Type children="'author'"/> | <Type children="'auto'"/> | <Type children="'boolean'"/> | <Type children="'date'"/> | <Type children="'description'"/> | <Type children="'email'"/> | <Type children="'image'"/> | <Type children="'ip'"/> | <Type children="'lang'"/> | <Type children="'logo'"/> | <Type children="'number'"/> | <Type children="'object'"/> | <Type children="'publisher'"/> | <Type children="'regexp'"/> | <Type children="'string'"/> | <Type children="'title'"/> | <Type children="'url'"/> | <Type children="'video'"/></TypeContainer>

It defines how the value extracted should be considered.

```js
const productHunt = id =>
  microlink.extract(`https://www.producthunt.com/posts/${id}`, {
    name: {
      selector: 'h1 a',
      attr: 'text',
      type: 'string'
    },
    upvotes: {
      selector: '.bigButtonCount_10448',
      attr: 'text',
      type: 'number'
    }
  })

const productSlug = 'microlink-2-0'
const { name, upvotes } = await productHunt(productSlug)

console.log(`'${name}' has ${upvotes} upvotes`)
```

The data shape ensures that the extracted value will only be considered as valid when it's of the declared shape: a rule whose value doesn't match its `type` resolves to `null`, which is what lets [fallback rules](#fallback-rules) move on to the next candidate.

Media types do more than validate. <Type children="'image'"/>, <Type children="'video'"/>, <Type children="'audio'"/>, and <Type children="'logo'"/> resolve the value to an absolute URL and expand it into an asset object with `url`, `type`, `width`, `height`, `size`, and `size_pretty`, the same shape the normalized [data fields](/docs/api/getting-started/data-fields) use:

```js
const { cover } = await microlink.extract('https://www.youtube.com/watch?v=9P6rdqiybaw', {
  cover: {
    selector: 'meta[property="og:image"]',
    attr: 'content',
    type: 'image'
  }
})

console.log(cover.width, cover.height, cover.size_pretty)
```

## evaluate

Type: <TypeContainer><Type children='<string>'/> | <Type children='<function>'/></TypeContainer>

It evaluates the JavaScript provided inside the browser context over the target URL, returning the result.

It's quite similar to [selector](#selector), but designed to specify the value to be obtained in a JavaScript-like way.

```js
const getNextVersion = url =>
  microlink.extract(url, {
    version: {
      evaluate: 'window.next.version',
      type: 'string'
    }
  })

const { version } = await getNextVersion('https://vercel.com')

console.log(`Next.js version is: ${version}`)
```

<Figcaption children='You can combine evaluate with types for data correctness.' />

It can evaluate anything browser compatible in the JavaScript context. A function is serialized to its source before being sent, so it can be as long as you need — but it runs in the page, not in your process, so it can only reach what the page can:

```js
const getExcerpt = url =>
  microlink.extract(url, {
    excerpt: {
      evaluate: async () => {
        const response = await window.fetch(
          'https://cdn.jsdelivr.net/npm/@mozilla/readability/Readability.js'
        )
        const script = await response.text()
        window.eval(script)
        const reader = new window.Readability(window.document)
        return reader.parse().excerpt
      },
      type: 'string'
    }
  })

const { excerpt } = await getExcerpt('https://levelup.gitconnected.com/how-to-load-external-javascript-files-from-the-browser-console-8eb97f7db778')

console.log(excerpt)
```

When the logic outgrows a single expression — clicks, waits, npm packages — reach for [function](/docs/sdk/methods/function), which gives the function full Puppeteer access instead of a page-side evaluation.

## Options

A third argument takes the [shared options](/docs/sdk/getting-started/options), useful for pairing rules with [prerender](/docs/api/parameters/prerender), [waitForSelector](/docs/api/parameters/waitForSelector), [ttl](/docs/api/parameters/ttl), or [headers](/docs/api/parameters/headers) forwarded to the target page:

```js
const { price } = await microlink.extract(
  'https://example.com/product',
  { price: { selector: '.price', attr: 'text', type: 'number' } },
  { prerender: true, waitForSelector: '.price', ttl: '1h' }
)
```

## Result

It resolves to an object with one key per rule. Values are normalized by their [type](#type): a `'string'` is a string, a `'number'` is a number, and `'image'`, `'video'`, `'audio'`, and `'logo'` become asset objects carrying `url`, `type`, `width`, `height`, `size`, and `size_pretty`. A rule that matches nothing, or whose value fails its type, resolves to `null`, so destructuring is always safe.

The complete API response — its [status](/docs/api/basics/format#status), the payload, and the HTTP response with its headers — stays available on `microlink.last` after every call; see [inspect the last request](/docs/sdk/getting-started/errors#inspect-the-last-request). Failures throw a [`MicrolinkError`](/docs/sdk/getting-started/errors) like every other method.

## Rules alongside metadata

`extract` returns only your fields. To evaluate rules next to the normalized [data fields](/docs/api/getting-started/data-fields) in one request, pass them as the `data` option of [metadata](/docs/sdk/methods/metadata):

```js
const { title, description, price } = await microlink.metadata('https://example.com/product', {
  data: {
    price: { selector: '.price', attr: 'text', type: 'number' }
  }
})
```

A rule named after a normalized field — `title`, `image`, `author` — overrides that field, which is how you fix a page whose metadata is wrong or missing.

## Fallback rules

A field can be defined by more than one rule. Pass an array and the rules are evaluated respecting the order: if the first one fails, the second is tried, then the third, and so on. The value is the one obtained by the first rule that succeeds:

```js
const github = username =>
  microlink.extract(`https://github.com/${username}`, {
    avatar: [
      {
        selector: 'meta[name="twitter:image:src"]:not([content=""])',
        attr: 'content',
        type: 'image'
      },
      {
        selector: 'meta[property="og:image"]:not([content=""])',
        attr: 'content',
        type: 'image'
      }
    ]
  })

const username = 'kikobeats'
const { avatar } = await github(username)

console.log(`GitHub avatar for @${username}: ${avatar.url} (${avatar.size_pretty})`)
```

A rule fails when its query matches nothing or when the value doesn't pass its [type](#type), so a fallback chain is also how you make a rule resilient to pages whose markup varies. The same array form works for [selector](#fallback-selectors) and [attr](#fallback-values) on their own.

## Examples

A list of objects — one per story — with [selectorAll](#selectorall) and a nested `attr`:

```js
const { stories } = await microlink.extract('https://news.ycombinator.com', {
  stories: {
    selectorAll: '.athing',
    attr: {
      title: { selector: '.titleline > a', attr: 'text' },
      href: { selector: '.titleline > a', attr: 'href', type: 'url' }
    }
  }
})
```

A value that only exists in JavaScript, read with [evaluate](#evaluate):

```js
const { version } = await microlink.extract('https://vercel.com', {
  version: { evaluate: 'window.next.version', type: 'string' }
})
```

A JSON endpoint parsed into structured data, with `attr: 'json'` on the whole page:

```js
const { content } = await microlink.extract('https://pokeapi.co/api/v2/pokemon', {
  content: { attr: 'json' }
})
```

## Everywhere else

The [markdown](/docs/sdk/methods/markdown), [html](/docs/sdk/methods/html), [text](/docs/sdk/methods/text), and [collection](/docs/sdk/methods/collections) methods are shortcuts over rules like these, and accept the same primitives as options to scope their extraction. The same grammar — historically known as MQL, the Microlink Query Language — is what the [data](/docs/api/parameters/data) query parameter takes when you call the API directly, and what the [CLI](/docs/sdk/getting-started/cli) accepts as JSON through `extract --data`.

Underneath, the SDK talks to the API through [@microlink/mql](https://github.com/microlinkhq/mql), the low-level client it ships as a dependency; you never need to install or import it yourself. Reading a response body as a stream or a buffer is the one thing that still lives there rather than in the SDK.

See the [data extraction guide](/docs/guides/data-extraction) for defining rules, page preparation, response shaping, and troubleshooting.
