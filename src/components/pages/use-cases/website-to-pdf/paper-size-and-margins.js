export const CONTENT = {
  slug: 'website-to-pdf/paper-size-and-margins',
  head: {
    title: 'Set PDF paper size, margins and orientation via API',
    description:
      'Turn any URL into an A4, Letter or custom-size PDF: per-side margins, landscape orientation, content scale and page ranges, each one a request option.'
  },
  hero: {
    title: 'Set the paper size, margins and orientation of any URL to PDF',
    intro:
      'Set the PDF paper size, the margins and the orientation per request, so the same endpoint prints an A4 report, a Letter memo, a landscape dashboard or a receipt-sized ticket. A PDF is a printed layout decision: which paper, how much whitespace, portrait or landscape, how much content per page. The PDF API exposes each of those as an option.',
    cta: { label: 'Start with the PDF API', href: '/pdf' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'One default PDF paper size cannot fit every document',
    paragraphs: [
      'A wide dashboard printed portrait gets crushed into a column. A receipt on A4 wastes most of the sheet. A long article with almost no margin is unreadable once it reaches a printer, and a US customer expects Letter where a European one expects A4.',
      'Browsers pick one default and hide the rest behind a print dialog, which is no help to a backend job. CSS @page rules only work when you control the target page, and most HTML-to-PDF libraries make you restate the layout in their own configuration for every document type.',
      'Microlink’s PDF options map straight to the printed layout: [pdf.format](/docs/api/parameters/pdf/format) for standard paper, pdf.width and pdf.height for exact dimensions, [pdf.margin](/docs/api/parameters/pdf/margin) per side, pdf.landscape for wide content, [pdf.scale](/docs/api/parameters/pdf/scale) to fit more or less per page, and [pdf.pageRanges](/docs/api/parameters/pdf/pageRanges) to keep only the pages you want.'
    ],
    live: {
      label: 'Open a landscape Letter PDF of a wide page',
      request: {
        url: 'https://www.algolia.com',
        params: {
          pdf: { format: 'Letter', landscape: true, margin: '1cm' },
          meta: false,
          embed: 'pdf.url'
        }
      }
    }
  },
  how: {
    title: 'How to set PDF paper size, margins and orientation',
    intro:
      'Use one sizing strategy at a time: a named format for office documents, or width and height for custom media. Margins, orientation and scale compose with either. The [page size and layout guide](/docs/guides/pdf/page-size-and-layout) has a live example of each option.',
    steps: [
      {
        label: '1 · Standard paper with margins',
        sdk: `const { url } = await microlink.pdf('https://example.com/report', {
  format: 'A4',
  margin: { top: '12mm', bottom: '16mm', left: '10mm', right: '10mm' }
})`,
        note: 'A4 with asymmetric margins is the common setup for printed reports: extra room at the bottom for page numbers or binding. In the SDK the PDF options are flat; in a raw URL they use dot notation such as pdf.format=A4.'
      },
      {
        label: '2 · Landscape, scaled, first pages only',
        sdk: `const { url } = await microlink.pdf('https://example.com/dashboard', {
  format: 'Letter',
  landscape: true,
  scale: 0.8,
  pageRanges: '1-2',
  printBackground: true
})`,
        note: 'Landscape stops a wide table from being squeezed, scale 0.8 enlarges the content over the 0.6 default, and pageRanges keeps a two-page preview. printBackground includes background colors and images in the output.'
      },
      {
        label: '3 · Custom paper as a URL',
        request: {
          url: 'https://example.com/ticket',
          params: {
            pdf: { width: '80mm', height: '200mm', margin: '4mm' },
            meta: false
          }
        },
        note: 'Exact dimensions for receipts, labels or tickets, expressed in px, in, cm or mm. meta=false skips metadata extraction, which is usually the biggest speedup for a PDF-only request.'
      }
    ],
    params: [
      {
        name: 'pdf.format',
        href: '/docs/api/parameters/pdf/format',
        note: 'Letter, Legal, Tabloid, Ledger or A0 to A6. Default A4.'
      },
      {
        name: 'pdf.width',
        href: '/docs/api/parameters/pdf/width',
        note: 'Custom paper width with a unit; use it with height instead of format.'
      },
      {
        name: 'pdf.height',
        href: '/docs/api/parameters/pdf/height',
        note: 'Custom paper height with a unit.'
      },
      {
        name: 'pdf.margin',
        href: '/docs/api/parameters/pdf/margin',
        note: 'One value for all sides or an object with top, right, bottom and left. Default 0.35cm.'
      },
      {
        name: 'pdf.landscape',
        href: '/docs/api/parameters/pdf/landscape',
        note: 'Landscape orientation for wide tables, dashboards and comparison pages.'
      },
      {
        name: 'pdf.scale',
        href: '/docs/api/parameters/pdf/scale',
        note: 'Rendering zoom between 0.1 and 2. Default 0.6.'
      },
      {
        name: 'pdf.pageRanges',
        href: '/docs/api/parameters/pdf/pageRanges',
        note: 'Pages to keep, such as 1-5, 8, 11-13 or 5- for an open end. Out-of-range values fail with EPAGERANGE.'
      }
    ],
    outro:
      'Units are the CSS ones: px, in, cm and mm. Layout options shape the paper, not the page, so pair them with [mediaType](/docs/api/parameters/mediaType) when you need the on-screen design instead of the print stylesheet.'
  },
  why: {
    title: 'Why paper size and margins belong in the request',
    intro:
      'Paper decisions change per document, not per integration. Passing them per request keeps one endpoint serving every format, from [invoices](/use-cases/website-to-pdf/invoices-and-receipts) to A0 posters.',
    cards: [
      {
        kicker: 'Format or dimensions',
        title: 'Named paper for offices, exact paper for everything else.',
        body: 'Reports, contracts and memos want A4, Letter or Legal so they print as expected. Receipts, labels, certificates and tickets want exact millimeters. Both are one option, and neither needs a template.',
        note: 'Formats and custom sizes are alternatives by design; pick the one that expresses what the document is.'
      },
      {
        kicker: 'Whitespace and orientation',
        title: 'Margins and landscape make a page printable.',
        body: 'Per-side margins leave room for binding, a letterhead or a footer. Landscape stops wide comparison tables and dashboards from being squeezed into a portrait column.',
        note: 'The default margin is 0.35cm, which suits screen viewing; move to 1cm or more for anything that reaches a printer. For charts that render late, combine landscape with the waits in [PDFs of JavaScript-rendered pages](/use-cases/website-to-pdf/dynamic-content).'
      },
      {
        kicker: 'Density and length',
        title: 'scale and pageRanges control how much you print.',
        body: 'Lower scale values fit more content per page; higher values enlarge it and add pages. pageRanges keeps only the pages you need, which is how previews and partial exports stay small.',
        note: 'When not to: if the page itself is not paginated content, such as an infinite feed, a [screenshot](/screenshot) with fullPage may represent it better than a PDF.'
      }
    ]
  },
  faq: [
    {
      question: 'Which PDF paper formats are supported?',
      answer:
        'Letter, Legal, Tabloid, Ledger and A0 through A6. A4 is the default when you pass no format. For anything else, such as a receipt roll or a badge, pass pdf.width and pdf.height with a unit.'
    },
    {
      question: 'Can I set different PDF margins per side?',
      answer:
        'Yes. pdf.margin accepts a single value for all sides or an object with top, right, bottom and left, each with a unit such as 12mm or 0.5in. The default is 0.35cm on every side.'
    },
    {
      question: 'How do I export only some pages of the PDF?',
      answer:
        'Use pdf.pageRanges with a string such as 1-3 or 1-5, 8, 11-13; leave the end open, as in 5-, to print through the last page. Ranges outside the document fail with the [EPAGERANGE error code](/docs/api/basics/error-codes).'
    },
    {
      question: 'What does pdf.scale change in the generated PDF?',
      answer:
        'It zooms the rendered page before printing, from 0.1 to 2 with 0.6 as the default. Smaller values fit more content per page; larger values make it bigger and increase the number of pages. Very long documents that cannot finish in time fail with EPDFTOOLARGE, and a smaller scale is the documented fix.'
    },
    {
      question: 'How do I create a PDF with a custom page size, like a receipt or a label?',
      answer:
        'Pass pdf.width and pdf.height instead of pdf.format, each with a unit: px, in, cm or mm. An 80mm by 200mm page with a 4mm margin matches a thermal receipt, and the same approach covers certificates and shipping labels.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to print',
    headlineAccent: 'on the right paper',
    body: 'Format, margins, orientation and scale in one request. Start on the free tier and print your first A4 or Letter document today.',
    href: '/pdf',
    label: 'Print with custom paper'
  },
  howTo: {
    name: 'How to set PDF paper size, margins and orientation',
    steps: [
      {
        title: 'Choose a paper format or custom dimensions',
        description:
          'Set pdf.format to a standard size such as A4 or Letter, or pass pdf.width and pdf.height with units for a custom page like a receipt or a label.'
      },
      {
        title: 'Set the margins',
        description:
          'Pass pdf.margin as one value for all sides or as an object with top, right, bottom and left, in px, in, cm or mm.'
      },
      {
        title: 'Pick orientation, scale and page ranges',
        description:
          'Enable pdf.landscape for wide content, adjust pdf.scale between 0.1 and 2 to fit more or less per page, and use pdf.pageRanges to keep only the pages you need.'
      }
    ]
  }
}
