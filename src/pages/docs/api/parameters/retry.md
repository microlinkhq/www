---
title: 'retry'
--- 

Type: <Type children='<number>'/><br/>
Default: <Type children='2' />

It sets the number of exponential backoff retries to perform under an unexpected browser error.

The default value is optimized to perform the maximum number of retries during the response lifespan.

This query parameter changes the internal browser underlayer and probably you don't need to tweak over it.
