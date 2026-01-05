---
title: 'waitForSelector'
---

import { mqlCode } from 'helpers/mql-code'

Type: <TypeContainer><Type children='<string>'/></TypeContainer><br/>

It tells the browser to wait until a specific [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) appears over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={mqlCode('https://dev.to', { screenshot: true, waitForSelector: 'main' })} />
