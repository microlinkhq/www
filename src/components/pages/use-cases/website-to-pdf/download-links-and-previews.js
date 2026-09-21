export const CONTENT = {
  slug: 'website-to-pdf/download-links-and-previews',
  head: {
    title: 'Create PDF download links and previews from any URL',
    description:
      'Make the API URL return the PDF itself: one-click download links, iframe previews and named files, with no queue, worker or bucket in between.'
  },
  hero: {
    title: 'Create a PDF download link or an embedded preview from any URL',
    intro:
      'Create a PDF download link from any URL with one query parameter. With embed=pdf.url the PDF API URL returns the document directly, so an anchor, an iframe or a Markdown link is the whole integration. It fits “Download as PDF” buttons, report previews in admin panels and printable versions of docs pages.',
    cta: { label: 'Start with the PDF API', href: '/pdf' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'A PDF download link should not need a queue and a bucket',
    paragraphs: [
      'Generating a PDF is the easy half. The usual pipeline then uploads the file somewhere, stores the URL, signs it, and expires it later. For a download button or an in-app preview, that is a lot of moving parts for a file the user opens once.',
      'Skipping the pipeline has its own costs. Rendering inside the request handler ties up your web server for seconds per document, and client-side libraries that rebuild the page as a PDF in the browser rarely match the fonts and layout of the real page.',
      'The [embed](/docs/api/parameters/embed) parameter changes the API response: instead of JSON with a pdf.url field, the response body is the PDF with the right content type. Put that URL in an anchor for downloads, in an iframe for previews, and add [filename](/docs/api/parameters/filename) to control the name. The response is cached, so the second click does not render again.'
    ],
    live: {
      label: 'Open the direct PDF response',
      request: {
        url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications',
        params: { pdf: true, meta: false, embed: 'pdf.url' }
      }
    }
  },
  how: {
    title: 'How to create a PDF download link from a URL',
    intro:
      'Keep the JSON response for backend jobs. Use the direct response for links and previews. Both come from the same request options, and the [delivery and embedding guide](/docs/guides/pdf/embedding) compares the two modes side by side.',
    steps: [
      {
        label: '1 · Download link',
        code: '<a\n  href="https://api.microlink.io/?url=https%3A%2F%2Fexample.com%2Freport&pdf=true&meta=false&embed=pdf.url"\n  download="report.pdf"\n>\n  Download PDF\n</a>',
        language: 'html',
        note: 'The browser fetches the API URL and receives the PDF, not JSON; the download attribute names the file locally. The free endpoint needs no API key, so this works in public HTML as is.'
      },
      {
        label: '2 · Embedded preview',
        code: '<iframe\n  src="https://api.microlink.io/?url=https%3A%2F%2Fexample.com%2Freport&pdf=true&meta=false&embed=pdf.url"\n  width="100%"\n  height="800"\n  title="Report preview"\n></iframe>',
        language: 'html',
        note: 'The same URL renders inline with the browser’s built-in PDF viewer, which suits admin panels, invoice previews and document review flows.'
      },
      {
        label: '3 · JSON for a backend job',
        sdk: `const { url, size_pretty: size } = await microlink.pdf(
  'https://example.com/report',
  { filename: 'report-2026-09.pdf', ttl: '7d' }
)`,
        note: 'Backend workflows keep the JSON response: url is the CDN-hosted document, next to its type and size. filename and ttl are Pro options, so this call runs with your API key on the server.'
      }
    ],
    params: [
      {
        name: 'embed',
        href: '/docs/api/parameters/embed',
        note: 'Returns the pdf.url field as the response body, with the headers of the original file, instead of JSON.'
      },
      {
        name: 'filename',
        href: '/docs/api/parameters/filename',
        note: 'Readable name for the generated document. Pro plans.'
      },
      {
        name: 'filter',
        href: '/docs/api/parameters/filter',
        note: 'Keeps the JSON response but only the pdf field when the rest is noise.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'How long the response stays cached, from 1 minute to 31 days. Default 24 hours. Pro plans.'
      },
      {
        name: 'pdf.format',
        href: '/docs/api/parameters/pdf/format',
        note: 'Every PDF layout option still applies to the embedded response. Default A4.'
      }
    ],
    outro:
      'Never put an API key in a public download URL. On the free endpoint none is needed; on Pro, route the request through your own domain with @microlink/proxy or @microlink/edge-proxy, as the [authentication docs](/docs/api/basics/authentication) describe.'
  },
  why: {
    title: 'Why a direct PDF response beats a storage pipeline',
    intro:
      'For documents that are viewed on demand, the API is the renderer, the cache and the delivery. Your code holds a URL.',
    cards: [
      {
        kicker: 'No plumbing',
        title: 'The URL is the integration.',
        body: 'An anchor tag, an iframe or a Markdown link is enough. There is no worker to run, no bucket to configure and no expiry job to write, because the response is generated and cached on request.',
        note: 'This is the same mechanism that serves [screenshots as Open Graph images](/use-cases/website-screenshot/open-graph-images), so one pattern covers both outputs.'
      },
      {
        kicker: 'Cached delivery',
        title: 'The first request renders; the rest are cache hits.',
        body: 'Responses are cached for 24 hours by default and up to 31 days with ttl, so a report shared with a team renders once and downloads instantly afterwards. Cache hits do not count against your quota.',
        note: 'Use [force](/docs/api/parameters/force) when the underlying page changed and you need a fresh document before the cache expires. The [configurable cache feature](/features/ttl) explains ttl and staleTtl together.'
      },
      {
        kicker: 'Still customizable',
        title: 'Layout, waits and styles apply before delivery.',
        body: 'Paper format, margins, page ranges, waits for charts and injected CSS all work with embed. The delivery mode is the last step of the request, not a separate product.',
        note: 'When not to: documents you must keep for years belong in your own storage, so download the file from the JSON response and archive it. Private pages need forwarded headers, which must stay server-side; see [PDF invoices from authenticated pages](/use-cases/website-to-pdf/invoices-and-receipts).'
      }
    ]
  },
  faq: [
    {
      question: 'How do I make a link that downloads a web page as a PDF?',
      answer:
        'Build the API URL with the encoded page URL, pdf=true, meta=false and embed=pdf.url, and use it as the href of an anchor with the download attribute. The response is the PDF file, not JSON, so the browser saves it directly. You can test the output first with the [website to PDF converter](/tools/website-to-pdf).'
    },
    {
      question: 'Can I embed a PDF preview of a URL in an iframe?',
      answer:
        'Yes. Put the same embed URL in the src of an iframe or an embed element and the browser renders it with its built-in PDF viewer. Embedded assets are served with a strict Content-Security-Policy and nosniff headers, so the preview cannot run scripts under the API host.'
    },
    {
      question: 'How do I set the filename of the PDF download?',
      answer:
        'In HTML, the download attribute on the anchor sets the local filename and works on every plan. The filename parameter names the generated asset itself and requires a Pro plan; without one the request fails with the EFILENAME error code.'
    },
    {
      question: 'Is the PDF regenerated on every download?',
      answer:
        'No. The response is cached for 24 hours by default, so repeated downloads of the same URL are served from the cache and do not count against your quota. Adjust ttl on Pro plans, or pass force to regenerate on demand; the x-cache-status header tells you whether a request was a HIT, a MISS or a BYPASS, as the [cache docs](/docs/api/basics/cache) explain.'
    },
    {
      question: 'Is it safe to put a PDF API URL in public HTML?',
      answer:
        'Yes on the free endpoint, which needs no credentials: the URL only contains the public page address and the PDF options. Never expose an API key, a cookie or an authorization header in client-side markup. For Pro features, keep the request on your server or put @microlink/proxy or @microlink/edge-proxy in front of it.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to serve',
    headlineAccent: 'PDFs from a URL',
    body: 'Download links and previews without a storage pipeline. Start on the free tier and wire your first download button today.',
    href: '/pdf',
    label: 'Build a PDF download link'
  },
  howTo: {
    name: 'How to create a PDF download link from a URL',
    steps: [
      {
        title: 'Build the API URL with embed',
        description:
          'Compose the API URL with the encoded page address, pdf=true, meta=false and embed=pdf.url so the response body is the PDF file instead of JSON.'
      },
      {
        title: 'Use it as a download link',
        description:
          'Set the API URL as the href of an anchor and add the download attribute to name the file on the user’s device.'
      },
      {
        title: 'Or embed it as a preview',
        description:
          'Set the same URL as the src of an iframe to show the document inline with the browser’s PDF viewer.'
      },
      {
        title: 'Keep JSON for backend jobs',
        description:
          'Call the API without embed from your server to get the hosted PDF URL, type and size, and add filename and ttl on a Pro plan.'
      }
    ]
  }
}
