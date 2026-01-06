---
title: 'viewport'
---

import { mqlCode } from 'helpers/mql-code'
import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'

Type: <Type children='<object>'/>

It sets browser visible area settings and device capabilities over the target [url](/docs/api/parameters/url).

![](/images/viewport.png)

<MultiCodeEditorInteractive mqlCode={mqlCode('https://en.wikipedia.org/wiki/Bob_Dylan', {
  screenshot: true,
  viewport: {
    width: 640,
    height: 400,
    deviceScaleFactor: 2,
    isMobile: true
  }
})} />

<Figcaption>Establishing a custom viewport.</Figcaption>

The default viewport values are provided by the default [device](/docs/api/parameters/device). The viewport should be defined by:

- `width` <Type children='<number>'/>: The page width in pixels
- `height` <Type children='<number>'/>: The page height in pixels.
- `deviceScaleFactor` <Type children='<number>'/>: Specify device scale factor.
- `isMobile` <Type><Type children='<boolean>'/></Type>: Whether the meta viewport tag is taken into account.
- `hasTouch` <Type><Type children='<boolean>'/></Type>: Specifies if viewport supports touch events.
- `isLandscape` <Type><Type children='<boolean>'/></Type>: Specifies if viewport is in landscape mode.

If you just provide an incomplete set of viewport values, they will be merged with the default values:

<MultiCodeEditorInteractive mqlCode={mqlCode('https://en.wikipedia.org/wiki/Bob_Dylan', {
  screenshot: true,
  viewport: {
    deviceScaleFactor: 0.5
  }
})} />

<Figcaption>Using the default viewport with lower device scale factor.</Figcaption>

See [device](/docs/api/parameters/device) for using viewport presets.
