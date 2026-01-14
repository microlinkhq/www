---
title: 'screenshot » type'
description: 'Choose between JPEG or PNG file formats for your website screenshots. Assets are automatically optimized and served in modern formats based on client device capabilities.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type, TypeContainer } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<string>'/><br/>
Default: <Type children="'png'"/><br/>
Values: <TypeContainer><Type children="'jpeg'"/> | <Type children="'png'"/></TypeContainer>

It specifies the screenshot file type for the [screenshot](/docs/api/parameters/screenshot) over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={mqlCode('https://microlink.io', { screenshot: { type: 'jpeg' } })} />

This query parameter just defines the file format to be used at asset generation. 

When you consume the asset thought [Microlink CDN](/blog/edge-cdn/), it automatically optimizes the assets to serve the best format possible (like WebP) based on your device (it's determining via `user-agent` header).
