---
title: 'remove'
--- 

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer>

Remove DOM elements matching the given [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) into the browser page.

It sets [display: none](https://stackoverflow.com/a/133064/64949) on the matched elements, so it could potentially break the website layout.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&remove.0=.crisp-client&remove.1=#cookies-policy`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      hide: ['.crisp-client', '#cookies-policy']
  })
  console.log(status, data)
}
  `
  }} 
/>
