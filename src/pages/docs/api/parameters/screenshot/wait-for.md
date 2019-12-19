---
title: 'waitFor'
--- 

Type: <TypeContainer><Type children='<number>'/> | <Type children='<string>'/></TypeContainer><br/>
Default: <Type children="'load'"/>

Wait a quantity of time or selector.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://kikobeats.com&screenshot&waitFor=1500`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://kikobeats.com'. { 
      screenshot: true
      waitFor: 1500
  })
  console.log(status, data)
}
  `
  }} 
/>

<Figcaption>`waitFor` is useful to wait until animation ends for taking the screenshot.</Figcaption>
