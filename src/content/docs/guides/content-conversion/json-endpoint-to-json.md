---
title: 'JSON endpoint to JSON'
description: 'Use Microlink API to fetch a JSON endpoint URL and return its parsed response body as structured JSON.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

Use `attr: 'json'` when the target URL is already a JSON endpoint. Microlink fetches the URL, parses the full response body with `JSON.parse`, and returns native structured data instead of a string.

<MultiCodeEditorInteractive
  height={300}
  mqlCode={{
    url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
    data: {
      json: {
        attr: 'json'
      }
    },
    meta: false,
    prerender: false
  }}
/>

<Figcaption>Read the parsed endpoint payload from <code>data.json</code>.</Figcaption>

## Return JSON directly

Add `embed: 'json'` when the API URL itself should return the parsed JSON field:

<MultiCodeEditorInteractive
  height={320}
  mqlCode={{
    url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
    data: {
      json: {
        attr: 'json'
      }
    },
    meta: false,
    prerender: false,
    embed: 'json'
  }}
/>

<Figcaption>The response is JSON, so a worker or backend job can consume it without reading a nested <code>data.json</code> field.</Figcaption>

The same request as a raw URL:

```bash
https://api.microlink.io?url=https://pokeapi.co/api/v2/pokemon/pikachu&data.json.attr=json&meta=false&prerender=false&embed=json
```

## Keep the whole response body

`attr: 'json'` is whole-page only. Do not combine it with `selector` or `selectorAll`; Microlink parses the entire endpoint response.

```js
{
  url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
  data: {
    json: {
      attr: 'json'
    }
  },
  meta: false,
  prerender: false
}
```

The original JSON shape is preserved as structured data. Strings that contain HTML-like text, such as `"<b>bold</b>"`, stay as strings and are not interpreted as DOM markup.

## When to use it

| Need | Use |
|------|-----|
| Fetch a REST API through Microlink | `attr: 'json'` |
| Keep response metadata next to the parsed payload | leave `embed` out |
| Return the parsed field as the API response | add `embed: 'json'` |
| Extract content from an HTML page | use `text`, `markdown`, or `html` instead |

## Next step

Use <Link href='/docs/guides/data-extraction/defining-rules#extract-json' children='Data extraction: Extract JSON' /> for the full rule behavior. Use <Link href='/docs/guides/content-conversion/url-to-text' children='Web page to Text' /> when the source is an HTML page, or <Link href='/docs/guides/content-conversion/pdf-url-to-markdown' children='PDF file to Markdown' /> when the source URL points directly to a PDF file.
