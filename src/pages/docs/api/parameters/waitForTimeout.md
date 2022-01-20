---
title: 'waitForTimeout'
--- 

Type: <TypeContainer><Type children='<number>'/></TypeContainer><br/>

It tells the browser to wait a quantity of time in milliseconds before processing the content over the target [url](/docs/api/parameters/url).

<MultiCodeEditor languages={mqlCode('https://dev.to', { screenshot: true, waitForTimeout: 1500 })} />

You can specify the value in any of the following human-readable way:

```bash
https://microlink.io&timeout=15s       # 1500
https://microlink.io&timeout=15secs    # 1500
https://microlink.io&timeout=15second  # 1500
https://microlink.io&timeout=15seconds # 1500
https://microlink.io&timeout=1500      # 1500
```
