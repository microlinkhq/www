---
title: 'codeScheme'
---

Type: <Type children='<string>'/><br/>
Default: <Type children="'atom-dark'"/>

It enables code syntax highlighting to beautify HTML markup under JSON/Text content type over the target [url](/docs/api/parameters/url).

![](https://cdn.microlink.io/docs/code-scheme.png)

<MultiCodeEditorInteractive mqlCode={mqlCode('https://emojipedia-api.vercel.app', { screenshot: { codeScheme: 'atom-dark' }})} />

The theme can be defined as:

- A [prism-themes](https://github.com/PrismJS/prism-themes/tree/master/themes) identifier (e.g., <Type children="'dracula'"/>).
- A remote URL (e.g., <Type children="'https://unpkg.com/prism-theme-night-owl'"/>).

You can also customize any theme passing your own [styles](/docs/api/parameters/styles) rules.
