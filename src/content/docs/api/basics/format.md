---
title: 'Format'
description: 'Understand the Microlink API response format based on the JSend specification. Learn about status codes, JSON data payloads, and how to handle error messages.'
---

import { Type } from 'components/markdown/Type'

All the responses are served as **JSON**.

The response format is based on [JSend](https://labs.omniti.com/labs/jsend) specification. That means every API response have the following fields:

<H2 titleize={false}>status</H2>

Type: <Type children='<string>'/>

The status associated with the response. The value can be:

- <Type children="'success'"/>: The request was resolved successfully. Associated with Type: <Type children='2xx'/> HTTP status code.
- <Type children="'fail'"/>: The request failed. Probably a missing or wrong value for a parameter. Associated with <Type children='4xx'/>` HTTP status code.
- <Type children="'error'"/>: Uh oh. Something unexpected happened. Associated with <Type children='5xx'/> HTTP status code.

A simple rule here is, if the request was resolved successfully, then the <Type children="'success'"/> status will be associated. In other case check for <Type children="'fail'"/> or <Type children="'error'"/>.

<H2 titleize={false}>data</H2>

Type: <Type children='<object>'/>

The API response payload.

<H2 titleize={false}>message</H2>

*Optional*<br />
Type: <Type children='<string>'/>

An human readable extra information, such as an error message or explanation.

<H2 titleize={false}>more</H2>

*Optional*<br />
Type: <Type children='<string>'/>

An additional link pointing to external resource for reading more about `message`.


