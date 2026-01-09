---
title: 'pdf width'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Iframe } from 'components/markdown/Iframe'
import { Type } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<string>'/><br/>

It sets the paper width for the [pdf](/docs/api/parameters/pdf) over the target [url](/docs/api/parameters/url).

<Iframe src="https://cdn.microlink.io/docs/raycast.pdf" />

<MultiCodeEditorInteractive mqlCode={mqlCode('https://www.raycast.com', { pdf: { width: '640px' } })} />

The value accepts values labeled with units.
