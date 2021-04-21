---
title: 'scripts'
--- 

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer>

Injects [&lt;script&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) into the browser page.

<MultiCodeEditor languages={{
  Shell: `microlink https://microlink.io&screenshot&scripts.0=https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2F%40microlink%2Fmql%400.3.12%2Fsrc%2Fbrowser.js&scripts.1=document.body.style.backgroundColor%20%3D%20%27red%27`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      scripts: [
        'https://cdn.jsdelivr.net/npm/@microlink/mql@0.3.12/src/browser.js', 
        "document.body.style.backgroundColor = 'red'"
      ]
  })
  console.log(status, data)
}
  `
  }} 
/>

The code to be injected can be defined as:

- Inline code (e.g., `"document.body.style.backgroundColor = 'red'"`).
- Absolute URLs (e.g., `'https://cdn.jsdelivr.net/npm/@microlink/mql@0.3.12/src/browser.js'`).

Prefer to use [modules](/docs/api/parameters/modules) whenever possible.
