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
  },
  {
    id: 'autocomplete',
    label: 'Google Autocomplete',
    iconUrl: 'https://cdn.simpleicons.org/google'
  }
]

const GOOGLE_VERTICALS = [
  {
    id: 'search',
    name: 'Google Search',
    accentColor: 'blue6',
    description:
      'Organic results with related searches, people also ask, and knowledge graph entities.'
  },
  {
    id: 'news',
    name: 'Google News',
    accentColor: 'red6',
    description:
      'Fresh article results with publisher metadata, timestamps, and thumbnails.'
  },
  {
    id: 'images',
    name: 'Google Images',
    accentColor: 'green6',
    description:
      'Image results with original URLs, dimensions, and fields normalized for downstream usage.'
  },
  {
    id: 'videos',
    name: 'Google Videos',
    accentColor: 'pink6',
    description:
      'Video metadata with duration in milliseconds and output tuned for automation.'
  },
  {
    id: 'places',
    name: 'Google Places',
    accentColor: 'orange6',
    description:
      'Local business results with address, geocoordinates, and contact-level detail.'
  },
  {
    id: 'maps',
    name: 'Google Maps',
    accentColor: 'cyan6',
    description:
      'Map listing coverage with richer location context for local SEO and discovery apps.'
  },
  {
    id: 'shopping',
    name: 'Google Shopping',
    accentColor: 'teal6',
    description:
      'Product listings with normalized prices, ratings, and merchant-friendly fields.'
  },
  {
    id: 'scholar',
    name: 'Google Scholar',
    accentColor: 'indigo6',
    description:
      'Academic paper results with citations and links for research and intelligence tooling.'
  },
  {
    id: 'patents',
    name: 'Google Patents',
    accentColor: 'grape7',
    description:
      'Patent records with ISO date formats and structured metadata ready for analysis.'
  },
  {
    id: 'autocomplete',
    name: 'Google Autocomplete',
    accentColor: 'violet6',
    description:
      'Suggestion datasets for content ideation, demand modeling, and query expansion.'
  }
]

const buildExample = (query, type) => `'use strict'

import createGoogleClient from '@microlink/google'

const google = createGoogleClient({
  apiKey: process.env.MICROLINK_API_KEY
})

const page = await google('${query}', {
  type: '${type}'
})

console.log(page)`

