---
title: 'filter'
description: Reduce response bandwidth and optimize payload size by selecting specific data fields.
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Figcaption } from 'components/markdown/Figcaption'
import { Type } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<string>'/>

A comma-separated list of data fields to pick from the response payload over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={mqlCode('https://news.ycombinator.com', { filter: 'url,title' })} />

<Figcaption children='You can use dot notation to reference a nested data field of the response payload.' />

Then the data payload is going to just get these data fields.

```json
{
  "status": "success",
  "data": {
    "url": "https://news.ycombinator.com/",
    "title": "Hacker News"
  }
}
```

This parameter has been designed to make API payload tiny as possible, improving response bandwidth timing.
