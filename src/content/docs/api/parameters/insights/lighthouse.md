---
title: 'insights › lighthouse'
description: 'Generate comprehensive Google Lighthouse reports for any URL. Export web performance audits in JSON, HTML, or CSV formats using custom configurations via Microlink API.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type, TypeContainer } from 'components/markdown/Type'
import { Iframe } from 'components/markdown/Iframe'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Type: <TypeContainer><Type children="boolean"/> | <Type children="object"/></TypeContainer><br/>
Default: <Type children='true'/>

<Iframe
  src="https://lighthouse.microlink.io/?url=https://cdn.microlink.io/insights/css-tricks.json"
/>

It returns a web performance report over the target <Link href="/docs/api/parameters/url">url</Link>, powered by <Link href="https://developers.google.com/web/tools/lighthouse" logoIcon>Lighthouse</Link>.

<MultiCodeEditorInteractive mqlCode={{
    url: 'https://css-tricks.com/nerds-guide-color-web',
    insights: {
    lighthouse: true
  }
  }} />

The report is serialized to JSON by default to make it easy to visualize using <Link href="https://lighthouse.microlink.io" logoIcon>lighthouse.microlink.io</Link>.

<Link href="https://lighthouse.microlink.io" externalIcon={false}>
  <Image src="/images/lighthouse-viewer.png"/>
</Link>

Alternatively, you can serialize to `'html'` or `'csv'`:

<MultiCodeEditorInteractive mqlCode={{
    url: 'https://css-tricks.com/nerds-guide-color-web',
    insights: {
    lighthouse: { output: 'html' }
  }
  }} />

These [Lighthouse configuration](https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md) settings are supported:

- `onlyCategories`: Run only these categories, such as `accessibility` or `seo`.
- `onlyAudits`: Run only the audits named here.
- `skipAudits`: Skip the audits named here.
- `formFactor`: Score the run as `mobile` or `desktop`.
- `screenEmulation`: Viewport width, height, device scale, and mobile emulation. `{disabled: true}` leaves the screen unchanged.
- `throttling`: Network latency, throughput, and CPU slowdown for the run.
- `throttlingMethod`: How throttling is applied. `simulate` estimates it, `devtools` applies it in the browser, and `provided` uses throttling already in place.
- `emulatedUserAgent`: User-Agent string sent with the page. Pro, like [headers](/docs/api/parameters/headers). A free request is rejected with [EINVALQUERY](/docs/api/basics/error-codes#einvalquery).
- `extraHeaders`: Extra HTTP headers sent with the page. Pro, like [headers](/docs/api/parameters/headers). A free request is rejected with [EINVALQUERY](/docs/api/basics/error-codes#einvalquery).
- `blockedUrlPatterns`: URL patterns to block during the run.
- `locale`: Language of the report, such as `en-US` or `es`.
- `output`: Report format: `json`, `html`, or `csv`.
- `ignoreStatusCode`: Warn on an error status code instead of failing the run.
- `disableFullPageScreenshot`: Skip the full-page screenshot. It is large, and capturing it can change the page.
- `use passiveGathering`: Collect data without extra navigations or viewport changes.
- `maxWaitForFcp`: Milliseconds to wait for the first contentful paint. The run fails if nothing renders in time.
- `maxWaitForLoad`: Milliseconds to wait for the page to load.
- `pauseAfterFcpMs`: Milliseconds to wait after the first contentful paint before treating the page as loaded.
- `pauseAfterLoadMs`: Milliseconds to wait after the load event before treating the page as loaded.
- `networkQuietThresholdMs`: Milliseconds of network quiet required before the page is treated as loaded.
- `cpuQuietThresholdMs`: Milliseconds without a long task required before the page is treated as loaded.

Any other setting is ignored.

<MultiCodeEditorInteractive mqlCode={{
    url: 'https://css-tricks.com/nerds-guide-color-web',
    insights: {
    lighthouse: { onlyCategories: ['accessibility'] }
  }
  }} />

The Lighthouse settings that send request headers, `extraHeaders` and `emulatedUserAgent`, need a <ProBadge /> plan, the same as [headers](/docs/api/parameters/headers). Without one they are rejected with [EHEADERS](/docs/api/basics/error-codes#eheaders).

Pass `headers`, `proxy` and `authenticate` at the top level, not inside `insights.lighthouse`: nested, they are rejected with [EINVALQUERY](/docs/api/basics/error-codes#einvalquery).

You can use `'preset'` to load a set of specific Lighthouse settings at once:

<MultiCodeEditorInteractive mqlCode={{
    url: 'https://css-tricks.com/nerds-guide-color-web',
    insights: {
    lighthouse: { preset: 'desktop' }
  }
  }} />

The following presets are supported:

- [default](https://github.com/GoogleChrome/lighthouse/blob/5e18c5a0656b427e59890dc9c125164ef9f276c3/core/config/default-config.js)
- [desktop](https://github.com/GoogleChrome/lighthouse/blob/5e18c5a0656b427e59890dc9c125164ef9f276c3/core/config/desktop-config.js)
- [experimental](https://github.com/GoogleChrome/lighthouse/blob/5e18c5a0656b427e59890dc9c125164ef9f276c3/core/config/experimental-config.js)
- [full](https://github.com/GoogleChrome/lighthouse/blob/5e18c5a0656b427e59890dc9c125164ef9f276c3/core/config/full-config.js)
- [lr-desktop](https://github.com/GoogleChrome/lighthouse/blob/5e18c5a0656b427e59890dc9c125164ef9f276c3/core/config/lr-desktop-config.js)
- [lr-mobile](https://github.com/GoogleChrome/lighthouse/blob/5e18c5a0656b427e59890dc9c125164ef9f276c3/core/config/lr-mobile-config.js)
- [perf](https://github.com/GoogleChrome/lighthouse/blob/5e18c5a0656b427e59890dc9c125164ef9f276c3/core/config/perf-config.js)

Any other `preset` is rejected with [EINVALQUERY](/docs/api/basics/error-codes#einvalquery).
