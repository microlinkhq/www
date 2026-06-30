---
title: 'Web page to Text'
description: 'Use Microlink API to convert a web page URL into readable plain text, either inside JSON or as a direct text response.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Use `attr: 'text'` when your consumer needs readable plain text instead of Markdown structure or HTML markup. Microlink extracts the page content and returns it as a string.

<MultiCodeEditorInteractive
  height={280}
  mqlCode={{
    url: 'https://example.com',
    data: {
      text: {
        attr: 'text'
      }
    },
    meta: false
  }}
/>

<Figcaption>Read the converted text from <code>data.text</code>.</Figcaption>

## Return text directly

Add `embed: 'text'` when the API URL itself should return plain text:

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://example.com',
    data: {
      text: {
        attr: 'text'
      }
    },
    meta: false,
    embed: 'text'
  }}
/>

<Figcaption>The response body is plain text and the content type is <code>text/plain</code>.</Figcaption>

The same request as a raw URL:

```bash
https://api.microlink.io?url=https://example.com&data.text.attr=text&meta=false&embed=text
```

## Scope text extraction

Use a selector when the page has navigation, footers, or other text that should not be included:

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://microlink.io/docs/api/getting-started/overview',
    data: {
      text: {
        selector: 'main',
        attr: 'text'
      }
    },
    meta: false,
    embed: 'text'
  }}
/>

<Figcaption>Use <code>main</code>, <code>article</code>, or a page-specific selector to keep only the useful text.</Figcaption>

## Choose text, Markdown, or HTML

| Need | Use |
|------|-----|
| The smallest readable body | `attr: 'text'` |
| Headings, links, lists, and code blocks | `attr: 'markdown'` |
| Markup for downstream parsing or rendering | `attr: 'html'` |

## Next step

Use <Link href='/docs/guides/content-conversion/url-to-markdown' children='Web page to Markdown' /> when you need document structure, or <Link href='/docs/guides/content-conversion/url-to-html' children='Web page to HTML' /> when you need markup.
