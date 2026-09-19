export const CONTENT = {
  slug: 'website-to-pdf/archive-articles',
  head: {
    title: 'Save web articles as PDF for archiving',
    description:
      'Turn articles, docs and reports into readable PDFs for research archives and knowledge bases: print styles, cleaned layout, page ranges and long caching.'
  },
  hero: {
    title: 'Save web articles and documentation as PDF for your archive',
    intro:
      'Pages change and disappear. A PDF is the format that survives: readable offline, searchable, attachable to a ticket or a research folder. The PDF API prints an article the way its print stylesheet intends, with the noise removed and the pages you need.',
    cta: { label: 'Start with the PDF API', href: '/pdf' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Bookmarks rot; screenshots do not scroll',
    paragraphs: [
      'A bookmarked article can be paywalled, edited or deleted a year later. A screenshot preserves pixels but not text, so it cannot be searched or quoted. Copy-pasting into a document loses the source and the formatting.',
      'Printing to PDF keeps the text selectable, the links intact and the layout readable. Microlink renders the article with its print stylesheet, blocks ads and consent popups, and lets you narrow the column or keep just the first pages.'
    ],
    live: {
      label: 'Open an archived article as PDF',
      request: {
        url: 'https://basecamp.com/shapeup/0.3-chapter-01',
        params: {
          pdf: { format: 'A4', margin: '1cm' },
          meta: false,
          embed: 'pdf.url'
        }
      }
    }
  },
  how: {
    title: 'Print for reading, then store the file',
    intro:
      'A readable archive is a layout choice plus a retention choice. The layout comes from the request; the retention is your storage.',
    steps: [
      {
        label: '1 · Print a readable article',
        sdk: "const { url, size_pretty: size } = await microlink.pdf(\n  'https://example.com/blog/long-read',\n  {\n    format: 'A4',\n    margin: '1cm',\n    styles: ['header, footer, aside { display: none !important }']\n  }\n)",
        note: 'A4 with a centimetre margin and the chrome hidden reads well on screen and on paper.'
      },
      {
        label: '2 · Download and store it yourself',
        sdk: "import { writeFile } from 'node:fs/promises'\n\nconst { url } = await microlink.pdf('https://example.com/blog/long-read')\nconst response = await fetch(url)\nawait writeFile('archive/long-read.pdf', Buffer.from(await response.arrayBuffer()))",
        note: 'The hosted URL expires with the cache; copy the file into your own storage for permanent retention.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.com/blog/long-read',
          params: {
            pdf: { format: 'A4', margin: '1cm', pageRanges: '1-10' },
            meta: false
          }
        },
        note: 'pageRanges trims comment sections and footers that run past the article.'
      }
    ],
    params: [
      {
        name: 'pdf.format',
        href: '/docs/api/parameters/pdf/format',
        note: 'A4 or Letter for archives that may be printed.'
      },
      {
        name: 'pdf.margin',
        href: '/docs/api/parameters/pdf/margin',
        note: 'Whitespace around the text; 1cm is a comfortable reading margin.'
      },
      {
        name: 'pdf.pageRanges',
        href: '/docs/api/parameters/pdf/pageRanges',
        note: 'Keep only the pages that contain the article.'
      },
      {
        name: 'styles',
        href: '/docs/api/parameters/styles',
        note: 'Hide navigation, sidebars and related-post widgets.'
      },
      {
        name: 'mediaType',
        href: '/docs/api/parameters/mediaType',
        note: 'print by default; screen when the print stylesheet drops images you want to keep.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Cache the document up to 31 days on Pro while your job copies it.'
      }
    ],
    outro:
      'Leave meta at its default to get the page’s title, author and date in the same response; they make good filenames and index entries for the archive.'
  },
  why: {
    title: 'Why PDF is the archive format',
    intro:
      'The archive has to be readable in ten years and findable next week. PDF from a real browser render gives both.',
    cards: [
      {
        kicker: 'Text stays text',
        title: 'Searchable, quotable, selectable.',
        body: 'A browser-printed PDF keeps the article text as text, with links preserved. Full-text search in your archive works, and quotes copy cleanly, unlike an image capture.',
        note: 'For the raw content instead of a document, the [Markdown API](/markdown) returns the same article as text you can index directly.'
      },
      {
        kicker: 'Print styles are made for this',
        title: 'Publishers already design the print version.',
        body: 'Most publications ship a print stylesheet that drops navigation and widens the text column. PDFs render with the print media type, so that design is applied automatically.',
        note: 'When a site’s print stylesheet is missing or too aggressive, switch to screen and trim with styles instead.'
      },
      {
        kicker: 'You own the file',
        title: 'The API renders; your storage retains.',
        body: 'The hosted PDF is served from the cache for up to 31 days, which is enough for a job to fetch it and copy it into an archive you control, with the retention policy you need.',
        note: 'When not to: pages that require a login or sit behind bot protection need [headers](/docs/api/parameters/headers) or [proxy](/docs/api/parameters/proxy) first; and paywalled content you are not licensed to keep should not be archived at all.'
      }
    ]
  },
  faq: [
    {
      question: 'Is the text in the archived PDF searchable?',
      answer:
        'Yes. The PDF is printed from the rendered page, so text stays text and links stay links. Image-only content, such as text inside pictures, is not converted to text.'
    },
    {
      question: 'How do I keep the archived PDF permanently?',
      answer:
        'Fetch the hosted URL from the response and store the file in your own storage. The CDN copy is available for the cache lifetime, 24 hours by default and up to 31 days with ttl on Pro plans.'
    },
    {
      question: 'How do I remove comments and related posts from the archive?',
      answer:
        'Hide them with styles, for example .comments, .related { display: none !important }, or use pdf.pageRanges to keep only the pages that contain the article.'
    },
    {
      question: 'Can I archive pages behind a login or a paywall?',
      answer:
        'Technically, forward your own session with x-api-header-* request headers on a Pro plan. Whether you may keep the content depends on the publisher’s terms, so archive only what you are licensed to store.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to archive',
    headlineAccent: 'the web as PDF',
    body: 'Readable, searchable documents from any article, printed the way the publisher intended. Start on the free tier and build your first archive job today.',
    href: '/pdf',
    label: 'Archive an article'
  }
}
