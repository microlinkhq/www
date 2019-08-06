---
title: 'waitUntil'
--- 

Type: `string|string[]`<br/>
Default: `['networkidle0']`<br/>
Values: `'load'|'domcontentloaded'|'networkidle0'|'networkidle2'`

Specify a list of events until consider navigation succeeded:

- `'load'`: Consider navigation to be finished when the load event is fired.
- `'domcontentloaded'`: Consider navigation to be finished when the DOMContentLoaded event is fired.
- `'networkidle0'`: Consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.
- `'networkidle2'`: Consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.


<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&waitUntil=domcontentloaded`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true
      waitUntil: 'domcontentloaded'
  })
  console.log(status, data)
}
  `
  }} 
/>
