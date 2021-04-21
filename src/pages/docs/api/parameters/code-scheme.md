---
title: 'codeScheme'
---

Type: <Type children='<string>'/><br/>
Default: <Type children='atom-dark'/>

Sets the code syntax highlighting color theme to use for beautifying HTML markup.

![](https://i.imgur.com/5WIekwy.png)

<MultiCodeEditor languages={{
  Shell: `microlink https://healthcheck.microlink.io&screenshot&codeScheme=atom-dark`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://healthcheck.microlink.io'. {
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
