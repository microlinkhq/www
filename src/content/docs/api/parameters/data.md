---
title: 'data'
description: 'Define custom data extraction rules using CSS selectors with the Microlink Query Language (MQL). Extract specific content like prices, reviews, or any structured data from any URL.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Figcaption } from 'components/markdown/Figcaption'
import { Type } from 'components/markdown/Type'

Type: <Type children='<object>'/>

It enables specific data extraction over the target [url](/docs/api/parameters/url), turning Microlink API into a powerful web scraping tool.

<MultiCodeEditorInteractive 
  mqlCode={{
    url: 'https://kikobeats.com',
    data: {
    avatar: {
      selector: '#avatar',
      type: 'image',
      attr: 'src'
    }
  }
  }} 
/>

<Figcaption children="The data extraction needs to be defined at least with a CSS selector." />

## Response Structure

The extracted data will be part of the `data` payload in the response:

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

## Rule Properties

Each data rule accepts the following properties:

| Property | Type | Description |
|----------|------|-------------|
| [selector](/docs/mql/data/selector) | `string` | CSS selector to target the element |
| [selectorAll](/docs/mql/data/selectorAll) | `string` | CSS selector to target multiple elements |
| [attr](/docs/mql/data/attr) | `string` | HTML attribute to extract (e.g., `href`, `src`) |
| [type](/docs/mql/data/type) | `string` | Data type for validation (`string`, `number`, `date`, `image`, `url`, etc.) |
| [evaluate](/docs/mql/data/evaluate) | `function` | JavaScript function to transform the extracted value |

## Extracting Multiple Fields

You can extract multiple data fields in a single request:

<MultiCodeEditorInteractive 
  mqlCode={{
    url: 'https://news.ycombinator.com',
    data: {
    headline: { selector: '.titleline > a', attr: 'text' },
    link: { selector: '.titleline > a', attr: 'href', type: 'url' },
    score: { selector: '.score', attr: 'text' }
  }
  }} 
/>

<Figcaption children="Extract title, link, and score from Hacker News." />

## Extracting Collections

Use [selectorAll](/docs/mql/data/selectorAll) to extract multiple matching elements as an array:

<MultiCodeEditorInteractive 
  mqlCode={{
    url: 'https://news.ycombinator.com',
    data: {
    stories: { 
      selectorAll: '.titleline > a', 
      attr: 'text' 
    }
  }
  }} 
/>

<Figcaption children="Extract all story titles as an array." />

## Nested Data Extraction

For complex DOM structures, use [nested rules](/docs/mql/rules/nested) to organize your data hierarchically:

<MultiCodeEditorInteractive 
  mqlCode={{
    url: 'https://github.com/microlinkhq',
    data: {
    repos: { 
      selectorAll: '.repo',
      data: {
        name: { selector: 'a', attr: 'text' },
        description: { selector: 'p', attr: 'text' }
      }
    }
  }
  }} 
/>

## Fallback Values

Define [fallback rules](/docs/mql/rules/fallbacks) to ensure data extraction succeeds even when the primary selector fails:

<MultiCodeEditorInteractive 
  mqlCode={{
    url: 'https://example.com',
    data: {
    title: [
      { selector: 'meta[property="og:title"]', attr: 'content' },
      { selector: 'title', attr: 'text' },
      { selector: 'h1', attr: 'text' }
    ]
  }
  }} 
/>

<Figcaption children="Try multiple selectors in order until one succeeds." />

You can read the [Microlink Query Language](/docs/mql/getting-started/overview) documentation to learn more about defining data extraction rules.
