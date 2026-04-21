import React, { useState } from 'react'
import styled from 'styled-components'
import { colors, layout, theme, transition } from 'theme'
import {
  ArrowRight,
  Check,
  CheckCircle,
  GitMerge,
  Hexagon,
  Target
} from 'react-feather'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Container from 'components/elements/Container'
import FeatherIcon from 'components/icons/Feather'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import Text from 'components/elements/Text'
import Faq from 'components/patterns/Faq/Faq'
import Layout from 'components/patterns/Layout'
import List from 'components/patterns/List/List'
import ArrowLink from 'components/patterns/ArrowLink'

import GOOGLE_VERTICAL_EXAMPLES_DATA from 'helpers/google-examples'

const PAGE_URL = 'https://microlink.io/search'
const PACKAGE_URL = 'https://www.npmjs.com/package/@microlink/google'
const HERO_IMAGE = 'https://search.microlink.io/static/banner.jpg'
const HERO_LAYOUT = {
  maxWidth: ['100%', '100%', '100%', `calc(${layout.large} * 1.7)`],
  mainWidth: '55%',
  secondaryWidth: '45%',
  gap: [1, 1, 1, 5]
}

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

const shortenValueForEditor = value => {
  if (typeof value === 'string') {
    if (value === '[truncated data URL]') {
      return 'data:image/webp;base64...'
    }
    if (value.startsWith('data:')) {
      return `${value.slice(0, 20)}...`
    }
    return value
  }
  if (Array.isArray(value)) {
    return value.map(item => shortenValueForEditor(item))
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        shortenValueForEditor(item)
      ])
    )
  }
  return value
}

const parseJsonPayload = payload => {
  try {
    const parsed = typeof payload === 'string' ? JSON.parse(payload) : payload
    const root = Array.isArray(parsed?.results) ? parsed.results : parsed
    return shortenValueForEditor(root)
  } catch {
    return {}
  }
}

