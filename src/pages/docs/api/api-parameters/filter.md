---
title: 'filter'
--- 

Type: `string`

A comma-separated list of property paths to pick from response payload.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://news.ycombinator.com&filter=url,title`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://news.ycombinator.com', { 
      filter: 'url,title'
  })
     
 console.log(status, data)
}
  `
  }} 
/>

<Figcaption children='You can use dot notation to reference a nested data field of the payload.' />

Then the data payload is going to just get these fields

```
{
  "status": "success",
  "data": {
    "url": "https://news.ycombinator.com/",
    "title": "Hacker News"
  }
}
```

This parameter has been designed to make API payload tiny as possible, improving response bandwidth timing.
