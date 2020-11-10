---
title: 'lighthouse'
--- 

Type: <TypeContainer><Type children="boolean"/> | <Type children="object"/></TypeContainer><br/>
Default: <Type children='true'/>

<Iframe
  src="https://lighthouse.microlink.io/?url=https://cdn.microlink.io/insights/css-tricks.json"
/>

It returns a full web performance metrics report powered by [Lighthouse](https://developers.google.com/web/tools/lighthouse).

<MultiCodeEditor languages={{
  Shell: `microlink-api https://css-tricks.com/nerds-guide-color-web&insights.lighthouse=true`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://css-tricks.com/nerds-guide-color-web', {
    insights: {
      lighthouse: true
    }
  })
  console.log(status, data)
}
  `
  }} 
/>

By default, the report is serialized to JSON. In this way, you can use [lighthouse.microlink.io](https://lighthouse.microlink.io) for visualizing your performance report.

<Link icon={false} href="https://lighthouse.microlink.io">
  <Image src="https://i.imgur.com/xeC7nZk.png"/>
</Link>

The default configuration is known as [lighthouse:default](https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md):

```json
{
  "output": "json",
  "device": "desktop",
  "onlyCategories": [
    "performance", 
    "best-practices", 
    "accessibility", 
    "seo"
  ]
}
```

It's the same configuration used by Google Chrome when you perform an audit from the Developers Tools. You can extend it, for example, targeting `mobile`:

<MultiCodeEditor languages={{
  Shell: `microlink-api https://css-tricks.com/nerds-guide-color-web&insights.lighthouse.device=mobile`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://css-tricks.com/nerds-guide-color-web', {
    insights: {
      lighthouse: {
        device: 'mobile'
      }
    }
  })
  console.log(status, data)
}
  `
  }} 
/>

The most common [lighthouse configuration](https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md) parameters are:

<H2 titleize={false}>output</H2>

Type: <TypeContainer><Type children="string"/></TypeContainer><br/>
Default: <Type children='json'/><br/>
Values: <TypeContainer><Type children="'json'"/> | <Type children="'csv'"/> | <Type children="'html'"/></TypeContainer>

The type of report output to be produced.

<H2 titleize={false}>device</H2>

Type: <TypeContainer><Type children="string"/></TypeContainer><br/>
Default: <Type children='desktop'/><br/>
values: <TypeContainer><Type children="'desktop'"/> | <Type children="'mobile'"/> | <Type children="'none'"/></TypeContainer><br/>

How emulation (useragent, device screen metrics, touch) should be applied. 'none' indicates Lighthouse should leave the host browser as-is.

<H2 titleize={false}>onlyCategories</H2>

Type: <TypeContainer><Type children="string[]"/></TypeContainer><br/>
Default: <Type children="['performance', 'best-practices', 'accessibility', 'seo']"/><br/>
values: <TypeContainer><Type children="'performance'"/> | <Type children="'best-practices'"/> | <Type children="'accessibility'"/> | <Type children="'pwa'"/> | <Type children="'seo'"/></TypeContainer><br/>

Includes only the specified categories in the final report
