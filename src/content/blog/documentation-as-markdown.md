---
title: 'Every Microlink docs page is now available as Markdown'
subtitle: 'Serving the docs to LLMs in 14 lines of code'
description: 'Every docs page at microlink.io can now be consumed as markdown. Learn why this matters and how we implemented it with Microlink API in a few lines.'
authors:
  - kiko
date: '2026-02-06'
---

import { Terminal } from 'components/markdown/Terminal'

Every [Microlink documentation](/docs/api/getting-started/overview) page can now be consumed as Markdown. Add `.md` to the end of any docs URL and you get the same page as clean Markdown, ready to paste into an LLM or fetch from an agent.

**TL;DR**

- Add `.md` to any Microlink docs URL, or send `Accept: text/markdown`, and you get the same page as clean Markdown.
- The Markdown comes from one MQL data rule with `attr: 'markdown'`: **14 lines** of code.
- A Vercel rewrite serves the `.md` version on the original URL when the `accept` header matches `text/markdown`.
- Before converting, the Microlink API removes headers, footers, navigation, and hidden elements, so the Markdown holds only the page content.
- The same conversion works on any page through `markdown.microlink.io`.

```shell
# human readable version
curl https://microlink.io/docs/api/getting-started/overview

# LLM ready version
curl https://microlink.io/docs/api/getting-started/overview.md
```

You can also keep the original URL and ask for Markdown by setting `text/markdown` in the `Accept` header:

```shell
curl -H 'Accept: text/markdown' https://microlink.io/docs/api/getting-started/overview
```

## Docs are read by agents as much as by people

Documentation is no longer read only by humans in a browser. Teams paste a page like `/docs/api/getting-started/overview` into AI tools, agents fetch references from links, and IDE copilots work best with clean Markdown inputs.

Markdown fits LLM context windows better than rendered HTML: it drops layout artifacts, keeps the heading hierarchy, and carries less noise. It also speeds up the copy and paste workflow for developers using ChatGPT, Claude, Codex, Cursor, or internal agents.

For us, the main benefit was architectural: one canonical docs source, served as HTML at `/docs/...` and as Markdown at `/docs/....md`. We did not have to build or maintain a separate Markdown documentation system to expose machine-friendly content.

## The Markdown comes from an MQL data rule

MQL data rules already serialize any page as text, Markdown, or HTML. The [attr](/docs/mql/data/attr) field sets the output format, and an optional [selector](/docs/mql/data/selector) narrows the extraction to part of the page.

![](/images/S0QqYLR.jpeg)

The same serializers are available as aliases on `html.microlink.io`, `text.microlink.io`, and `markdown.microlink.io`. Put any URL after the host to get it back in that format:

```shell
curl https://markdown.microlink.io/https://example.com
```

Each alias is shorthand for an extraction rule. This is the full rule behind the Markdown version of a docs page:

```js
import mql from '@microlink/mql'

const url = 'https://microlink.io/docs/api/getting-started/overview'

const { data } = await mql(url, {
  apiKey,
  data: {
    markdown: {
      attr: 'markdown' // # the magic!
    }
  },
  meta: false
})

console.log(data.markdown)
```

This is exactly the code we run: 14 lines that turn a docs URL into Markdown. The rule asks for a single `markdown` field with `attr: 'markdown'`, and `meta: false` skips the default metadata extraction, so `data.markdown` is the only output.

Our docs pipeline only has to run that code against each production docs URL to generate an accurate Markdown version of it.

## A Vercel rewrite serves Markdown on the same URL

The `.md` files cover explicit requests. To serve them from the original URL too, we added a rewrite for docs routes in our Vercel config:

```json
{
  "source": "/docs/(.*)",
  "destination": "/docs/$1.md",
  "has": [
    {
      "type": "header",
      "key": "accept",
      "value": ".*text/markdown.*"
    }
  ]
}
```

When a request to `/docs/(.*)` carries an `accept` header that matches `.*text/markdown.*`, Vercel serves `/docs/$1.md` instead of the HTML page. Consumers request the same URL and choose the format through headers.

## The API cleans the page before converting it

Serving a `.md` file is easy. The hard part is a reliable HTML to Markdown conversion: one whose output holds only the content of the page, without the site header, footer, or navigation.

![](/images/fbPV4iG.png)

When the [Microlink API](/docs/api/getting-started/overview) is asked for Markdown, it runs a content-cleaning pipeline before serializing anything. That pipeline:

- Removes headers, footers, and navigation chrome.
- Removes hidden and non-content elements.
- Keeps the primary textual content and its structure.
- Normalizes links and formatting for consistent Markdown output.
- Returns a clean result ready for copy and paste or agent consumption.

On top of those steps sit many smaller rules that we tested against a large set of documentation sites. Only after the cleanup does the API serialize the page into Markdown that represents the main content of the target URL.

## Try it on your own docs

Run the same conversion on any page with `curl https://markdown.microlink.io/` followed by its URL, or copy the `mql` rule above into your build to generate a `.md` file for each of your docs pages. The [attr](/docs/mql/data/attr) reference lists every serialization format the rule supports.
