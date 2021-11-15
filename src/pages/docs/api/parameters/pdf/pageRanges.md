---
title: 'pageRanges'
---

Type: <Type children='<string>'/><br/>

Specify a page range to print, e.g., `'1-5, 8, 11-13'`.

<Iframe
  src="https://api.microlink.io/?url=https://stripe.com&pdf&landscape&embed=pdf.url&pageRanges=1-1"
/>

<MultiCodeEditor languages={{
  Shell: `microlink https://stripe.com&pdf&landscape`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://stripe.com'. { 
      pdf: true,
      landscape: true,
      pageRanges: '1-1'
  })
  console.log(data)
}
  `
  }} 
/>

If you want to print just one page, specify it as range, e.g., `'1-1'`.
