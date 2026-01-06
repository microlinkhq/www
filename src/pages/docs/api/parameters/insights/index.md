---
title: 'insights'
---

import { mqlCode } from 'helpers/mql-code'
import { Figcaption } from 'components/markdown/Figcaption'

Type: <TypeContainer><Type children='<boolean>'/> | <Type children='<object>'/></TypeContainer><br/>
Default: <Type children='false'/>

It gets a web performance metrics of the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={mqlCode('https://vercel.com', { 
  insights: true
})} />

When is presnet, a new `insights` data field will be returned. These field contain two subfields:

- `technologies`: A list of technologies identified powered by [Wappalyzer](https://www.wappalyzer.com/).
- `lighthouse`: A full web audit report powered by [Lighthouse](https://developers.google.com/web/tools/lighthouse).

By default, both subfield are enabled. You can disable them individually to speed up the response time:

<MultiCodeEditorInteractive mqlCode={mqlCode('https://vercel.com', { 
  insights: {
    lighthouse: true,
    technologies: false
  }
})} />

<Figcaption children='Enabling insights but only the lighthouse report' />
