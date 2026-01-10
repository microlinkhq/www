---
title: 'modules'
description: Inject JavaScript modules into a webpage during the rendering process. The modules parameter supports both inline code and absolute URLs, enabling the use of modern ES modules to modify page behavior or styles before capturing screenshots or data.
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type, TypeContainer } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer>

Injects [&lt;script type="module"&gt;](https://v8.dev/features/modules) into the browser page over the target [url](/docs/api/parameters/url).


<MultiCodeEditorInteractive mqlCode={mqlCode('https://microlink.io', { 
  screenshot: true,
  modules: [
    'https://cdn.jsdelivr.net/npm/@microlink/mql@0.3.12/src/browser.js', 
    "document.body.style.backgroundColor = 'red'"
  ]
})} />

The code to be injected can be defined as:

- Inline code (e.g., `"document.body.style.backgroundColor = 'red'"`).
- Absolute URLs (e.g., `'https://cdn.jsdelivr.net/npm/@microlink/mql@0.3.12/src/browser.js'`).
