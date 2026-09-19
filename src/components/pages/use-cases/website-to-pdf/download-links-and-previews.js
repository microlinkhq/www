export const CONTENT = {
  slug: 'website-to-pdf/download-links-and-previews',
  head: {
    title: 'PDF download links and previews from any URL',
    description:
      'Make the API URL return the PDF itself: one-click download links, iframe previews and named files, with no server code between the page and the document.'
  },
  hero: {
    title: 'Serve PDF download links and embedded previews from a URL',
    intro:
      'A “Download PDF” button should not need a queue, a worker and a bucket. With embed=pdf.url the PDF API URL returns the document directly, so an anchor, an iframe or a Markdown link is the whole integration.',
    cta: { label: 'Start with the PDF API', href: '/pdf' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Generating a PDF is easy; delivering it is where the plumbing starts',
    paragraphs: [
      'The usual pipeline renders a document, uploads it somewhere, stores the URL and expires it later. For a download button or an in-app preview that is a lot of moving parts for a file the user looks at once.',
      'The embed parameter changes the API response: instead of JSON with a pdf.url field, the response body is the PDF with the right content type. Put that URL in an anchor for downloads, in an iframe for previews, and add filename to control the name.'
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
    title: 'One URL, three delivery modes',
    intro:
      'Keep the JSON response for backend jobs. Use the direct response for links and previews. Both come from the same request options.',
    steps: [
      {
        label: '1 · Download link',
        code: '<a\n  href="https://api.microlink.io/?url=https%3A%2F%2Fexample.com%2Freport&pdf=true&meta=false&embed=pdf.url"\n  download="report.pdf"\n>\n  Download PDF\n</a>',
        language: 'html',
        note: 'The browser fetches the API URL and receives the PDF; the download attribute names the file locally.'
      },
      {
        label: '2 · Embedded preview',
        code: '<iframe\n  src="https://api.microlink.io/?url=https%3A%2F%2Fexample.com%2Freport&pdf=true&meta=false&embed=pdf.url"\n  width="100%"\n  height="800"\n  title="Report preview"\n></iframe>',
        language: 'html',
        note: 'The same URL renders inline in an iframe for admin panels and review flows.'
      },
      {
        label: '3 · JSON for a backend job',
        sdk: "const { url, size_pretty: size } = await microlink.pdf(\n  'https://example.com/report',\n  { filename: 'report-2026-09.pdf', ttl: '7d' }\n)",
        note: 'Backend workflows keep the JSON response, store the hosted URL, and name the file for later downloads.'
      }
    ],
    params: [
      {
        name: 'embed',
        href: '/docs/api/parameters/embed',
        note: 'Return the pdf.url field as the response body instead of JSON.'
      },
      {
        name: 'filename',
        href: '/docs/api/parameters/filename',
        note: 'Readable name for the generated document. Pro plans.'
      },
      {
        name: 'filter',
        href: '/docs/api/parameters/filter',
        note: 'Keep JSON but only the pdf field when the rest is noise.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'How long the generated document stays cached, up to 31 days on Pro.'
      },
      {
        name: 'pdf.format',
        href: '/docs/api/parameters/pdf/format',
        note: 'Every PDF layout option still applies to the embedded response.'
      }
    ],
    outro:
      'Never put an API key in a public download URL. On the free endpoint none is needed; on Pro, route the request through your own domain with @microlink/proxy or @microlink/edge-proxy.'
  },
  why: {
    title: 'Why direct responses beat a storage pipeline',
    intro:
      'For documents that are viewed on demand, the API is the storage and the delivery.',
    cards: [
      {
        kicker: 'No plumbing',
        title: 'The URL is the integration.',
        body: 'An anchor tag, an iframe or a Markdown link is enough. There is no worker to run, no bucket to configure and no expiry job to write, because the response is generated and cached on request.',
        note: 'This is the same mechanism that serves [screenshots as images](/use-cases/website-screenshot/open-graph-images), so one pattern covers both outputs.'
      },
      {
        kicker: 'Cached delivery',
        title: 'The first request renders; the rest are cache hits.',
        body: 'Responses are cached for 24 hours by default and up to 31 days with ttl, so a report shared with a team renders once and downloads instantly afterwards.',
        note: 'Use force when the underlying page changed and you need a fresh document before the cache expires.'
      },
      {
        kicker: 'Still customizable',
        title: 'Layout, waits and headers apply before delivery.',
        body: 'Paper format, margins, page ranges, waits for charts and injected CSS all work with embed. The delivery mode is the last step, not a separate product.',
        note: 'When not to: documents you must keep for years belong in your own storage. Download the file from the JSON response and archive it; the CDN copy expires with the cache.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I make a link that downloads the PDF directly?',
      answer:
        'Build the API URL with pdf=true, meta=false and embed=pdf.url, and use it as the href of an anchor with the download attribute. The response is the PDF file, not JSON.'
    },
    {
      question: 'Can I preview the PDF inside my app?',
      answer:
        'Yes. Put the same embed URL in an iframe or an embed element. Browsers render it with their built-in PDF viewer.'
    },
    {
      question: 'How do I set the filename of the PDF download?',
      answer:
        'The filename parameter, on Pro plans, names the generated asset. In HTML, the download attribute on the anchor also lets you choose the local filename.'
    },
    {
      question: 'Is the PDF regenerated on every download?',
      answer:
        'No. The response is cached for 24 hours by default, so repeated downloads of the same URL are served from the cache. Adjust ttl on Pro plans or use force to regenerate on demand.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to serve',
    headlineAccent: 'PDFs from a URL',
    body: 'Download links and previews without a storage pipeline. Start on the free tier and wire your first download button today.',
    href: '/pdf',
    label: 'Build a PDF download link'
  }
}
