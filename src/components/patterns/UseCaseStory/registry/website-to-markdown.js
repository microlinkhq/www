const vertical = 'website-to-markdown'
const category = 'Markdown API'

export const WEBSITE_TO_MARKDOWN = [
  {
    slug: 'website-to-markdown/with-metadata',
    vertical,
    category,
    name: 'Markdown with metadata frontmatter',
    cta: 'Add metadata frontmatter',
    blurb:
      'Get each page as Markdown with a YAML frontmatter block: title, author, date, word count and reading time.',
    keywords: [
      'url to markdown with metadata',
      'markdown frontmatter api',
      'yaml frontmatter from url',
      'page metadata and content'
    ],
    related: [
      'website-to-markdown/clean-content',
      'website-to-markdown/documents',
      'website-to-markdown/llm-context',
      'website-to-markdown/bulk-conversion',
      'website-metadata/custom-fields',
      'website-metadata/only-the-fields-you-need'
    ]
  },
  {
    slug: 'website-to-markdown/clean-content',
    vertical,
    category,
    name: 'Clean Markdown, no boilerplate',
    cta: 'Get clean Markdown',
    blurb:
      'Convert only the article body: one selector keeps navigation, ads and widgets out of the Markdown.',
    keywords: [
      'clean markdown from url',
      'remove navigation from markdown',
      'article body to markdown',
      'readability api markdown'
    ],
    related: [
      'website-to-markdown/with-metadata',
      'website-to-markdown/javascript-rendered-pages',
      'website-to-markdown/llm-context',
      'website-to-markdown/bulk-conversion',
      'website-to-pdf/clean-layout',
      'website-screenshot/block-cookie-banners-and-ads'
    ]
  },
  {
    slug: 'website-to-markdown/llm-context',
    vertical,
    category,
    name: 'LLM context from any URL',
    cta: 'Build LLM context',
    blurb:
      'Compose Markdown, links, emails, metadata and tech stack from one URL into a context object for your agent.',
    keywords: [
      'url to llm context',
      'website context for llm',
      'web page to markdown for ai agents',
      'extract links and emails api'
    ],
    related: [
      'website-to-markdown/clean-content',
      'website-to-markdown/with-metadata',
      'website-to-markdown/blocked-sites',
      'website-to-markdown/youtube-transcripts',
      'website-to-markdown/documents',
      'website-metadata/custom-fields'
    ]
  },
  {
    slug: 'website-to-markdown/documents',
    vertical,
    category,
    name: 'PDF and office documents to Markdown',
    cta: 'Convert documents to Markdown',
    blurb:
      'Convert PDF, DOCX, XLSX and PPTX URLs to readable Markdown with the same request you use for web pages.',
    keywords: [
      'pdf url to markdown api',
      'convert documents to markdown',
      'docx to markdown api',
      'xlsx and pptx to markdown'
    ],
    related: [
      'website-to-markdown/with-metadata',
      'website-to-markdown/bulk-conversion',
      'website-to-markdown/clean-content',
      'website-to-markdown/llm-context',
      'website-to-markdown/youtube-transcripts',
      'website-to-pdf/archive-articles'
    ]
  },
  {
    slug: 'website-to-markdown/youtube-transcripts',
    vertical,
    category,
    name: 'YouTube transcripts as Markdown',
    cta: 'Get YouTube transcripts',
    blurb:
      'Get the caption transcript of any watch, share or shorts URL as Markdown, with the video title, author and date.',
    keywords: [
      'youtube transcript api',
      'youtube captions to markdown',
      'youtube video to text',
      'video transcript markdown'
    ],
    related: [
      'website-to-markdown/blocked-sites',
      'website-to-markdown/llm-context',
      'website-to-markdown/with-metadata',
      'website-to-markdown/documents',
      'website-to-markdown/bulk-conversion',
      'website-screenshot/built-in-proxy'
    ]
  },
  {
    slug: 'website-to-markdown/javascript-rendered-pages',
    vertical,
    category,
    name: 'Markdown from JavaScript-rendered pages',
    cta: 'Convert JavaScript-rendered pages',
    blurb:
      'Render single-page apps in a real browser, wait for the content, then convert the finished DOM to Markdown.',
    keywords: [
      'spa to markdown api',
      'javascript rendered page to markdown',
      'convert react app to markdown',
      'prerender markdown'
    ],
    related: [
      'website-to-markdown/clean-content',
      'website-to-markdown/blocked-sites',
      'website-to-markdown/bulk-conversion',
      'website-screenshot/dynamic-content',
      'website-to-pdf/dynamic-content',
      'website-metadata/javascript-rendered-pages'
    ]
  },
  {
    slug: 'website-to-markdown/blocked-sites',
    vertical,
    category,
    name: 'Markdown from bot-protected pages',
    cta: 'Convert bot-protected pages',
    blurb:
      'Convert pages behind Cloudflare, DataDome or Akamai: one option routes the request through the built-in proxy.',
    keywords: [
      'convert blocked page to markdown',
      'scrape cloudflare site to markdown',
      'markdown api proxy',
      'bot protected website to markdown'
    ],
    related: [
      'website-to-markdown/javascript-rendered-pages',
      'website-to-markdown/bulk-conversion',
      'website-to-markdown/youtube-transcripts',
      'website-to-markdown/llm-context',
      'website-screenshot/built-in-proxy',
      'website-metadata/blocked-sites'
    ]
  },
  {
    slug: 'website-to-markdown/bulk-conversion',
    vertical,
    category,
    name: 'Bulk Markdown conversion with caching',
    cta: 'Convert URLs in bulk',
    blurb:
      'Convert thousands of URLs in parallel, cached per URL and refreshed in the background for cheap re-indexing.',
    keywords: [
      'bulk url to markdown',
      'convert urls to markdown in bulk',
      'crawl to markdown api',
      'markdown rag pipeline'
    ],
    related: [
      'website-to-markdown/documents',
      'website-to-markdown/blocked-sites',
      'website-to-markdown/clean-content',
      'website-to-pdf/batch-generation',
      'website-screenshot/traffic-spikes',
      'website-metadata/high-volume-link-previews'
    ]
  }
]