const GOOGLE_VERTICAL_EXAMPLES = {
  search: {
    code: buildExample('site:developer.mozilla.org fetch', 'search'),
    payload: `{
  "results": [
    {
      "title": "Fetch API - MDN Web Docs",
      "url": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
      "description": "The Fetch API provides an interface for fetching resources (including across the network). It is a more powerful and flexible replacement for XMLHttpRequest."
    }
  ],
  "hasNext": false
}`
  },
  news: {
    code: buildExample('openai api developers', 'news'),
    payload: `{
  "results": [
    {
      "title": "Introducing GPT‑5 for developers",
      "image": {
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTep8PgZymNQQ4wTCRMoR6uUB9nFBm59Q2wQNX1w_z_RkPBx1sSpreoTLc&usqp=CAI&s"
      },
      "date": "2025-08-07T12:00:00.000Z",
      "publisher": "OpenAI",
      "url": "https://openai.com/index/introducing-gpt-5-for-developers/",
      "description": "Introducing GPT-5 in our API platform—offering high reasoning performance, new controls for devs, and best-in-class results on real coding..."
    }
  ],
  "hasNext": false
}`
  },
  images: {
    code: buildExample('kubernetes architecture diagram', 'images'),
    payload: `{
  "results": [
    {
      "title": "Cluster Architecture | Kubernetes",
      "image": {
        "url": "https://kubernetes.io/images/docs/kubernetes-cluster-architecture.svg",
        "width": 1402,
        "height": 882
      },
      "thumbnail": {
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfRhoylgxd_-qN18TWNhFRSQanbMBRLQMVoA&s",
        "width": 283,
        "height": 178
      },
      "google": {
        "url": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fkubernetes.io%2Fimages%2Fdocs%2Fkubernetes-cluster-architecture.svg&tbnid=Jg7u7jTcQjC_DM&imgrefurl=https%3A%2F%2Fkubernetes.io..."
      },
      "url": "https://kubernetes.io/docs/concepts/architecture/"
    }
  ],
  "hasNext": false
}`
  },
  videos: {
    code: buildExample('node.js streams tutorial', 'videos'),
    payload: `{
  "results": [
    {
      "title": "Learn Node.js Streams in 25 minutes | NodeJS Tutorials for ...",
      "channel": "Dipesh Malvia",
      "image": {
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQjpuhWZ9Rk8IvRvNx0RTrG9BMPxhTHpxDlr-eY6Be27o0iWf4x6QO3w&s"
      },
      "date": "2024-08-22T12:00:00.000Z",
      "url": "https://www.youtube.com/watch?v=EcznOgzOdxI",
      "description": "In this video we will understand what are streams, types of streams and their uses in Node.js ? You will learn how to create Readable, ...",
      "publisher": "YouTube",
      "duration": 1502000,
      "duration_pretty": "25m"
    }
  ],
  "hasNext": false
}`
  },
  places: {
    code: buildExample('coworking space barcelona', 'places'),
    payload: `{
  "results": [
    {
      "title": "Betahaus | Coworking Barcelona",
      "address": "Carrer de Vilafranca, 7",
      "latitude": 41.406982,
      "longitude": 2.1567652,
      "rating": 4.8,
      "category": "Coworking space",
      "cid": "15533147541347981884",
      "ratingCount": 415
    }
  ],
  "hasNext": false
}`
  },
  maps: {
    code: buildExample('software engineering conferences madrid', 'maps'),
    payload: `{
  "results": [
    {
      "title": "Madrid",
      "address": "Madrid, Spain",
      "latitude": 40.4167279,
      "longitude": -3.7032905,
      "cid": "14138733002322879081",
      "fid": "0xd422997800a3c81:0xc436dec1618c2269",
      "thumbnail": {
        "url": "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqAxghmpyB1JjHCf4zn1Dy3w3Xp4CZQX0MLthjBF5a_rJD39ELfIK2Pl75fi5UIagttMb2eSUGBHqw2cdkp7w-CDWtAZHgFiHji2ZkPdAmR84zOtx5qUpCBMvls8mXuFz..."
      },
      "place": {
        "id": "ChIJgTwKgJcpQg0RaSKMYcHeNsQ"
      }
    }
  ],
  "hasNext": false
}`
  },
  shopping: {
    code: buildExample('ergonomic mechanical keyboard', 'shopping'),
    payload: `{
  "results": [
    {
      "title": "Split Ergonomic Mechanical Keyboard – For Peak Gaming & Productivity, Purple & Black",
      "image": {
        "url": "[truncated data URL]"
      },
      "url": "https://www.google.com/search?ibp=oshop&q=ergonomic+mechanical+keyboard&prds=localAnnotatedOfferId:1,productid:17935785122201653129,pvo:2,pvt:hg,rds:PC_6027158597472037202%7CPRO...",
      "publisher": "Ragnok",
      "id": "17935785122201653129",
      "price": {
        "symbol": "$",
        "amount": 139
      }
    }
  ],
  "hasNext": false
}`
  },
  scholar: {
    code: buildExample('attention is all you need transformer', 'scholar'),
    payload: `{
  "results": [
    {
      "title": "Attention is all you need",
      "year": 2017,
      "id": "5Gohgn6QFikJ",
      "pdf": {
        "url": "https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf"
      },
      "url": "https://proceedings.neurips.cc/paper/2017/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html",
      "description": "… work we propose the Transformer, a model architecture eschewing recurrence and instead relying entirely on an attention … , we will describe the Transformer, motivate self-att...",
      "publisher": "A Vaswani, N Shazeer, N Parmar… - Advances in neural …, 2017 - proceedings.neurips.cc",
      "citations": 237401
    }
  ],
  "hasNext": false
}`
  },
  patents: {
    code: buildExample('compiler optimization patent', 'patents'),
    payload: `{
  "results": [
    {
      "title": "Compiler optimization of coroutines",
      "inventor": "James J. Radigan",
      "assignee": "Microsoft Technology Licensing, Llc",
      "language": "en",
      "thumbnail": {
        "url": "https://patentimages.storage.googleapis.com/ac/93/d3/2fabec0c0fbcfc/US10747511-20200818-D00000.png"
      },
      "pdf": {
        "url": "https://patentimages.storage.googleapis.com/28/a9/bc/bf16a91d8e7db3/US10747511.pdf"
      },
      "url": "https://patents.google.com/patent/US10747511B2/en",
      "description": "As a memory usage optimization, a compiler identifies coroutines whose activation frames can be allocated on a caller's stack instead of allocating the frame on the heap. For ex...",
      "figures": [
        {
          "image": {
            "url": "https://patentimages.storage.googleapis.com/6b/0a/2a/25cc1b1bd2c00a/US10747511-20200818-D00000.png"
          },
          "thumbnail": {
            "url": "https://patentimages.storage.googleapis.com/cd/44/0a/7f5f9fe843f7ce/US10747511-20200818-D00000.png"
          }
        },
        {
          "image": {
            "url": "https://patentimages.storage.googleapis.com/b3/2c/84/984028ae10670b/US10747511-20200818-D00001.png"
          },
          "thumbnail": {
            "url": "https://patentimages.storage.googleapis.com/4c/30/14/83964434d800e0/US10747511-20200818-D00001.png"
          }
        }
      ],
      "priority": { "date": "2015-04-28T00:00:00.000Z" },
      "filing": { "date": "2015-06-26T00:00:00.000Z" },
      "grant": { "date": "2020-08-18T00:00:00.000Z" },
      "publication": {
        "date": "2020-08-18T00:00:00.000Z",
        "number": "US10747511B2"
      }
    }
  ],
  "hasNext": false
}`
  },
  autocomplete: {
    code: buildExample('javascript debounce', 'autocomplete'),
    payload: `{
  "results": [
    {
      "value": "javascript debounce"
    }
  ],
  "hasNext": false
}`
  }
}

