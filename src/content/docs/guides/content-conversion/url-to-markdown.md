---
title: 'URL to Markdown'
description: 'Use Microlink API to convert any URL — a web page, a PDF, or a docx, xlsx, or pptx document — into Markdown for search, LLM, and document workflows.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Use [attr](/docs/mql/data/attr) with `markdown` to serialize any URL as Markdown. This is the direct recipe for LLM ingestion, RAG pipelines, docs imports, and any workflow that should not carry raw HTML.

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

## Any source URL works the same way

Point [url](/docs/api/parameters/url) at a web page, a PDF file, or an office document. Microlink converts a PDF or `docx`/`xlsx`/`pptx` file to an HTML DOM at fetch time, so the same `attr: 'markdown'` request turns it into readable Markdown:

<MultiCodeEditorInteractive
  height={280}
  mqlCode={{
    url: 'https://cdn.microlink.io/file-examples/sample.docx',
    data: {
      markdown: {
        attr: 'markdown'
      }
    },
    meta: false
  }}
/>

<Figcaption>Swap the URL for a <code>.pdf</code>, <code>.xlsx</code>, or <code>.pptx</code> file and the request is identical.</Figcaption>

## Return Markdown directly

Add [embed](/docs/api/parameters/embed) with `markdown` when the API URL should return Markdown instead of JSON:

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

<Figcaption>Use <code>main</code>, <code>article</code>, or a page-specific [selector](/docs/mql/data/selector) when the full page is too noisy.</Figcaption>

## Keep metadata when useful

For LLM and indexing workflows, setting [meta](/docs/api/parameters/meta) to `true` prepends YAML frontmatter with normalized fields such as title, description, author, publisher, date, word count, and reading time. Keep `meta: false` when you only want the Markdown body.

## Supported source formats

Any HTML page works. Direct file URLs are converted first: PDFs with a text layer, and the office formats `docx`, `xlsx`, `pptx`, `odt`, `rtf`, and `epub`. Image-only PDF scans, the legacy binary formats (`doc`, `xls`, `ppt`), and the OpenDocument spreadsheet and presentation formats (`ods`, `odp`) are not converted: the request still succeeds, but the field is left as the raw response instead of readable Markdown.

## Next step

Use <Link href='/docs/guides/data-extraction/page-preparation' children='Data extraction: Page preparation' /> when the output is noisy or incomplete. Use <Link href='/docs/guides/content-conversion/url-to-text' children='URL to Text' /> when the consumer only needs readable text, or <Link href='/docs/guides/content-conversion/url-to-html' children='URL to HTML' /> when you need markup.
