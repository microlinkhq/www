---
title: 'codeScheme'
---

Type: <Type children='<string>'/><br/>
Default: <Type children='atom-dark'/>

Sets the code syntax highlighting color theme to use for beautifying HTML markup.

![](https://api.microlink.io/?url=https%3A%2F%2Femojipedia-api.vercel.app&meta=false&screenshot=&embed=screenshot.url&codeScheme=atom-dark)

<MultiCodeEditor languages={{
  Shell: `microlink https://healthcheck.microlink.io&screenshot&codeScheme=atom-dark`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://emojipedia-api.vercel.app', {
      meta: false,
      screenshot: true,
      codeScheme: 'atom-dark'
  })
  console.log(status, data)
}
  `
  }}
/>

The theme to use can be defined as:

- A [prism-themes](https://github.com/PrismJS/prism-themes/tree/master/themes) identifier (e.g., <Type children="'dracula'"/>).
- A remote URL (e.g., <Type children="'https://unpkg.com/prism-theme-night-owl'"/>).
