---
title: 'pdf › height'
description: 'Set a custom paper height for your PDF generation using pixels, inches, or other CSS units. Fine-tune the dimensions of your website-to-PDF conversions.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Iframe } from 'components/markdown/Iframe'
import { Type } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<string>'/><br/>

It sets the paper height for the [pdf](/docs/api/parameters/pdf) over the target [url](/docs/api/parameters/url).

<Iframe src="https://cdn.microlink.io/docs/oxide.pdf" />

<MultiCodeEditorInteractive mqlCode={mqlCode('https://oxide.computer', { pdf: { height: '480px' } })} />

The value accepts values labeled with units.
