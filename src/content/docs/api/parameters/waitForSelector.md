---
title: 'waitForSelector'
description: 'Pause browser execution until a specific element is present in the DOM. The waitForSelector parameter ensures that dynamic content is fully rendered before extracting data.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type, TypeContainer } from 'components/markdown/Type'

Type: <TypeContainer><Type children='<string>'/></TypeContainer><br/>

It tells the browser to wait until a specific [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) appears over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={{ url: 'https://dev.to', screenshot: true, waitForSelector: 'main' }} />
