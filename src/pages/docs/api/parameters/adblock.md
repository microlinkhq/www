---
title: 'adblock'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

It allows/disallows third party sub-requests related to advertisements or trackers services over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive 
  mqlCode={mqlCode('https://www.youtube.com', { adblock: true })} 
/>

These third party requests aren't essential and they generally bloat the response time.

The adblock engine world-in-class powered by [Cliqz](https://github.com/cliqz-oss/adblocker).
