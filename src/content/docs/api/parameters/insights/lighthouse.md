---
title: 'insights » lighthouse'
description: 'Generate comprehensive Google Lighthouse reports for any URL. Export web performance audits in JSON, HTML, or CSV formats using custom configurations via Microlink API.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type, TypeContainer } from 'components/markdown/Type'
import { Iframe } from 'components/markdown/Iframe'
import { Link } from 'components/elements/Link'
import { mqlCode } from 'helpers/mql-code'

Type: <TypeContainer><Type children="boolean"/> | <Type children="object"/></TypeContainer><br/>
Default: <Type children='true'/>

<Iframe
  src="https://lighthouse.microlink.io/?url=https://cdn.microlink.io/insights/css-tricks.json"
/>

It returns a web performance report over the target <Link href="/docs/api/parameters/url">url</Link>, powered by <Link href="https://developers.google.com/web/tools/lighthouse" logoIcon>Lighthouse</Link>.

<MultiCodeEditorInteractive mqlCode={mqlCode('https://css-tricks.com/nerds-guide-color-web', { 
  insights: {
    lighthouse: true
  }
})} />

The report is serialized to JSON by default to make it easy to visualize using <Link href="https://lighthouse.microlink.io" logoIcon>lighthouse.microlink.io</Link>.

<Link href="https://lighthouse.microlink.io">
  <Image src="https://cdn.microlink.io/docs/lighthouse-viewer.png"/>
</Link>

Alternatively, you can serialize to `'html'` or `'csv'`:

<MultiCodeEditorInteractive mqlCode={mqlCode('https://css-tricks.com/nerds-guide-color-web', { 
  insights: {
    lighthouse: { output: 'html' }
  }
})} />

Any [Lighthouse configuration](https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md) setting is supported:

<MultiCodeEditorInteractive mqlCode={mqlCode('https://css-tricks.com/nerds-guide-color-web', { 
  insights: {
    lighthouse: { onlyCategories: ['accesibility'] }
  }
})} />

You can use `'preset'` to load a set of specific Lighthouse settings at once:

<MultiCodeEditorInteractive mqlCode={mqlCode('https://css-tricks.com/nerds-guide-color-web', { 
  insights: {
    lighthouse: { preset: 'desktop' }
  }
})} />

The following presets are supported:

- [default](https://github.com/GoogleChrome/lighthouse/blob/5e18c5a0656b427e59890dc9c125164ef9f276c3/core/config/default-config.js)
- [desktop](https://github.com/GoogleChrome/lighthouse/blob/5e18c5a0656b427e59890dc9c125164ef9f276c3/core/config/desktop-config.js)
- [experimental](https://github.com/GoogleChrome/lighthouse/blob/5e18c5a0656b427e59890dc9c125164ef9f276c3/core/config/experimental-config.js)
- [full](https://github.com/GoogleChrome/lighthouse/blob/5e18c5a0656b427e59890dc9c125164ef9f276c3/core/config/full-config.js)
- [lr-desktop](https://github.com/GoogleChrome/lighthouse/blob/5e18c5a0656b427e59890dc9c125164ef9f276c3/core/config/lr-desktop-config.js)
- [lr-mobile](https://github.com/GoogleChrome/lighthouse/blob/5e18c5a0656b427e59890dc9c125164ef9f276c3/core/config/lr-mobile-config.js)
- [perf](https://github.com/GoogleChrome/lighthouse/blob/5e18c5a0656b427e59890dc9c125164ef9f276c3/core/config/perf-config.js)
