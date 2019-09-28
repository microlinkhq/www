---
title: 'hasTouch'
---

Type: `boolean`<br/>
Default: `false`

It specifies if the viewport support touch events.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://eosrei.github.io/emojione-color-font/full-demo.html&screenshot&hasTouch`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://eosrei.github.io/emojione-color-font/full-demo.html'. { 
      screenshot: true
      hasTouch: true
  })
  console.log(status, data)
}
  `
  }} 
/>

