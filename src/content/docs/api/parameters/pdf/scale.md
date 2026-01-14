---
title: 'scale'
description: 'Adjust the zoom level of your website-to-PDF conversions using the scale parameter with Microlink API automated browser.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Iframe } from 'components/markdown/Iframe'
import { Type } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<number>'/><br/>
Default: <Type children='0.6'/>

It sets the scale for the [pdf](/docs/api/parameters/pdf) over the target [url](/docs/api/parameters/url).

<Iframe src="https://cdn.microlink.io/pdf/varnis-cache.pdf" />

<MultiCodeEditorInteractive mqlCode={mqlCode('https://varnish-cache.org/docs/trunk/phk/thatslow.html', { pdf: { scale: 1 } })} />

Scale amount must be between <Type children='0.1'/> and <Type children='2'/>.
