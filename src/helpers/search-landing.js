const PAGE_URL = 'https://microlink.io/search'
const GUIDE_URL = '/docs/guides/search'
const PACKAGE_URL = 'https://www.npmjs.com/package/@microlink/google'
const HERO_IMAGE = 'https://search.microlink.io/static/banner.jpg'

const SUPPORTED_GOOGLE_SERVICES = [
  {
    id: 'search',
    label: 'Google Search',
    iconUrl: 'https://cdn.simpleicons.org/google'
  },
  {
    id: 'news',
    label: 'Google News',
    iconUrl: 'https://cdn.simpleicons.org/googlenews'
  },
  {
    id: 'images',
    label: 'Google Images',
    iconUrl: 'https://cdn.simpleicons.org/google'
  },
  {
    id: 'videos',
    label: 'Google Videos',
    iconUrl: 'https://cdn.simpleicons.org/youtube'
  },
  {
    id: 'places',
    label: 'Google Places',
    iconUrl: 'https://cdn.simpleicons.org/googlemaps'
  },
  {
    id: 'maps',
    label: 'Google Maps',
    iconUrl: 'https://cdn.simpleicons.org/googlemaps'
  },
  {
    id: 'shopping',
    label: 'Google Shopping',
    iconUrl: 'https://cdn.simpleicons.org/google'
  },
  {
    id: 'scholar',
    label: 'Google Scholar',
    iconUrl: 'https://cdn.simpleicons.org/googlescholar'
  },
  {
    id: 'patents',
    label: 'Google Patents',
    iconUrl: 'https://cdn.simpleicons.org/google'
  }
]

const GOOGLE_VERTICALS = [
  {
    id: 'search',
    name: 'Google',
    accentColor: 'blue6',
    description:
      'Found results for "ai agents" with structured data, ready for your workflow.'
  },
  {
    id: 'news',
    name: 'News',
    accentColor: 'red6',
    description:
      'Fresh article results with publisher metadata, timestamps, and thumbnails.'
  },
  {
    id: 'images',
    name: 'Images',
    accentColor: 'cyan6',
    description:
      'Full-resolution image URLs with dimensions, thumbnails, and source attribution.'
  },
  {
    id: 'videos',
    name: 'Videos',
    accentColor: 'orange6',
    description:
      'Video metadata with duration, channel info, and publication dates.'
  },
  {
    id: 'places',
    name: 'Places',
    accentColor: 'green6',
    description:
      'Local business listings with coordinates, ratings, and contact info.'
  },
  {
    id: 'maps',
    name: 'Maps',
    accentColor: 'green6',
    description:
      'Rich place metadata with ratings, opening hours, pricing, and place IDs.'
  },
  {
    id: 'shopping',
    name: 'Shopping',
    accentColor: 'blue6',
    description:
      'Product listings with parsed prices, merchant names, and structured ratings.'
  },
  {
    id: 'scholar',
    name: 'Scholar',
    accentColor: 'blue6',
    description:
      'Academic papers with citation counts, publication context, and PDF links.'
  },
  {
    id: 'patents',
    name: 'Patents',
    accentColor: 'grape7',
    description:
      'Patent filings with priority dates, inventors, assignees, and figures.'
  }
]

const INSTALL_SNIPPET = `const google = require('@microlink/google')({
  apiKey: process.env.MICROLINK_API_KEY
})

const page = await google('ai agents')

console.log(page.results)`

