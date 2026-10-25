Function bodies travel in the URL, so large ones are compressed before they are sent. The SDK does it for you: `microlink.function()` compresses the code with brotli when the runtime supports it, falls back to gzip otherwise, and prefixes the payload with `br#` or `gz#`. The call stays the same.

If you call the API directly, compress the function body and prefix the payload with the alias of the algorithm:

- `br#` for brotli
- `gz#` for gzip
- `lz#` for lz-string

The free plan's 1024 bytes code size limit applies to the code once decompressed, so compression keeps the URL short but does not raise the limit. Read [how to compress](/blog/compress) to know more.
