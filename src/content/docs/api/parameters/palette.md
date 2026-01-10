---
title: 'palette'
description: Extract dominant color palettes and accessibility-compliant color schemes from detected images. Enabling the palette parameter adds hexadecimal color collections to the response, including background and foreground colors that meet WCAG contrast ratios for professional UI design.
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>

It enables color schema information over the images data field detected over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={mqlCode('https://microlink.io', { 
  palette: true
})} />

The following fields will be added per each image detected in the payload:

- `palette` <Type children='<string[]>'/>: A collection of hexadecimal colors from most dominant color to least.
- `background_color` <Type children='<string>'/>: The best color with good [WCAG contrast ratio](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) that can be used as background color representation of the image.
- `color` <Type children='<string>'/>: The best color overlayed over `background_color`.
- `alternative_color` <Type children='<string>'/>: It will be the second best color. If there are only two colors parsed, it will default to `color`.
