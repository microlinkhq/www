---
title: 'scroll'
---

import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<string>'/>

It scrolls to the DOM element matching the given [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) into the browser page over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={mqlCode('https://microlink.io', { 
  screenshot: true, 
  scroll: '#pricing'
})} />

