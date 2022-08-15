---
title: 'lighthouse'
--- 

Type: <TypeContainer><Type children="boolean"/> | <Type children="object"/></TypeContainer><br/>
Default: <Type children='true'/>

<Iframe
  src="https://lighthouse.microlink.io/?url=https://cdn.microlink.io/insights/css-tricks.json"
/>

It returns a web performance report over the target [url](/docs/api/parameters/url), powered by [Lighthouse](https://developers.google.com/web/tools/lighthouse).

<MultiCodeEditor languages={mqlCode('https://css-tricks.com/nerds-guide-color-web', { 
  insights: {
    lighthouse: true
  }
})} />

The report is serialized to JSON by default to make easy visualize it using [lighthouse.microlink.io](https://lighthouse.microlink.io).

<Link icon={false} href="https://lighthouse.microlink.io">
  <Image src="https://cdn.microlink.io/docs/lighthouse-viewer.png"/>
</Link>

Alternatively, you can serialize to `'html'` or `'csv'`:

<MultiCodeEditor languages={mqlCode('https://css-tricks.com/nerds-guide-color-web', { 
  insights: {
    lighthouse: { output: 'html' }
  }
})} />

Any [Lighthouse configuration](https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md) setting is supported:

<MultiCodeEditor languages={mqlCode('https://css-tricks.com/nerds-guide-color-web', { 
  insights: {
    lighthouse: { onlyCategories: ['accesibility'] }
  }
})} />

You can use `'preset'` to load a set of specific Lighthouse settings at once:

<MultiCodeEditor languages={mqlCode('https://css-tricks.com/nerds-guide-color-web', { 
  insights: {
    lighthouse: { preset: 'desktop' }
  }
})} />

The following presets are supported:

- [default](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/config/default-config.js)
- [desktop](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/config/desktop-config.js)
- [experimental](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/config/experimental-config.js)
- [full](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/config/full-config.js)
- [lr-desktop](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/config/lr-desktop-config.js)
- [lr-mobile](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/config/lr-mobile-config.js)
- [perf](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/config/perf-config.js)
