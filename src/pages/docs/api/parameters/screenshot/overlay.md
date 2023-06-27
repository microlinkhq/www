---
title: 'overlay'
--- 

Type: <Type children='<object>'/>

It creates a beauty [screenshot](/docs/api/parameters/screenshot) composition using a browser overlay over the target [url](/docs/api/parameters/url).

<Image src="https://cdn.microlink.io/docs/overlay.png" />

<MultiCodeEditor languages={mqlCode('{{demolinks.apple.url}}', { screenshot: {
  overlay: {
    background: 'linear-gradient(225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)',
    browser: 'dark'
  }
} })} />

An overlay is specified as `browser` theme, being <Type children="'light'"/>` and <Type children="'dark'"/> supported.

Additionally, you can setup a `background` color, where the color can be defined as:
 
- An hexadecimal/rgb/rgba color code (e.g., `'#F76698'`).
- A [CSS gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient) (e.g., `'linear-gradient(0deg, #330867 0%, #30CFD0 100%)'`).
- An image url (e.g., `'https://source.unsplash.com/random/1920x1080'`).