const GOOGLE_VERTICAL_EXAMPLES = {
  search: {
    code: `'use strict'

import createGoogleClient from '@microlink/google'

const google = createGoogleClient({
  apiKey: process.env.MICROLINK_API_KEY
})

const page = await google('site:developer.mozilla.org fetch api', {
  type: 'search'
})

console.log(page)`,
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
    code: `'use strict'

import createGoogleClient from '@microlink/google'

const google = createGoogleClient({
  apiKey: process.env.MICROLINK_API_KEY
})

const page = await google('openai api developers', {
  type: 'news'
})

console.log(page)`,
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
    code: `'use strict'

import createGoogleClient from '@microlink/google'

const google = createGoogleClient({
  apiKey: process.env.MICROLINK_API_KEY
})

const page = await google('kubernetes architecture diagram', {
  type: 'images'
})

console.log(page)`,
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
    code: `'use strict'

import createGoogleClient from '@microlink/google'

const google = createGoogleClient({
  apiKey: process.env.MICROLINK_API_KEY
})

const page = await google('node.js streams tutorial', {
  type: 'videos'
})

console.log(page)`,
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
    code: `'use strict'

import createGoogleClient from '@microlink/google'

const google = createGoogleClient({
  apiKey: process.env.MICROLINK_API_KEY
})

const page = await google('coworking space barcelona', {
  type: 'places'
})

console.log(page)`,
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
    code: `'use strict'

import createGoogleClient from '@microlink/google'

const google = createGoogleClient({
  apiKey: process.env.MICROLINK_API_KEY
})

const page = await google('software engineering conferences madrid', {
  type: 'maps'
})

console.log(page)`,
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
    code: `'use strict'

import createGoogleClient from '@microlink/google'

const google = createGoogleClient({
  apiKey: process.env.MICROLINK_API_KEY
})

const page = await google('ergonomic mechanical keyboard', {
  type: 'shopping'
})

console.log(page)`,
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
    code: `'use strict'

import createGoogleClient from '@microlink/google'

const google = createGoogleClient({
  apiKey: process.env.MICROLINK_API_KEY
})

const page = await google('attention is all you need transformer', {
  type: 'scholar'
})

console.log(page)`,
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
    code: `'use strict'

import createGoogleClient from '@microlink/google'

const google = createGoogleClient({
  apiKey: process.env.MICROLINK_API_KEY
})

const page = await google('compiler optimization patent', {
  type: 'patents'
})

console.log(page)`,
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
      "priority": {
        "date": "2015-04-28T00:00:00.000Z"
      },
      "filing": {
        "date": "2015-06-26T00:00:00.000Z"
      },
      "grant": {
        "date": "2020-08-18T00:00:00.000Z"
      },
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
    code: `'use strict'

import createGoogleClient from '@microlink/google'

const google = createGoogleClient({
  apiKey: process.env.MICROLINK_API_KEY
})

const page = await google('javascript debounce', {
  type: 'autocomplete'
})

console.log(page)`,
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

const GOOGLE_VERTICALS = [
  {
    id: 'search',
    name: 'Google Search',
    accentColor: 'blue6',
    accentTextColor: 'white',
    description:
      'Organic results with related searches, people also ask, and knowledge graph entities.'
  },
  {
    id: 'news',
    name: 'Google News',
    accentColor: 'red6',
    accentTextColor: 'white',
    description:
      'Fresh article results with publisher metadata, timestamps, and thumbnails.'
  },
  {
    id: 'images',
    name: 'Google Images',
    accentColor: 'green6',
    accentTextColor: 'white',
    description:
      'Image results with original URLs, dimensions, and fields normalized for downstream usage.'
  },
  {
    id: 'videos',
    name: 'Google Videos',
    accentColor: 'pink6',
    accentTextColor: 'white',
    description:
      'Video metadata with duration in milliseconds and output tuned for automation.'
  },
  {
    id: 'places',
    name: 'Google Places',
    accentColor: 'orange6',
    accentTextColor: 'white',
    description:
      'Local business results with address, geocoordinates, and contact-level detail.'
  },
  {
    id: 'maps',
    name: 'Google Maps',
    accentColor: 'cyan6',
    accentTextColor: 'white',
    description:
      'Map listing coverage with richer location context for local SEO and discovery apps.'
  },
  {
    id: 'shopping',
    name: 'Google Shopping',
    accentColor: 'teal6',
    accentTextColor: 'white',
    description:
      'Product listings with normalized prices, ratings, and merchant-friendly fields.'
  },
  {
    id: 'scholar',
    name: 'Google Scholar',
    accentColor: 'indigo6',
    accentTextColor: 'white',
    description:
      'Academic paper results with citations and links for research and intelligence tooling.'
  },
  {
    id: 'patents',
    name: 'Google Patents',
    accentColor: 'grape7',
    accentTextColor: 'white',
    description:
      'Patent records with ISO date formats and structured metadata ready for analysis.'
  },
  {
    id: 'autocomplete',
    name: 'Google Autocomplete',
    accentColor: 'violet6',
    accentTextColor: 'white',
    description:
      'Suggestion datasets for content ideation, demand modeling, and query expansion.'
  }
]

const INTEGRATION_TUTORIAL_STEPS = [
  {
    step: 'STEP 01',
    title: 'Install and initialize',
    icon: Target,
    description:
      'Install `@microlink/google`, add your Microlink API key, and create one client you can reuse across all supported Google products.',
    panel: {
      type: 'code',
      language: 'bash',
      content: `pnpm add @microlink/google

export MICROLINK_API_KEY=your_api_key`
    }
  },
  {
    step: 'STEP 02',
    title: 'Run the first query',
    icon: Hexagon,
    description:
      'Choose the Google product you need with the `type` option and keep the same client shape for search, news, images, maps, shopping, and more.',
    panel: {
      type: 'code',
      language: 'javascript',
      content: `const page = await google('technical seo checklist', {
  type: 'search',
  location: 'us',
  period: 'week'
})`
    }
  },
  {
    step: 'STEP 03',
    title: 'Paginate or enrich on demand',
    icon: GitMerge,
    description:
      'Once the first query is working, the same client gives you pagination, HTML enrichment, typed responses, and fast parallelized requests.',
    panel: {
      type: 'features',
      items: [
        'Any result with a url exposes `.html()` to fetch the page HTML on demand.',
        'Just call `.next()` to fetch the next page.',
        'Parallelized requests (~1s latency).',
        'Type-specific inference included.'
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
    title: 'Query a Google product',
    description:
      'Send your query with optional `type`, `location`, and `period` options to target intent.'
  },
  {
    title: 'Paginate or enrich',
    description:
      'Use `.next()` for additional result pages and `.html()` for URL-level page content.'
  }
]

const PricingCheck = ({ children }) => (
  <Flex css={theme({ alignItems: 'center', pt: 2, gap: 2 })}>
    <Box
      css={theme({
        display: 'inline-flex',
        color: 'black',
        flexShrink: 0
      })}
    >
      <Check size={16} aria-hidden='true' />
    </Box>
    <Text as='span' css={theme({ fontSize: [1, 1, 2, 2], color: 'black90' })}>
      {children}
    </Text>
  </Flex>
)

const FAQ_ENTRIES = [
  {
    question: 'What is @microlink/google?',
    answers: [
      '@microlink/google is the Node.js client for Search, a Microlink product.',
      'It gives you one package for working with Google Search, News, Images, Videos, Places, Maps, Shopping, Scholar, Patents, and Autocomplete.'
    ]
  },
  {
    question: 'Is this a Google Search API or a generic SERP API?',
    answers: [
      'It is Search, a Microlink product built around Google data.',
      'If you are evaluating a SERP API alternative, the difference is structured output and a cleaner integration layer instead of raw provider-specific payloads.'
    ]
  },
  {
    question: 'Which Google verticals are supported?',
    answers: [
      'You can query Search, News, Images, Videos, Places, Maps, Shopping, Scholar, Patents, and Autocomplete.',
      'Each type uses a consistent API style so teams can ship faster with less parser logic.'
    ]
  },
  {
    question: 'How do I paginate Google results?',
    answers: [
      'Every result page can call `.next()` to fetch the following page, so pagination can be chained naturally.',
      'This avoids manual cursor code and keeps long-running data collection flows cleaner.'
    ]
  },
  {
    question: 'Can I fetch full HTML for a search result URL?',
    answers: [
      'Yes. Any result containing a URL exposes a lazy `.html()` method.',
      'That allows LLM and SEO pipelines to fetch source markup only when needed.'
    ]
  },
  {
    question: 'Does it work for international queries?',
    answers: [
      'Yes. You can set `location` and period filters to tune query context and recency.',
      'This is useful for multilingual SEO and geo-specific market analysis.'
    ]
  },
  {
    question: 'Where can I see package docs and examples?',
    answers: [
      'Use the package README on GitHub for product-specific examples and API options.',
      'You can also use Microlink documentation for account setup and platform-wide capabilities.'
    ]
  },
  {
    question: 'Can I use it with AI SEO and agent workflows?',
    answers: [
      'Yes. The structured output, normalized entities, and optional HTML expansion are designed for AI agent pipelines.',
      'Teams use it for query clustering, content briefs, citation research, and retrieval workflows.'
    ]
  }
]

const INSTALL_SNIPPET = `
const page = await google('technical seo checklist', {
  type: 'search',
  location: 'us',
  period: 'week'
})

const nextPage = await page.next()
const html = await page.results[0].html()`

const HERO_EXAMPLES = [
  {
    id: 'simple-search',
    title: 'Search Query',
    description:
      'Run a plain Google search query and get normalized result objects.',
    code: INSTALL_SNIPPET
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
}))

console.log(headlines)`
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
}))

console.log(leads)`
  },
  {
    id: 'agent-enrichment',
    title: 'AI Agent',
    description:
      'Expand search results with HTML on demand for agent or RAG pipelines.',
    code: `
const page = await google('technical seo checklist', {
  type: 'search',
  location: 'us'
})

const documents = await Promise.all(
  page.results.slice(0, 3).map(async result => ({
    title: result.title,
    url: result.url,
    html: await result.html()
  }))
)

console.log(documents)`
  }
]
const HeroSection = styled(Box).withConfig({
  componentId: 'google__HeroSection'
})`
  ${theme({
    position: 'relative',
    overflow: 'visible'
  })};
`

const HeroDescription = styled(Text)
  .withConfig({ componentId: 'google__HeroDescription' })
  .attrs({ as: 'p' })`
  ${theme({
    mt: [3, 3, 4, 4],
    m: 0,
    maxWidth: ['100%', layout.small, layout.small, '640px'],
    color: 'black80',
    fontSize: [2, 2, 2, 2],
    lineHeight: 2,
    textAlign: ['center', 'center', 'center', 'left']
  })};
`

const ActionRow = styled(Flex).withConfig({ componentId: 'google__ActionRow' })`
  ${theme({
    mt: [4, 4, 4, 4],
    gap: [2, 2, 3, 3],
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
    justifyContent: ['center', 'center', 'center', 'flex-start']
  })};
`

const HeroProofList = styled(Box)
  .withConfig({ componentId: 'google__HeroProofList' })
  .attrs({ as: 'ul' })`
  ${theme({
    listStyle: 'none',
    p: 0,
    m: 0,
    mt: [4, 4, 4, 4],
    display: 'grid',
    gap: 2,
    width: '100%'
  })};
`

const HeroServicesList = styled(Box)
  .withConfig({ componentId: 'google__HeroServicesList' })
  .attrs({ as: 'ul' })`
  ${theme({
    listStyle: 'none',
    p: 0,
    m: 0,
    display: 'flex',
    flexWrap: 'wrap',
    gap: [3, 4, 4, 5],
    justifyContent: 'center'
  })};
`

const HeroServicesItem = styled(Box)
  .withConfig({ componentId: 'google__HeroServicesItem' })
  .attrs({ as: 'li' })`
  ${theme({
    m: 0
  })};
`

const HeroServicesLink = styled('a').withConfig({
  componentId: 'google__HeroServicesLink'
})`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: ['64px', '64px', '64px', '64px'],
    height: ['64px', '64px', '64px', '64px'],
    borderRadius: 4,
    textDecoration: 'none',
    color: 'black80'
  })};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: transform ${transition.short}, opacity ${transition.short};

  &:hover {
    transform: translateY(-2px);
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const HeroServiceIcon = styled('img').withConfig({
  componentId: 'google__HeroServiceIcon'
})`
  ${theme({
    width: '64px',
    height: '64px',
    flexShrink: 0
  })};
`

const ServicesSeparator = styled(Box).withConfig({
  componentId: 'google__ServicesSeparator'
})`
  ${theme({
    px: [3, 3, 4, 5],
    position: 'relative',
    zIndex: 1,
    height: 0
  })};
`

const ServicesSeparatorInner = styled(Flex).withConfig({
  componentId: 'google__ServicesSeparatorInner'
})`
  ${theme({
    width: '100%',
    maxWidth: HERO_LAYOUT.maxWidth,
    mx: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  })};
`

const ServicesSeparatorIcons = styled(Box).withConfig({
  componentId: 'google__ServicesSeparatorIcons'
})`
  ${theme({
    px: [3, 3, 4, 4],
    bg: 'white',
    position: 'relative',
    zIndex: 1
  })};
  transform: translateY(-50%);
`

const HeroExampleShell = styled(Box).withConfig({
  componentId: 'google__HeroExampleShell'
})`
  ${theme({
    borderRadius: 4,
    border: 1,
    borderColor: 'black10',
    bg: 'white',
    overflow: 'hidden',
    minWidth: 0,
    boxShadow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: ['auto', 'auto', '550px', '550px']
  })};
`

const HeroExampleTabBar = styled(Box)
  .withConfig({ componentId: 'google__HeroExampleTabBar' })
  .attrs({ role: 'tablist' })`
  ${theme({
    display: 'flex',
    width: '100%',
    bg: 'gray0',
    borderBottom: 1,
    borderBottomColor: 'black10',
    flexShrink: 0
  })};
`

const HeroExampleTab = styled('button').withConfig({
  componentId: 'google__HeroExampleTab',
  shouldForwardProp: prop => !['$active'].includes(prop)
})`
  ${theme({
    appearance: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    minHeight: '44px',
    px: [2, 3, 3, 4],
    py: 2,
    border: 0,
    borderRight: 1,
    borderRightColor: 'black10',
    bg: 'gray0',
    color: 'black60',
    fontFamily: 'mono',
    fontSize: [0, 1, 1, 1],
    fontWeight: 'normal',
    letterSpacing: 0,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    flex: 1,
    minWidth: 0,
    position: 'relative'
  })};
  ${({ $active }) =>
    theme({
      bg: $active ? 'white' : 'gray0',
      color: $active ? 'black' : 'black60',
      fontWeight: $active ? 'bold' : 'normal'
    })};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background-color ${transition.short}, color ${transition.short};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 2px;
    background-color: ${({ $active }) =>
      $active ? colors.black : 'transparent'};
    transition: background-color ${transition.short};
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 1px;
    background-color: ${({ $active }) =>
      $active ? colors.white : 'transparent'};
    transition: background-color ${transition.short};
  }

  &:last-child {
    border-right: 0;
  }

  &:hover {
    background-color: ${colors.white};
    color: ${colors.black};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: -2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &::before,
    &::after {
      transition: none;
    }
  }
