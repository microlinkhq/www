---
title: 'animations'
--- 

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>

When it's <Type children='true'/>, it enables CSS [animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) and [transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/transition) into the browser page.

Also, it sets [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) consequently.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&animations`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      animations: true
  })
  console.log(status, data)
}
  `
  }} 
/>
