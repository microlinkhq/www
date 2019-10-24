---
title: 'force'
--- 

Type: `boolean`<br/>
Default: `false`

It invalidates the cache response associated with the query parameter and generates a fresh copy.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://producthunt.com&force`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://producthunt.com', { 
      force: true
  })
  
 console.log(status, data)
}
  `
  }} 
/>

By default the API will be [cache](/docs/api/basics/cache) consecutive API calls.

Providing it, you are forcing to invalidate the current state of the cache for the response and generate a new one.
