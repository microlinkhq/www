---
title: 'modules'
--- 

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer>

Injects [&lt;script type="module"&gt;](https://v8.dev/features/modules) into the browser page.

It can accept:

- Inline code (e.g., `"document.body.style.backgroundColor = 'red'"`).
- Absolute URLs (e.g., `'https://cdn.jsdelivr.net/npm/@microlink/mql@0.3.12/src/browser.js'`).

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&modules.0=https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2F%40microlink%2Fmql%400.3.12%2Fsrc%2Fbrowser.js&modules.1=document.body.style.backgroundColor%20%3D%20%27red%27`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      modules: [
        'https://cdn.jsdelivr.net/npm/@microlink/mql@0.3.12/src/browser.js', 
        "document.body.style.backgroundColor = 'red'"
      ]
  })
  console.log(status, data)
}
  `
  }} 
/>
