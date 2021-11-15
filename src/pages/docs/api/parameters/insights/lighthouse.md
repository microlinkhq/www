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
  Shell: `microlink https://css-tricks.com/nerds-guide-color-web&insights.technologies=false&insights.lighthouse=true`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://css-tricks.com/nerds-guide-color-web', {
    insights: {
      technologies: false,
      lighthouse: true
    }
  })
  console.log(data)
}
  `
  }} 
/>

The report is serialized to JSON by default to make easy visualize it using [lighthouse.microlink.io](https://lighthouse.microlink.io).

<Link icon={false} href="https://lighthouse.microlink.io">
  <Image src="https://i.imgur.com/xeC7nZk.png"/>
</Link>

Alternatively, you can serialize to `'html'` or `'csv'`:

<MultiCodeEditor languages={{
  Shell: `microlink https://css-tricks.com/nerds-guide-color-web&insights.technologies=false&insights.lighthouse.output=html`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://css-tricks.com/nerds-guide-color-web', {
    insights: {
      technologies: false,
      lighthouse: {
        output: 'html'
      }
    }
  })
  console.log(data)
}
  `
  }} 
/>

Any [Lighthouse configuration](https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md) setting is supported:

<MultiCodeEditor languages={{
  Shell: `microlink https://css-tricks.com/nerds-guide-color-web&insights.lighthouse.device=mobile`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://css-tricks.com/nerds-guide-color-web', {
    insights: {
      technologies: false,
      lighthouse: {
        onlyCategories: ['accesibility']
      }
    }
  })
  console.log(data)
}
  `
  }} 
/>

Using `'preset'` it will load a set of specific Lighthouse settings at once:

<MultiCodeEditor languages={{
  Shell: `microlink https://css-tricks.com/nerds-guide-color-web&insights.technologies=false&insights.lighthouse.preset=mobile`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://css-tricks.com/nerds-guide-color-web', {
    insights: {
      technologies: false,
      lighthouse: {
        preset: 'desktop'
      }
    }
  })
  console.log(data)
}
  `
  }} 
/>

The following presets are supported:

- [default](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/config/default-config.js)
- [desktop](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/config/desktop-config.js)
- [experimental](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/config/experimental-config.js)
- [full](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/config/full-config.js)
- [lr-desktop](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/config/lr-desktop-config.js)
- [lr-mobile](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/config/lr-mobile-config.js)
- [perf](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/config/perf-config.js)
