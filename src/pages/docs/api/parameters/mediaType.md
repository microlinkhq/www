---
title: 'mediaType'
---

Type: <Type children='<string>'/><br/>
Default: <Type children="'screen'"/><br/>
Values: <TypeContainer><Type children="'screen'"/> | <Type children="'print'"/></TypeContainer>

Changes the CSS media type of the browser page.

<Iframe
  src="https://api.microlink.io/?url=https://blog.alexmaccaw.com/advice-to-my-younger-self&pdf&embed=pdf.url&mediaType=screen&meta=false&waitUntil=networkidle2"
/>

<MultiCodeEditor languages={{
  HTML: `<iframe width="650px" src="https://api.microlink.io/?url=https://blog.alexmaccaw.com/advice-to-my-younger-self&pdf&embed=pdf.url&mediaType=screen"></iframe>`,
  Shell: `microlink https://blog.alexmaccaw.com/advice-to-my-younger-self&pdf&mediaType=screen`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://blog.alexmaccaw.com/advice-to-my-younger-self', { 
      pdf: true,
      mediaType: 'screen'
  })
  console.log(status, data)
}
  `
  }} 
/>

If you enable [pdf](/docs/api/parameters/pdf), the default media type will be `'print'`.
