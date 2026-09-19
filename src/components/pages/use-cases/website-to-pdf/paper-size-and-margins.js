export const CONTENT = {
  slug: 'website-to-pdf/paper-size-and-margins',
  head: {
    title: 'Set PDF paper size, margins and orientation via API',
    description:
      'Control the printed layout of any URL: A4 or Letter, custom width and height, per-side margins, landscape orientation, content scale and page ranges.'
  },
  hero: {
    title: 'Control paper size, margins and orientation when printing a URL',
    intro:
      'A PDF is a printed layout decision: which paper, how much whitespace, portrait or landscape, how much content per page. The PDF API exposes each of those as an option so the same URL can become an A4 report, a Letter memo or a receipt-sized ticket.',
    cta: { label: 'Start with the PDF API', href: '/pdf' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Default paper rarely matches the document you need',
    paragraphs: [
      'A wide dashboard printed portrait gets crushed. A receipt on A4 wastes a page. A long article with zero margins is unreadable on paper. Browsers pick one default and give you no API for the rest.',
      'Microlink’s PDF options map to the printed layout: pdf.format for standard paper, pdf.width and pdf.height for exact dimensions, pdf.margin per side, pdf.landscape for wide content, pdf.scale to fit more or less per page, and pdf.pageRanges to keep only the pages you want.'
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
    title: 'Pick a format or describe the paper',
    intro:
      'Use one sizing strategy at a time: a named format for office documents, or width and height for custom media. Margins, orientation and scale compose with either.',
    steps: [
      {
        label: '1 · Standard paper with margins',
        sdk: "const { url } = await microlink.pdf('https://example.com/report', {\n  format: 'A4',\n  margin: { top: '12mm', bottom: '16mm', left: '10mm', right: '10mm' }\n})",
        note: 'A4 with asymmetric margins, the common setup for printed reports.'
      },
      {
        label: '2 · Landscape, scaled, first pages only',
        sdk: "const { url } = await microlink.pdf('https://example.com/dashboard', {\n  format: 'Letter',\n  landscape: true,\n  scale: 0.8,\n  pageRanges: '1-2'\n})",
        note: 'Wide content fits landscape; scale fits more per page; pageRanges keeps a preview short.'
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
        note: 'Exact dimensions for receipts, labels or tickets, expressed in px, in, cm or mm.'
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
        note: 'Custom paper width with a unit; use with height instead of format.'
      },
      {
        name: 'pdf.height',
        href: '/docs/api/parameters/pdf/height',
        note: 'Custom paper height with a unit.'
      },
      {
        name: 'pdf.margin',
        href: '/docs/api/parameters/pdf/margin',
        note: 'One value for all sides or top, right, bottom and left. Default 0.35cm.'
      },
      {
        name: 'pdf.landscape',
        href: '/docs/api/parameters/pdf/landscape',
        note: 'Landscape orientation for wide tables and dashboards.'
      },
      {
        name: 'pdf.scale',
        href: '/docs/api/parameters/pdf/scale',
        note: 'Rendering zoom between 0.1 and 2. Default 0.6.'
      },
      {
        name: 'pdf.pageRanges',
        href: '/docs/api/parameters/pdf/pageRanges',
        note: 'Pages to keep, such as 1-5, 8, 11-13. Out-of-range values fail with EPAGERANGE.'
      }
    ],
    outro:
      'Units are the CSS ones: px, in, cm and mm. Set either a format or a width and height so the intent of the document stays clear.'
  },
  why: {
    title: 'Why layout options belong in the request',
    intro:
      'Paper decisions change per document, not per integration. Passing them per request keeps one endpoint serving every format.',
    cards: [
      {
        kicker: 'Format or dimensions',
        title: 'Named paper for offices, exact paper for everything else.',
        body: 'Reports, contracts and memos want A4, Letter or Legal so they print as expected. Receipts, labels, certificates and tickets want exact millimetres. Both are one option.',
        note: 'Formats and custom sizes are alternatives by design; pick the one that expresses what the document is.'
      },
      {
        kicker: 'Whitespace and orientation',
        title: 'Margins and landscape make a page printable.',
        body: 'Per-side margins leave room for binding or headers. Landscape stops wide comparison tables and dashboards from being squeezed into a portrait column.',
        note: 'The default margin is 0.35cm, which suits screen viewing; move to 1cm or more for anything that reaches a printer.'
      },
      {
        kicker: 'Density and length',
        title: 'scale and pageRanges control how much you print.',
        body: 'Lower scale values fit more content per page; higher values enlarge it. pageRanges keeps only the pages you need, which is how previews and partial exports stay small.',
        note: 'When not to: if the page itself is not paginated content, such as an infinite feed, a [screenshot](/screenshot) with fullPage may represent it better than a PDF.'
      }
    ]
  },
  faq: [
    {
      question: 'Which PDF paper formats are supported?',
      answer:
        'Letter, Legal, Tabloid, Ledger and A0 through A6. A4 is the default. For anything else, pass pdf.width and pdf.height with a unit.'
    },
    {
      question: 'Can I set different PDF margins per side?',
      answer:
        'Yes. pdf.margin accepts a single value for all sides or an object with top, right, bottom and left, each with a unit such as 12mm or 0.5in.'
    },
    {
      question: 'How do I export only some pages of the PDF?',
      answer:
        'Use pdf.pageRanges with a string such as 1-3 or 1-5, 8, 11-13. Ranges outside the document fail with the EPAGERANGE error code.'
    },
    {
      question: 'What does pdf.scale do exactly?',
      answer:
        'It zooms the rendered page before printing, from 0.1 to 2 with 0.6 as the default. Smaller values fit more content per page; larger values make it bigger and increase the number of pages.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to print',
    headlineAccent: 'on the right paper',
    body: 'Format, margins, orientation and scale in one request. Start on the free tier and print your first A4 or Letter document today.',
    href: '/pdf',
    label: 'Print with custom paper'
  }
}
