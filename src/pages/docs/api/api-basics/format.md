---
title: 'Format'
--- 

All the responses are served as **JSON**.

The response format is based on [JSend](https://labs.omniti.com/labs/jsend) specification. That means every API response have the following fields:

### status

Type: `string`

The status associated with the response. The value can be:

- **success**: The request was resolved successfully. Associated with `2xx` HTTP status code.
- **fail**: The request failed. Probably a missing or wrong value for a parameter. Associated with `4xx` HTTP status code.
- **error**: Uh oh. Something unexpected happened. Associated with `5xx` HTTP status code.

A simple rule here is, if the request was resolved successfully, then the `success` status will be associated. In other case check for `fail` or `error`.

### data

Type: `object`

The API response payload.

### message

*Optional*<br />
Type: `string`

An human readable extra information, such as an error message or explanation.

### more

*Optional*<br />
Type: `string`

An additional link pointing to external resource for reading more about `message`.


