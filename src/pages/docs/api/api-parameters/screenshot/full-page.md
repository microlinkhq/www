---
title: 'fullPage'
---

Type: `boolean`<br/>
Default: `false`

When `true`, takes a screenshot of the full scrollable page.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://eosrei.github.io/emojione-color-font/full-demo.html&screenshot&fullPage`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://eosrei.github.io/emojione-color-font/full-demo.html'. { 
      screenshot: true
      fullPage: true
  })
  console.log(status, data)
}
  `
  }} 
/>
