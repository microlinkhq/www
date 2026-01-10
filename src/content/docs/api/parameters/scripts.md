---
title: 'scripts'
description: Inject custom JavaScript into a webpage before it is rendered or captured.
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type, TypeContainer } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer>

It injects [&lt;script&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) into the browser page over the target [url](/docs/api/parameters/url).

![](/images/scripts.png)

<MultiCodeEditorInteractive mqlCode={mqlCode('https://microlink.io', {
  screenshot: true, 
  scripts: [
    '%5B%5D.forEach.call(document.querySelectorAll(%22*%22)%2Cfunction(a)%7Ba.style.outline%3D%221px%20solid%20%23%22%2B(~~(Math.random()*(1%3C%3C24))).toString(16)%7D)'
  ]
})} />

The code to be injected can be defined as:

- Inline code (e.g., `"document.body.style.backgroundColor = 'red'"`).
- Absolute URLs (e.g., `'https://cdn.jsdelivr.net/npm/@microlink/mql@0.3.12/src/browser.js'`).

Prefer to use [modules](/docs/api/parameters/modules) whenever possible.
