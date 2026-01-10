---
title: 'Basic rules definition'
description: 'Learn how to define custom data extraction rules using MQL primitives: selectors, attributes, and types. Overwrite or extend default metadata to build custom APIs.'
---

import { Type } from 'components/markdown/Type'

For any [url](/docs/api/parameters/url) provided, [Microlink API](/docs/api/getting-started/overview) returns normalized data known as [meta](/docs/api/parameters/meta):

```js
const mql = require('@microlink/mql')

const { data } = await mql('https://www.meetup.com/Murcia-Frontend')

console.log(data)
```

These [data fields](/docs/api/getting-started/data-fields) values are extracted from the HTML markup, using Open Graph, JSON+LD, and a series of fallbacks based on DOM selectors.

In the same way these information is extracted, you can define your **own data rules**, being possible overwrite or extend the default data extracted, creating your own API on top of any website.

A **rule** is defined by three primitives:

- A DOM query ([selector](/docs/mql/data/selector)/[selectorAll](/docs/mql/data/selectorAll)): It defines the HTML element(s) that will be used for getting the value (e.g., <Type children="'img'"/>).
- An attribute ([attr](/docs/mql/data/attr)): It defines what field over the matched selector should be used for extracting the value (e.g., <Type children="'src'"/>).
- A data type ([type](/docs/mql/data/type)): It defines how the value extracted should be considered (e.g., <Type children="'image'"/>).

Combining these primitives, you can get any value present in any website:

```js
const mql = require('@microlink/mql')

const { data } = await mql('https://kikobeats.com', {
  data: {
    avatar: {
      selector: '#avatar',
      type: 'image',
      attr: 'src'
    },
  },
})

console.log(
  `The avatar URL is '${data.avatar.url}' (${data.avatar.size_pretty})`
)
```
