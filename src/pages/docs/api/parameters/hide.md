---
title: 'hide'
--- 

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer>

Hide DOM elements matching the given [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

It sets [visibility: hidden](https://stackoverflow.com/a/133064/64949) on the matched elements in the browser page.

<MultiCodeEditor languages={{
  Shell: `microlink https://microlink.io&screenshot&hide.0=.crisp-client&hide.1=#cookies-policy`,
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
