---
title: 'pageRanges'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Iframe } from 'components/markdown/Iframe'
import { Type } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<string>'/><br/>

It specifies the page range for generating the [pdf](/docs/api/parameters/pdf) over the target [url](/docs/api/parameters/url).

<Iframe src="https://cdn.microlink.io/docs/stripe.pdf" />

<MultiCodeEditorInteractive mqlCode={mqlCode('https://stripe.com', { pdf: { landscape: { pageRanges: '1-1' } } })} />

Any interval can be defined, such as, `'1-5, 8, 11-13'`. If you want to print just one page, specify it as range, e.g., `'1-1'`.

