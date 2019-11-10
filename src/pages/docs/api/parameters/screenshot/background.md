---
title: 'background'
--- 

Type: `string`<br/>
default: `transparent`

Sets the background to use as an overlay with your screenshot.

![](https://api.microlink.io/?url={{DemoLinks.Apple.url}}&screenshot&meta=false&browser=dark&embed=screenshot.url&background=linear-gradient%2843deg%2C+rgb%28247%2C+102%2C+152%29+0%25%2C+rgb%28234%2C+64%2C+123%29+29%25%2C+rgb%28101%2C+78%2C+163%29+100%25%29)

<MultiCodeEditor languages={{
  Shell: `microlink-api {{DemoLinks.Apple.url}}&screenshot&background=linear-gradient%2843deg%2C+rgb%28247%2C+102%2C+152%29+0%25%2C+rgb%28234%2C+64%2C+123%29+29%25%2C+rgb%28101%2C+78%2C+163%29+100%25%29`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    '{{DemoLinks.Apple.url}}'. { 
      screenshot: true,
      background: 'linear-gradient(43deg, rgb(247, 102, 152) 0%, rgb(234, 64, 123) 29%, rgb(101, 78, 163) 100%)'
  })
  console.log(status, data)
}
  `
  }} 
/>

The following values are supported:

- An hexadecimal/rgb/rgba color code (e.g., `#F76698`).
- A [CSS gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient) (e.g., `linear-gradient(225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)`).
- An image url (e.g., `https://source.unsplash.com/random/1920x1080`).
