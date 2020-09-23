---
title: 'landscape'
--- 

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

When it's <Type children='true'/>, it changes the paper orientation to be landscape.

<Iframe
  src="https://api.microlink.io/?url=https://www.algolia.com&pdf&landscape&embed=pdf.url"
/>

<MultiCodeEditor languages={{
  Shell: `microlink-api https://www.algolia.com&pdf&landscape`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://www.algolia.com', { 
      pdf: true,
      landscape: true
  })
  console.log(status, data)
}
  `
  }} 
/>
