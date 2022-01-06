---
title: 'scale'
--- 

Type: <Type children='<number>'/><br/>
Default: <Type children='0.6'/>

It sets the scale of the webpage rendering.

<Iframe
  src="https://api.microlink.io/?url=https://varnish-cache.org/docs/6.2/phk/thatslow.html&pdf&embed=pdf.url&scale=1&format=A5&meta=false"
/>

<MultiCodeEditor languages={{
  HTML: `<iframe width="650px" src="https://api.microlink.io/?url=https://varnish-cache.org/docs/6.2/phk/thatslow.html&pdf&embed=pdf.url&scale=1"></iframe>`,
  Shell: `microlink https://varnish-cache.org/docs/6.2/phk/thatslow.html&pdf&margin=4mm`,
  'JavaScript': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://varnish-cache.org/docs/6.2/phk/thatslow.html', { 
      pdf: true,
      scale: 1
  })
  console.log(data)
}
  `
  }} 
/>

Scale amount must be between <Type children='0.1'/> and <Type children='2'/>.
