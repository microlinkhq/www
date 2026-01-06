---
title: 'ping'
---

import { mqlCode } from 'helpers/mql-code'
import { Figcaption } from 'components/markdown/Figcaption'

Type: <TypeContainer><Type children='<boolean>'/> | <Type children='<object>'/></TypeContainer><br/>
Default: <Type children='true'/>

It ensures that any URL present on the response payload is publicly reachable.

<MultiCodeEditorInteractive mqlCode={mqlCode('https://microlink.io', { ping: true })} />

<Figcaption>By default, any URL present on the response payload hasve been verified as reachable.</Figcaption>

You can disable this behavior in a partial way:

<MultiCodeEditorInteractive mqlCode={mqlCode('https://microlink.io', { ping: { audio: false } })} />

<Figcaption>Avoid to ping `audio` URLs extracted.</Figcaption>

or in a total way:

<MultiCodeEditorInteractive mqlCode={mqlCode('https://microlink.io', { ping: false })} />

<Figcaption>Keep the raw data URLs extracted, no pinging them.</Figcaption>

Keep in mind if you decide to disable this behavior in a partial or total way you should handle non reachable URLs from your side.
