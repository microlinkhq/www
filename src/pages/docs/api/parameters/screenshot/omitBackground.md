---
title: 'omitBackground'
---

import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>

It omits the white background for the [screenshot](/docs/api/parameters/screenshot) over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={mqlCode('https://kikobeats.com', { screenshot: { omitBackground: true } })} />
