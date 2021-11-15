---
title: 'width'
--- 

Type: <Type children='<string>'/><br/>

It sets the paper width, accepts values labeled with units.

<Iframe
  src="https://api.microlink.io/?url=https://example.com&pdf&width=640px"
/>

<MultiCodeEditor languages={{
  Shell: `microlink https://example.com&pdf&width=640px`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://example.com', { 
      pdf: true,
      width: '640px'
  })
  console.log(data)
}
  `
  }} 
/>
