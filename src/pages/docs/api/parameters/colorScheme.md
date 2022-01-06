---
title: 'colorScheme'
---

Type: <Type children='<string>'/><br/>
Default: <Type children='no-preference'/>

Sets [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS media feature, indicating user preference to use `'light'` or `'dark'` color theme.

![](https://i.imgur.com/ZnxQnkB.png)

<MultiCodeEditor languages={{
  Shell: `microlink https://googlechromelabs.github.io/dark-mode-toggle/demo&screenshot&colorScheme=dark`,
  'JavaScript': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://googlechromelabs.github.io/dark-mode-toggle/demo'. {
      screenshot: true,
      colorScheme: 'dark'
  })
  console.log(data)
}
  `
  }}
/>
