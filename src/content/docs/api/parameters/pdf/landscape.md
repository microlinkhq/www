---
title: 'landscape'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Iframe } from 'components/markdown/Iframe'
import { Type } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

It sets landscape orientation for the [pdf](/docs/api/parameters/pdf) over the target [url](/docs/api/parameters/url).

<Iframe src="https://cdn.microlink.io/docs/algolia.pdf" />

<MultiCodeEditorInteractive mqlCode={mqlCode('https://www.algolia.com', { pdf: { landscape: true } })} />
