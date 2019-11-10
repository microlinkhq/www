---
title: 'width'
--- 

Type: `number`<br/>

Specifies the page width in pixels.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://eosrei.github.io/emojione-color-font/full-demo.html&screenshot&width=800&height=600`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://eosrei.github.io/emojione-color-font/full-demo.html'. { 
      screenshot: true
      width: 800,
      height: 600,
  })
  console.log(status, data)
}
  `
  }} 
/>
