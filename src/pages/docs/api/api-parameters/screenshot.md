---
title: 'screenshot'
--- 

Type: `boolean|string`<br/>
Default: `false`<br/>
Values: `true|false|{devideName}`

Take a screenshot of the website.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true 
  })
  console.log(status, data)
}
  `
  }} 
/>

<Figcaption>The image will be hosted at <Link href="https://imgur.com">imgur.com</Link>.</Figcaption>

After that, a new field `screenshot` will present int the data payload.

```json
{
  "data": {
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

Additionally you can setup the following parameters:

#### waitFor

Type: `number|string`<br/>

Wait a quantity of time or selector.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://kikobeats.com&screenshot&waitFor=1500`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://kikobeats.com'. { 
      screenshot: true
      waitFor: 1500
  })
  console.log(status, data)
}
  `
  }} 
/>

<Figcaption>`waitFor` is useful to wait until animation ends for taking the screenshot.</Figcaption>

#### waitUntil

Type: `string|string[]`<br/>
Default: `['networkidle0']`<br/>
Values: `'load'|'domcontentloaded'|'networkidle0'|'networkidle2'`

Specify a list of events until consider navigation succeeded:

- `'load'`: Consider navigation to be finished when the load event is fired.
- `'domcontentloaded'`: Consider navigation to be finished when the DOMContentLoaded event is fired.
- `'networkidle0'`: Consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.
- `'networkidle2'`: Consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.


<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&waitUntil=domcontentloaded`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true
      waitUntil: 'domcontentloaded'
  })
  console.log(status, data)
}
  `
  }} 
/>

#### deviceScaleFactor

Type: `number`<br/>
Default: `1`

Specify device scale factor.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&deviceScaleFactor=0.65`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true
      deviceScaleFactor: 0.65
  })
  console.log(status, data)
}
  `
  }} 
/>

#### fullPage

Type: `boolean`<br/>
Default: `false`

When `true`, takes a screenshot of the full scrollable page.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://eosrei.github.io/emojione-color-font/full-demo.html&screenshot&fullPage`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://eosrei.github.io/emojione-color-font/full-demo.html'. { 
      screenshot: true
      fullPage: true
  })
  console.log(status, data)
}
  `
  }} 
/>

#### omitBackground

Type: `boolean`<br/>
Default: `true`

Hides default white background and allows capturing screenshots with transparency.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&omitBackground`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true
      omitBackground: true
  })
  console.log(status, data)
}
  `
  }} 
/>

#### type

Type: `string`<br/>
Default: `'png'`<br/>
Values: `'jpeg'|'png'`

Specify screenshot type.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&type=jpeg`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true
      type: 'jpeg'
  })
  console.log(status, data)
}
  `
  }} 
/>

#### hide

Type: `string|string[]`

Hide DOM elements matching the given [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&hide.0=.crisp-client&hide.1=#cookies-policy`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      hide: ['.crisp-client', '#cookies-policy']
  })
  console.log(status, data)
}
  `
  }} 
/>

#### click

Type: `string|string[]`

Click the DOM element matching the given  [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&click=#features`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      click: '#features'
  })
  console.log(status, data)
}
  `
  }} 
/>

#### disableAnimations

Type: `boolean`<br/>
Default: `false`

Disable CSS [animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) and [transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/transition).

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&disableAnimations`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      disableAnimations: true
  })
  console.log(status, data)
}
  `
  }} 
/>

#### scrollTo

Type: `string`

Scroll to the DOM element matching the given [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&scrollTo=#pricing`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      scrollTo: '#pricing'
  })
  console.log(status, data)
}
  `
  }} 
/>

#### browser

Type: `string`
Values: `'light'|'dark'`

It sets the browser image overlay to use.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&browser=dark`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      browser: 'dark'
  })
  console.log(status, data)
}
  `
  }} 
/>

#### background

Type: `string`<br/>

It sets the background color to use. You can pass a hexadecimal/rgb/rgba or a [CSS gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient).

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&background=linear-gradient%2843deg%2C+rgb%28247%2C+102%2C+152%29+0%25%2C+rgb%28234%2C+64%2C+123%29+29%25%2C+rgb%28101%2C+78%2C+163%29+100%25%29`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      background: 'linear-gradient(43deg, rgb(247, 102, 152) 0%, rgb(234, 64, 123) 29%, rgb(101, 78, 163) 100%)'
  })
  console.log(status, data)
}
  `
  }} 
/>

### Device Emulation

If you provide a compatible `deviceName`, the descriptor device will be used for emulating the viewport before take the screenshot.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot=ipad`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: 'iPad',
  })
  console.log(status, data)
}
  `
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
