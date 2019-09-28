---
title: 'audio'
--- 

Type: `boolean`<br/>
Default: `false`

It enables audio source detection from the target URL.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://soundcloud.com/theaipodcast/gtc-weather&audio`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://soundcloud.com/theaipodcast/gtc-weather', { 
      audio: true 
  })
  
 console.log(status, data)
}
  `
  }} 
/>

<Figcaption children="Some websites can be different output based on User Agent." />

The audio source URL detected will be in a browser-friendly format to be possible embedded it.

The audio detection introduce some human readable fields as part of the payload:

```json{26, 34}
{
  "data": {
    "lang": "en",
    "author": "The AI Podcast",
    "title": "Ep. 51: Live at GTC - Deep Learning Can Save Lives by Predicting Severe Weather",
    "publisher": "SoundCloud",
    "image": {
      "url": "https://i1.sndcdn.com/artworks-000326780052-0h7mz1-t500x500.jpg",
      "width": 0,
      "height": 0,
      "type": "jpg",
      "size": 83581,
      "size_pretty": "83.6 kB"
    },
    "description": "One of the things that makes the weather so dangerous is that it’s so hard to predict. Tornadoes, hail, high winds and flash floods cause billions of dollars worth of property damage, and injure or ki",
    "date": "2018-03-29T02:06:49.000Z",
    "logo": {
      "url": "https://a-v2.sndcdn.com/assets/images/sc-icons/ios-a62dfc8f.png",
      "width": 114,
      "height": 114,
      "type": "png",
      "size": 3144,
      "size_pretty": "3.14 kB"
    },
    "url": "https://soundcloud.com/theaipodcast/gtc-weather",
    "audio": {
      "url": "https://cf-media.sndcdn.com/clcG6IDMnbiy.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vY2xjRzZJRE1uYml5LjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE1NTU2OTcwOTN9fX1dfQ__&Signature=NoWAUhnQ0G2z~utNOzYC06hjKa5acOfj8waGu81bm93zNUsu4NS4N7-pzoj~D~3jdyncprnLqPMRjVUFAW1HpizByYysKNx9sYSDtTHhc2fxzGx2Hx41iVJHeONQtsRdCpa7SyLxtHMiK7uI~dbowrGnGh1jKb5Rd0BNdT6UZy5m0qMyY41oMDW1ZC4WPo6GjEuzq-RY9GAk1iFz86LpVskXH3LVFy035NejgMbO-Su5N64JrmdREZqTjMvaJiHlnApAGneVbCqBoDqeh7NZtQWVGtjP4IWrsqa~p3hmMxSvtKWPUPC5rM7EoME~ZcnwXcByksUjpLkwv5E9M5zsJQ__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ",
      "type": "mp3",
      "size": 23061732,
      "size_pretty": "23.1 MB",
      "duration": 1441.332245,
      "duration_pretty": "24m"
    }
  },
  "status": "success"
}
```
