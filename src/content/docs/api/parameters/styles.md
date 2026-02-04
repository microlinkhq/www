---
title: 'styles'
description: 'Inject custom CSS into a webpage before it is rendered or captured. The styles parameter supports both inline CSS rules and absolute URLs to external stylesheets.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type, TypeContainer } from 'components/markdown/Type'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer>

It injects [&lt;style&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style) into the browser page over the target [url](/docs/api/parameters/url).

![](/images/styles.png)

<MultiCodeEditorInteractive mqlCode={{
    url: 'https://example.com',
    screenshot: true, 
  styles: [
    'body { background: white; }',
    'div { border: 1px solid gray; font-family: "Comic Sans MS", "Comic Sans", cursive; }'
  ]
  }} />

The code to be injected can be defined as:

- Inline code (e.g., `'body{background:red}'`).
- Absolute URLs (e.g., `'https://cdn.jsdelivr.net/npm/hack@0.8.1/dist/dark.css'`).
