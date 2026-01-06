---
title: 'muted'
---

import { DemoIntegrations } from 'components/markdown/DemoIntegrations'
import { Type } from 'components/markdown/Type'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

Specifies if the media should be muted.

with `muted` enabled:

<DemoIntegrations parameters={{url: '{{demolinks.youtube.url}}', media: 'video', autoPlay: false, muted: true }} />

with `muted` disabled:

<DemoIntegrations parameters={{url: '{{demolinks.youtube.url}}', media: 'video', autoPlay: false, muted: false }} />
