export const CONTENT = {
  slug: 'website-to-pdf/archive-articles',
  head: {
    title: 'Save web articles as PDF for a searchable archive',
    description:
      'Archive web pages as readable PDFs for research folders and knowledge bases: print styles, a cleaned layout, page ranges, and a file you store yourself.'
  },
  hero: {
    title: 'Save web articles and documentation as PDF for your archive',
    intro:
      'Save a web article as PDF with one API call and keep a copy that survives edits, paywalls and dead links. Research teams, legal and compliance desks, newsroom libraries and read-it-later apps all need the same thing: a document that reads offline, can be searched and attaches to a ticket. The PDF API prints the article the way its print stylesheet intends, with the noise removed and only the pages you need.',
    cta: { label: 'Start with the PDF API', href: '/pdf' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Bookmarks rot, and a screenshot of an article cannot be searched',
    paragraphs: [
      'A bookmarked article can be paywalled, edited or deleted a year later, and the link in your notes quietly turns into a 404. What you cited is no longer what the page says, and there is no copy to check against.',
      'The common workarounds each lose something. A screenshot preserves pixels but not text, so it cannot be searched or quoted. Copy-pasting into a document drops the source, the images and the formatting. Printing by hand from the browser works for one page and drags the ads, the cookie banner and the comment section along.',
      'Printing to PDF from a real browser keeps the text selectable and the layout readable. Microlink renders the article with its print stylesheet, blocks ads and consent popups through [adblock](/features/adblock), lets you hide what remains with [styles](/docs/api/parameters/styles), and trims the document with [pdf.pageRanges](/docs/api/parameters/pdf/pageRanges).'
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
    title: 'How to save a web article as PDF and store the file',
    intro:
      'A readable archive is a layout choice plus a retention choice. The layout comes from the request; the retention is your storage. The [clean PDF recipe](/use-cases/website-to-pdf/clean-layout) goes deeper on removing page chrome.',
    steps: [
      {
        label: '1 · Print a readable article',
        sdk: `const { url, size_pretty: size } = await microlink.pdf(
  'https://example.com/blog/long-read',
  {
    format: 'A4',
    margin: '1cm',
    styles: ['header, footer, aside { display: none !important }']
  }
)`,
        note: 'A4 with a one-centimeter margin and the chrome hidden reads well on screen and on paper. The response gives you the hosted url plus the file size.'
      },
      {
        label: '2 · Download and store it yourself',
        sdk: `import { writeFile } from 'node:fs/promises'

const { url } = await microlink.pdf('https://example.com/blog/long-read')
const response = await fetch(url)
await writeFile('archive/long-read.pdf', Buffer.from(await response.arrayBuffer()))`,
        note: 'The hosted URL is for delivery, not for retention. Copy the file into storage you control, such as a bucket or a document store, under the retention policy your archive needs.'
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
        note: 'pageRanges trims the comment sections and footers that run past the article. A range that falls outside the document fails with EPAGERANGE, so size it to the article instead of guessing high.'
      }
    ],
    params: [
      {
        name: 'pdf.format',
        href: '/docs/api/parameters/pdf/format',
        note: 'A4 (the default) or Letter for archives that may be printed.'
      },
      {
        name: 'pdf.margin',
        href: '/docs/api/parameters/pdf/margin',
        note: 'Whitespace around the text. Default 0.35cm; 1cm is a comfortable reading margin.'
      },
      {
        name: 'pdf.pageRanges',
        href: '/docs/api/parameters/pdf/pageRanges',
        note: 'Keeps only the pages that contain the article, for example 1-10.'
      },
      {
        name: 'styles',
        href: '/docs/api/parameters/styles',
        note: 'Hides navigation, sidebars, comments and related-post widgets with injected CSS.'
      },
      {
        name: 'mediaType',
        href: '/docs/api/parameters/mediaType',
        note: 'print by default for PDFs; screen when the print stylesheet drops images you want to keep.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Keeps the response cached from 1 minute to 31 days while your job copies the file. Pro plans.'
      }
    ],
    outro:
      'Leave [meta](/docs/api/parameters/meta) at its default to get the page’s title, author, publisher and date in the same response; they make good filenames and index entries for the archive.'
  },
  why: {
    title: 'Why PDF is the right format to archive web pages',
    intro:
      'The archive has to be readable in ten years and findable next week. A PDF printed from a real browser render gives you both.',
    cards: [
      {
        kicker: 'Text stays text',
        title: 'Searchable, quotable, selectable.',
        body: 'A browser-printed PDF keeps the article text as text rather than pixels. Full-text search in your archive works, and quotes copy cleanly, unlike an image capture of the same page.',
        note: 'For the raw content instead of a document, the [Markdown API](/markdown) returns the same article as text you can index directly, and [clean Markdown from any URL](/use-cases/website-to-markdown/clean-content) shows how to scope it to the article body.'
      },
      {
        kicker: 'Print styles are made for this',
        title: 'Publishers already design the print version.',
        body: 'Many publications ship a print stylesheet that drops navigation and widens the text column. PDFs render with the print media type by default, so that design is applied without any option.',
        note: 'When a site’s print stylesheet is missing or too aggressive, switch [mediaType](/docs/api/parameters/mediaType) to screen and trim with styles instead.'
      },
      {
        kicker: 'You own the file',
        title: 'The API renders; your storage retains.',
        body: 'The response is cached for 24 hours by default and up to 31 days with ttl, which gives a job plenty of time to fetch the document and copy it into an archive you control, under the retention policy you need.',
        note: 'When not to: pages that require a login or sit behind bot protection need the headers or proxy parameters first, both on Pro plans. Paywalled content you are not licensed to keep should not be archived at all.'
      }
    ]
  },
  faq: [
    {
      question: 'Is the text in an archived PDF searchable?',
      answer:
        'Yes. The PDF is printed from the rendered page, so text stays text and you can search, select and quote it. Image-only content, such as text inside pictures, is not converted to text.'
    },
    {
      question: 'How do I keep an archived PDF permanently?',
      answer:
        'Fetch the hosted URL from the response and store the file in your own storage. The API response is cached for 24 hours by default, and up to 31 days with ttl on Pro plans, which is a delivery window, not a retention policy.'
    },
    {
      question: 'How do I remove comments and related posts from the article PDF?',
      answer:
        'Hide them with styles, for example .comments, .related { display: none !important }, or use pdf.pageRanges to keep only the pages that contain the article. The [page preparation guide](/docs/guides/pdf/page-preparation) lists the other cleanup options.'
    },
    {
      question: 'Can I archive pages behind a login or a paywall as PDF?',
      answer:
        'Technically yes: forward your own session with x-api-header-* request headers on a Pro plan, as the [private pages guide](/docs/guides/pdf/private-pages) shows. Whether you may keep the content depends on the publisher’s terms, so archive only what you are licensed to store.'
    },
    {
      question: 'Can I save the title, author and date together with the PDF?',
      answer:
        'Yes. Leave meta enabled, which is the default, and the same response includes the normalized title, author, publisher, date and description next to the pdf field. Use them to name the file and to build the index of your archive. Set meta to false only when you want the fastest possible PDF-only request.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to archive',
    headlineAccent: 'the web as PDF',
    body: 'Readable, searchable documents from any article, printed the way the publisher intended. Start on the free tier and build your first archive job today.',
    href: '/pdf',
    label: 'Archive an article'
  },
  howTo: {
    name: 'How to save a web article as PDF for an archive',
    steps: [
      {
        title: 'Print the article with a readable layout',
        description:
          'Request the article URL with pdf enabled, A4 format and a 1cm margin, and hide headers, footers and sidebars with a styles rule.'
      },
      {
        title: 'Trim the document',
        description:
          'Use pdf.pageRanges to keep only the pages that contain the article, and switch mediaType to screen if the print stylesheet drops images you want.'
      },
      {
        title: 'Download and store the file',
        description:
          'Fetch the hosted PDF URL from the response and write the file to your own storage, using the title, author and date from the metadata as the index entry.'
      }
    ]
  }
}
