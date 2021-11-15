---
title: 'styles'
--- 

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer>

Injects [&lt;style&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style) into the browser page.

<MultiCodeEditor languages={{
  Shell: `microlink https://microlink.io&screenshot&styles.0=https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fhack%400.8.1%2Fdist%2Fdark.css&styles.1=body%20%7B%20background%3A%20red%3B%20%7D`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      styles: [
        'https://cdn.jsdelivr.net/npm/hack@0.8.1/dist/dark.css', 
        "body { background: red; }"
      ]
  })
  console.log(data)
}
  `
  }} 
/>

The code to be injected can be defined as:

- Inline code (e.g., `"body { background: red; }"`).
- Absolute URLs (e.g., `'https://cdn.jsdelivr.net/npm/hack@0.8.1/dist/dark.css'`).
