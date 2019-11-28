---
title: 'media'
---

Type: <Type children='<string>'/><br/>
Default: <Type children="'print'"/><br/>
Values: <TypeContainer><Type children="'screen'"/> | <Type children="'print'"/></TypeContainer>

Changes the CSS media type of the page.

<Iframe
  width="650px"
  height={["216px", "324px", "432px", "432px"]}
  src="https://api.microlink.io/?url=https://blog.alexmaccaw.com/advice-to-my-younger-self&pdf&embed=pdf.url&media=screen&meta=false&waitUntil=networkidle2"
/>

<MultiCodeEditor languages={{
  HTML: `<iframe width="650px" src="https://api.microlink.io/?url=https://blog.alexmaccaw.com/advice-to-my-younger-self&pdf&embed=pdf.url&media=screen"></iframe>`,
  Shell: `microlink-api https://blog.alexmaccaw.com/advice-to-my-younger-self&pdf&media=screen`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://blog.alexmaccaw.com/advice-to-my-younger-self', { 
      pdf: true,
      media: 'screen'
  })
  console.log(status, data)
}
  `
  }} 
/>
