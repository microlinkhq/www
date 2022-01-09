---
title: 'hide'
--- 

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer>

It hides DOM elements matching the given [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

<MultiCodeEditor languages={mqlCode('https://stripe.com', { 
  screenshot: true,
  hide: '#CookieSettingsNotification'
})} />

It sets [visibility: hidden](https://stackoverflow.com/a/133064/64949) on the matched elements in the browser page.
