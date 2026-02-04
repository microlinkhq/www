---
title: 'pdf › width'
description: 'Set a custom paper width for your PDF generation using pixels, inches, or other CSS units. Fine-tune the horizontal dimensions of your website-to-PDF conversions.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Iframe } from 'components/markdown/Iframe'
import { Type } from 'components/markdown/Type'

Type: <Type children='<string>'/><br/>

It sets the paper width for the [pdf](/docs/api/parameters/pdf) over the target [url](/docs/api/parameters/url).

<Iframe src="https://cdn.microlink.io/docs/raycast.pdf" />

<MultiCodeEditorInteractive mqlCode={{ url: 'https://www.raycast.com', pdf: { width: '640px' } }} />

The value accepts values labeled with units.
