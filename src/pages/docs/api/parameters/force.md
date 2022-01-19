---
title: 'force'
--- 

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>

It invalidates the [cache](/docs/api/basics/cache) copy associated with the resource requested, returning a new fresh copy over the target [url](/docs/api/parameters/url).

<MultiCodeEditor languages={mqlCode('https://time-is.vercel.app', { force: true })} />

When `force=true` is provided, `x-cache-status` will return **BYPASS**.
