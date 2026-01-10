---
title: 'fullPage'
description: 'Capture a high-resolution screenshot of the entire scrollable content of a website. Use the fullPage parameter to render the complete layout of a URL.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>

It takes a full scrollable page [screenshot](/docs/api/parameters/screenshot) over the target [url](/docs/api/parameters/url).

<Image maxWidth='40%' src="https://cdn.microlink.io/docs/recipes.png" />

<MultiCodeEditorInteractive mqlCode={mqlCode('https://microlink.io/recipes', { screenshot: { fullPage: true } })} />

The response time could be slower since the browser has to wait more elements before taking the screenshot.

