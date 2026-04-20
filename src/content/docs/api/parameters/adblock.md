---
title: 'adblock'
description: 'Improve performance and reduce response times by blocking non-essential advertisements, trackers, and cookie banners.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type } from 'components/markdown/Type'

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

It allows/disallows third party sub-requests related to advertisements, trackers, or cookie consent services over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive 
  mqlCode={{ url: 'https://www.youtube.com', adblock: true }} 
/>

These third party requests aren't essential; they generally bloat the response time and clutter the interface with intrusive cookie banners.

The adblock engine world-in-class powered by [Cliqz](https://github.com/cliqz-oss/adblocker).