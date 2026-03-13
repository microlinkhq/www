---
title: 'Delivery and embedding'
description: 'Choose how to consume Microlink PDFs. Use JSON plus CDN URLs in backend workflows, or return the PDF directly for download links, previews, and embedded viewers.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

After a PDF is generated, you can either consume it as JSON or make the API URL return the PDF file directly. The right delivery mode depends on whether you are building an application workflow, a download link, or an embedded PDF preview.

## Two delivery models

| When you need | Use | Result |
|---------------|-----|--------|
| PDF metadata inside an app or backend workflow | Default JSON response | Read the asset from `data.pdf.url` |
| A direct PDF response for downloads or previews | `embed: 'pdf.url'` | The API URL itself returns the PDF file |

## JSON plus CDN URL

The default response gives you PDF metadata plus the CDN-hosted asset URL:

<MultiCodeEditorInteractive height={220} mqlCode={{
  url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications',
  pdf: true,
  meta: false
}} />

<Figcaption>Use <code>data.pdf.url</code> when your application already expects JSON and wants to keep the response metadata around.</Figcaption>

This is the best fit for backend jobs, queues, notifications, and app code that stores the PDF URL after generation.

## Direct PDF with embed

Set `embed: 'pdf.url'` to make the API URL return the PDF file itself:

<MultiCodeEditorInteractive height={220} mqlCode={{
  url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications',
  pdf: true,
  meta: false,
  embed: 'pdf.url'
}} />

<Figcaption>The API URL becomes a direct PDF URL that can power download links, iframe previews, or embedded viewers.</Figcaption>

See the <Link href='/docs/api/parameters/embed' children='embed reference' /> for the full behavior and supported fields.

## HTML download links

Use the API URL directly in an anchor element when you want a one-click download:

```html
<a
  href="https://api.microlink.io?url=https://rauchg.com/2014/7-principles-of-rich-web-applications&pdf&meta=false&embed=pdf.url"
  download="article.pdf"
>
  Download PDF
</a>
```

This is the simplest way to add on-demand PDF downloads to a product, dashboard, or internal tool.

## Embedded PDF previews

Use the same URL inside an `<iframe>` or `<embed>` element when you want an in-app preview:

```html
<iframe
  src="https://api.microlink.io?url=https://rauchg.com/2014/7-principles-of-rich-web-applications&pdf&meta=false&embed=pdf.url"
  width="100%"
  height="800"
  title="PDF preview"
></iframe>
```

This works well for admin panels, invoice previews, or internal document review flows.

## Markdown and CMS links

Markdown usually links to PDFs rather than rendering them inline:

```md
[Download the PDF](https://api.microlink.io?url=https://rauchg.com/2014/7-principles-of-rich-web-applications&pdf&meta=false&embed=pdf.url)
```

## Delivery with customization

All PDF parameters still work when you use `embed`. For example, a letter-sized PDF with margins:

<MultiCodeEditorInteractive height={240} mqlCode={{
  url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications',
  pdf: {
    format: 'Letter',
    margin: '1cm'
  },
  meta: false,
  embed: 'pdf.url'
}} />

<Figcaption>Customize the final PDF and return it directly in a single URL.</Figcaption>

## Filtering JSON responses

If you still want JSON but only need the `pdf` field, use `filter`:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications', pdf: true, meta: false, filter: 'pdf' }} />

<Figcaption>The response only includes the <code>pdf</code> field. This is useful for JSON workflows, but unnecessary when you already use <code>embed</code>.</Figcaption>

See the <Link href='/docs/api/parameters/filter' children='filter reference' /> for dot notation and multiple fields.

## Custom filename <ProBadge />

Use `filename` when the generated asset needs a readable, user-facing name:

<MultiCodeEditorInteractive height={220} mqlCode={{ url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications', pdf: true, meta: false, filename: 'rich-web-applications' }} />

<Figcaption>Helpful for downloads, archives, generated reports, and user-visible document workflows.</Figcaption>

## Security considerations

If the request needs an API key, cookies, or authorization headers, do not expose those values in client-side download or preview URLs. Keep the request on the server side or protect it with a proxy:

- Use <Link href='https://github.com/microlinkhq/proxy' children='@microlink/proxy' /> for self-hosted protection.
- Use <Link href='https://github.com/microlinkhq/edge-proxy' children='@microlink/edge-proxy' /> for edge-deployed protection.

Read more in the <Link href='/docs/api/basics/authentication' children='authentication' /> docs and the [private pages](/docs/guides/pdf/private-pages) guide.

## Next step

Learn how to optimize PDF requests for freshness, cache behavior, and response time in [caching and performance](/docs/guides/pdf/caching-and-performance).
