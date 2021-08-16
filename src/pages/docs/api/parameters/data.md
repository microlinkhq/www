---
title: 'data'
--- 

Type: <Type children='<object>'/>

Allows extraction of specific content from the target URL

<MultiCodeEditor languages={{
  Shell: `microlink https://kikobeats.com&data.avatar.selector=#avatar&data.avatar.type=image&data.avatar.attr=src`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://kikobeats.com', {
    data: {
      avatar: {
        selector: '#avatar',
        type: 'image',
        attr: 'src'
      }
    }
  })
    
 console.log(status, data)
}
  `
  }} 
/>

<Figcaption children="The data extraction need to be defined at least with a CSS selector." />

As a result, the extracted data will be part of the `data` payload in the response

```json
{
  "data": {
    "avatar": {
      "url": "https://d33wubrfki0l68.cloudfront.net/ad0e96f5e30e3c65b7ff31e5a637fea070356f0b/eaa58/images/avatar.jpg",
      "width": 500,
      "height": 500,
      "type": "jpg",
      "size": 53310,
      "size_pretty": "53.3 kB"
    }
  },
  "status": "success"
}
```

To know more about how data can be specified to be extracted, take a look to [Microlink Query Language](/docs/mql/getting-started/overview).
