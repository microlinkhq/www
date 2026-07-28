---
title: 'screenshot › quality'
description: 'Control JPEG compression for website screenshots. Set quality between 0 and 100 to balance file size and visual fidelity.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type } from 'components/markdown/Type'

Type: <Type children='<number>'/><br/>
Default: <Type children='80'/>

It sets the compression quality for the [screenshot](/docs/api/parameters/screenshot) over the target [url](/docs/api/parameters/url) when [type](/docs/api/parameters/screenshot/type) is <Type children="'jpeg'"/>.

<MultiCodeEditorInteractive mqlCode={{ url: 'https://microlink.io', screenshot: { type: 'jpeg', quality: 50 } }} />

The value must be between <Type children='0'/> and <Type children='100'/>. Lower values produce smaller files with more compression artifacts; higher values keep more detail at a larger size.

Quality only applies to JPEG output. With the default PNG type it is ignored, so the capture still succeeds.
