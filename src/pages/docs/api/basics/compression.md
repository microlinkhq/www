---
title: 'Compression'
---

The compression algorithms **brotli** and **gzip** are supported.

If you are performing the API requests using [SDK](/docs/sdk/getting-started/overview/) or [MQL](/docs/mql/getting-started/overview/), compression will be enabled by default.

Otherwise, ensure to specify what compression you want to use using [Accept-Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding) header.

<MultiCodeEditor languages={mqlCode("https://github.com")} /> 

You can check what compression algorithm has been used after the HTTP negotiation seeing `content-encoding` response header.