const INSTALL_SNIPPET = `
const page = await google('technical seo checklist', {
  type: 'search',
  location: 'us',
  period: 'week'
})

const result = await page.results[0]`

const HERO_EXAMPLES = [
  {
    id: 'simple-search',
    title: 'Search Query',
    description:
      'Run a plain Google search query and get normalized result objects.',
    code: INSTALL_SNIPPET,
    result: {
      variant: 'search',
      data: {
        title:
          'Technical SEO Checklist for 2026: 34 Fixes for Rankings, Speed & AI …',
        url: 'https://almcorp.com/blog/technical-seo-checklist/',
        description:
          'Use this technical SEO checklist to fix crawlability, indexing, Core Web Vitals, structured data, mobile SEO, and AI search visibility in 2026.'
      }
    }
  },
  {
    id: 'news-monitoring',
    title: 'News Monitoring',
    description:
      'Track fresh articles by topic with Google News and weekly filtering.',
    code: `
const page = await google('artificial intelligence funding', {
  type: 'news',
  location: 'us',
  period: 'week'
})

const headlines = page.results.map(item => ({
  title: item.title,
  source: item.publisher,
  publishedAt: item.date
}))`,
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
            'The round accelerates Claude’s enterprise rollout and new inference infrastructure partnerships.'
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
    code: `
const placesPage = await google('best coffee madrid', {
  type: 'places',
  location: 'es'
})

const leads = placesPage.results.map(result => ({
  name: result.title,
  rating: result.rating?.score,
  reviews: result.rating?.reviews,
  coordinates: result.coordinates
}))`,
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
      'Use search operators to find technical sources, then expand the best matches as Markdown or HTML.',
    code: `
const page = await google('site:arxiv.org "deep learning"')

const topSources = await Promise.all(
  page.results.slice(0, 3).map(async result => ({
    title: result.title,
    url: result.url,
    markdown: await result.markdown(),
    html: await result.html()
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
    name: 'Search',
    applicationCategory: ['DeveloperApplication', 'API'],
    operatingSystem: 'Any',
    url: PAGE_URL,
    image: HERO_IMAGE,
    description:
      'Microlink Search is a paid search intelligence API for querying and normalizing public results from Google Search, Google News, Google Maps, Google Shopping, Google Scholar, and more.',
    keywords: [
      'search api',
      'serp api',
      'google search api alternative',
      'google news api alternative',
      'local search api',
      'shopping data api',
      'search intelligence api',
      'serp api alternative',
      'ai seo data api'
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
      'Install @microlink/google, query a supported search surface, then paginate and enrich results for SEO, monitoring, and AI workflows.',
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
  GOOGLE_VERTICAL_EXAMPLES,
  HERO_EXAMPLES,
  FAQ_ENTRIES,
  STRUCTURED_DATA
}
