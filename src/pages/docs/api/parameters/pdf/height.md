---
title: 'height'
--- 

Type: <Type children='<string>'/><br/>

It sets the paper height, accepts values labeled with units.

<Iframe
  src="https://api.microlink.io/?url=https://example.com&pdf&height=480px&embed=pdf.url"
/>

<MultiCodeEditor languages={{
  Shell: `microlink https://example.com&pdf&height=480px`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://example.com', { 
      pdf: true,
      height: '480px'
  })
  console.log(data)
}
  `
  }} 
/>
