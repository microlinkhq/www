---
title: 'filename'
isPro: true
--- 

Type: <Type children='<string>'/>

It specifies the filename to be associated with the generated [screenshot](/docs/api/parameters/screenshot) or [pdf](/docs/api/parameters/pdf).

<MultiCodeEditor languages={{
  Shell: `microlink https://padlet.com/padlets/mjl7vtq8a26g/exports/print&meta=false&pdf&filename=solar+system`,
  'JavaScript': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://padlet.com/padlets/mjl7vtq8a26g/exports/print', {
    meta: false,
    pdf: true,
    filename: 'solar system'
  })
  console.log(data)
}
  `
  }}
/>