const HERO_EXAMPLES = [
  {
    id: 'simple-search',
    title: 'Search Query',
    description: 'Run a quick search and get structured, useful output.',
    code: INSTALL_SNIPPET,
    result: {
      variant: 'search',
      data: [
        {
          title:
            'TechCrunch Disrupt 2025: AI Present or Future for Startups, Speed & AI …',
          url: 'https://techcrunch.com/2025/05/20/ai-agents-future',
          description:
            "Leaders discuss the intersection of AI and startup innovation, practical tools, and what's next in 2025."
        },
        {
          title: 'AI agents: The next wave of productivity',
          url: 'https://techcrunch.com/2024/05/30/ai-agents/',
          description:
            'Leaders discuss the intersection of AI and startup innovation...'
        },
        {
          title: 'How AI agents are reshaping workflows',
          url: 'https://venturebeat.com/ai/ai-agents/',
          description: 'Exploring real-world use cases and platform strategies.'
        }
      ]
    }
  },
  {
    id: 'news-monitoring',
    title: 'News Monitoring',
    description:
      'Pull current Google News results into monitoring and alerting workflows.',
    code: `const google = require('@microlink/google')({
  apiKey: process.env.MICROLINK_API_KEY
})

const page = await google('AI startups', {
  type: 'news',
  period: 'week'
})

console.log(page.results)`,
    result: {
      variant: 'news',
      data: [
        {
          title:
            'Anthropic raises $13B at $183B valuation to scale AI research',
          publisher: 'TechCrunch',
          date: '2026-04-18T09:12:00.000Z',
          url: 'https://techcrunch.com/2026/04/18/anthropic-series-f/',
          description:
            "The round accelerates Claude's enterprise rollout and new inference infrastructure partnerships."
        },
        {
          title:
            'OpenAI launches enterprise agent platform with native tool use',
          publisher: 'The Verge',
          date: '2026-04-17T14:40:00.000Z',
          url: 'https://www.theverge.com/2026/04/17/openai-agents/',
          description:
            'New platform bundles memory, tool orchestration, and billing controls for production AI agent deployments.'
        },
        {
          title: 'Mistral AI secures €2B Series C to expand European AI stack',
          publisher: 'Financial Times',
          date: '2026-04-15T08:05:00.000Z',
          url: 'https://www.ft.com/content/mistral-series-c-2026',
          description:
            'Funding backs sovereign European cloud partnerships and new open-weight reasoning models for enterprise use.'
        }
      ]
    }
  },
  {
    id: 'local-seo',
    title: 'Local SEO',
    description:
      'Collect local pack and map-style entities for geo-targeted research.',
    code: `const google = require('@microlink/google')({
  apiKey: process.env.MICROLINK_API_KEY
})

const page = await google('best coffee madrid', {
  type: 'places',
  location: 'es'
})

console.log(page.results[0])`,
    result: {
      variant: 'places',
      data: {
        title: 'HanSo Café',
        category: 'Coffee shop',
        rating: 4.6,
        reviewCount: 2184,
        address: 'Calle del Pez, 20, Centro, 28004 Madrid',
        latitude: 40.4254,
        longitude: -3.7067
      }
    }
  },
  {
    id: 'agent-enrichment',
    title: 'Document Discovery',
    description:
      'Use search operators to find technical sources, then expand the best matches with .html() or .markdown().',
    code: `const google = require('@microlink/google')({
  apiKey: process.env.MICROLINK_API_KEY
})

const page = await google('site:arxiv.org "deep learning"')

const enriched = await Promise.all(
  page.results.slice(0, 3).map(async r => ({
    title: r.title,
    url: r.url,
    markdown: await r.markdown()
  }))
)`,
    result: {
      variant: 'search-enriched',
      data: [
        {
          title: 'Deep Learning for AI',
          url: 'https://arxiv.org/abs/2401.02986',
          description:
            'Survey of modern deep learning systems, scaling behavior, and deployment constraints for contemporary AI workloads.',
          htmlBytes: 28640,
          mdBytes: 9632
        },
        {
          title: 'Deep Learning via Hessian-free Optimization',
          url: 'https://arxiv.org/abs/1211.5063',
          description:
            'Technical paper on second-order optimization methods for deep neural network training.',
          htmlBytes: 24512,
          mdBytes: 8120
        },
        {
          title: 'Deep Residual Learning for Image Recognition',
          url: 'https://arxiv.org/abs/1512.03385',
          description:
            'Foundational ResNet paper showing how residual connections unlock dramatically deeper models.',
          htmlBytes: 33218,
          mdBytes: 10448
        }
      ]
    }
  }
]

const INTEGRATION_HOW_TO_STEPS = [
  {
    title: 'Install and initialize',
    description:
      'Install `@microlink/google`, then initialize with your Microlink API key.'
  },
  {
    title: 'Query a supported surface',
    description:
      'Send your query with optional `type`, `location`, and `period` options to target intent.'
  },
  {
    title: 'Paginate or enrich',
    description:
      'Use `.next()` for additional result pages and `.markdown()` or `.html()` when a source deserves deeper extraction.'
  }
]

