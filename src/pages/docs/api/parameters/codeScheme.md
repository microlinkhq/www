---
title: 'codeScheme'
---

Type: <Type children='<string>'/><br/>
Default: <Type children="'atom-dark'"/>

Ii enables code syntax highlighting to beautify HTML markup under JSON/Text content type.

![](https://api.microlink.io/?url=https%3A%2F%2Femojipedia-api.vercel.app&meta=false&screenshot=&embed=screenshot.url&codeScheme=atom-dark)

<MultiCodeEditor languages={mqlCode('https://emojipedia-api.vercel.app', { screenshot: true, codeScheme: 'atom-dark' })} />

The theme can be defined as:

- A [prism-themes](https://github.com/PrismJS/prism-themes/tree/master/themes) identifier (e.g., <Type children="'dracula'"/>).
- A remote URL (e.g., <Type children="'https://unpkg.com/prism-theme-night-owl'"/>).

You can also customize any theme passing your own [styles](/docs/api/parameters/styles) rules.
