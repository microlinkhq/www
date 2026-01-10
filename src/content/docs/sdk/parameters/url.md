---
title: 'url'
description: 'Learn how to use the required url parameter to extract data, capture screenshots, or generate PDFs from any target website using the Microlink API.'
---

import { DemoIntegrations } from 'components/markdown/DemoIntegrations'
import { Type } from 'components/markdown/Type'

**required**

Type: <Type children='<string>'/>

The target URL for getting information based on the content.

<DemoIntegrations caption="`url` is the only required api parameter." />

It should be reachable by the service. For example, if you want to extract content behind a login panel, the URL provided should contain the authentication step as part of the query string.

If the URL provided has query strings, it should be properly escaped in order to not interfere with the rest of the API Parameters.

Also, the protocol matters: If the target URL has relative URLs inside (e.g., images or videos), then the URL provided will be used to resolve relative URLs into absolute.

This means that if you provide an HTTPS URL, then all relative URLs will be resolved under SSL.
