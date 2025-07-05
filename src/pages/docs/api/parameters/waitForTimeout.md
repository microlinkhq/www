---
title: 'waitForTimeout'
--- 

Type: <TypeContainer><Type children='<string>'/> | <Type children='<number>'/></TypeContainer><br/>

It tells the browser to wait a quantity of time in milliseconds before processing the content over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={mqlCode('https://dev.to', { screenshot: true, waitForTimeout: 3000 })} />

The value provided in the following formats:

- as number in milliseconds (e.g., <Type children="3000"/>).
- as humanized representation of the number (e.g., <Type children="'3s'"/>).

The following humanized number variations are supported:

```bash
https://microlink.io&waitForTimeout=3s       # 3000
https://microlink.io&waitForTimeout=3secs    # 3000
https://microlink.io&waitForTimeout=3second  # 3000
https://microlink.io&waitForTimeout=3seconds # 3000
```
