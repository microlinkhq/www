---
title: 'insights'
--- 

Type: <TypeContainer><Type children='<boolean>'/> | <Type children='<object>'/></TypeContainer><br/>
Default: <Type children='false'/>

It gets web perfomance metrics over the target URL.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://vercel.com&insights`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://vercel.com', {
    insights: true
  })
  console.log(status, data)
}
  `
  }} 
/>

When you enabled it, a new `insights` field will be present into the data response payload. These field contain two subfields:

- `technologies`: A list of technologies identified powered by [Wappalyzer](https://www.wappalyzer.com/).
- `lighthouse`: A full web audit report powered by [Lighthouse](https://developers.google.com/web/tools/lighthouse).

Both fields are enabled by default. They can be disabled programmatically in order to speed up the response time.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://vercel.com&insights.technologies=false`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://vercel.com', {
    insights: {
      lighthouse: true,
      technologies: false
    }
  })
  console.log(status, data)
}
  `
  }} 
/>

<Figcaption children='Enabling insights but only the lighthouse report' />
