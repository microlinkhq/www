---
title: 'margin'
--- 

Type: <TypeContainer><Type children='<string>'/> | <Type children='<object'/></TypeContainer><br/>
Default: <Type children="'0.35cm'"/>

It sets the paper margins.

<Iframe 
  width="650px"
  height={["216px", "324px", "432px", "432px"]}
  src="https://api.microlink.io/?url=https://basecamp.com/shapeup/0.3-chapter-01&pdf&embed=pdf.url&margin=4mm&format=A6&meta=false"
/>

<MultiCodeEditor languages={{
  HTML: `<iframe width="650px" src="https://api.microlink.io/?url=https://basecamp.com/shapeup/0.3-chapter-01&pdf&embed=pdf.url&margin=4mm"></iframe>`,
  Shell: `microlink-api https://basecamp.com/shapeup/0.3-chapter-01&pdf&margin=4mm`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'http://www.antirez.com/news/128', { 
      pdf: true,
      margin: '4mm'
  })
  console.log(status, data)
}
  `
  }} 
/>

All possible units are:

- <Type children="'px'"/> for pixel.
- <Type children="'in'"/> for inches.
- <Type children="'cm'"/> for centimeters.
- <Type children="'mm'"/> for millimeters.

You can pass an <Type children='<object>'/> specifing each corner side of the paper:

```js
{
  margin: {
    top: '4mm',
    bottom: '4mm',
    left: '4mm',
    right: '4mm'
  }
}
```

Or, in case you pass an <Type children='<string>'/>, it will be used for all the sides:

```js
{
  margin: '4mm'
}
```
