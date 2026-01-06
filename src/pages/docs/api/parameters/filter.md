---
title: 'filter'
---

import { mqlCode } from 'helpers/mql-code'
import { Figcaption } from 'components/markdown/Figcaption'

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