`

const HeroExamplePanel = styled(Box)
  .withConfig({ componentId: 'google__HeroExamplePanel' })
  .attrs({ role: 'tabpanel' })`
  ${theme({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0,
    minHeight: 0
  })};
`

const HeroExampleDescriptionBar = styled(Box).withConfig({
  componentId: 'google__HeroExampleDescriptionBar'
})`
  ${theme({
    bg: 'white',
    borderBottom: 1,
    borderBottomColor: 'black10',
    px: [3, 3, 4, 4],
    py: [2, 2, 3, 3],
    flexShrink: 0
  })};
`

const HeroExampleDescription = styled(Text)
  .withConfig({ componentId: 'google__HeroExampleDescription' })
  .attrs({ as: 'p' })`
  ${theme({
    m: 0,
    color: 'black',
    fontSize: [1, 1, 1, 1],
    lineHeight: 2
  })};
`

const HeroExampleCodePanel = styled(Box).withConfig({
  componentId: 'google__HeroExampleCodePanel'
})`
  ${theme({
    bg: 'white',
    minWidth: 0,
    minHeight: 0,
    display: 'flex',
    flex: 1,
    overflow: 'auto',
    height: ['420px', '420px', 'auto', 'auto']
  })};
`

const VerticalExampleShell = styled(Box).withConfig({
  componentId: 'google__VerticalExampleShell'
})`
  ${theme({
    mt: 3,
    borderRadius: 4,
    border: 1,
    borderColor: 'black10',
    bg: 'white',
    overflow: 'hidden',
    minWidth: 0,
    boxShadow: 1
  })};
