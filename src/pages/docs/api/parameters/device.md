---
title: 'device'
---

import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<string>'/><br/>
Default: <Type children="'macbook pro 13'"/>

It loads a set of options (such as [viewport](/docs/api/parameters/viewport), user agent, etc) to emulate the specified device over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive 
  mqlCode={mqlCode('https://microlink.io', {
    screenshot: true, 
    device: 'iPad'
  })}
/>

When the divide is defined, it will affect the whole request lifecycle. It doesn't matter if you use uppercase or lowercase.

The following devices names are supported:

- <Type children="'BlackBerry Z30'" />
- <Type children="'BlackBerry Z30 landscape'" />
- <Type children="'Blackberry PlayBook'" />
- <Type children="'Blackberry PlayBook landscape'" />
- <Type children="'Galaxy Note 3'" />
- <Type children="'Galaxy Note 3 landscape'" />
- <Type children="'Galaxy Note II'" />
- <Type children="'Galaxy Note II landscape'" />
- <Type children="'Galaxy S III'" />
- <Type children="'Galaxy S III landscape'" />
- <Type children="'Galaxy S5'" />
- <Type children="'Galaxy S5 landscape'" />
- <Type children="'Galaxy S8'" />
- <Type children="'Galaxy S8 landscape'" />
- <Type children="'Galaxy S9+'" />
- <Type children="'Galaxy S9+ landscape'" />
- <Type children="'Galaxy Tab S4'" />
- <Type children="'Galaxy Tab S4 landscape'" />
- <Type children="'JioPhone 2'" />
- <Type children="'JioPhone 2 landscape'" />
- <Type children="'Kindle Fire HDX'" />
- <Type children="'Kindle Fire HDX landscape'" />
- <Type children="'LG Optimus L70'" />
- <Type children="'LG Optimus L70 landscape'" />
- <Type children="'Macbook Pro 13'" />
- <Type children="'Macbook Pro 15'" />
- <Type children="'Macbook Pro 16'" />
- <Type children="'Microsoft Lumia 550'" />
- <Type children="'Microsoft Lumia 950'" />
- <Type children="'Microsoft Lumia 950 landscape'" />
- <Type children="'Moto G4'" />
- <Type children="'Moto G4 landscape'" />
- <Type children="'Nexus 10'" />
- <Type children="'Nexus 10 landscape'" />
- <Type children="'Nexus 4'" />
- <Type children="'Nexus 4 landscape'" />
- <Type children="'Nexus 5'" />
- <Type children="'Nexus 5 landscape'" />
- <Type children="'Nexus 5X'" />
- <Type children="'Nexus 5X landscape'" />
- <Type children="'Nexus 6'" />
- <Type children="'Nexus 6 landscape'" />
- <Type children="'Nexus 6P'" />
- <Type children="'Nexus 6P landscape'" />
- <Type children="'Nexus 7'" />
- <Type children="'Nexus 7 landscape'" />
- <Type children="'Nokia Lumia 520'" />
- <Type children="'Nokia Lumia 520 landscape'" />
- <Type children="'Nokia N9'" />
- <Type children="'Nokia N9 landscape'" />
- <Type children="'Pixel 2'" />
- <Type children="'Pixel 2 XL'" />
- <Type children="'Pixel 2 XL landscape'" />
- <Type children="'Pixel 2 landscape'" />
- <Type children="'Pixel 3'" />
- <Type children="'Pixel 3 landscape'" />
- <Type children="'Pixel 4'" />
- <Type children="'Pixel 4 landscape'" />
- <Type children="'Pixel 4a (5G)'" />
- <Type children="'Pixel 4a (5G) landscape'" />
- <Type children="'Pixel 5'" />
- <Type children="'Pixel 5 landscape'" />
- <Type children="'iMac 21'" />
- <Type children="'iMac 21 4K'" />
- <Type children="'iMac 24 4.5K'" />
- <Type children="'iMac 27'" />
- <Type children="'iMac 27 5K'" />
- <Type children="'iPad'" />
- <Type children="'iPad (gen 6)'" />
- <Type children="'iPad (gen 6) landscape'" />
- <Type children="'iPad (gen 7)'" />
- <Type children="'iPad (gen 7) landscape'" />
- <Type children="'iPad Mini'" />
- <Type children="'iPad Mini landscape'" />
- <Type children="'iPad Pro'" />
- <Type children="'iPad Pro 11'" />
- <Type children="'iPad Pro 11 landscape'" />
- <Type children="'iPad Pro landscape'" />
- <Type children="'iPad landscape'" />
- <Type children="'iPhone 11'" />
- <Type children="'iPhone 11 Pro'" />
- <Type children="'iPhone 11 Pro Max'" />
- <Type children="'iPhone 11 Pro Max landscape'" />
- <Type children="'iPhone 11 Pro landscape'" />
- <Type children="'iPhone 11 landscape'" />
- <Type children="'iPhone 12'" />
- <Type children="'iPhone 12 Mini'" />
- <Type children="'iPhone 12 Mini landscape'" />
- <Type children="'iPhone 12 Pro'" />
- <Type children="'iPhone 12 Pro Max'" />
- <Type children="'iPhone 12 Pro Max landscape'" />
- <Type children="'iPhone 12 Pro landscape'" />
- <Type children="'iPhone 12 landscape'" />
- <Type children="'iPhone 13'" />
- <Type children="'iPhone 13 Mini'" />
- <Type children="'iPhone 13 Mini landscape'" />
- <Type children="'iPhone 13 Pro'" />
- <Type children="'iPhone 13 Pro Max'" />
- <Type children="'iPhone 13 Pro Max landscape'" />
- <Type children="'iPhone 13 Pro landscape'" />
- <Type children="'iPhone 13 landscape'" />
- <Type children="'iPhone 4'" />
- <Type children="'iPhone 4 landscape'" />
- <Type children="'iPhone 5'" />
- <Type children="'iPhone 5 landscape'" />
- <Type children="'iPhone 6'" />
- <Type children="'iPhone 6 Plus'" />
- <Type children="'iPhone 6 Plus landscape'" />
- <Type children="'iPhone 6 landscape'" />
- <Type children="'iPhone 7'" />
- <Type children="'iPhone 7 Plus'" />
- <Type children="'iPhone 7 Plus landscape'" />
- <Type children="'iPhone 7 landscape'" />
- <Type children="'iPhone 8'" />
- <Type children="'iPhone 8 Plus'" />
- <Type children="'iPhone 8 Plus landscape'" />
- <Type children="'iPhone 8 landscape'" />
- <Type children="'iPhone SE'" />
- <Type children="'iPhone SE landscape'" />
- <Type children="'iPhone X'" />
- <Type children="'iPhone X landscape'" />
- <Type children="'iPhone XR'" />
- <Type children="'iPhone XR landscape'" />
