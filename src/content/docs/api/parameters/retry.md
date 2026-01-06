---
title: 'retry'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<number>'/><br/>
Default: <Type children='2' />

It sets the number of exponential backoff retries to perform under an unexpected internal browser underlayer error over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={mqlCode('https://cloverapp.co', { retry: 2 })} />

The default value is optimized to perform the maximum number of retries during the response lifespan.
