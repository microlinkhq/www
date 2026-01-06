---
title: 'animations'
---

import { mqlCode } from 'helpers/mql-code'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>

It enables/disables CSS [animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) and [transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/transition) over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive 
  mqlCode={mqlCode('https://vercel.com', { screenshot: true, animations: false })} 
/>

This value also modifies [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) consequently into the browser page.

