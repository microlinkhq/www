---
title: 'format'
--- 

Type: <Type children='<string>'/><br/>
Default: <Type children="'A4'"/>

It sets the paper format.

<Iframe
  src="https://api.microlink.io/?url=https://css-tricks.com/snippets/css/a-guide-to-flexbox&pdf&embed=pdf.url&format=A6&meta=false"
/>

<MultiCodeEditor languages={{
  HTML: `<iframe width="650px" src="https://api.microlink.io/?url=https://css-tricks.com/snippets/css/a-guide-to-flexbox&pdf&embed=pdf.url&format=A6"></iframe>`,
  Shell: `microlink https://css-tricks.com/snippets/css/a-guide-to-flexbox&pdf&format=A6`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://css-tricks.com/snippets/css/a-guide-to-flexbox', { 
      pdf: true,
      format: 'A6'
  })
  console.log(status, data)
}
  `
  }} 
/>

The format options are:

- <Type children="'Letter'" />: 8.5in x 11in.
- <Type children="'Legal'" />: 8.5in x 14in.
- <Type children="'Tabloid'" />: 11in x 17in.
- <Type children="'Ledger'" />: 17in x 11in.
- <Type children="'A0'" />: 33.1in x 46.8in.
- <Type children="'A1'" />: 23.4in x 33.1in.
- <Type children="'A2'" />: 16.54in x 23.4in.
- <Type children="'A3'" />: 11.7in x 16.54in.
- <Type children="'A4'" />: 8.27in x 11.7in.
- <Type children="'A5'" />: 5.83in x 8.27in.
- <Type children="'A6'" />: 4.13in x 5.83in.
