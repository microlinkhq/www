---
title: 'autoPlay'
---

import { DemoIntegrations } from 'components/markdown/DemoIntegrations'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

Determine if the media will automatically start playing as soon as it can do so without stopping.

<DemoIntegrations parameters={{url: '{{demolinks.youtube.url}}', media: 'video', autoPlay: true}} caption="To control the media just hover with your cursor." />

The default behavior is to start the media playing; You can change that by passing `autoPlay: false`.

<DemoIntegrations parameters={{url: '{{demolinks.youtube.url}}', media: 'video', autoPlay: false}} />

