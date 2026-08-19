---
title: 'direction'
description: 'Configure the text direction of your link previews. Support for LTR (left-to-right) and RTL (right-to-left) layouts.'
---

import { DemoIntegrations } from 'components/markdown/DemoIntegrations'
import { Type, TypeContainer } from 'components/markdown/Type'
import { Figcaption } from 'components/markdown/Figcaption'

> **The legacy Microlink Embed SDK is no longer maintained.** It keeps working and you can still use it, but it won't receive further updates. The new [Microlink SDK](/integrations/sdk) — the [microlink.io](/docs/sdk/getting-started/overview/) package — is the way to consume the Microlink API going forward.

Type: <Type children='<string>'/><br/>
Default: <Type children="'ltr'"/><br/>
Values: <TypeContainer><Type children="'ltr'"/> | <Type children="'rtl'"/></TypeContainer>

Sets the direction of the card.

<DemoIntegrations parameters={{direction: 'ltr'}} />

<Figcaption children="The default direction is ltr."  />

Alternatively you can set <Type children="'rtl'"/>, that means *right-to-left*

<DemoIntegrations parameters={{direction: 'rtl'}} />
