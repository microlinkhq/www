---
title: 'url'
--- 

**Required**

Type: `string`

The target URL for getting information based on the content.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://kikobeats.com`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://kikobeats.com')
  console.log(status, data)
}
  `
  }} 
/>

The URL provided need to be reachable by the service. 

For example, if you want to extract content behind a login panel, the URL provided should contain the authentication step as part of the query string.

If the URL provided has query strings, it should be properly escaped in order to not interfere with the rest of the API Parameters.

<MultiCodeEditor languages={{
  Shell: `microlink-api https%3A%2F%2Fkikobeats.com%3F%26ref%3Dmicrolink`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://kikobeats.com?ref=microlink'
  )
  console.log(status, data)
}
  `
  }} 
/>

[MQL](/docs/mql/getting-started/overview) or [Microlink CLI](/docs/api/getting-started/cli) will escape the URL properly; Otherwise, you need to be sure to escape it, using [encodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) or equivalent.

The protocol matters: If the target URL have relative URLs inside (e.g., images or videos), then the URL provided will be used to resolved relatives URLs into absolute.

This means that if you provide an HTTPS, then all relatives URLs will be resolved under SSL.
