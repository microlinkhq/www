---
title: 'element'
---

import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<string>'/>

It captures the DOM element matching the given [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) for the [screenshot](/docs/api/parameters/screenshot) over the target [url](/docs/api/parameters/url).

![](/images/codepen.png)

<MultiCodeEditorInteractive mqlCode={mqlCode('https://codepen.io/fossheim/full/oNjxrZa', { screenshot: { element: '#result-iframe-wrap' } })} />

It will wait for the element to appear in the page and to be visible.
