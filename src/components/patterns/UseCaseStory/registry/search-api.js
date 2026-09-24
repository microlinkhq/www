const vertical = 'search-api'
const category = 'Search API'

export const SEARCH_API = [
  {
    slug: 'search-api/news-monitoring',
    vertical,
    category,
    name: 'Brand and media monitoring from Google News',
    cta: 'Monitor news mentions',
    blurb: 'Query Google News by brand, country and time window and get headline, publisher and ISO 8601 date for every article.',
    keywords: [
      'google news api',
      'brand mention monitoring api',
      'media monitoring api',
      'news search api'
    ],
    related: [
      'search-api/rag-grounding',
      'search-api/rank-tracking',
      'search-api/serp-to-markdown',
      'search-api/patent-search',
      'website-to-markdown/clean-content',
      'website-to-markdown/llm-context'
    ]
  },
  {
    slug: 'search-api/price-comparison',
    vertical,
    category,
    name: 'Price comparison from Google Shopping',
    cta: 'Compare Shopping prices',
    blurb: 'Get every merchant Google Shopping lists for a product, with a numeric price, the merchant name and the rating, per country.',
    keywords: [
      'google shopping api',
      'product price monitoring api',
      'competitor price tracking',
      'price comparison api'
    ],
    related: [
      'search-api/image-search',
      'search-api/local-business-leads',
      'search-api/rank-tracking',
      'search-api/news-monitoring',
      'website-metadata/custom-fields',
      'website-screenshot/proxy-geolocation'
    ]
  },
  {
    slug: 'search-api/local-business-leads',
    vertical,
    category,
    name: 'Local business leads from Google Maps',
    cta: 'Find local business leads',
    blurb: 'Turn a category and a city into a lead list with phone, website, hours, rating and Place ID, then pull emails from each website.',
    keywords: [
      'google maps scraper api',
      'local business data api',
      'business listings api',
      'google maps leads'
    ],
    related: [
      'search-api/keyword-research',
      'search-api/price-comparison',
      'search-api/rank-tracking',
      'search-api/news-monitoring',
      'website-to-markdown/llm-context',
      'website-metadata/custom-fields'
    ]
  },
  {
    slug: 'search-api/rank-tracking',
    vertical,
    category,
    name: 'Google rank tracking by country',
    cta: 'Track rankings by country',
    blurb: 'Compute where a domain ranks for each keyword in each country from ordered results, and keep the history in your own database.',
    keywords: [
      'keyword rank checker api',
      'serp position tracking',
      'google rank by country',
      'check google ranking api'
    ],
    related: [
      'search-api/keyword-research',
      'search-api/serp-to-markdown',
      'search-api/news-monitoring',
      'search-api/price-comparison',
      'website-screenshot/proxy-geolocation',
      'website-metadata/localized-metadata'
    ]
  },
  {
    slug: 'search-api/keyword-research',
    vertical,
    category,
    name: 'Keyword research with Google Autocomplete',
    cta: 'Research keywords',
    blurb: 'Expand a seed into the queries people type, plus related searches and People Also Ask questions, per country.',
    keywords: [
      'google autocomplete api',
      'keyword suggestions api',
      'google suggest api',
      'people also ask api'
    ],
    related: [
      'search-api/rank-tracking',
      'search-api/serp-to-markdown',
      'search-api/rag-grounding',
      'search-api/local-business-leads',
      'website-to-markdown/llm-context',
      'website-metadata/custom-fields'
    ]
  },
  {
    slug: 'search-api/scholar-citations',
    vertical,
    category,
    name: 'Papers and citation counts from Google Scholar',
    cta: 'Search Scholar papers',
    blurb: 'Collect papers with year, citation count and PDF link from Google Scholar, merge queries by ID and read the shortlist as Markdown.',
    keywords: [
      'google scholar api',
      'citation count api',
      'literature review automation',
      'academic paper search api'
    ],
    related: [
      'search-api/patent-search',
      'search-api/rag-grounding',
      'search-api/keyword-research',
      'website-to-markdown/documents',
      'website-to-markdown/llm-context',
      'website-to-pdf/archive-articles'
    ]
  },
  {
    slug: 'search-api/patent-search',
    vertical,
    category,
    name: 'Prior art search in Google Patents',
    cta: 'Search patents',
    blurb: 'Search Google Patents from code and get inventor, assignee, priority, filing and grant dates and a PDF link for every filing.',
    keywords: [
      'google patents api',
      'prior art search api',
      'patent monitoring',
      'patent search api'
    ],
    related: [
      'search-api/scholar-citations',
      'search-api/news-monitoring',
      'search-api/serp-to-markdown',
      'search-api/rag-grounding',
      'website-to-markdown/documents',
      'website-to-pdf/archive-articles'
    ]
  },
  {
    slug: 'search-api/image-search',
    vertical,
    category,
    name: 'Image search with full-size URLs and dimensions',
    cta: 'Search Google Images',
    blurb: 'Search images by keyword and get the full-resolution URL, width and height, thumbnail, source page and credit for every result.',
    keywords: [
      'google image search api',
      'image search api with dimensions',
      'image search api',
      'full resolution image search'
    ],
    related: [
      'search-api/price-comparison',
      'search-api/keyword-research',
      'search-api/serp-to-markdown',
      'website-metadata/brand-colors',
      'website-metadata/missing-or-wrong-metadata',
      'website-screenshot/open-graph-images'
    ]
  },
  {
    slug: 'search-api/rag-grounding',
    vertical,
    category,
    name: 'Live search to ground LLM answers',
    cta: 'Ground LLM answers',
    blurb: 'Retrieve fresh results for a question, read the best sources as Markdown and pass them to the model with citations.',
    keywords: [
      'search api for rag',
      'llm grounding api',
      'real-time search for chatbots',
      'web search for llm'
    ],
    related: [
      'search-api/serp-to-markdown',
      'search-api/news-monitoring',
      'search-api/scholar-citations',
      'search-api/keyword-research',
      'website-to-markdown/llm-context',
      'website-to-markdown/clean-content'
    ]
  },
  {
    slug: 'search-api/serp-to-markdown',
    vertical,
    category,
    name: 'Google results page as Markdown or HTML',
    cta: 'Get SERPs as Markdown',
    blurb: 'Start from a query, not a URL: get the structured results plus the Google results page itself as Markdown or HTML.',
    keywords: [
      'serp to markdown',
      'google results to markdown',
      'serp html api',
      'google search results html'
    ],
    related: [
      'search-api/rank-tracking',
      'search-api/rag-grounding',
      'search-api/keyword-research',
      'website-to-markdown/llm-context',
      'website-to-markdown/clean-content',
      'website-to-markdown/bulk-conversion'
    ]
  }
]
