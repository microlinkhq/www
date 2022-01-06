---
title: 'ping'
--- 

Type: <TypeContainer><Type children='<boolean>'/> | <Type children='<object>'/></TypeContainer><br/>
Default: <Type children='true'/>

It ensures that any URL present on the response payload is publicly reachable.

<MultiCodeEditor languages={{
  Shell: `microlink https://microlink.io&ping`,
  'JavaScript': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io', { 
      ping: true
  })
  
 console.log(data)
}
  `
  }} 
/>

<Figcaption>By default, any URL present on the response payload hasve been verified as reachable.</Figcaption>

You can disable this behavior in a partial way:

<MultiCodeEditor languages={{
  Shell: `microlink https://microlink.io&ping.audio=false`,
  'JavaScript': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io', { 
      ping: {
        audio: false
      }
  })
  
 console.log(data)
}
  `
  }} 
/>

<Figcaption>Avoid to ping `audio` URLs extracted.</Figcaption>

or in a total way:

<MultiCodeEditor languages={{
  Shell: `microlink https://microlink.io&ping=false`,
  'JavaScript': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io', { 
      ping: false
  })
  
 console.log(data)
}
  `
  }} 
/>

<Figcaption>Keep the raw data URLs extracted, no pinging them.</Figcaption>

Keep in mind if you decide to disable this behavior in a partial or total way you should handle non reachable URLs from your side.
