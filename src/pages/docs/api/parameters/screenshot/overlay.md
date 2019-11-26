---
title: 'overlay'
--- 

Type: <Type children='<object>'/>

It sets some aesthetic overlay settings associated with your screenshot.

![](https://api.microlink.io/?url=https%3A%2F%2Fwww.apple.com%2Fmusic&screenshot=&meta=false&overlay.browser=dark&embed=screenshot.url&overlay.background=linear-gradient(0deg%2C%20%23330867%200%25%2C%20%2330CFD0%20100%25))

<MultiCodeEditor languages={{
  Shell: `microlink-api {{DemoLinks.Apple.url}}&screenshot&overlay.browser=dark&overlay.background=linear-gradient(0deg%2C%20%23330867%200%25%2C%20%2330CFD0%20100%25`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    '{{DemoLinks.Apple.url}}'. { 
      screenshot: true,
      overlay: {
        background: 'linear-gradient(0deg, #330867 0%, #30CFD0 100%)'
        browser: 'dark'
      }
  })
  console.log(status, data)
}
  `
  }} 
/>

An overlay is specified as `browser` theme, being <Type children="'light'"/>` and <Type children="'dark'"/> supported.

Additionally, you can setup a `background` color, where the color can be defined as:
 
- An hexadecimal/rgb/rgba color code (e.g., <Type children="'#F76698'"/>).
- A [CSS gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient) (e.g., <Type children="'linear-gradient(0deg, #330867 0%, #30CFD0 100%)'"/>).
- An image url (e.g., <Type children="'https://source.unsplash.com/random/1920x1080'"/>).
