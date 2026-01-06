---
title: 'direction'
---

import { DemoIntegrations } from 'components/markdown/DemoIntegrations'
import { Type, TypeContainer } from 'components/markdown/Type'
import { Figcaption } from 'components/markdown/Figcaption'

Type: <Type children='<string>'/><br/>
Default: <Type children="'ltr'"/><br/>
Values: <TypeContainer><Type children="'ltr'"/> | <Type children="'rtl'"/></TypeContainer>

Sets the direction of the card.

<DemoIntegrations parameters={{direction: 'ltr'}} />

<Figcaption children="The default direction is ltr."  />

Alternatively you can set <Type children="'rtl'"/>, that means *right-to-left*

<DemoIntegrations parameters={{direction: 'rtl'}} />
