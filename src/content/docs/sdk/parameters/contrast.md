---
title: 'contrast'
description: 'Enable high-contrast mode for link previews based on predominant image colors. Improves accessibility and creates visually striking cards that adapt to your content.'
---

import { DemoIntegrations } from 'components/markdown/DemoIntegrations'
import { Microlink } from 'components/markdown/Microlink'
import { Type } from 'components/markdown/Type'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>

When enabled, it will generate a high contrast card based on predominant colors detected in the feature image from the target URL.

<DemoIntegrations 
  parameters={{url: '{{demolinks.github.url}}', contrast: true}} caption="The contrast mode has better accessibility ratio."
/>

<Microlink 
  url='{{demolinks.github.url}}'
  size='large'
  contrast  
/>
