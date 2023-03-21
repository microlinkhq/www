---
title: 'waitForTimeout'
--- 

Type: <TypeContainer><Type children='<number>'/></TypeContainer><br/>

It tells the browser to wait a quantity of time in milliseconds before processing the content over the target [url](/docs/api/parameters/url).

<MultiCodeEditor languages={mqlCode('https://dev.to', { screenshot: true, waitForTimeout: 3000 })} />

You can specify the value in any of the following human-readable way:

```bash
https://microlink.io&waitForTiemout=3s       # 3000
https://microlink.io&waitForTiemout=3secs    # 3000
https://microlink.io&waitForTiemout=3second  # 3000
https://microlink.io&waitForTiemout=3seconds # 3000
https://microlink.io&waitForTiemout=3000     # 3000
```
