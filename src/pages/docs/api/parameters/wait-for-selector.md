---
title: 'waitForSelector'
--- 

Type: <TypeContainer><Type children='<string>'/></TypeContainer><br/>

Wait for the [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) to appear in page. 

<MultiCodeEditor languages={{
  Shell: `microlink-api https://dev.to&waitForSelector=main&screenshot`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://dev.to', { 
      screenshot: true,
      waitForSelector: 'main'
  })
  console.log(status, data)
}
  `
  }} 
/>
