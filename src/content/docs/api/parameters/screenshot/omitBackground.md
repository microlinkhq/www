---
title: 'screenshot › omitBackground'
description: 'Generate transparent screenshots by omitting the default white background of the webpage.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type } from 'components/markdown/Type'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>

It omits the white background for the [screenshot](/docs/api/parameters/screenshot) over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={{ url: 'https://kikobeats.com', screenshot: { omitBackground: true } }} />
