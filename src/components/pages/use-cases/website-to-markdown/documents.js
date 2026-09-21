export const CONTENT = {
  slug: 'website-to-markdown/documents',
  head: {
    title: 'Convert PDF, DOCX, XLSX and PPTX URLs to Markdown',
    description:
      'Convert a PDF or office document URL to Markdown with the same request you use for web pages. Headings, lists and tables survive the conversion.'
  },
  hero: {
    title: 'Convert PDF and office document URLs to Markdown',
    intro:
      'Convert documents to Markdown with the request you already use for HTML: point it at a PDF, DOCX, XLSX or PPTX URL and readable Markdown comes back. Knowledge lives in annual reports, contracts, price sheets and slide decks as much as in web pages. One conversion path lets a RAG pipeline, a support bot or an internal search index ingest all of them.',
    cta: { label: 'Start with the Markdown API', href: '/markdown' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'PDF and DOCX files need their own parser, until they do not',
    paragraphs: [
      'Each format brings a library, a set of edge cases and a different output shape. A pipeline that handles HTML, PDF and DOCX ends up with three code paths that produce three flavors of text, and the chunker downstream has to cope with all of them.',
      'Local parsers also mean binaries to install, patch and scale. One library flattens tables, another loses heading levels, a spreadsheet reader hands you arrays instead of text. Every new format a customer uploads becomes another integration to maintain.',
      'Microlink converts a PDF with a text layer, or a docx, xlsx, pptx, odt, rtf or epub file, to an HTML document at fetch time and then serializes it exactly like a web page. The request is identical and only the [url](/docs/api/parameters/url) changes, which is the same idea behind the [file conversion API](/file-conversion).'
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
    title: 'How to convert a PDF or DOCX URL to Markdown',
    intro:
      'Nothing in the request identifies the format. Point it at a direct file URL and the conversion adapts, as the [URL to Markdown guide](/docs/guides/content-conversion/url-to-markdown) describes for every supported source.',
    steps: [
      {
        label: '1 · Convert a document with the SDK',
        sdk: "const markdown = await microlink.markdown(\n  'https://cdn.microlink.io/file-examples/sample.docx'\n)",
        note: 'The same method converts .pdf, .docx, .xlsx, .pptx, .odt, .rtf and .epub URLs and resolves to a Markdown string with the headings, lists and tables of the document.'
      },
      {
        label: '2 · Plain text when structure does not matter',
        sdk: "const text = await microlink.text(\n  'https://example.com/reports/annual-report.pdf'\n)",
        note: 'The [text method](/docs/sdk/methods/text) strips the markup and collapses whitespace, the smallest readable body for summarizers and classifiers that ignore headings and tables.'
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
        note: 'embed=markdown returns the Markdown directly with a text/markdown content type. Without it, the converted document arrives in the data.markdown field of the JSON response.'
      }
    ],
    params: [
      {
        name: 'data',
        href: '/docs/api/parameters/data',
        note: 'data.markdown.attr=markdown serializes the fetched document as Markdown.'
      },
      {
        name: 'embed',
        href: '/docs/api/parameters/embed',
        note: 'Return the Markdown field as the response body instead of JSON.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'false skips metadata detection, useful for file URLs that expose little of it. Default true.'
      },
      {
        name: 'headers',
        href: '/docs/api/parameters/headers',
        note: 'Forward authorization when the document sits behind a login. Pro plans.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Documents rarely change, so cache the conversion for up to 31 days. Pro plans.'
      }
    ],
    outro:
      'Image-only PDF scans, the legacy doc, xls and ppt formats and the ods and odp formats are not converted. The request still succeeds, but the field holds the raw response instead of Markdown, so validate the value before you index it.'
  },
  why: {
    title: 'Why one Markdown conversion path for pages and documents',
    intro:
      'Ingestion pipelines are simpler when every source produces the same shape, whether it started as HTML, a Word report or a spreadsheet.',
    cards: [
      {
        kicker: 'Uniform output',
        title: 'Web page or document, the Markdown looks the same.',
        body: 'Headings become headings, tables become tables, lists become lists. A chunker or an embedder written for web content works unchanged on a Word report or a slide deck, and your prompts never branch on file type.',
        note: 'Add [metadata frontmatter](/use-cases/website-to-markdown/with-metadata) with meta: true when the document exposes a title and an author you want to keep.'
      },
      {
        kicker: 'No local parsers',
        title: 'Conversion happens at fetch time on Microlink’s side.',
        body: 'There is nothing to install and no binary dependency to patch. The document is fetched, converted to an HTML DOM and serialized inside the same request that handles HTML pages.',
        note: 'Large documents take longer to convert. The request timeout is 30 seconds on the free endpoint and 60 seconds on Pro, and a cached conversion skips the work entirely. For a folder of files, see [bulk Markdown conversion](/use-cases/website-to-markdown/bulk-conversion).'
      },
      {
        kicker: 'Honest limits',
        title: 'Text layers convert; scans do not.',
        body: 'A PDF made of scanned images has no text to extract, and the legacy binary office formats are not supported. The request still succeeds, so check the field before you index it.',
        note: 'When not to: for scanned documents, run a dedicated OCR step first and feed the resulting text or searchable PDF back in. For the reverse direction, [saving web articles as PDF](/use-cases/website-to-pdf/archive-articles) is a PDF API job.'
      }
    ]
  },
  faq: [
    {
      question: 'Which document formats can I convert to Markdown?',
      answer:
        'PDF files with a text layer and the office formats docx, xlsx, pptx, odt, rtf and epub, all from a direct file URL. Any HTML page works as before, so the same pipeline handles pages and documents.'
    },
    {
      question: 'How do I convert a PDF URL to Markdown with an API?',
      answer:
        'Send the PDF URL as the url parameter with data.markdown.attr=markdown, or call microlink.markdown(url) in the SDK. Microlink fetches the file, converts it to an HTML document and serializes it as Markdown. Add embed=markdown to receive the Markdown as the response body.'
    },
    {
      question: 'What happens when I convert a scanned PDF to Markdown?',
      answer:
        'Image-only scans have no text layer, so the field is left as the raw response instead of Markdown. The request still returns success, which means you should check the value before indexing it and route scans to an OCR step.'
    },
    {
      question: 'Can I convert a document behind a login to Markdown?',
      answer:
        'Yes, on Pro plans. Forward the session cookie or token with x-api-header-* request headers and the file is fetched as that user, then converted. The [private pages guide](/docs/guides/common/private-pages) explains how to keep credentials out of the query string.'
    },
    {
      question: 'Do XLSX spreadsheets keep their tables in Markdown?',
      answer:
        'Yes. Tables are preserved, so a sheet arrives as Markdown tables. Very wide sheets produce wide tables, so use the text method instead when you only need the cell values.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to convert',
    headlineAccent: 'documents to Markdown',
    body: 'PDFs, Word files, spreadsheets and decks through the same request as web pages. Start on the free tier and ingest your first document today.',
    href: '/markdown',
    label: 'Convert a document'
  },
  howTo: {
    name: 'How to convert a PDF or office document URL to Markdown',
    steps: [
      {
        title: 'Convert the document with the SDK',
        description:
          'Call the Markdown method with the direct URL of a pdf, docx, xlsx, pptx, odt, rtf or epub file. It resolves to a Markdown string with headings, lists and tables preserved.'
      },
      {
        title: 'Use plain text when structure does not matter',
        description:
          'Call the text method with the same URL to get the readable text with markup stripped and whitespace collapsed.'
      },
      {
        title: 'Call the same request as a URL',
        description:
          'Request the API with url, data.markdown.attr=markdown, meta=false and embed=markdown to get the Markdown back directly as text/markdown.'
      }
    ]
  }
}
