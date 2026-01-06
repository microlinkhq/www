---
title: 'data'
---

import { mqlCode } from 'helpers/mql-code'
import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'

Type: <Type children='<object>'/>

it enables specific data extraction over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive 
  mqlCode={mqlCode('https://kikobeats.com', {
  data: {
    avatar: {
      selector: '#avatar',
      type: 'image',
      attr: 'src'
    }
  }
})} 
/>

<Figcaption children="The data extraction need to be defined at least with a CSS selector." />

As a result, the extracted data will be part of the `data` payload in the response:

```json
{
  "data": {
    "avatar": {
      "url": "https://d33wubrfki0l68.cloudfront.net/ad0e96f5e30e3c65b7ff31e5a637fea070356f0b/eaa58/images/avatar.jpg",
      "width": 500,
      "height": 500,
      "type": "jpg",
      "size": 53310,
      "size_pretty": "53.3 kB"
    }
  },
  "status": "success"
}
```

You can read [Microlink Query Language](/docs/mql/getting-started/overview) section to know more about how to define data extraction.
