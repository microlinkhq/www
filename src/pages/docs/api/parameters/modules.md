---
title: 'modules'
---

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
