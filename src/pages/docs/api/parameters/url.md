---
title: 'url'
--- 

**required**

Type: <Type children='<string>'/>

The target URL for getting information based on the content.

<MultiCodeEditorInteractive mqlCode={mqlCode('https://kikobeats.com')} />

The URL provided need to be reachable by the service. 

For example, if you want to extract content behind a login panel, the URL provided should contain the authentication step as part of the query string.

In case you need to authenticate a URL, need to provide the authentication credentials using [headers](/docs/api/parameters/headers).

If the URL provided has query strings parameters, they should be properly escaped in order to not interfere with the rest of the Microlink API query parameters.

<MultiCodeEditorInteractive mqlCode={mqlCode('https://kikobeats.com?ref=microlink')} />

Using [MQL](/docs/mql/getting-started/overview) or [Microlink CLI](/docs/api/getting-started/cli) will escape the URL properly; Otherwise, you need to be sure to escape it, using [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) or equivalent.

The protocol matters: If the target URL have relative URLs inside (e.g., images or videos), then the URL provided will be used to resolved relatives URLs into absolute.

This means that if you provide an HTTPS, then all relatives URLs will be resolved under SSL.
