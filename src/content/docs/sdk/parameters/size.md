---
title: 'size'
description: Define the visual dimensions of your link previews. Choose between small, normal, or large sizes to best fit your application's layout and content density requirements.
---

import { DemoIntegrations } from 'components/markdown/DemoIntegrations'
import { Type, TypeContainer } from 'components/markdown/Type'

Type: <TypeContainer><Type children='<string>'/></TypeContainer><br/>
Default: <Type children="'normal'"/><br/>
Values: <TypeContainer><Type children="'small'"/> | <Type children="'normal'"/> | <Type children="'large'"/></TypeContainer>

Determines the size of the card.

<DemoIntegrations parameters={{ size: 'small', media: 'logo' }} />

<DemoIntegrations parameters={{ media: 'logo' }} />

<DemoIntegrations parameters={{ size: 'large', media: 'logo' }} />
