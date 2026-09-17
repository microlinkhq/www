export const CONTENT = {
  slug: 'website-to-markdown/documents',
  head: {
    title: 'Convert PDF, DOCX, XLSX and PPTX URLs to Markdown',
    description:
      'Point the same Markdown request at a PDF or office document URL and get readable Markdown back: headings, lists and tables preserved.'
  },
  hero: {
    title: 'Convert PDF and office document URLs to Markdown',
    intro:
      'Knowledge lives in PDFs, Word files, spreadsheets and slide decks as much as in web pages. The Markdown API converts a document URL with the same request you use for HTML, so one pipeline ingests both.',
    cta: { label: 'Start with the Markdown API', href: '/markdown' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Documents need their own parser, until they do not',
    paragraphs: [
      'Each format brings a library, a set of edge cases and a different output shape. A pipeline that handles HTML, PDF and DOCX ends up with three code paths that produce three flavours of text.',
      'Microlink converts a PDF with a text layer, or a docx, xlsx, pptx, odt, rtf or epub file, to an HTML document at fetch time and then serializes it exactly like a web page. The request is identical; only the URL changes.'
    ],
    live: {
      label: 'Open the live Markdown of a DOCX file',
      request: {
        url: 'https://cdn.microlink.io/file-examples/sample.docx',
        params: {
          data: { markdown: { attr: 'markdown' } },
          meta: false,
          embed: 'markdown'
        }
      }
    }
  },
  how: {
    title: 'Same request, different URL',
    intro:
      'Nothing in the request identifies the format. Point it at a file URL and the conversion adapts.',
    steps: [
      {
        label: '1 · Convert a document with the SDK',
        sdk: "const markdown = await microlink.markdown(\n  'https://cdn.microlink.io/file-examples/sample.docx'\n)",
        note: 'The same method converts .pdf, .docx, .xlsx, .pptx, .odt, .rtf and .epub URLs.'
      },
      {
        label: '2 · Plain text when structure does not matter',
        sdk: "const text = await microlink.text(\n  'https://example.com/reports/annual-report.pdf'\n)",
        note: 'text() returns the smallest readable body for summarizers that ignore headings and tables.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://cdn.microlink.io/file-examples/sample.docx',
          params: {
            data: { markdown: { attr: 'markdown' } },
            meta: false,
            embed: 'markdown'
          }
        },
        note: 'embed returns the Markdown directly with a text/markdown content type.'
      }
    ],
    params: [
      {
        name: 'data',
        href: '/docs/api/parameters/data',
        note: 'data.markdown.attr=markdown converts the fetched document.'
      },
      {
        name: 'embed',
        href: '/docs/api/parameters/embed',
        note: 'Return Markdown or text as the response body.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'false skips metadata detection for file URLs that expose little of it.'
      },
      {
        name: 'headers',
        href: '/docs/api/parameters/headers',
        note: 'Forward authorization when the document sits behind a login. Pro plans.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Documents rarely change; cache the conversion for days on Pro plans.'
      }
    ],
    outro:
      'Image-only PDF scans, the legacy doc, xls and ppt formats and the ods and odp formats are not converted: the request succeeds, but the field holds the raw response instead of Markdown.'
  },
  why: {
    title: 'Why one conversion path',
    intro:
      'Ingestion pipelines are simpler when every source produces the same shape.',
    cards: [
      {
        kicker: 'Uniform output',
        title: 'Web page or document, the Markdown looks the same.',
        body: 'Headings become headings, tables become tables, lists become lists. A chunker or an embedder written for web content works unchanged on a Word report or a slide deck.',
        note: 'Add [frontmatter](/use-cases/website-to-markdown/with-metadata) with meta: true when the document exposes a title and an author you want to keep.'
      },
      {
        kicker: 'No local parsers',
        title: 'Conversion happens at fetch time on Microlink’s side.',
        body: 'There is nothing to install and no binary dependency to patch. The document is fetched, converted to an HTML DOM and serialized inside the same request that handles HTML pages.',
        note: 'Large documents take longer; the request timeout is 30 seconds on the free tier and 60 on Pro.'
      },
      {
        kicker: 'Honest limits',
        title: 'Text layers convert; scans do not.',
        body: 'A PDF made of scanned images has no text to extract, and the legacy binary office formats are not supported. The request still succeeds, so check the field before you index it.',
        note: 'When not to: for OCR of scanned documents, run a dedicated OCR step first and feed the resulting text or PDF back in.'
      }
    ]
  },
  faq: [
    {
      question: 'Which document formats convert to Markdown?',
      answer:
        'PDF files with a text layer and the office formats docx, xlsx, pptx, odt, rtf and epub. Any HTML page works as before.'
    },
    {
      question: 'What happens with a scanned PDF?',
      answer:
        'Image-only scans have no text layer, so the field is left as the raw response instead of Markdown. The request still returns success; check the value before indexing it.'
    },
    {
      question: 'Can I convert a document behind a login?',
      answer:
        'Yes, on Pro plans. Forward the session or token with x-api-header-* request headers and the file is fetched as that user, then converted.'
    },
    {
      question: 'Do spreadsheets keep their tables in Markdown?',
      answer:
        'Tables are preserved in the Markdown output, so a sheet arrives as Markdown tables. Very wide sheets produce wide tables; use text() when you only need the cell values.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to convert',
    headlineAccent: 'documents to Markdown',
    body: 'PDFs, Word files, spreadsheets and decks through the same request as web pages. Start on the free tier and ingest your first document today.',
    href: '/markdown',
    label: 'Convert a document'
  }
}
