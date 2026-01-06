---
title: 'loop'
---

import { DemoIntegrations } from 'components/markdown/DemoIntegrations'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

Specifies if the media will start over again, every time it finishes.

with `loop` enabled:

<DemoIntegrations parameters={{url: '{{demolinks.youtube.url}}', media: 'video', autoPlay: false, loop: true }} />

with `loop` disabled:

<DemoIntegrations parameters={{url: '{{demolinks.youtube.url}}', media: 'video', autoPlay: false, loop: false }} />

