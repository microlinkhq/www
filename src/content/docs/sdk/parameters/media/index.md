---
title: 'media'
---

import { DemoIntegrations } from 'components/markdown/DemoIntegrations'
import { Type, TypeContainer } from 'components/markdown/Type'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Default: <Type children="[ 'image', 'logo' ]"/><br/>
Values: <TypeContainer><Type children="'audio'"/> | <Type children="'iframe'"/> | <Type children="'image'"/> | <Type children="'logo'"/> | <Type children="'screenshot'" /> | <Type children="'video'"/></TypeContainer>

Determines the field to use as the media of the card.

<DemoIntegrations parameters={{url: '{{demolinks.youtube.url}}', media: ['image', 'logo']}} caption="The default value is a collection of fields, meaning that the first valid value will be used as the image of the card." />

You can also pass a single value to be used instead, for example <Type children="'logo'"/>

<DemoIntegrations parameters={{url: '{{demolinks.youtube.url}}', media: 'logo'}} />

The detection of <Type children="'video'"/> is also supported

<DemoIntegrations parameters={{url: '{{demolinks.youtube.url}}', media: 'video'}} />

Also for <Type children="'audio'"/>

<DemoIntegrations parameters={{url: '{{demolinks.spotify.url}}', media: 'audio'}} />

Even <Type children="'iframe'"/>

<div align="center">
  <DemoIntegrations parameters={{url: '{{demolinks.youtube.url}}', media: 'iframe'}}/>
</div>
