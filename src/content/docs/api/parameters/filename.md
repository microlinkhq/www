---
title: 'filename'
description: Define a custom name for generated assets like screenshots or PDFs using the filename parameter.
isPro: true
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<string>'/>

It defines the filename to be associated with a generated asset over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={mqlCode('https://padlet.com/padlets/mjl7vtq8a26g/exports/print', { pdf: true, filename: 'solar-system' })} />

This query parameter should be combined with [screenshot](/docs/api/parameters/screenshot) or [pdf](/docs/api/parameters/pdf) to generate downloadable files with custom names. 

When used together, it sets the name of the generated asset, making it easier to organize and identify them.
