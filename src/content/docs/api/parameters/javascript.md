---
title: 'javascript'
description: Control whether JavaScript is executed within the headless browser for a target URL. Disabling JavaScript can significantly speed up response times and reduce bandwidth for static pages, while enabling it ensures that client-side rendered content and interactive elements are fully processed before data extraction.
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

It enables/disables JavaScript execution into the browser page over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={mqlCode('https://news.ycombinator.com', { 
  javascript: true
})} />
