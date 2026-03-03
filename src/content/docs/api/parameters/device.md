---
title: 'device'
description: 'Emulate a wide range of mobile, tablet, and desktop devices by automatically setting the correct viewport, user agent, and screen resolution.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type } from 'components/markdown/Type'

Type: <Type children='<string>'/><br/>
Default: <Type children="'macbook pro 13'"/>

It loads a set of options (such as [viewport](/docs/api/parameters/viewport), user agent, etc) to emulate the specified device over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive 
  mqlCode={{
    url: 'https://microlink.io',
    screenshot: true, 
    device: 'iPad'
  }}
/>

When the divide is defined, it will affect the whole request lifecycle. It doesn't matter if you use uppercase or lowercase.

The following devices names are supported:

### Mobile
- <Type children="'iPhone 15 Pro Max'" />
- <Type children="'iPhone 15 Pro'" />
- <Type children="'iPhone 14 Pro Max'" />
- <Type children="'iPhone 13 Pro Max'" />
- <Type children="'iPhone 15'" />
- <Type children="'Galaxy S9+'" />
- <Type children="'iPhone 14'" />
- <Type children="'Pixel 5'" />
- <Type children="'iPhone 13'" />
- <Type children="'Galaxy S8'" />
- <Type children="'Pixel 4a (5G)'" />
- <Type children="'iPhone 12'" />
- <Type children="'Galaxy S5'" />
- <Type children="'Pixel 4'" />
- <Type children="'Nexus 6P'" />

### Tablet
- <Type children="'iPad'" />
- <Type children="'iPad Pro'" />
- <Type children="'iPad Pro 11'" />
- <Type children="'iPad (gen 7)'" />
- <Type children="'iPad (gen 6)'" />
- <Type children="'iPad Mini'" />
- <Type children="'Galaxy Tab S4'" />
- <Type children="'Nexus 7'" />
- <Type children="'Kindle Fire HDX'" />
- <Type children="'Nexus 10'" />
- <Type children="'iPad landscape'" />
- <Type children="'iPad Pro landscape'" />
- <Type children="'Galaxy Tab S4 landscape'" />
- <Type children="'iPad Mini landscape'" />
- <Type children="'Nexus 7 landscape'" />

### Desktop
- <Type children="'Macbook Pro 13'" />
- <Type children="'Macbook Pro 16'" />
- <Type children="'iMac 24 4.5K'" />
- <Type children="'Macbook Pro 15'" />
- <Type children="'iMac 27'" />
- <Type children="'iMac 27 5K'" />
- <Type children="'iMac 21'" />
- <Type children="'iMac 21 4K'" />