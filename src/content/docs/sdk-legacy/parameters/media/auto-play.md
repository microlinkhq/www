---
title: 'autoPlay'
description: 'Control the media playback behavior of your link previews. Use the autoPlay parameter to enable or disable automatic video and audio playback for Microlink SDK components.'
---

import { DemoIntegrations } from 'components/markdown/DemoIntegrations'
import { Type } from 'components/markdown/Type'

> **The legacy Microlink SDK is no longer maintained.** It keeps working and you can still use it, but it won't receive further updates. The new [Microlink SDK](/integrations/sdk) — the [microlink.io](/docs/sdk/getting-started/overview/) package — is the way to consume the Microlink API going forward.

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

Determine if the media will automatically start playing as soon as it can do so without stopping.

<DemoIntegrations parameters={{url: '{{demolinks.youtube.url}}', media: 'video', autoPlay: true}} caption="To control the media just hover with your cursor." />

The default behavior is to start the media playing; You can change that by passing `autoPlay: false`.

<DemoIntegrations parameters={{url: '{{demolinks.youtube.url}}', media: 'video', autoPlay: false}} />

