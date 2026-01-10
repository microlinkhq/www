---
title: 'ttl'
description: 'Define the cache expiration time for your requests to balance data freshness and response speed. The ttl parameter supports human-readable formats.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type, TypeContainer } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<number>'/></TypeContainer><br/>
Default: <Type children="'24h'"/>

It sets the maximum quantity of time a resource can be cached before be considered as expired over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={mqlCode('https://microlink.io', { ttl: '1d' })} />

The value provided need to be at least **1 minute** and not higher than **31 days**, being supported the following formats:

- as number in milliseconds (e.g., <Type children="86400000"/>).
- as humanized representation of the number (e.g., <Type children="'24h'"/>).

The following humanized number variations are supported:

```bash
https://microlink.io&ttl=1d        # 86400000
https://microlink.io&ttl=1day      # 86400000
https://microlink.io&ttl=1days     # 86400000

https://microlink.io&ttl=1h        # 3600000
https://microlink.io&ttl=1hour     # 3600000
https://microlink.io&ttl=1hours    # 3600000

https://microlink.io&ttl=90s       # 90000
https://microlink.io&ttl=90secs    # 90000
https://microlink.io&ttl=90second  # 90000
https://microlink.io&ttl=90seconds # 90000
```

Additionally, we provide <Type children="'min'"/> and <Type children="'max'"/> aliases:

```bash
https://microlink.io&ttl=min     # equivalent to `1m`
https://microlink.io&ttl=max     # equivalent to `31d`
```

The purpose of this API parameter is to adapt our caching layer based on your necessities:

- If you are targetting a URL that changes very often and response time is not critical for you, a small value will work better.
- If you are targetting a URL that doesn't change too much or you want to maximize cache hits, getting faster response time, a higher value works better.

The value provided will reflected as `x-cache-ttl` as part of the response headers.
