---
title: 'staleTtl'
description: 'Optimize API performance by serving cached content while simultaneously refreshing it in the background.'
isPro: true
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type, TypeContainer } from 'components/markdown/Type'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<number>'/> | <Type children='<boolean>'/></TypeContainer><br/>
Default: <Type children="false"/>

It enables serve a stale response while a background refresh cache copy is being generated over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={{ url: 'https://microlink.io', ttl: '1d', staleTtl: 0 }} />

The value provided can't be higher than [ttl](/docs/api/parameters/ttl), being supported the following formats:

- as number in milliseconds (e.g., <Type children="86400000"/>).
- as humanized representation of the number (e.g., <Type children="'24h'"/>).

`false` turns it off, which is the default. `true`, an empty `staleTtl`, or any value that is not one of these formats is rejected with [EINVALQUERY](/docs/api/basics/error-codes#einvalquery).

The following humanized number variations are supported:

```bash
https://microlink.io&staleTtl=1d        # 86400000
https://microlink.io&staleTtl=1day      # 86400000
https://microlink.io&staleTtl=1days     # 86400000

https://microlink.io&staleTtl=1h        # 3600000
https://microlink.io&staleTtl=1hour     # 3600000
https://microlink.io&staleTtl=1hours    # 3600000

https://microlink.io&staleTtl=90s       # 90000
https://microlink.io&staleTtl=90secs    # 90000
https://microlink.io&staleTtl=90second  # 90000
https://microlink.io&staleTtl=90seconds # 90000
```

A good pattern is to set `staleTtl=0` to always revalidate in the background under expiration, maximizing the cache usage serving the last cache copy generated while the revalidation will refresh it.