const FAQ_ENTRIES = [
  {
    question: 'What is Microlink Search?',
    answers: [
      'Microlink Search is a paid search intelligence API for querying and normalizing public results from multiple Google surfaces through one product.',
      '@microlink/google is the Node.js client for integrating Search into your own SEO tooling, monitoring jobs, and AI workflows.'
    ]
  },
  {
    question: 'Is this an official Google product?',
    answers: [
      'No. Search is an independent Microlink product that works on top of public Google surfaces.',
      'It is not affiliated with, endorsed by, or provided by Google.'
    ]
  },
  {
    question: 'Why is there no free tier?',
    answers: [
      'Search starts on paid plans because reliable public-result collection depends on managed proxy capacity from the first request.',
      'That cost is part of the product itself, so even small workloads use the same proxy-backed delivery model as production workloads.'
    ]
  },
  {
    question: 'Which surfaces are supported?',
    answers: [
      'You can query Google Search, Google News, Google Images, Google Videos, Google Places, Google Maps, Google Shopping, Google Scholar, Google Patents, and Google Autocomplete.',
      'Each one keeps the same client shape so teams can ship faster with less parser logic and less provider-specific branching.'
    ]
  },
  {
    question: 'What makes this different from a generic SERP API?',
    answers: [
      'Search is designed around normalized output and reusable primitives instead of raw provider-specific payloads.',
      'That means less cleanup for your codebase and faster handoff into rank tracking, market research, or agent pipelines.'
    ]
  },
  {
    question: 'How do pagination and HTML enrichment work?',
    answers: [
      'Every result page can call `.next()` to fetch the following page, so pagination can be chained naturally.',
      'Any result containing a URL can also expose `.html()` so you only fetch page markup when a workflow actually needs it.'
    ]
  },
  {
    question: 'Is it a fit for SEO and AI workflows?',
    answers: [
      'Yes. Teams use Search for rank tracking, news monitoring, local research, query clustering, citation discovery, and agent enrichment.',
      'The value is consistent structured output plus proxy-backed delivery for recurring public-result collection.'
    ]
  },
  {
    question: 'Can I run international or local queries?',
    answers: [
      'Yes. You can use options like `location` and `period` to tune regional intent and recency for multilingual SEO and geo-specific analysis.',
      'That makes the same integration model useful for local search intelligence as well as broader monitoring workflows.'
    ]
  }
]

const buildSchemas = () => {
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': PAGE_URL,
    name: 'Microlink Search',
    applicationCategory: ['DeveloperApplication', 'API'],
    operatingSystem: 'Any',
    url: PAGE_URL,
    image: HERO_IMAGE,
    description:
      'Microlink Search is a paid search intelligence API for querying and normalizing public results from Google Search, News, Maps, Shopping, Scholar, and more.',
    keywords: [
      'search api',
      'serp api',
      'search intelligence api',
      'serp api alternative',
      'search api for ai agents',
      'search api for seo',
      'local search api',
      'shopping data api',
      'ai seo data api',
      'rank tracking api',
      'news monitoring api'
    ],
    offers: { '@type': 'Offer', url: 'https://microlink.io/pricing' },
    publisher: {
      '@type': 'Organization',
      name: 'Microlink',
      url: 'https://microlink.io'
    }
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${PAGE_URL}#verticals`,
    name: 'Supported search surfaces in Microlink Search',
    itemListElement: GOOGLE_VERTICALS.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name
    }))
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${PAGE_URL}#how-to`,
    name: 'How to integrate Microlink Search',
    description:
      'Install @microlink/google, query any supported search surface, and get structured JSON back. Paginate or enrich results for SEO tooling, monitoring, and AI agent workflows.',
    step: INTEGRATION_HOW_TO_STEPS.map(step => ({
      '@type': 'HowToStep',
      name: step.title,
      text: step.description
    }))
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${PAGE_URL}#faq`,
    url: PAGE_URL,
    mainEntity: FAQ_ENTRIES.map(({ question, answers }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answers.join(' ') }
    }))
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://microlink.io'
      },
      { '@type': 'ListItem', position: 2, name: 'Search', item: PAGE_URL }
    ]
  }

  return [
    softwareApplicationSchema,
    itemListSchema,
    howToSchema,
    faqSchema,
    breadcrumbSchema
  ]
}

const STRUCTURED_DATA = buildSchemas()

export {
  PAGE_URL,
  GUIDE_URL,
  PACKAGE_URL,
  HERO_IMAGE,
  SUPPORTED_GOOGLE_SERVICES,
  GOOGLE_VERTICALS,
  HERO_EXAMPLES,
  FAQ_ENTRIES,
  STRUCTURED_DATA
}