`

const VerticalExampleGrid = styled(Box).withConfig({
  componentId: 'google__VerticalExampleGrid'
})`
  ${theme({
    display: 'grid',
    gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr'],
    height: '100%'
  })};
`

const VerticalExamplePanel = styled(Box).withConfig({
  componentId: 'google__VerticalExamplePanel'
})`
  ${theme({
    bg: 'white',
    minWidth: 0,
    display: 'flex',
    borderBottom: [1, 1, 0, 0],
    borderBottomColor: ['black10', 'black10', null, null],
    borderRight: [0, 0, 1, 1],
    borderRightColor: [null, null, 'black10', 'black10']
  })};

  &:last-child {
    borderbottom: 0;
    borderright: 0;
  }
`

const PageSection = styled(Container).withConfig({
  componentId: 'google__PageSection'
})`
  ${theme({
    pt: [5, 5, 6, 6],
    pb: [0, 0, 0, 0],
    px: [3, 3, 4, 4],
    maxWidth: [layout.large, layout.large, layout.large, layout.large],
    alignItems: 'stretch'
  })};
`

const SectionTitle = styled(Text)
  .withConfig({ componentId: 'google__SectionTitle' })
  .attrs({ as: 'h2' })`
  ${theme({
    m: 0,
    color: 'black',
    fontWeight: 'bold',
    letterSpacing: 1,
    lineHeight: [1, 1, 0, 0],
    fontSize: [4, 4, 5, 5],
    textAlign: 'left'
  })};
`

const SectionDescription = styled(Text)
  .withConfig({ componentId: 'google__SectionDescription' })
  .attrs({ as: 'p' })`
  ${theme({
    m: 0,
    mt: [3, 3, 3, 3],
    maxWidth: [layout.normal, layout.normal, layout.normal, layout.normal],
    color: 'black80',
    fontSize: [2, 2, 3, 3],
    lineHeight: 2,
    textAlign: 'left'
  })};
`

const VerticalTabs = styled(Box).withConfig({
  componentId: 'google__VerticalTabs'
})`
  ${theme({
    pt: [4, 4, 4, 4],
    pb: [3, 3, 4, 4],
    px: [0, 0, 0, 0],
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    gap: 2,
    width: '100%',
    border: 0
  })};
`

const VerticalTabButton = styled('button').withConfig({
  componentId: 'google__VerticalTabButton',
  shouldForwardProp: prop =>
    !['$active', '$activeColor', '$activeTextColor'].includes(prop)
})`
  ${theme({
    appearance: 'none',
    border: 1,
    borderColor: 'black10',
    borderRadius: 4,
    bg: 'gray0',
    py: 2,
    px: 3,
    minHeight: '44px',
    color: 'black80',
    fontFamily: 'mono',
    fontWeight: 'normal',
    fontSize: [1, 1, 2, 2],
    lineHeight: 1,
    textTransform: 'lowercase',
    letterSpacing: 0,
    whiteSpace: 'nowrap',
    textAlign: 'left',
    cursor: 'pointer',
    flexShrink: 0
  })};
  ${({ $active }) =>
    theme({
      borderColor: $active ? 'black20' : 'black10',
      bg: $active ? 'white' : 'gray0',
      color: $active ? 'black' : 'black80'
    })};
  ${({ $active, $activeColor, $activeTextColor }) =>
    $active
      ? `
    border-color: ${colors[$activeColor] || $activeColor};
    background-color: ${colors[$activeColor] || $activeColor};
    color: ${colors[$activeTextColor] || $activeTextColor};
  `
      : ''};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: color ${transition.short}, border-color ${transition.short},
    background-color ${transition.short};

  &:hover {
    border-color: ${colors.black20};
    background-color: ${colors.white};
    color: ${colors.black};
  }
  ${({ $active, $activeColor, $activeTextColor }) =>
    $active
      ? `
    &:hover {
      border-color: ${colors[$activeColor] || $activeColor};
      background-color: ${colors[$activeColor] || $activeColor};
      color: ${colors[$activeTextColor] || $activeTextColor};
    }
  `
      : ''};

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const VerticalHeader = styled(Flex).withConfig({
  componentId: 'google__VerticalHeader'
})`
  ${theme({
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 3
  })};
`

const VerticalTitle = styled(Text)
  .withConfig({ componentId: 'google__VerticalTitle' })
  .attrs({ as: 'h3' })`
  ${theme({
    m: 0,
    color: 'black',
    fontWeight: 'bold',
    lineHeight: 1,
    fontSize: [2, 2, 3, 3],
    textAlign: 'left'
  })};
`

const VerticalDescription = styled(Text)
  .withConfig({ componentId: 'google__VerticalDescription' })
  .attrs({ as: 'p' })`
  ${theme({
    mt: 2,
    m: 0,
    color: 'black80',
    fontSize: [1, 1, 2, 2],
    lineHeight: 2,
    textAlign: 'left'
  })};
`

const TutorialTimeline = styled(Box).withConfig({
  componentId: 'google__TutorialTimeline'
})`
  ${theme({
    mt: [5, 5, 6, 6],
    position: 'relative',
    maxWidth: ['100%', '100%', layout.medium, layout.medium],
    mx: 'auto'
  })};

  &::before {
    content: '';
    ${theme({
      display: ['none', 'none', 'block', 'block'],
      position: 'absolute',
      top: '22px',
      bottom: '22px',
      left: '35px',
      width: '2px',
      bg: 'black10'
    })};
  }
`

