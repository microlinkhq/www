---
title: 'size'
description: 'Define the visual dimensions of your link previews. Choose between small, normal, or large sizes to best fit your application layout and content density requirements.'
---

import { DemoIntegrations } from 'components/markdown/DemoIntegrations'
import { Type, TypeContainer } from 'components/markdown/Type'

> **The legacy Microlink SDK is no longer maintained.** It keeps working and you can still use it, but it won't receive further updates. The new [Microlink SDK](/integrations/sdk) — the [microlink.io](/docs/sdk/getting-started/overview/) package — is the way to consume the Microlink API going forward.

Type: <TypeContainer><Type children='<string>'/></TypeContainer><br/>
Default: <Type children="'normal'"/><br/>
Values: <TypeContainer><Type children="'small'"/> | <Type children="'normal'"/> | <Type children="'large'"/></TypeContainer>

Determines the size of the card.

<DemoIntegrations parameters={{ size: 'small', media: 'logo' }} />

<DemoIntegrations parameters={{ media: 'logo' }} />

<DemoIntegrations parameters={{ size: 'large', media: 'logo' }} />
