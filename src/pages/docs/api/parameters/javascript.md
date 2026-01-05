---
title: 'javascript'
---

import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

It enables/disables JavaScript execution into the browser page over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={mqlCode('https://news.ycombinator.com', { 
  javascript: true
})} />
