---
title: 'overlay'
--- 

Type: <Type children='<object>'/>

It sets some aesthetic overlay settings associated with your screenshot.

![](https://api.microlink.io/?url=https%3A%2F%2Fwww.apple.com%2Fmusic&meta=false&screenshot=&overlay.browser=dark&overlay.background=linear-gradient%28225deg%2C+%23FF057C+0%25%2C+%238D0B93+50%25%2C+%23321575+100%25%29&embed=screenshot.url)

<MultiCodeEditor languages={{
  Shell: `microlink-api {{demolinks.apple.url}}&meta=false&screenshot=&overlay.browser=dark&overlay.background=linear-gradient%28225deg%2C+%23FF057C+0%25%2C+%238D0B93+50%25%2C+%23321575+100%25%29`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    '{{demolinks.apple.url}}'. { 
      screenshot: true,
      meta: false,
      overlay: {
        background: 'linear-gradient(225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)'
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
 
- An hexadecimal/rgb/rgba color code (e.g., `'#F76698'`).
- A [CSS gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient) (e.g., `'linear-gradient(0deg, #330867 0%, #30CFD0 100%)'`).
- An image url (e.g., `'https://source.unsplash.com/random/1920x1080'`).
