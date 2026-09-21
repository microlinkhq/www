const vertical = 'website-to-pdf'
const category = 'PDF API'

export const WEBSITE_TO_PDF = [
  {
    slug: 'website-to-pdf/invoices-and-receipts',
    vertical,
    category,
    name: 'PDF invoices from authenticated pages',
    cta: 'Generate PDF invoices',
    blurb:
      'Print the invoice page your app already renders: forward the session, hide the chrome, name the file.',
    keywords: [
      'generate invoice pdf from url',
      'html invoice to pdf api',
      'pdf of authenticated page',
      'receipt pdf api'
    ],
    related: [
      'website-to-pdf/download-links-and-previews',
      'website-to-pdf/batch-generation',
      'website-to-pdf/paper-size-and-margins',
      'website-to-pdf/clean-layout',
      'website-to-pdf/dynamic-content',
      'website-screenshot/behind-login'
    ]
  },
  {
    slug: 'website-to-pdf/clean-layout',
    vertical,
    category,
    name: 'Clean PDFs without ads or banners',
    cta: 'Export clean PDFs',
    blurb:
      'Get a document, not a browser tab: ads and consent popups blocked by default, sticky chrome removed with one CSS rule.',
    keywords: [
      'webpage to pdf without ads',
      'clean pdf from url',
      'remove cookie banner pdf',
      'print stylesheet pdf api'
    ],
    related: [
      'website-to-pdf/archive-articles',
      'website-to-pdf/paper-size-and-margins',
      'website-to-pdf/dynamic-content',
      'website-to-pdf/download-links-and-previews',
      'website-screenshot/block-cookie-banners-and-ads',
      'website-to-markdown/clean-content'
    ]
  },
  {
    slug: 'website-to-pdf/paper-size-and-margins',
    vertical,
    category,
    name: 'Paper size, margins and orientation',
    cta: 'Set paper size and margins',
    blurb:
      'Print any URL on A4, Letter or custom paper, with per-side margins, landscape, scale and page ranges.',
    keywords: [
      'pdf paper size api',
      'html to pdf a4 api',
      'pdf margins api',
      'landscape pdf from url',
      'custom pdf page size'
    ],
    related: [
      'website-to-pdf/clean-layout',
      'website-to-pdf/invoices-and-receipts',
      'website-to-pdf/dynamic-content'
    ]
  },
  {
    slug: 'website-to-pdf/download-links-and-previews',
    vertical,
    category,
    name: 'PDF download links and previews',
    cta: 'Create PDF download links',
    blurb:
      'Turn the API URL into the PDF itself for one-click download links and iframe previews, with no storage pipeline.',
    keywords: [
      'pdf download link from url',
      'embed pdf preview iframe',
      'url to pdf direct response',
      'download web page as pdf button'
    ],
    related: [
      'website-to-pdf/invoices-and-receipts',
      'website-to-pdf/paper-size-and-margins',
      'website-to-pdf/batch-generation',
      'website-to-pdf/archive-articles',
      'website-to-pdf/clean-layout',
      'website-screenshot/open-graph-images'
    ]
  },
  {
    slug: 'website-to-pdf/archive-articles',
    vertical,
    category,
    name: 'Archive web articles as PDF',
    cta: 'Archive articles as PDF',
    blurb:
      'Keep readable, searchable PDFs of articles and docs, printed with their print styles and trimmed to the pages you need.',
    keywords: [
      'save web article as pdf api',
      'archive web pages pdf',
      'web page to pdf for research',
      'save webpage as pdf programmatically'
    ],
    related: [
      'website-to-pdf/clean-layout',
      'website-to-pdf/paper-size-and-margins',
      'website-to-pdf/batch-generation',
      'website-to-pdf/download-links-and-previews',
      'website-to-markdown/clean-content',
      'website-to-markdown/with-metadata'
    ]
  },
  {
    slug: 'website-to-pdf/batch-generation',
    vertical,
    category,
    name: 'PDFs in bulk',
    cta: 'Generate PDFs in bulk',
    blurb:
      'Render thousands of documents from URLs in one job: parallel requests, server-side retries and per-document caching.',
    keywords: [
      'bulk pdf generation api',
      'generate thousands of pdfs',
      'batch html to pdf',
      'bulk url to pdf'
    ],
    related: [
      'website-to-pdf/invoices-and-receipts',
      'website-to-pdf/dynamic-content',
      'website-to-pdf/download-links-and-previews',
      'website-to-pdf/archive-articles',
      'website-screenshot/traffic-spikes',
      'website-to-markdown/bulk-conversion'
    ]
  },
  {
    slug: 'website-to-pdf/dynamic-content',
    vertical,
    category,
    name: 'PDFs of JavaScript-rendered pages',
    cta: 'Render dynamic pages to PDF',
    blurb:
      'Print dashboards and single-page apps after they render: wait for the chart, open tabs and sections, then print.',
    keywords: [
      'javascript rendered page to pdf',
      'print dashboard to pdf',
      'pdf of single page app',
      'wait for chart pdf'
    ],
    related: [
      'website-to-pdf/batch-generation',
      'website-to-pdf/clean-layout',
      'website-to-pdf/paper-size-and-margins',
      'website-to-pdf/invoices-and-receipts',
      'website-screenshot/dynamic-content',
      'website-to-markdown/javascript-rendered-pages'
    ]
  }
]
