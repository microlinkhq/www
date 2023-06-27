---
title: 'scale'
--- 

Type: <Type children='<number>'/><br/>
Default: <Type children='0.6'/>

It sets the scale for the [pdf](/docs/api/parameters/pdf) over the target [url](/docs/api/parameters/url).

<Iframe src="https://cdn.microlink.io/pdf/varnis-cache.pdf" />

<MultiCodeEditor languages={mqlCode('https://varnish-cache.org/docs/trunk/phk/thatslow.html', { pdf: { scale: 1 } })} />

Scale amount must be between <Type children='0.1'/> and <Type children='2'/>.
