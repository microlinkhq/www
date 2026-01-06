---
title: 'contrast'
---

import { DemoIntegrations } from 'components/markdown/DemoIntegrations'

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
