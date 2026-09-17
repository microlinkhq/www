const vertical = 'website-to-pdf'
const category = 'PDF API'

export const WEBSITE_TO_PDF = [
  {
    slug: 'website-to-pdf/invoices-and-receipts',
    vertical,
    category,
    name: 'PDF invoices from authenticated pages',
    blurb:
      'Print the invoice page your app already renders: forward the session, hide the chrome, name the file.',
    keywords: [
      'generate invoice pdf from url',
      'html invoice to pdf api',
      'pdf of authenticated page'
    ],
    related: [
      'website-to-pdf/download-links-and-previews',
      'website-to-pdf/batch-generation',
      'website-screenshot/behind-login'
    ]
  },
  {
    slug: 'website-to-pdf/clean-layout',
    vertical,
    category,
    name: 'Clean PDFs without ads or banners',
    blurb:
      'Ads and consent popups blocked by default, sticky navigation removed with one CSS rule, print or screen styles.',
    keywords: [
      'webpage to pdf without ads',
      'clean pdf from url',
      'remove cookie banner pdf'
    ],
    related: [
      'website-to-pdf/archive-articles',
      'website-to-pdf/paper-size-and-margins',
      'website-screenshot/block-cookie-banners-and-ads',
      'website-to-markdown/clean-content'
    ]
  },
  {
    slug: 'website-to-pdf/paper-size-and-margins',
    vertical,
    category,
    name: 'Paper size, margins and orientation',
    blurb:
      'A4 or Letter, custom dimensions, per-side margins, landscape, scale and page ranges from one request.',
    keywords: [
      'html to pdf a4 api',
      'pdf margins api',
      'landscape pdf from url'
    ],
    related: [
      'website-to-pdf/clean-layout',
      'website-to-pdf/download-links-and-previews',
      'website-to-pdf/archive-articles'
    ]
  },
  {
    slug: 'website-to-pdf/download-links-and-previews',
    vertical,
    category,
    name: 'PDF download links and previews',
    blurb:
      'Make the API URL return the PDF itself for one-click downloads and iframe previews.',
    keywords: [
      'pdf download link from url',
      'embed pdf preview iframe',
      'url to pdf direct response'
    ],
    related: [
      'website-to-pdf/invoices-and-receipts',
      'website-to-pdf/paper-size-and-margins',
      'website-screenshot/open-graph-images'
    ]
  },
  {
    slug: 'website-to-pdf/archive-articles',
    vertical,
    category,
    name: 'Archive web articles as PDF',
    blurb:
      'Readable, searchable PDFs of articles and docs, printed with their print styles and trimmed to the pages you need.',
    keywords: [
      'save web article as pdf api',
      'archive web pages pdf',
      'web page to pdf for research'
    ],
    related: [
      'website-to-pdf/clean-layout',
      'website-to-pdf/paper-size-and-margins',
      'website-to-pdf/batch-generation',
      'website-to-markdown/clean-content'
    ]
  },
  {
    slug: 'website-to-pdf/batch-generation',
    vertical,
    category,
    name: 'PDFs in bulk',
    blurb:
      'Thousands of documents from URLs in one job: parallel requests, server-side retries and per-document caching.',
    keywords: [
      'bulk pdf generation api',
      'generate thousands of pdfs',
      'batch html to pdf'
    ],
    related: [
      'website-to-pdf/invoices-and-receipts',
      'website-to-pdf/dynamic-content',
      'website-screenshot/traffic-spikes',
      'website-to-markdown/bulk-conversion'
    ]
  },
  {
    slug: 'website-to-pdf/dynamic-content',
    vertical,
    category,
    name: 'PDFs of JavaScript-rendered pages',
    blurb:
      'Wait for charts and single-page apps to render, open tabs and sections, then print.',
    keywords: [
      'pdf of spa api',
      'print dashboard to pdf',
      'wait for chart pdf'
    ],
    related: [
      'website-to-pdf/batch-generation',
      'website-to-pdf/clean-layout',
      'website-screenshot/dynamic-content'
    ]
  }
]
