const vertical = 'website-to-markdown'
const category = 'Markdown API'

export const WEBSITE_TO_MARKDOWN = [
  {
    slug: 'website-to-markdown/with-metadata',
    vertical,
    category,
    name: 'Markdown with metadata frontmatter',
    blurb:
      'Title, author, date, description, word count and reading time on top of the converted page.',
    keywords: [
      'url to markdown with metadata',
      'markdown frontmatter api',
      'page metadata and content'
    ],
    related: [
      'website-to-markdown/clean-content',
      'website-to-markdown/documents',
      'website-metadata/custom-fields'
    ]
  },
  {
    slug: 'website-to-markdown/clean-content',
    vertical,
    category,
    name: 'Clean Markdown, no boilerplate',
    blurb:
      'Scope the conversion to the article body and drop navigation, ads and widgets before converting.',
    keywords: [
      'clean markdown from url',
      'readability api markdown',
      'remove navigation markdown'
    ],
    related: [
      'website-to-markdown/with-metadata',
      'website-to-markdown/javascript-rendered-pages',
      'website-to-pdf/clean-layout'
    ]
  },
  {
    slug: 'website-to-markdown/llm-context',
    vertical,
    category,
    name: 'LLM context from any URL',
    blurb:
      'Markdown, links, emails, metadata and tech stack from one URL, composed into one context object.',
    keywords: [
      'website context for llm',
      'url to context agent',
      'extract links and emails api'
    ],
    related: [
      'website-to-markdown/clean-content',
      'website-to-markdown/with-metadata',
      'website-to-markdown/blocked-sites'
    ]
  },
  {
    slug: 'website-to-markdown/documents',
    vertical,
    category,
    name: 'PDF and office documents to Markdown',
    blurb:
      'The same request converts PDF, DOCX, XLSX, PPTX and more into readable Markdown.',
    keywords: [
      'pdf url to markdown api',
      'docx to markdown api',
      'convert documents to markdown'
    ],
    related: [
      'website-to-markdown/with-metadata',
      'website-to-markdown/bulk-conversion',
      'website-to-markdown/clean-content'
    ]
  },
  {
    slug: 'website-to-markdown/youtube-transcripts',
    vertical,
    category,
    name: 'YouTube transcripts as Markdown',
    blurb:
      'Caption transcripts from watch, share or shorts URLs, with the video title, author and date.',
    keywords: [
      'youtube transcript api',
      'youtube captions to markdown',
      'video transcript markdown'
    ],
    related: [
      'website-to-markdown/blocked-sites',
      'website-to-markdown/documents',
      'website-to-markdown/llm-context'
    ]
  },
  {
    slug: 'website-to-markdown/javascript-rendered-pages',
    vertical,
    category,
    name: 'Markdown from JavaScript-rendered pages',
    blurb:
      'Render single-page apps in a real browser, wait for the content, then convert the finished DOM.',
    keywords: [
      'spa to markdown api',
      'convert react app to markdown',
      'prerender markdown'
    ],
    related: [
      'website-to-markdown/clean-content',
      'website-to-markdown/blocked-sites',
      'website-screenshot/dynamic-content'
    ]
  },
  {
    slug: 'website-to-markdown/blocked-sites',
    vertical,
    category,
    name: 'Markdown from bot-protected pages',
    blurb:
      'One option routes the conversion through the built-in proxy when a site blocks automated access.',
    keywords: [
      'scrape cloudflare site markdown',
      'markdown api proxy',
      'convert blocked page to markdown'
    ],
    related: [
      'website-to-markdown/javascript-rendered-pages',
      'website-to-markdown/bulk-conversion',
      'website-screenshot/built-in-proxy',
      'website-metadata/blocked-sites'
    ]
  },
  {
    slug: 'website-to-markdown/bulk-conversion',
    vertical,
    category,
    name: 'Bulk Markdown conversion with caching',
    blurb:
      'Thousands of URLs in parallel, cached per URL and refreshed in the background for cheap re-indexing.',
    keywords: [
      'bulk url to markdown',
      'crawl to markdown api',
      'markdown rag pipeline'
    ],
    related: [
      'website-to-markdown/documents',
      'website-to-markdown/blocked-sites',
      'website-to-pdf/batch-generation'
    ]
  }
]
