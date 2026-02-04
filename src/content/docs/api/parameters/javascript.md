---
title: 'javascript'
description: 'Control whether JavaScript is executed within the headless browser for a target URL.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type } from 'components/markdown/Type'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

It enables/disables JavaScript execution into the browser page over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={{ url: 'https://news.ycombinator.com', javascript: true }} />
