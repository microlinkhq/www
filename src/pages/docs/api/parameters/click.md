---
title: 'click'
--- 

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer>

Click DOM elements matching the given [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) in the browser page.

<MultiCodeEditor languages={{
  Shell: `microlink https://microlink.io&screenshot&click=#features`,
  'JavaScript': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      click: '#features'
  })
  console.log(data)
}
  `
  }} 
/>
