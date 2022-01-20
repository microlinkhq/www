---
title: 'staleTtl'
isPro: true
--- 

Type: <TypeContainer><Type children='<string>'/> | <Type children='<number>'/></TypeContainer><br/>

It enables serve a stale response while a background refresh cache copy is being generated over the target [url](/docs/api/parameters/url).

<MultiCodeEditor languages={mqlCode('https://microlink.io', { ttl: '1d', staleTtl: 0 })} />

The value provided can't be higher than [ttl](/docs/api/parameters/ttl).

A good pattern there is to sets `staleTtl=0` to always revalidate in the background under expiration, maximizing the cache usage serving the last cache copy generated while the revalidation will refresh it.
