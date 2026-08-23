---
title: 'timeout'
description: 'Define the maximum duration allowed for the API to process a request before timing out. The timeout parameter accepts values in milliseconds or human-readable formats.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type, TypeContainer } from 'components/markdown/Type'
import { Figcaption } from 'components/markdown/Figcaption'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<number>'/></TypeContainer><br/>
Default: <Type children="30s"/> (free) / <Type children="60s"/> (pro)

It sets the maximum quantity of time allowed for the internal request lifecycle over the target [url](/docs/api/parameters/url).

The default is the maximum time available on your plan. Values above the plan ceiling are capped.

<MultiCodeEditorInteractive mqlCode={{ url: 'https://microlink.io', timeout: '10s' }} />

<Figcaption>The default value is the maximum time available on your plan: 30 seconds free, 60 seconds pro.</Figcaption>

You can specify the value in any of the following human-readable way:

```bash
https://microlink.io&timeout=10s       # 10000
https://microlink.io&timeout=10secs    # 10000
https://microlink.io&timeout=10second  # 10000
https://microlink.io&timeout=10seconds # 10000
https://microlink.io&timeout=10000     # 10000
```
