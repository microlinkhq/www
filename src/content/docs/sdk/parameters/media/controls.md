---
title: 'controls'
description: 'Enable or disable native media player controls for video and audio in your link previews. Use the controls parameter to customize the interface of Microlink SDK.'
---

import { DemoIntegrations } from 'components/markdown/DemoIntegrations'
import { Type } from 'components/markdown/Type'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

Display UI controls for the card's media.

with `controls` enabled:

<DemoIntegrations parameters={{url: '{{demolinks.youtube.url}}', media: 'video', controls: true}} />

with `controls` disabled:

<DemoIntegrations parameters={{url: '{{demolinks.youtube.url}}', media: 'video', controls: false}} />
