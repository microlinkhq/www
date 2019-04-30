---
title: 'screenshot'
--- 

Type: `boolean|string`<br/>
Default: `false`<br/>
Values: `true|false|'{devideName}'`

Take a screenshot of the website. 

<MultiCodeEditor languages={{
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true 
  })
    
  console.log(status, data)
}
  `,
  cURL: `curl https://api.microlink.io?url=https://microlink.io?screenshot=true`, 
  }} 
/>

<Figcaption>The image will be hosted at <Link href="https://imgur.com">imgur.com</Link>.</Figcaption>

After that, a new field `screenshot` will present int the data payload.

```json{26,34}
{
  "data": {
    "lang": "en",
    "author": null,
    "title": "Turns any website into data | Microlink",
    "publisher": "Microlink",
    "image": {
      "url": "https://microlink.io/preview.jpg",
      "width": 2431,
      "height": 1531,
      "type": "jpg",
      "size": 136704,
      "size_pretty": "137 kB"
    },
    "description": "Extract structured data from any website. Enter an URL, receive information. Get relevant information from any link & easily create beautiful previews.",
    "date": "2019-04-19T13:59:05.677Z",
    "logo": {
      "url": "https://microlink.io/logo-trim.png",
      "width": 500,
      "height": 500,
      "type": "png",
      "size": 1448,
      "size_pretty": "1.45 kB"
    },
    "url": "https://microlink.io",
    "screenshot": {
      "url": "https://i.imgur.com/rLReKBy.png",
      "width": 1280,
      "height": 800,
      "type": "png",
      "size": 179126,
      "size_pretty": "179 kB"
    }
  },
  "status": "success"
}
```

### Specific Parameters

You can tweak a set of additional settings related with the screenshot:

#### waitFor

Type: `number|string`<br/>
Default: `0`

Specify a selector or a quantity of time to wait.

#### waitUntil

Type: `array|string`<br/>
Default: `['networkidle0']`

Specify the [events](https://github.com/GoogleChrome/puppeteer/blob/v1.11.0/docs/api.md#pagegotourl-options) to wait until consider navigation succeeded.

#### deviceScaleFactor

Type: `number`<br/>
Default: `1`

Specify device scale factor.

#### fullPage

Type: `boolean`<br/>
Default: `false`

When `true`, takes a screenshot of the full scrollable page.

#### hasTouch

Type: `boolean|string`<br/>
Default: `false`

Specifies if viewport supports touch events.

#### height

Type: `number`<br/>
Default: `false`

Page height in pixels.

#### width

Type: `number`<br/>
Default: `false`

Page height in pixels.

#### isLandscape

Type: `boolean`<br/>
Default: `false`

Specifies if viewport is in landscape mode.

#### isMobile

Type: `boolean`<br/>
Default: `false`

Whether the meta viewport tag is taken into account

#### omitBackground

Type: `boolean`<br/>
Default: `true`

Hides default white background and allows capturing screenshots with transparency

#### quality

Type: `number`<br/>

The quality of the image, between `0` to `100`. Not applicable to `'png'` images.

#### type

Type: `string`<br/>
Default: `'png'`<br/>
Values: `'jpeg'|'png'`

Specify screenshot type.

### Device Presets

We bundle the specific parameters necessary for emulating most of the most popular devices

<MultiCodeEditor languages={{
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
 const { status, data, response } = await mql('https://microlink.io'. { screenshot: 'ipad' })
 console.log(status, data)
}
  `,
  cURL: `curl https://api.microlink.io?url=https://microlink.io?screenshot=true`, 
  }} 
/>

<Figcaption>You can specify a supported device name for emulating it; It does not matter if it is uppercase or lowercase.</Figcaption>

The following devices names are supported:

- BlackBerry Z30
- BlackBerry Z30 landscape
- Blackberry PlayBook
- Blackberry PlayBook landscape
- Galaxy Note 3
- Galaxy Note 3 landscape
- Galaxy Note II
- Galaxy Note II landscape
- Galaxy S III
- Galaxy S III landscape
- Galaxy S5
- Galaxy S5 landscape
- Kindle Fire HDX
- Kindle Fire HDX landscape
- LG Optimus L70
- LG Optimus L70 landscape
- Macbook Pro 13
- Macbook Pro 15
- Microsoft Lumia 550
- Microsoft Lumia 950
- Microsoft Lumia 950 landscape
- Nexus 10
- Nexus 10 landscape
- Nexus 4
- Nexus 4 landscape
- Nexus 5
- Nexus 5 landscape
- Nexus 5X
- Nexus 5X landscape
- Nexus 6
- Nexus 6 landscape
- Nexus 6P
- Nexus 6P landscape
- Nexus 7
- Nexus 7 landscape
- Nokia Lumia 520
- Nokia Lumia 520 landscape
- Nokia N9
- Nokia N9 landscape
- Pixel 2
- Pixel 2 XL
- Pixel 2 XL landscape
- Pixel 2 landscape
- iMac 21.5
- iMac 27
- iPad
- iPad Mini
- iPad Mini landscape
- iPad Pro
- iPad Pro landscape
- iPad landscape
- iPhone 4
- iPhone 4 landscape
- iPhone 5
- iPhone 5 landscape
- iPhone 6
- iPhone 6 Plus
- iPhone 6 Plus landscape
- iPhone 6 landscape
- iPhone 7
- iPhone 7 Plus
- iPhone 7 Plus landscape
- iPhone 7 landscape
- iPhone 8
- iPhone 8 Plus
- iPhone 8 Plus landscape
- iPhone 8 landscape
- iPhone SE
- iPhone SE landscape
- iPhone X
- iPhone X landscape
