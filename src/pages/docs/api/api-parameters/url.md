---
title: 'url'
--- 

**Required**

Type: `string`

The target URL for getting information based on the content.

<MultiCodeEditor languages={{
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://kikobeats.com')
  
  console.log(status, data)
}
  `,
  cURL: `curl https://api.microlink.io?url=https://kikobeats.com`, 
  }} 
/>

The URL provided need to be reachable by the service. 

For example, if you want to extract content behind a login panel, the URL provided should contain the authentication step as part of the query string.

If the URL provided has query strings, it should be properly escaped in order to not interfere with the rest of the API Parameters.

<MultiCodeEditor languages={{
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://kikobeats.com?ref=microlink'
  )
  
  console.log(status, data)
}
  `,
  cURL: `
curl --data-urlencode "ref=microlink" \\
https://api.microlink.io?url=https://kikobeats.com`, 
  }} 
/>

<Figcaption>`mql` escape the URL automatically; Otherwise, you need manually do that.</Figcaption>

The protocol matters: If the target URL have relative URLs inside (e.g. images or videos), then the URL provided will be used to resolved relatives URLs into absolute.

This means that if you provide an HTTPS, then all relatives URLs will be resolved under SSL.
