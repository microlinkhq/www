---
title: 'Web page to Markdown'
description: 'Use Microlink API to convert a web page URL into Markdown, either inside JSON or as a direct Markdown response.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Use `attr: 'markdown'` to serialize a page as Markdown. This is the direct recipe for LLM ingestion, RAG pipelines, docs imports, and any workflow that should not carry raw HTML.

<MultiCodeEditorInteractive
  height={280}
  mqlCode={{
    url: 'https://stripe.com/docs/api',
    data: {
      markdown: {
        attr: 'markdown'
      }
    },
    meta: false
  }}
/>

<Figcaption>Read the converted page from <code>data.markdown</code>.</Figcaption>

## Return Markdown directly

Add `embed: 'markdown'` when the API URL should return Markdown instead of JSON:

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://stripe.com/docs/api',
    data: {
      markdown: {
        attr: 'markdown'
      }
    },
    meta: false,
    embed: 'markdown'
  }}
/>

<Figcaption>The response body is Markdown and the content type is <code>text/markdown</code>.</Figcaption>

The same request as a raw URL:

```bash
https://api.microlink.io?url=https://stripe.com/docs/api&data.markdown.attr=markdown&meta=false&embed=markdown
```

## Scope noisy pages

If the full page includes navigation, footers, or cookie banners, scope the rule to the main content wrapper:

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://microlink.io/docs/api/getting-started/overview',
    data: {
      markdown: {
        selector: 'main',
        attr: 'markdown'
      }
    },
    meta: false,
    embed: 'markdown'
  }}
/>

<Figcaption>Use <code>main</code>, <code>article</code>, or a page-specific selector when the full page is too noisy.</Figcaption>

## Keep metadata when useful

For LLM and indexing workflows, `meta: true` prepends YAML frontmatter with normalized fields such as title, description, author, publisher, date, word count, and reading time. Keep `meta: false` when you only want the Markdown body.

## Next step

Use <Link href='/docs/guides/data-extraction/page-preparation' children='Data extraction: Page preparation' /> when the output is noisy or incomplete. Use <Link href='/docs/guides/content-conversion/url-to-text' children='Web page to Text' /> when the consumer only needs readable text, or <Link href='/docs/guides/content-conversion/pdf-url-to-markdown' children='PDF file to Markdown' /> when the source URL points directly to a PDF file.
