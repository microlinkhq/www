---
title: 'loop'
description: 'Configure media looping for your link previews. Use the loop parameter to specify whether video or audio content should restart automatically after finishing.'
---

import { DemoIntegrations } from 'components/markdown/DemoIntegrations'
import { Type } from 'components/markdown/Type'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

Specifies if the media will start over again, every time it finishes.

with `loop` enabled:

<DemoIntegrations parameters={{url: '{{demolinks.youtube.url}}', media: 'video', autoPlay: false, loop: true }} />

with `loop` disabled:

<DemoIntegrations parameters={{url: '{{demolinks.youtube.url}}', media: 'video', autoPlay: false, loop: false }} />

