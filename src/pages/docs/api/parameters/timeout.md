---
title: 'timeout'
---

Type: <TypeContainer><Type children='<string>'/> | <Type children='<number>'/></TypeContainer><br/>
Default: <Type children="25s"/>

It sets the maximum quantity of time allowed for the internal request lifecycle over the target [url](/docs/api/parameters/url).

<MultiCodeEditor languages={mqlCode('https://microlink.io', { timeout: '25s' })} />

<Figcaption>The default value is the maximum time available.</Figcaption>

You can specify the value in any of the following human-readable way:

```bash
https://microlink.io&timeout=25s       # 25000
https://microlink.io&timeout=25secs    # 25000
https://microlink.io&timeout=25second  # 25000
https://microlink.io&timeout=25seconds # 25000
https://microlink.io&timeout=25000     # 25000
```
