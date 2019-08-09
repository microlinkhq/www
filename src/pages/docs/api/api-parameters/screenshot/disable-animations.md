---
title: 'disableAnimations'
--- 

Type: `boolean`<br/>
Default: `false`

It disables CSS [animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) and [transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/transition).

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&disableAnimations`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      disableAnimations: true
  })
  console.log(status, data)
}
  `
  }} 
/>