const TutorialStep = styled(Box)
  .withConfig({ componentId: 'google__TutorialStep' })
  .attrs({ as: 'section' })`
  ${theme({
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: ['1fr', '1fr', '72px 1fr', '72px 1fr'],
    columnGap: [0, 0, 4, 4],
    pb: [4, 4, 5, 6]
  })};

  &:last-child {
    padding-bottom: 0;
  }
`

const TutorialRail = styled(Box).withConfig({
  componentId: 'google__TutorialRail'
})`
  ${theme({
    display: ['none', 'none', 'flex', 'flex'],
    position: 'relative',
    justifyContent: 'center'
  })};
`

const TutorialRailDot = styled(Box).withConfig({
  componentId: 'google__TutorialRailDot'
})`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '9999px',
    bg: 'gray9',
    color: 'white',
    position: 'relative',
    zIndex: 1,
    boxShadow: 1
  })};
`

const TutorialContent = styled(Box).withConfig({
  componentId: 'google__TutorialContent'
})`
  ${theme({
    minWidth: 0
  })};
`

const TutorialStepLabel = styled(Text)
  .withConfig({ componentId: 'google__TutorialStepLabel' })
  .attrs({ as: 'p' })`
  ${theme({
    m: 0,
    color: 'black50',
    fontFamily: 'mono',
    fontSize: [0, 0, 1, 1],
    fontWeight: 'bold',
    letterSpacing: 1
  })};
`

const TutorialStepTitle = styled(Text)
  .withConfig({ componentId: 'google__TutorialStepTitle' })
  .attrs({ as: 'h3' })`
  ${theme({
    m: 0,
    mt: 2,
    color: 'black',
    fontWeight: 'bold',
    fontSize: [2, 2, 3, 3],
    lineHeight: 1
  })};
`

const TutorialStepDescription = styled(Text)
  .withConfig({ componentId: 'google__TutorialStepDescription' })
  .attrs({ as: 'p' })`
  ${theme({
    m: 0,
    mt: 2,
    color: 'black70',
    fontSize: [1, 1, 2, 2],
    lineHeight: 2,
    maxWidth: ['100%', '100%', layout.normal, layout.normal]
  })};
`

const TutorialPanel = styled(Box).withConfig({
  componentId: 'google__TutorialPanel'
})`
  ${theme({
    mt: [3, 3, 4, 4],
    border: 1,
    borderColor: 'black10',
    borderRadius: 4,
    bg: 'white',
    overflow: 'hidden',
    boxShadow: 1
  })};
`

const TutorialTerminal = styled(Box)
  .withConfig({ componentId: 'google__TutorialTerminal' })
  .attrs({ as: 'pre' })`
  ${theme({
    m: 0,
    p: [3, 3, 4, 4],
    bg: 'gray0',
    color: 'black80',
    fontFamily: 'mono',
    fontSize: [0, 0, 1, 1],
    lineHeight: 2,
    whiteSpace: 'pre-wrap'
  })};
`

const TutorialFeatureList = styled(Box)
  .withConfig({ componentId: 'google__TutorialFeatureList' })
  .attrs({ as: 'ul' })`
  ${theme({
    m: 0,
    mt: [3, 3, 4, 4],
    p: 0,
    listStyle: 'none'
  })};
`

const TutorialFeatureItem = styled(Flex).withConfig({
  componentId: 'google__TutorialFeatureItem'
})`
  ${theme({
    alignItems: 'flex-start',
    gap: 2,
    color: 'black80',
    fontSize: [1, 1, 2, 2],
    lineHeight: 2
  })};

  &:not(:first-of-type) {
    ${theme({ mt: [2, 2, 3, 3] })};
  }
`

const PricingCardsGrid = styled(Flex).withConfig({
  componentId: 'google__PricingCardsGrid'
})`
  ${theme({
    pt: [4, 4, 5, 5],
    px: [2, 2, 3, 3],
    flexDirection: 'column',
    justifyContent: 'stretch',
    gap: [3, 3, 4, 4],
    width: ['100%', '100%', '100%', '100%']
  })};
`

const PricingCard = styled(Flex).withConfig({
  componentId: 'google__PricingCard'
})`
  ${theme({
    flexDirection: 'column',
    borderRadius: 3,
    bg: 'white',
    px: [3, 3, 4, 4],
    py: [3, 3, 4, 4],
    flex: 1,
    minWidth: 0,
    maxWidth: ['100%', '100%', '100%', '100%']
  })};
  border: 1px solid ${colors.black10};
  box-shadow: 0 2px 8px ${colors.black05};
`

