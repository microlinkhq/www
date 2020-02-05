---
title: 'media'
--- 

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Default: <Type children="[ 'image', 'logo' ]"/><br/>
Values: <TypeContainer><Type children="'audio'"/> | <Type children="'iframe'"/> | <Type children="'image'"/> | <Type children="'logo'"/> | <Type children="'screenshot'" /> | <Type children="'video'"/></TypeContainer>

Determines the field to use as the media of the card.

<DemoIntegrations parameters={{url: '{{demolinks.ted.url}}', media: ['image', 'logo']}} caption="The default value is a collection of fields, meaning that the first valid value will be used as the image of the card." urlName="ted.com" />

You can also pass a single value to be used instead, for example <Type children="'logo'"/>

<DemoIntegrations parameters={{url: '{{demolinks.ted.url}}', media: 'logo'}} urlName="ted.com" />

The detection of <Type children="'video'"/> is also supported

<DemoIntegrations parameters={{url: '{{demolinks.instagram.url}}', media: 'video'}} urlName="instagram.com" />

Also for <Type children="'audio'"/>

<DemoIntegrations parameters={{url: '{{demolinks.spotify.url}}', media: 'audio'}} urlName="spotify.com" />

Even <Type children="'iframe'"/>

<DemoIntegrations parameters={{url: '{{demolinks.instagram.url}}', media: 'iframe'}} urlName="instagram.com" />
