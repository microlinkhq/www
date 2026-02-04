---
title: 'insights'
description: 'Analyze web performance and stack data with Microlink Insights. Extract identified technologies via Wappalyzer and detailed Lighthouse audit reports directly from any target URL.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Figcaption } from 'components/markdown/Figcaption'
import { Type, TypeContainer } from 'components/markdown/Type'

Type: <TypeContainer><Type children='<boolean>'/> | <Type children='<object>'/></TypeContainer><br/>
Default: <Type children='false'/>

It gets a web performance metrics of the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={{ url: 'https://vercel.com', insights: true }} />

When is presnet, a new `insights` data field will be returned. These field contain two subfields:

- `technologies`: A list of technologies identified powered by [Wappalyzer](https://www.wappalyzer.com/).
- `lighthouse`: A full web audit report powered by [Lighthouse](https://developers.google.com/web/tools/lighthouse).

By default, both subfield are enabled. You can disable them individually to speed up the response time:

<MultiCodeEditorInteractive mqlCode={{
    url: 'https://vercel.com',
    insights: {
    lighthouse: true,
    technologies: false
  }
  }} />

<Figcaption children='Enabling insights but only the lighthouse report' />
