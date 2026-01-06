---
title: 'timeout'
---

import { mqlCode } from 'helpers/mql-code'
import { Figcaption } from 'components/markdown/Figcaption'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<number>'/></TypeContainer><br/>
Default: <Type children="28s"/>

It sets the maximum quantity of time allowed for the internal request lifecycle over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={mqlCode('https://microlink.io', { timeout: '10s' })} />

<Figcaption>The default value is the maximum time available.</Figcaption>

You can specify the value in any of the following human-readable way:

```bash
https://microlink.io&timeout=10s       # 10000
https://microlink.io&timeout=10secs    # 10000
https://microlink.io&timeout=10second  # 10000
https://microlink.io&timeout=10seconds # 10000
https://microlink.io&timeout=10000     # 10000
```
