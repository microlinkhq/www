---
title: 'mediaType'
---

import { Iframe } from 'components/markdown/Iframe'
import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<string>'/><br/>
Default: <Type children="'screen'"/><br/>
Values: <TypeContainer><Type children="'screen'"/> | <Type children="'print'"/></TypeContainer>

It sets the CSS media type into the browser page over the target [url](/docs/api/parameters/url).

<Iframe src="https://cdn.microlink.io/pdf/alexmaccaw.pdf" />

<MultiCodeEditorInteractive mqlCode={mqlCode('https://blog.alexmaccaw.com/advice-to-my-younger-self', { pdf: true, mediaType: 'screen' })} />

Normally you will combine this query parameter with [screenshot](/docs/api/parameters/screenshot) or [pdf](/docs/api/parameters/pdf).  If you are using [pdf](/docs/api/parameters/pdf), the default media type will be `'print'`.
