---
title: 'pdf width'
description: Control the scale of your generated PDF documents. Adjust the zoom level between 0.1 and 2 to ensure your website content is perfectly proportioned and legible using Microlink API's PDF rendering engine.
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
