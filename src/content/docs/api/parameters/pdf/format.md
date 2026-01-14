---
title: 'pdf › format'
description: 'Customize the paper format for PDF generation from any URL. Supports standard sizes including A4, Letter, Legal, and Tabloid for high-quality.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Iframe } from 'components/markdown/Iframe'
import { Type } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<string>'/><br/>
Default: <Type children="'A4'"/>

It sets the paper format for the [pdf](/docs/api/parameters/pdf) over the target [url](/docs/api/parameters/url).

<Iframe src="https://cdn.microlink.io/docs/caffeine.pdf" />

<MultiCodeEditorInteractive mqlCode={mqlCode('https://keygen.sh/blog/i-quit', { pdf: { format: 'A4' } })} />

The format options are:

- <Type children="'Letter'" />: 8.5in x 11in.
- <Type children="'Legal'" />: 8.5in x 14in.
- <Type children="'Tabloid'" />: 11in x 17in.
- <Type children="'Ledger'" />: 17in x 11in.
- <Type children="'A0'" />: 33.1in x 46.8in.
- <Type children="'A1'" />: 23.4in x 33.1in.
- <Type children="'A2'" />: 16.54in x 23.4in.
- <Type children="'A3'" />: 11.7in x 16.54in.
- <Type children="'A4'" />: 8.27in x 11.7in.
- <Type children="'A5'" />: 5.83in x 8.27in.
- <Type children="'A6'" />: 4.13in x 5.83in.
