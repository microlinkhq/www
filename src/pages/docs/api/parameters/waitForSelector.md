---
title: 'waitForSelector'
--- 

Type: <TypeContainer><Type children='<string>'/></TypeContainer><br/>

Tell the browser to wait until a specific [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) appears in the target website.

<MultiCodeEditor languages={{
  Shell: `microlink https://dev.to&waitForSelector=main&screenshot`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://dev.to', { 
      screenshot: true,
      waitForSelector: 'main'
  })
  console.log(data)
}
  `
  }} 
/>
