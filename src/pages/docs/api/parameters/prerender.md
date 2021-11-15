---
title: 'prerender'
---

Type: <TypeContainer><Type children='<boolean>'/> | <Type children='<string>'/></TypeContainer><br/>
Default: <Type children='false'/><br/>
Values: <TypeContainer><Type children="'auto'"/> | <Type children='true'/> | <Type children='false'/></TypeContainer>

Prerendering is a technique that consists of preload all the elements on the page as a previous step before a web crawler can see the page correctly.

Instead of performing a simple HTTP GET for getting the content of the page, a browser in the cloud will be spawned for doing that.

You are going to be interested in to use prerendering for a bunch of reasons; one of them is because a high percentage of internet websites are *Single Page Application* (SPA). That means that a major part of the content is built on the client when the user enters in the page, like React, Ember, Angular, etc.

In practice, there is no difference between doing that and being a normal user since both interact using a browser, so prerendering is a better way to simulate a normal user and see the content exactly as he would see it.

However, prerendering have a little trade-off: the cloud-based browser needs to wait until DOM events are done, taking extra time for that.

But if you do not do this you will not get the data in any way.

Ideally, you don't need to think about prerendering: The default value <Type children="'auto'"/><br/> means that the service can determine if a website needs to have prerendering enabled to retrieve the content or not.

<MultiCodeEditor languages={{
  Shell: `microlink https://www.sportsnet.ca/hockey/nhl/leafs-john-tavares-return-new-york-hope-positive`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://www.sportsnet.ca/hockey/nhl/leafs-john-tavares-return-new-york-hope-positive')
  
  console.log(data)
}
  `
  }} 
/>

We provided two extra headers for reflecting the decision taken by the service. They are:

- `x-fetch-mode`: It determines which fetch technique has been used (being possible <Type children="'prerender'"/> or <Type children="'fetch'"/> as values).
- `x-fetch-time`: It represents the total amount of time spent into the fetch step in a human readable format.

If you know the target URL doesn't need prerender, you can disable it explicitly

<MultiCodeEditor languages={{
  Shell: `microlink https://www.sportsnet.ca/hockey/nhl/leafs-john-tavares-return-new-york-hope-positive&prerender=false`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://www.sportsnet.ca/hockey/nhl/leafs-john-tavares-return-new-york-hope-positive', { prerender: false })
  
  console.log(data)
}
  `
  }} 
/>