const GooglePage = () => {
  const [activeHeroExampleId, setActiveHeroExampleId] = useState(
    HERO_EXAMPLES[0].id
  )
  const [activeVerticalId, setActiveVerticalId] = useState(
    GOOGLE_VERTICALS[0].id
  )
  const activeHeroExample =
    HERO_EXAMPLES.find(example => example.id === activeHeroExampleId) ??
    HERO_EXAMPLES[0]
  const activeVertical =
    GOOGLE_VERTICALS.find(vertical => vertical.id === activeVerticalId) ??
    GOOGLE_VERTICALS[0]
  const activeVerticalExample = GOOGLE_VERTICAL_EXAMPLES_DATA[
    activeVertical.id
  ] ??
    GOOGLE_VERTICAL_EXAMPLES[activeVertical.id] ?? { code: '', payload: '' }
  const activeVerticalPayload = parseJsonPayload(activeVerticalExample.payload)
  const activeVerticalPayloadText = JSON.stringify(
    activeVerticalPayload,
    null,
    2
  )

  const focusVerticalTab = tabId => {
    const tab = document.getElementById(`google-vertical-chip-${tabId}`)
    if (tab) tab.focus()
  }

  const focusHeroExampleTab = tabId => {
    const tab = document.getElementById(`hero-example-tab-${tabId}`)
    if (tab) tab.focus()
  }

  const handleHeroExampleTabKeyDown = (event, index) => {
    const lastIndex = HERO_EXAMPLES.length - 1
    let nextIndex = null

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = index === lastIndex ? 0 : index + 1
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = index === 0 ? lastIndex : index - 1
    }
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = lastIndex
    if (nextIndex === null) return

    event.preventDefault()
    const nextTabId = HERO_EXAMPLES[nextIndex].id
    setActiveHeroExampleId(nextTabId)
    focusHeroExampleTab(nextTabId)
  }

  const focusVerticalSection = () => {
    const section = document.getElementById('google-verticals')
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleVerticalTabKeyDown = (event, index) => {
    const lastIndex = GOOGLE_VERTICALS.length - 1
    let nextIndex = null

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = index === lastIndex ? 0 : index + 1
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = index === 0 ? lastIndex : index - 1
    }
    if (event.key === 'Home') {
      nextIndex = 0
    }
    if (event.key === 'End') {
      nextIndex = lastIndex
    }
    if (nextIndex === null) return

    event.preventDefault()
    const nextTabId = GOOGLE_VERTICALS[nextIndex].id
    setActiveVerticalId(nextTabId)
    focusVerticalTab(nextTabId)
  }

  return (
    <Layout>
      <HeroSection>
        <Flex
          as='section'
          id='hero'
          css={theme({
            flexDirection: 'column',
            alignItems: 'center',
            pt: [3, 3, 1, 0],
            pb: [
              'calc(128px + 32px)',
              'calc(128px + 32px)',
              'calc(128px + 32px)',
              'calc(128px + 32px)'
            ],
            px: [2, 3, 4, 5]
          })}
        >
          <Flex
            css={theme({
              width: '100%',
              maxWidth: HERO_LAYOUT.maxWidth,
              mx: 'auto',
              flexDirection: ['column', 'column', 'column', 'row'],
              alignItems: ['center', 'center', 'center', 'stretch'],
              gap: HERO_LAYOUT.gap
            })}
          >
            <Flex
              css={theme({
                flexDirection: 'column',
                width: ['100%', '100%', '100%', HERO_LAYOUT.secondaryWidth],
                justifyContent: 'center',
                alignItems: ['center', 'center', 'center', 'flex-start']
              })}
            >
              <Box css={theme({ px: [2, 3, 4, 0], width: '100%' })}>
                <Text
                  as='h1'
                  css={theme({
                    m: 0,
                    color: 'black',
                    fontWeight: 'bold',
                    letterSpacing: 1,
                    lineHeight: [1, 1, 0, 0],
                    fontSize: [3, 3, 4, 4],
                    textAlign: ['center', 'center', 'center', 'left'],
                    width: '100%',
                    maxWidth: ['100%', '100%', '100%', '640px']
                  })}
                >
                  Seamless Search API for developers, SEO teams, and AI agents.
                </Text>

                <HeroDescription>
                  Search is a Microlink product that helps you query and
                  normalize data from Google Search, News, Images, Videos,
                  Places, Maps, Shopping, Scholar, Patents, and Autocomplete.
                  Use one package with structured output, predictable schemas,
                  and low integration friction.
                </HeroDescription>
              </Box>

              <Flex css={theme({ px: [4, 4, 4, 0], width: '100%' })}>
                <ActionRow
                  css={theme({
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    alignItems: ['center', 'center', 'center', 'flex-start'],
                    justifyContent: ['center', 'center', 'center', 'flex-start']
                  })}
                >
                  <ArrowLink href='/docs/api/getting-started/overview'>
                    Get Started
                  </ArrowLink>
                  <Button as='a' variant='white' href={PACKAGE_URL}>
                    Install @microlink/google
                  </Button>
                </ActionRow>
              </Flex>

              <Box css={theme({ px: [1, 2, 4, 0], width: '100%' })}>
                <HeroProofList>
                  <List.Item
                    css={theme({
                      m: 0,
                      mb: 0,
                      color: 'black80',
                      fontSize: [1, 1, 2, 2],
                      justifyContent: [
                        'center',
                        'center',
                        'center',
                        'flex-start'
                      ]
                    })}
                  >
                    One package for 10 Google products.
                  </List.Item>
                  <List.Item
                    css={theme({
                      m: 0,
                      mb: 0,
                      color: 'black80',
                      fontSize: [1, 1, 2, 2],
                      justifyContent: [
                        'center',
                        'center',
                        'center',
                        'flex-start'
                      ]
                    })}
                  >
                    Normalized entities for prices, ratings, coordinates, and
                    media.
                  </List.Item>
                  <List.Item
                    css={theme({
                      m: 0,
                      mb: 0,
                      color: 'black80',
                      fontSize: [1, 1, 2, 2],
                      justifyContent: [
                        'center',
                        'center',
                        'center',
                        'flex-start'
                      ]
                    })}
                  >
                    Built on Microlink infrastructure for browser + data
                    workloads.
                  </List.Item>
                </HeroProofList>
              </Box>
            </Flex>

            <Flex
              css={theme({
                width: ['100%', '100%', '100%', HERO_LAYOUT.mainWidth],
                pt: [4, 4, 5, 0],
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              })}
            >
              <Box
                css={theme({
                  maxWidth: ['100%', '95%', '85%', '100%'],
                  width: ['100%', '95%', '85%', '100%'],
                  minWidth: 0
                })}
              >
                <HeroExampleShell>
                  <HeroExampleTabBar aria-label='Example scenarios'>
                    {HERO_EXAMPLES.map((example, index) => {
                      const isActive = activeHeroExampleId === example.id
                      return (
                        <HeroExampleTab
                          key={example.id}
                          id={`hero-example-tab-${example.id}`}
                          type='button'
                          role='tab'
                          $active={isActive}
                          aria-selected={isActive}
                          aria-controls={`hero-example-panel-${example.id}`}
                          tabIndex={isActive ? 0 : -1}
                          onClick={() => setActiveHeroExampleId(example.id)}
                          onKeyDown={event =>
                            handleHeroExampleTabKeyDown(event, index)
                          }
                        >
                          {example.title}
                        </HeroExampleTab>
                      )
                    })}
                  </HeroExampleTabBar>

                  <HeroExamplePanel
                    id={`hero-example-panel-${activeHeroExample.id}`}
                    aria-labelledby={`hero-example-tab-${activeHeroExample.id}`}
                  >
                    <HeroExampleDescriptionBar>
                      <HeroExampleDescription>
                        {activeHeroExample.description}
                      </HeroExampleDescription>
                    </HeroExampleDescriptionBar>

                    <HeroExampleCodePanel>
                      <CodeEditor
                        title='Node.js example'
                        language='javascript'
                        blinkCursor={false}
                        showWindowButtons={false}
                        showTitle={false}
                        showAction={false}
                        css={theme({
                          width: '100%',
                          height: ['420px', '420px', '100%', '100%'],
                          border: 0,
                          borderRadius: 0,
                          mt: '-24px'
                        })}
                      >
                        {activeHeroExample.code}
                      </CodeEditor>
                    </HeroExampleCodePanel>
                  </HeroExamplePanel>
                </HeroExampleShell>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </HeroSection>

      <ServicesSeparator aria-label='Supported Google products'>
        <ServicesSeparatorInner>
          <ServicesSeparatorIcons>
            <HeroServicesList>
              {SUPPORTED_GOOGLE_SERVICES.map(service => (
                <HeroServicesItem key={service.id}>
                  <HeroServicesLink
                    href='#google-verticals'
                    aria-label={service.label}
                    title={service.label}
                    onClick={event => {
                      event.preventDefault()
                      setActiveVerticalId(service.id)
                      focusVerticalSection()
                    }}
                  >
                    <HeroServiceIcon
                      src={service.iconUrl}
                      alt=''
                      aria-hidden='true'
                    />
                  </HeroServicesLink>
                </HeroServicesItem>
              ))}
            </HeroServicesList>
          </ServicesSeparatorIcons>
        </ServicesSeparatorInner>
      </ServicesSeparator>

      <PageSection
        as='section'
        id='google-verticals'
        css={theme({
          pt: [6, 6, 6, 6],
          maxWidth: HERO_LAYOUT.maxWidth
        })}
      >
        <Box
          css={theme({
            width: '100%',
            mx: 'auto'
          })}
        >
          <SectionTitle>One API, ten Google products.</SectionTitle>
          <SectionDescription css={theme({ maxWidth: '100%' })}>
            Search is a Microlink product that brings Google Search, News,
            Images, Videos, Places, Maps, Shopping, Scholar, Patents, and
            Autocomplete together behind one consistent API for production
            teams.
          </SectionDescription>

          <VerticalTabs aria-label='Google products'>
            {GOOGLE_VERTICALS.map((vertical, index) => (
              <VerticalTabButton
                key={vertical.id}
                id={`google-vertical-chip-${vertical.id}`}
                type='button'
                $active={activeVertical.id === vertical.id}
                $activeColor={vertical.accentColor}
                $activeTextColor={vertical.accentTextColor}
                aria-pressed={activeVertical.id === vertical.id}
                onClick={() => setActiveVerticalId(vertical.id)}
                onKeyDown={event => handleVerticalTabKeyDown(event, index)}
              >
                {vertical.name}
              </VerticalTabButton>
            ))}
          </VerticalTabs>

          <Box as='section'>
            <VerticalHeader>
              <VerticalTitle>{activeVertical.name}</VerticalTitle>
            </VerticalHeader>
            <VerticalDescription>
              {activeVertical.description}
            </VerticalDescription>
            <VerticalExampleShell>
              <VerticalExampleGrid>
                <VerticalExamplePanel>
                  <CodeEditor
                    language='javascript'
                    blinkCursor={false}
                    showWindowButtons={false}
                    showTitle={false}
                    showAction={false}
                    css={theme({
                      width: '100%',
                      height: ['420px', '420px', '520px', '560px'],
                      border: 0,
                      borderRadius: 0
                    })}
                  >
                    {activeVerticalExample.code}
                  </CodeEditor>
                </VerticalExamplePanel>

                <VerticalExamplePanel>
                  <CodeEditor
                    language='json'
                    showWindowButtons={false}
                    showTitle={false}
                    showAction={false}
                    css={theme({
                      width: '100%',
                      height: ['420px', '420px', '520px', '560px'],
                      border: 0,
                      borderRadius: 0
                    })}
                  >
                    {activeVerticalPayloadText}
                  </CodeEditor>
                </VerticalExamplePanel>
              </VerticalExampleGrid>
            </VerticalExampleShell>
          </Box>
        </Box>
      </PageSection>

      <PageSection as='section' id='google-api-integration'>
        <Box
          css={theme({
            width: '100%',
            maxWidth: ['100%', '100%', layout.normal, layout.medium]
          })}
        >
          <SectionTitle
            css={theme({
              fontSize: [4, 4, 5, 5],
              lineHeight: [1, 1, 0, 0],
              maxWidth: ['100%', '100%', '100%', layout.medium]
            })}
          >
            Integrate Search in minutes.
          </SectionTitle>

          <SectionDescription
            css={theme({
              mt: [3, 3, 4, 4],
              fontSize: [2, 2, 3, 3],
              maxWidth: ['100%', '100%', layout.normal, layout.medium]
            })}
          >
            Everything follows a straightforward flow: initialize once, query
            the Google product you need, and enrich only where needed.
          </SectionDescription>

          <TutorialTimeline>
            {INTEGRATION_TUTORIAL_STEPS.map((step, index) => {
              const Icon = step.icon
              let panelContent

              if (step.panel.type === 'features') {
                panelContent = (
                  <TutorialFeatureList>
                    {step.panel.items.map(item => (
                      <TutorialFeatureItem as='li' key={item}>
                        <FeatherIcon
                          icon={CheckCircle}
                          color='close'
                          size={[1, 1, 2, 2]}
                          css={theme({
                            flexShrink: 0,
                            mr: 1,
                            alignSelf: 'flex-start'
                          })}
                        />
                        <Text
                          as='span'
                          css={theme({
                            color: 'black80',
                            fontSize: [1, 1, 2, 2],
                            lineHeight: 2
                          })}
                        >
                          {item}
                        </Text>
                      </TutorialFeatureItem>
                    ))}
                  </TutorialFeatureList>
                )
              } else if (step.panel.type === 'terminal') {
                panelContent = (
                  <TutorialTerminal>{step.panel.content}</TutorialTerminal>
                )
              } else {
                panelContent = (
                  <CodeEditor
                    language={step.panel.language}
                    blinkCursor={false}
                    showWindowButtons={false}
                    showTitle={false}
                    showAction={false}
                    css={theme({
                      width: '100%',
                      height: ['180px', '180px', '200px', '200px'],
                      border: 0,
                      borderRadius: 0
                    })}
                  >
                    {step.panel.content}
                  </CodeEditor>
                )
              }

              return (
                <TutorialStep key={step.step}>
                  <TutorialRail aria-hidden='true'>
                    <TutorialRailDot>
                      <Icon size={18} aria-hidden='true' />
                    </TutorialRailDot>
                  </TutorialRail>

                  <TutorialContent>
                    <TutorialStepLabel>{step.step}</TutorialStepLabel>
                    <TutorialStepTitle>{step.title}</TutorialStepTitle>
                    <TutorialStepDescription>
                      {step.description}
                    </TutorialStepDescription>

                    {step.panel.type === 'features' ? (
                      panelContent
                    ) : (
                      <TutorialPanel>{panelContent}</TutorialPanel>
                    )}
                  </TutorialContent>
                </TutorialStep>
              )
            })}
          </TutorialTimeline>

          <ActionRow
            css={theme({ mt: [4, 4, 5, 5], justifyContent: 'flex-start' })}
          >
            <Button as='a' href={PACKAGE_URL}>
              Get started
            </Button>
            <Button
              as='a'
              variant='white'
              href='/docs/api/getting-started/overview'
            >
              <Flex as='span' css={theme({ alignItems: 'center', gap: 2 })}>
                Documentation
                <ArrowRight size={16} aria-hidden='true' />
              </Flex>
            </Button>
          </ActionRow>
        </Box>
      </PageSection>

      <PageSection as='section' id='pricing'>
        <SectionTitle>Built for production teams.</SectionTitle>
        <SectionDescription>
          Search plans start on paid tiers with production quotas and advanced
          controls.
        </SectionDescription>

        <PricingCardsGrid>
          <PricingCard as='section'>
            <Text
              as='h3'
              css={theme({
                m: 0,
                color: 'black',
                fontWeight: 'bold',
                fontSize: ['20px', '20px', '24px', '24px']
              })}
            >
              Pro
            </Text>

            <Flex css={theme({ alignItems: 'baseline', pt: 2, gap: 1 })}>
              <Text
                css={theme({
                  m: 0,
                  color: 'black',
                  fontSize: ['32px', '32px', '38px', '38px'],
                  fontWeight: 'bold',
                  lineHeight: 0
                })}
              >
                €39
              </Text>
              <Text
                css={theme({ m: 0, color: 'black60', fontSize: [0, 0, 1, 1] })}
              >
                /month
              </Text>
            </Flex>

            <Text
              css={theme({
                m: 0,
                pt: 2,
                color: 'black80',
                fontSize: [1, 1, 2, 2],
                lineHeight: 2
              })}
            >
              46,000 requests/month for production workflows with stronger
              reliability guarantees and advanced controls.
            </Text>

            <Box css={theme({ pt: 3 })}>
              <PricingCheck>Search API</PricingCheck>
              <PricingCheck>10 Google verticals in one package</PricingCheck>
              <PricingCheck>Structured normalized results</PricingCheck>
              <PricingCheck>
                Pagination with <code>.next()</code>
              </PricingCheck>
              <PricingCheck>
                Optional page HTML via <code>.html()</code>
              </PricingCheck>
            </Box>

            <Flex
              css={theme({ pt: 4, fontSize: ['18px', '18px', '20px', '20px'] })}
            >
              <Link href='/#pricing'>See all plans</Link>
            </Flex>
          </PricingCard>
        </PricingCardsGrid>
      </PageSection>

      <Faq
        title='Product Information'
        caption='Everything you need to know about Search and the Google products it supports.'
        css={theme({
          mt: [5, 5, 6, 6],
          pb: [5, 5, 6, 6],
          bg: 'pinky',
          borderTop: '1px solid',
          borderTopColor: 'pinkest',
          borderBottom: '1px solid',
          borderBottomColor: 'pinkest'
        })}
        questions={FAQ_ENTRIES.map(({ question, answers }) => ({
          question,
          answer: (
            <>
              {answers.map((answer, index) => (
                <div key={`${question}-${index}`}>{answer}</div>
              ))}
            </>
          )
        }))}
      />
    </Layout>
  )
}

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
    'Search is a Microlink product for querying and normalizing Google Search, News, Images, Videos, Places, Maps, Shopping, Scholar, Patents, and Autocomplete through one API.',
  keywords: [
    'google search api',
    'serp api',
    'google news api',
    'google images api',
    'google maps api',
    'google shopping api',
    'google autocomplete api',
    'serp api alternative',
    'ai seo data api'
  ],
  offers: {
    '@type': 'Offer',
    url: 'https://microlink.io/#pricing'
  },
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
  name: 'Google products supported by Microlink Search',
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
  name: 'How to integrate Search',
  description:
    'Install @microlink/google, query a Google product through Search, then paginate and enrich results for SEO and AI workflows.',
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
    acceptedAnswer: {
      '@type': 'Answer',
      text: answers.join(' ')
    }
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
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Search',
      item: PAGE_URL
    }
  ]
}

export const Head = () => (
  <Meta
    title='Seamless Search API for Google data'
    description='Search is a Microlink product for querying and normalizing Google Search, News, Images, Videos, Places, Maps, Shopping, Scholar, Patents, and Autocomplete.'
    image={HERO_IMAGE}
    structured={[
      softwareApplicationSchema,
      itemListSchema,
      howToSchema,
      faqSchema,
      breadcrumbSchema
    ]}
  />
)

export default GooglePage
