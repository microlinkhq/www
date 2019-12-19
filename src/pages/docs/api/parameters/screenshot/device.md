---
title: 'device'
--- 

Type: <Type children='<string>'/><br/>
Default: <Type children="'macbook pro 13'"/>

When it is present, a [viewport](/docs/api/parameters/screenshot/viewport) preset will be load for emulating the device before taking the screenshot.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&device=ipad`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      device: 'iPad',
  })
  console.log(status, data)
}
  `
  }} 
/>

<Figcaption>It doesn't matter if you use uppercase or lowercase.</Figcaption>

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
- <Type children="'iMac 21'" />
- <Type children="'iMac 21 4K'" />
- <Type children="'iMac 27'" />
- <Type children="'iMac 27 5K'" />
- <Type children="'iPad'" />
- <Type children="'iPad Mini'" />
- <Type children="'iPad Mini landscape'" />
- <Type children="'iPad Pro'" />
- <Type children="'iPad Pro landscape'" />
- <Type children="'iPad landscape'" />
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
