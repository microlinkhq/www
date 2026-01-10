---
title: 'click'
description: Automate browser interactions by clicking specific DOM elements via CSS selectors. Use this parameter to trigger navigation, toggle UI components, or change page state.
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type, TypeContainer } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer>

It clicks the DOM elements matching the given [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive 
  mqlCode={mqlCode('https://microlink.io', { screenshot: true, click: '#features' })} 
/>

It can be combined with other browser interaction, such as [scroll](/docs/api/parameters/scroll), to mutates the browser page state.
