---
title: 'waitUntil'
description: 'Fine-tune when Microlink considers a page fully "loaded" by waiting for specific lifecycle events.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type, TypeContainer } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Default: <Type children="'auto'"/><br/>
Values: <TypeContainer><Type children="'load'"/> | <Type children="'domcontentloaded'"/> | <Type children="'networkidle0'"/> | <Type children="'networkidle2'"/></TypeContainer>

Tell the browser to wait until the target website emits one or more event(s) to consider navigation succeeded.

The events that can be waited are:

- **auto**: A smart combination of `'load'` and `'networkidle2'`.
- [**load**](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event): It considers navigation successful when the whole page, including all dependent resources such as stylesheets images, have been loaded. In certain cases, it might not happen at all.
- [**domcontentloaded**](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event): It's fired as soon as the page DOM has been loaded, without waiting for resources to finish loading.
- **networkidle0**: It considers navigation successful when the page has had no network activity for half a second. This might never happen if the page is constantly loading multiple resources.
- **networkidle2**: It considers navigation successful when the page has no more then 2 network requests for half a second. This is useful if page runs a long polling in the background.

<MultiCodeEditorInteractive mqlCode={mqlCode('https://dev.to', { screenshot: true, waitUntil: 'domcontentloaded' })} />

Different arguments work for different pages. When neither of them work, a good solution would be to navigate with <Type children="'domcontentloaded'"/> argument and then simply wait for the needed element to appear on page.

<MultiCodeEditorInteractive mqlCode={mqlCode('https://dev.to', { 
  screenshot: true,
  waitUntil: 'domcontentloaded',
  waitForSelector: 'h1'
})} />
