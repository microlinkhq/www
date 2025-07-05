---
title: 'click'
--- 

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer>

It clicks the DOM elements matching the given [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive 
  mqlCode={mqlCode('https://microlink.io', { screenshot: true, click: '#features' })} 
/>

It can be combined with other browser interaction, such as [scroll](/docs/api/parameters/scroll), to mutates the browser page state.
