---
title: 'video'
--- 

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>

Enables video source detection from the target URL.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://instagram.com/p/BeV6tOhFUor&video`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://instagram.com/p/BeV6tOhFUor', { 
      video: true 
  })
  
 console.log(status, data)
}
  `
  }} 
/>

<Figcaption children="Some websites can be different output based on User Agent." />

The video source URL detected will be in a browser-friendly format to be possible embedded it.

The video detection introduce some human readable fields as part of the payload:

```json{26, 35}
{
  "data": {
    "lang": "en",
    "author": "SpaceX",
    "title": "Video by spacex",
    "publisher": "Instagram",
    "image": {
      "url": "https://scontent-lga3-1.cdninstagram.com/vp/04b0abb726b8b2531ec073a0a5ef57c6/5CBCD779/t51.2885-15/fr/e15/s1080x1080/26867070_171196260320789_7698587573655961600_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com",
      "width": 1080,
      "height": 607,
      "type": "jpg",
      "size": 46439,
      "size_pretty": "46.4 kB"
    },
    "description": "First static fire test of Falcon Heavy complete—one step closer to first test flight!",
    "date": "2018-01-24T18:39:47.000Z",
    "logo": {
      "url": "https://instagram.com/favicon.ico",
      "width": 16,
      "height": 16,
      "type": "ico",
      "size": 5430,
      "size_pretty": "5.43 kB"
    },
    "url": "https://instagram.com/p/BeV6tOhFUor/",
    "video": {
      "url": "https://scontent.cdninstagram.com/vp/a71b5c4feafb1875fe227ef3053c8465/5CBCDD76/t50.2886-16/24170141_458364347893985_8186084366254866432_n.mp4?_nc_ht=scontent.cdninstagram.com",
      "width": 480,
      "height": 270,
      "type": "mp4",
      "size": 799826,
      "size_pretty": "800 kB",
      "duration": 21.633333,
      "duration_pretty": "22s"
    }
  },
  "status": "success"
}
```
