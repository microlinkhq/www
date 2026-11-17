---
title: 'waitForTimeout'
description: 'Force the headless browser to wait for a specific duration before capturing or extracting data from the target URL.'
---

import {
  FREE_PLAN_REQUEST_TIMEOUT_SECONDS,
  PRO_PLAN_REQUEST_TIMEOUT_SECONDS
} from 'helpers/plan-timeouts'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type, TypeContainer } from 'components/markdown/Type'

Type: <TypeContainer><Type children='<string>'/> | <Type children='<number>'/></TypeContainer><br/>

It tells the browser to wait a quantity of time in milliseconds before processing the content over the target [url](/docs/api/parameters/url).

The wait cannot exceed the request [timeout](/docs/api/parameters/timeout) for your plan ({FREE_PLAN_REQUEST_TIMEOUT_SECONDS}s free, {PRO_PLAN_REQUEST_TIMEOUT_SECONDS}s pro). A larger value is ignored.

<MultiCodeEditorInteractive mqlCode={{ url: 'https://dev.to', screenshot: true, waitForTimeout: 3000 }} />

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
