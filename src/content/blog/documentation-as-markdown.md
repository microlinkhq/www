---
title: 'Documentation as markdown'
subtitle: 'How to create LLM ready documentation'
description: 'Every docs page at microlink.io can now be consumed as markdown. Learn why this matters and how we implemented it with Microlink API in a few lines.'
authors:
  - kiko
date: '2026-02-06'
---

import { Terminal } from 'components/markdown/Terminal'

We shipped a simple improvement: every [Microlink documentation](/docs/api/getting-started/overview) page can now be consumed as markdown.

```shell
# human readable version
curl https://microlink.io/docs/api/getting-started/overview

# LLM ready version
curl https://microlink.io/docs/api/getting-started/overview.md
```

Alternatively you can specify markdown as content type:

```shell
curl -H 'Accept: text/markdown' https://microlink.io/docs/api/getting-started/overview
```

## Why this matters

Documentation consumption has changed.

It is no longer just humans reading pages in a browser. Today, teams paste docs into AI tools, agents fetch references from links, and IDE copilots benefit from clean markdown inputs.

Markdown is the most practical format for LLM context windows: fewer layout artifacts, cleaner hierarchy, less noise. It also makes copy/paste workflows faster for developers using ChatGPT, Claude, Codex, Cursor, or internal agents.

The key benefit for us was architectural: one canonical docs source, multiple delivery formats. We avoided maintaining a separate markdown documentation system while still exposing machine-friendly content.

## How we implemented it

We just created an extraction rule for [Microlink API](/docs/api/getting-started/overview) telling we want to get markdown output from the target URL:

```js
const url = 'https://microlink.io/docs/api/getting-started/overview'

const { data } = await mql(url, {
  apiKey,
  data: {
    markdown: {
      selector: 'markdown' // # the magic!
    }
  },
  meta: false,
  force: true
})

console.log(data.markdown)
```

The code above is exactly the code we are using: 14 lines of code to have a markdown version of your documentation. No more, no less.

We only need to run that code in our pipeline to generate an accurate markdown representation of production URLs.

Additionally, at Vercel, we added a rewrite for docs routes:

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

So consumers can request the same URL and choose format via headers.

## Why Microlink API made this easy

The hard part of markdown endpoints is to have a realible html-to-markdown conversion.

![](/images/fbPV4iG.png)

When [Microlink API](/docs/api/getting-started/overview) is instructed to return markdown, it runs a content-cleaning pipeline first. In practice, that means:

- Removing headers, footers, and navigation chrome.
- Removing hidden and non-content elements.
- Keeping the primary textual content and structure.
- Normalizing links and formatting for consistent markdown output.
- Returning a clean result ready for copy/paste or agent consumption.
- and a lot of more stuf we tested against tons of documentation sites.

Just after that the content can be serialized into high quality markdown that represents the main content of the target URL.
