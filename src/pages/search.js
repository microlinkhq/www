import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { colors, gradient, layout, theme, transition } from 'theme'
import {
  ArrowRight,
  Check,
  CheckCircle,
  ChevronDown,
  Clock,
  Code as CodeIcon,
  FileText,
  GitMerge,
  Hexagon,
  MapPin,
  Star,
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
const GUIDE_URL = '/docs/guides/search'
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

const extractRequestConfig = code => {
  if (!code) return { query: '', options: [] }

  const queryMatch = code.match(/google\(\s*(['"])([\s\S]*?)\1/)
  const optionsBlockMatch = code.match(/\{([\s\S]*?)\}/)

  return {
    query: queryMatch?.[2] ?? '',
    options: Array.from(
      optionsBlockMatch?.[1]?.matchAll(/(\w+)\s*:\s*(['"])([\s\S]*?)\2/g) ?? []
    ).map(([, key, , value]) => ({ key, value }))
  }
}

const buildRequestSnippet = ({ query, options }) => {
  const serializedOptions = options.length
    ? options.map(({ key, value }) => `  ${key}: '${value}'`).join(',\n')
    : "  type: 'search'"

  return `const google = require('@microlink/google')({
  apiKey: process.env.MICROLINK_API_KEY
})

const page = await google('${query}', {
${serializedOptions}
})

console.log(page.results)`
}

const toPreviewItems = payload => {
  if (Array.isArray(payload)) return payload.filter(Boolean).slice(0, 4)
  if (payload && typeof payload === 'object') return [payload]
  return []
}

const formatPriceLabel = price => {
  if (!price || typeof price !== 'object') return null
  if (typeof price.symbol === 'string' && typeof price.amount === 'number') {
    return `${price.symbol}${price.amount}`
  }
  if (typeof price.amount === 'number') return `${price.amount}`
  return null
}

const getVerticalPreviewResult = (verticalId, payload) => {
  const items = toPreviewItems(payload)

  if (verticalId === 'search') {
    return { variant: 'search', data: items }
  }

  if (verticalId === 'news') {
    return { variant: 'news', data: items }
  }

  if (verticalId === 'images') {
    return { variant: 'images', data: items }
  }

  if (verticalId === 'videos') {
    return { variant: 'videos', data: items }
  }

  if (verticalId === 'places') {
    return {
      variant: 'places',
      data: items.map(item => ({
        ...item,
        reviewCount:
          item.reviewCount ?? item.ratingCount ?? item.rating?.reviews
      }))
    }
  }

  if (verticalId === 'maps') {
    return { variant: 'maps', data: items }
  }

  if (verticalId === 'shopping') {
    return {
      variant: 'shopping',
      data: items.map(item => ({
        ...item,
        priceLabel: formatPriceLabel(item.price)
      }))
    }
  }

  if (verticalId === 'scholar') {
    return { variant: 'scholar', data: items }
  }

  if (verticalId === 'patents') {
    return {
      variant: 'patents',
      data: items.map(item => ({
        ...item,
        publicationNumber: item.publication?.number
      }))
    }
  }

  if (verticalId === 'autocomplete') {
    return { variant: 'autocomplete', data: items }
  }

  return { variant: 'search', data: items }
}

const GOOGLE_VERTICAL_EXAMPLES = {
  search: {
    code: `'use strict'

import createGoogleClient from '@microlink/google'

const google = createGoogleClient({
  apiKey: process.env.MICROLINK_API_KEY
})

const page = await google('site:developer.mozilla.org fetch', {
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

const VERTICAL_RESPONSE_HEIGHT = ['476px', '476px', '512px', '552px']

const INTEGRATION_TUTORIAL_STEPS = [
  {
    step: 'STEP 01',
    title: 'Install and initialize',
    icon: Target,
    description:
      'Install `@microlink/google`, add your Microlink API key, and create one client you can reuse across every supported search surface.',
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
      'Choose the surface you need with the `type` option and keep the same client shape for search, news, images, maps, shopping, and more.',
    panel: {
      type: 'code',
      language: 'javascript',
      content: `const google = require('@microlink/google')({
  apiKey: process.env.MICROLINK_API_KEY
})
      
const page = await google('technical seo checklist', {
  type: 'search',
  location: 'us',
  period: 'week'
})`
    }
  },
  {
    step: 'STEP 03',
    title: 'Lazy-load the web',
    icon: GitMerge,
    description:
      'Keep the first pass fast, then enrich only the winners. Browse lightweight result pages first and call `.markdown()` or `.html()` only for the top matches that deserve deeper inspection.',
    panel: {
      type: 'features',
      items: [
        'Any result with a URL exposes `.markdown()` for LLM-ready Markdown on demand.',
        'Call `.html()` only when your workflow actually needs raw page markup.',
        'Just call `.next()` to fetch the next page.',
        'Lazy-load the web: scan results at ~1s latency, then enrich only the top 3 matches.'
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
const HeroSection = styled(Box).withConfig({
  componentId: 'google__HeroSection'
})`
  ${theme({
    position: 'relative',
    overflow: 'visible'
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
    minHeight: 0,
    position: 'relative'
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

  .hero-code-caret {
    display: inline-block;
    width: 2px;
    height: 1em;
    margin: 0 1px -2px 0;
    vertical-align: text-bottom;
    background-color: ${colors.black};
    animation: heroCodeCaretBlink 900ms steps(2, start) infinite;
  }

  @keyframes heroCodeCaretBlink {
    to {
      visibility: hidden;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-code-caret {
      animation: none;
    }
  }
`

const HeroResultDock = styled(Box)
  .withConfig({
    componentId: 'google__HeroResultDock',
    shouldForwardProp: prop => !['$visible'].includes(prop)
  })
  .attrs({ 'aria-live': 'polite' })`
  ${theme({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    bg: 'white',
    borderTop: 1,
    borderTopColor: 'black10',
    boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    flexDirection: 'column'
  })};
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
`

const HeroResultHeader = styled(Flex).withConfig({
  componentId: 'google__HeroResultHeader'
})`
  ${theme({
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    px: [3, 3, 4, 4],
    py: 2,
    bg: 'gray0',
    borderBottom: 1,
    borderBottomColor: 'black10'
  })};
`

const HeroResultHeaderLabel = styled(Flex)
  .withConfig({ componentId: 'google__HeroResultHeaderLabel' })
  .attrs({ as: 'span' })`
  ${theme({
    alignItems: 'center',
    gap: 2,
    color: 'black70',
    fontFamily: 'mono',
    fontSize: '14px',
    letterSpacing: 0,
    lineHeight: 1
  })};
`

const HeroResultStatusDot = styled(Box).withConfig({
  componentId: 'google__HeroResultStatusDot',
  shouldForwardProp: prop => !['$loading'].includes(prop)
})`
  ${theme({
    display: 'inline-block',
    width: '8px',
    height: '8px',
    borderRadius: '9999px'
  })};
  background-color: ${({ $loading }) =>
    $loading ? colors.yellow6 : colors.green6};
  ${({ $loading }) =>
    $loading ? 'animation: heroResultPulse 1200ms ease-in-out infinite;' : ''};

  @keyframes heroResultPulse {
    0%,
    100% {
      opacity: 0.45;
      transform: scale(0.9);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const HERO_RESULT_COLLAPSED_PEEK = '64px'
const HERO_RESULT_EXPANDED_MAX = '520px'

const HeroResultBodyWrap = styled(Box).withConfig({
  componentId: 'google__HeroResultBodyWrap',
  shouldForwardProp: prop => !['$collapsed'].includes(prop)
})`
  overflow: hidden;
  max-height: ${({ $collapsed }) =>
    $collapsed ? HERO_RESULT_COLLAPSED_PEEK : HERO_RESULT_EXPANDED_MAX};
  opacity: ${({ $collapsed }) => ($collapsed ? 0.6 : 1)};
  transition: max-height 260ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 200ms ease;
  -webkit-mask-image: ${({ $collapsed }) =>
    $collapsed
      ? `linear-gradient(to bottom, ${colors.black} 0, transparent 100%)`
      : 'none'};
  mask-image: ${({ $collapsed }) =>
    $collapsed
      ? `linear-gradient(to bottom, ${colors.black} 0, transparent 100%)`
      : 'none'};

  @media (prefers-reduced-motion: reduce) {
    transition: opacity 120ms linear;
  }
`

const HeroResultBody = styled(Box).withConfig({
  componentId: 'google__HeroResultBody'
})`
  ${theme({
    px: [3, 3, 4, 4],
    py: [3, 3, 3, 3],
    bg: 'white',
    overflow: 'hidden'
  })};
`

const HeroResultToggle = styled('button').withConfig({
  componentId: 'google__HeroResultToggle',
  shouldForwardProp: prop => !['$collapsed'].includes(prop)
})`
  ${theme({
    appearance: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    p: 0,
    m: 0,
    borderRadius: '9999px',
    bg: 'transparent',
    color: 'black70'
  })};
  border: 1px solid ${colors.black10};
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: color ${transition.short}, background-color ${transition.short},
    border-color ${transition.short};

  svg {
    transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
    transform: rotate(${({ $collapsed }) => ($collapsed ? '180deg' : '0deg')});
  }

  &:hover {
    color: ${colors.black};
    background-color: ${colors.gray0};
    border-color: ${colors.black20};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    svg {
      transition: none;
    }
  }
`

const HeroResultSkeletonLine = styled(Box).withConfig({
  componentId: 'google__HeroResultSkeletonLine',
  shouldForwardProp: prop => !['$width', '$height'].includes(prop)
})`
  ${theme({
    borderRadius: '4px'
  })};
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '12px'};
  background: linear-gradient(
    90deg,
    ${colors.black05} 0%,
    ${colors.black10} 50%,
    ${colors.black05} 100%
  );
  background-size: 200% 100%;
  animation: heroResultShimmer 1400ms ease-in-out infinite;

  @keyframes heroResultShimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  & + & {
    ${theme({ mt: 2 })};
  }
`

const HeroResultBrand = styled(Flex)
  .withConfig({
    componentId: 'google__HeroResultBrand',
    shouldForwardProp: prop => !['$size', '$tint'].includes(prop)
  })
  .attrs({ as: 'span', 'aria-hidden': 'true' })`
  ${theme({
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: '9999px',
    bg: 'white',
    overflow: 'hidden'
  })};
  width: ${({ $size }) => $size || '20px'};
  height: ${({ $size }) => $size || '20px'};
  border: 1px solid ${colors.black10};
  background-color: ${({ $tint }) => $tint || colors.white};

  img {
    width: 62%;
    height: 62%;
    object-fit: contain;
    display: block;
  }
`

const HeroResultMonogram = styled('span').withConfig({
  componentId: 'google__HeroResultMonogram',
  shouldForwardProp: prop => !['$tint', '$color'].includes(prop)
})`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    fontFamily: 'sans',
    fontSize: '10px',
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 1
  })};
  background-color: ${({ $tint }) => $tint || colors.black80};
  color: ${({ $color }) => $color || colors.white};
  text-transform: uppercase;
`

const HeroResultBreadcrumb = styled(Flex)
  .withConfig({ componentId: 'google__HeroResultBreadcrumb' })
  .attrs({ as: 'div' })`
  ${theme({
    alignItems: 'center',
    gap: 2,
    color: 'black70',
    fontSize: [0, 0, 1, 1]
  })};
  min-width: 0;
`

const HeroResultSite = styled(Text)
  .withConfig({ componentId: 'google__HeroResultSite' })
  .attrs({ as: 'span' })`
  ${theme({
    m: 0,
    color: 'black',
    fontSize: [1, 1, 1, 1],
    fontWeight: 'normal',
    lineHeight: 1
  })};
`

const HeroResultPath = styled(Text)
  .withConfig({ componentId: 'google__HeroResultPath' })
  .attrs({ as: 'span' })`
  ${theme({
    m: 0,
    color: 'black60',
    fontSize: [1, 1, 1, 1],
    lineHeight: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  })};
  min-width: 0;
`

const HeroResultTitle = styled(Text)
  .withConfig({ componentId: 'google__HeroResultTitle' })
  .attrs({ as: 'button', type: 'button' })`
  ${theme({
    appearance: 'none',
    m: 0,
    mt: 2,
    p: 0,
    display: 'block',
    maxWidth: '100%',
    color: 'link',
    fontFamily: 'sans',
    fontSize: [1, 1, 2, 2],
    fontWeight: 'normal',
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: 'left',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: 'default'
  })};
  background: transparent;
  border: 0;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
    border-radius: 2px;
  }
`

const HeroResultDescription = styled(Text)
  .withConfig({ componentId: 'google__HeroResultDescription' })
  .attrs({ as: 'p' })`
  ${theme({
    m: 0,
    mt: 2,
    color: 'black80',
    fontSize: [0, 0, 1, 1],
    lineHeight: 2
  })};
`

const HeroResultMeta = styled(Flex)
  .withConfig({ componentId: 'google__HeroResultMeta' })
  .attrs({ as: 'div' })`
  ${theme({
    alignItems: 'center',
    gap: 2,
    mt: 2,
    color: 'black60',
    fontSize: [0, 0, 1, 1],
    flexWrap: 'wrap'
  })};
`

const HeroResultBadge = styled(Text)
  .withConfig({ componentId: 'google__HeroResultBadge' })
  .attrs({ as: 'span' })`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    px: 2,
    py: 1,
    borderRadius: '9999px',
    bg: 'gray0',
    color: 'black80',
    fontFamily: 'mono',
    fontSize: [0, 0, 1, 1],
    lineHeight: 1
  })};
  border: 1px solid ${colors.black10};
`

const HeroResultBadgeSmall = styled(Text)
  .withConfig({ componentId: 'google__HeroResultBadgeSmall' })
  .attrs({ as: 'span' })`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    px: 2,
    py: 1,
    borderRadius: '9999px',
    bg: 'gray0',
    color: 'black80',
    fontFamily: 'mono',
    fontSize: '11px',
    lineHeight: 1,
    letterSpacing: 0
  })};
  border: 1px solid ${colors.black10};

  svg {
    width: 12px;
    height: 12px;
  }
`

const HeroResultBadgeGroup = styled(Flex).withConfig({
  componentId: 'google__HeroResultBadgeGroup'
})`
  ${theme({
    alignItems: 'center',
    gap: 1,
    flexShrink: 0
  })};
`

const HeroResultRating = styled(Flex)
  .withConfig({ componentId: 'google__HeroResultRating' })
  .attrs({ as: 'span' })`
  ${theme({
    alignItems: 'center',
    gap: 1,
    color: 'black',
    fontSize: [1, 1, 2, 2]
  })};
`

const HeroResultList = styled(Box)
  .withConfig({ componentId: 'google__HeroResultList' })
  .attrs({ as: 'ul', role: 'list' })`
  ${theme({
    m: 0,
    p: 0,
    listStyle: 'none',
    maxHeight: ['180px', '180px', '200px', '220px'],
    overflowY: 'auto',
    overflowX: 'hidden',
    mx: [-3, -3, -4, -4]
  })};
  scrollbar-width: thin;
  scrollbar-color: ${colors.black20} transparent;
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0,
    ${colors.black} 12px,
    ${colors.black} calc(100% - 20px),
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0,
    ${colors.black} 12px,
    ${colors.black} calc(100% - 20px),
    transparent 100%
  );

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.black20};
    border-radius: 9999px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`

const HeroResultListItem = styled(Box)
  .withConfig({ componentId: 'google__HeroResultListItem' })
  .attrs({ as: 'li' })`
  ${theme({
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    px: [3, 3, 4, 4],
    py: [2, 2, 3, 3]
  })};
  border-bottom: 1px solid ${colors.black05};
  transition: background-color ${transition.short};

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background-color: ${colors.gray0};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const HeroResultListRow = styled(Flex).withConfig({
  componentId: 'google__HeroResultListRow'
})`
  ${theme({
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 3,
    width: '100%',
    minWidth: 0
  })};
`

const HeroResultListTitle = styled(Text)
  .withConfig({ componentId: 'google__HeroResultListTitle' })
  .attrs({ as: 'button', type: 'button' })`
  ${theme({
    appearance: 'none',
    m: 0,
    p: 0,
    display: 'block',
    maxWidth: '100%',
    color: 'link',
    fontFamily: 'sans',
    fontSize: [1, 1, 2, 2],
    fontWeight: 'normal',
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: 'left',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: 'default'
  })};
  background: transparent;
  border: 0;
  flex: 1;
  min-width: 0;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
    border-radius: 2px;
  }
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
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 2px;
    background: ${({ $accentColor }) => colors[$accentColor] || colors.black};
  }
`

const VerticalExampleTopbar = styled(Flex).withConfig({
  componentId: 'google__VerticalExampleTopbar'
})`
  ${theme({
    px: [3, 3, 4, 4],
    py: [3, 3, 3, 3],
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 2,
    bg: 'transparent',
    borderBottom: 1,
    borderBottomColor: 'black10'
  })};
`

const VerticalExampleGrid = styled(Box).withConfig({
  componentId: 'google__VerticalExampleGrid'
})`
  ${theme({
    display: 'grid',
    gridTemplateColumns: [
      '1fr',
      '1fr',
      '1fr',
      'minmax(0, 0.96fr) minmax(0, 1.04fr)'
    ],
    gap: [3, 3, 3, 4],
    p: [3, 3, 4, 4],
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
    flexDirection: 'column',
    minHeight: 0,
    borderRadius: 4,
    overflow: 'hidden'
  })};
`

const VerticalPanelHeader = styled(Box).withConfig({
  componentId: 'google__VerticalPanelHeader'
})`
  ${theme({
    px: [2, 2, 3, 3],
    pt: [3, 3, 4, 4],
    pb: [3, 3, 3, 3],
    borderBottom: 1,
    borderBottomColor: 'black05'
  })};
`

const VerticalPanelIntro = styled(Flex).withConfig({
  componentId: 'google__VerticalPanelIntro'
})`
  ${theme({
    alignItems: 'center',
    gap: 3
  })};
`

const VerticalPanelLogo = styled('img').withConfig({
  componentId: 'google__VerticalPanelLogo'
})`
  ${theme({
    width: '36px',
    height: '36px',
    flexShrink: 0
  })};
`

const VerticalPanelCopy = styled(Box).withConfig({
  componentId: 'google__VerticalPanelCopy'
})`
  ${theme({
    minWidth: 0
  })};
`

const VerticalPanelTitle = styled(Text)
  .withConfig({ componentId: 'google__VerticalPanelTitle' })
  .attrs({ as: 'h4' })`
  ${theme({
    m: 0,
    color: 'black',
    fontSize: [1, 1, 2, 2],
    fontWeight: 'bold',
    lineHeight: 2
  })};
`

const VerticalPanelDescription = styled(Text)
  .withConfig({ componentId: 'google__VerticalPanelDescription' })
  .attrs({ as: 'p' })`
  ${theme({
    m: 0,
    mt: 1,
    color: 'black70',
    fontSize: [0, 0, 1, 1],
    lineHeight: 2
  })};
`

const VerticalCodeFrame = styled(Box).withConfig({
  componentId: 'google__VerticalCodeFrame'
})`
  ${theme({
    py: [2, 2, 3, 3],
    px: [1, 1, 2, 2],
    minWidth: 0
  })};
`

const VerticalPreviewShell = styled(Box).withConfig({
  componentId: 'google__VerticalPreviewShell'
})`
  ${theme({
    borderTop: 1,
    borderTopColor: 'white',
    bg: 'white',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0,
    flex: 1,
    minWidth: 0
  })};
`

const VerticalPreviewBody = styled(Box).withConfig({
  componentId: 'google__VerticalPreviewBody'
})`
  ${theme({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    overflowX: 'hidden'
  })};
`

const VerticalPreviewContent = styled(Box).withConfig({
  componentId: 'google__VerticalPreviewContent'
})`
  ${theme({
    minWidth: 0
  })};

  ${HeroResultList} {
    max-height: none;
    height: auto;
    flex: none;
  }
`

const VerticalOutputTabBar = styled(Box)
  .withConfig({ componentId: 'google__VerticalOutputTabBar' })
  .attrs({ role: 'tablist' })`
  ${theme({
    display: 'flex',
    width: '100%',
    bg: 'gray0',
    flexShrink: 0
  })};
`

const VerticalOutputTab = styled('button').withConfig({
  componentId: 'google__VerticalOutputTab',
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
    &::before {
      transition: none;
    }
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
    fontSize: 2,
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
  shouldForwardProp: prop => !['$active', '$activeColor'].includes(prop)
})`
  ${theme({
    appearance: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 2,
    border: 1,
    borderColor: 'black10',
    borderRadius: 4,
    bg: 'gray0',
    py: 1,
    px: 2,
    minHeight: '36px',
    color: 'black80',
    fontFamily: 'mono',
    fontWeight: 'normal',
    fontSize: [0, 0, 1, 1],
    lineHeight: 1,
    textTransform: 'lowercase',
    letterSpacing: 0,
    whiteSpace: 'nowrap',
    textAlign: 'left',
    cursor: 'pointer',
    flexShrink: 0
  })};
  ${({ $active, $activeColor }) =>
    theme({
      borderColor: $active ? $activeColor : 'black10',
      bg: $active ? 'white' : 'gray0',
      color: $active ? 'black' : 'black80',
      fontWeight: $active ? 'bold' : 'normal'
    })};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: color ${transition.short}, border-color ${transition.short},
    background-color ${transition.short};

  &:hover {
    border-color: ${colors.black20};
    background-color: ${colors.white};
    color: ${colors.black};
  }
  ${({ $active, $activeColor }) =>
    $active
      ? `
    &:hover {
      border-color: ${colors[$activeColor] || $activeColor};
      background-color: ${colors.white};
      color: ${colors.black};
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

const VerticalTabIcon = styled('img').withConfig({
  componentId: 'google__VerticalTabIcon'
})`
  ${theme({
    width: '16px',
    height: '16px',
    flexShrink: 0
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

const RetrievalGrid = styled(Box)
  .withConfig({
    componentId: 'google__RetrievalGrid'
  })
  .attrs({ as: 'ul' })`
  ${theme({
    mt: [4, 4, 5, 5],
    p: 0,
    listStyle: 'none',
    width: '100%'
  })};
`

const RetrievalCard = styled(Box)
  .withConfig({
    componentId: 'google__RetrievalCard'
  })
  .attrs({ as: 'li' })`
  ${theme({
    display: 'block',
    minWidth: 0,
    py: [3, 3, 4, 4]
  })};

  &:not(:first-of-type) {
    border-top: 1px solid ${colors.black05};
  }
`

const RetrievalCardHeader = styled(Flex).withConfig({
  componentId: 'google__RetrievalCardHeader'
})`
  ${theme({
    alignItems: 'flex-start',
    minWidth: 0
  })};
`

const RetrievalCardContent = styled(Box).withConfig({
  componentId: 'google__RetrievalCardContent'
})`
  ${theme({
    minWidth: 0,
    width: '100%'
  })};
`

const RetrievalCardLabel = styled(Text)
  .withConfig({ componentId: 'google__RetrievalCardLabel' })
  .attrs({ as: 'p' })`
  ${theme({
    m: 0,
    color: 'black50',
    fontFamily: 'mono',
    fontSize: [0, 0, 1, 1],
    lineHeight: 1,
    letterSpacing: 1,
    textTransform: 'uppercase'
  })};
`

const RetrievalCardTitle = styled(Text)
  .withConfig({ componentId: 'google__RetrievalCardTitle' })
  .attrs({ as: 'h3' })`
  ${theme({
    m: 0,
    mt: 1,
    color: 'black',
    fontWeight: 'bold',
    fontSize: [2, 2, 3, 3],
    lineHeight: 1
  })};
`

const RetrievalCardBody = styled(Box).withConfig({
  componentId: 'google__RetrievalCardBody'
})`
  ${theme({
    pl: 0
  })};
`

const RetrievalCardDescription = styled(Text)
  .withConfig({ componentId: 'google__RetrievalCardDescription' })
  .attrs({ as: 'p' })`
  ${theme({
    m: 0,
    mt: 2,
    color: 'black70',
    fontSize: [1, 1, 2, 2],
    lineHeight: 2
  })};
`

const RetrievalFeatureText = styled(Text)
  .withConfig({ componentId: 'google__RetrievalFeatureText' })
  .attrs({ as: 'span' })`
  ${theme({
    color: 'black80',
    fontSize: [0, 0, 1, 1],
    lineHeight: 2
  })};
`

const RetrievalCommandList = styled(Box)
  .withConfig({ componentId: 'google__RetrievalCommandList' })
  .attrs({ as: 'ul' })`
  ${theme({
    m: 0,
    mt: [3, 3, 3, 3],
    p: 0,
    listStyle: 'none',
    display: 'grid',
    gap: 2
  })};
`

const RetrievalCommandRow = styled(Flex).withConfig({
  componentId: 'google__RetrievalCommandRow'
})`
  ${theme({
    alignItems: 'flex-start',
    flexDirection: ['column', 'column', 'row', 'row'],
    gap: [1, 1, 2, 2],
    minWidth: 0
  })};
`

const RetrievalCommandLabel = styled(Text)
  .withConfig({ componentId: 'google__RetrievalCommandLabel' })
  .attrs({ as: 'span' })`
  ${theme({
    color: 'black50',
    fontFamily: 'mono',
    fontSize: [0, 0, 1, 1],
    lineHeight: 1,
    letterSpacing: 1,
    textTransform: 'uppercase',
    minWidth: ['auto', 'auto', '72px', '72px']
  })};
`

const RetrievalCommand = styled(Flex).withConfig({
  componentId: 'google__RetrievalCommand'
})`
  ${theme({
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 1,
    minWidth: 0
  })};
`

const RetrievalCommandText = styled(Text)
  .withConfig({ componentId: 'google__RetrievalCommandText' })
  .attrs({ as: 'span' })`
  ${theme({
    color: 'black70',
    fontFamily: 'mono',
    fontSize: [0, 0, 1, 1],
    lineHeight: 1
  })};
`

const RetrievalCommandStrong = styled(Text)
  .withConfig({ componentId: 'google__RetrievalCommandStrong' })
  .attrs({ as: 'strong' })`
  ${theme({
    color: 'black',
    fontFamily: 'mono',
    fontSize: [0, 0, 1, 1],
    lineHeight: 1,
    fontWeight: 'bold'
  })};
`

const PricingCardsGrid = styled(Flex).withConfig({
  componentId: 'google__PricingCardsGrid'
})`
  ${theme({
    pt: [4, 4, 5, 5],
    px: [2, 2, 3, 3],
    flexDirection: 'column',
    justifyContent: 'stretch',
    alignItems: 'center',
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
    maxWidth: ['100%', '100%', '400px', '400px'],
    width: '100%'
  })};
  border: 2px solid transparent;
  background: linear-gradient(${colors.white}, ${colors.white}) padding-box,
    ${gradient} border-box;
  box-shadow: 0 12px 32px ${colors.black10};
`

const TrademarkNote = styled(Text)
  .withConfig({ componentId: 'google__TrademarkNote' })
  .attrs({ as: 'p' })`
  ${theme({
    m: 0,
    color: 'black60',
    fontSize: [0, 0, 1, 1],
    lineHeight: 2,
    textAlign: 'center'
  })};
`

const HERO_TYPING_OPTION_KEYS = ['type', 'location', 'period']

const extractHeroTypingTargets = code => {
  if (!code) return []
  const targets = []
  const queryMatch = code.match(/google\(\s*(['"])([\s\S]*?)\1/)
  if (queryMatch) targets.push(queryMatch[2])
  HERO_TYPING_OPTION_KEYS.forEach(key => {
    const pattern = new RegExp(`${key}\\s*:\\s*(['"])([\\s\\S]*?)\\1`)
    const match = code.match(pattern)
    if (match) targets.push(match[2])
  })
  return targets
}

const HERO_TYPE_CHAR_MS = 32
const HERO_TYPE_GAP_MS = 260
const HERO_TYPE_START_MS = 80

const findHeroTypingSpans = (root, targets) => {
  const spans = Array.from(root.querySelectorAll('.sh__token--string'))
  const remaining = [...targets]
  const matches = []
  for (const span of spans) {
    if (remaining.length === 0) break
    const text = span.textContent
    const idx = remaining.indexOf(text)
    if (idx === -1) continue
    remaining.splice(idx, 1)
    matches.push({ span, text })
  }
  return matches.length === targets.length ? matches : null
}

const runHeroTypingSequence = (matches, prefersReducedMotion, onComplete) => {
  const timers = []
  let cancelled = false

  const caret = document.createElement('span')
  caret.className = 'hero-code-caret'
  caret.setAttribute('aria-hidden', 'true')

  matches.forEach(match => {
    match.span.textContent = ''
  })

  if (prefersReducedMotion) {
    matches.forEach(match => {
      match.span.textContent = match.text
    })
    if (onComplete) onComplete()
    return () => {}
  }

  const finish = () => {
    if (cancelled) return
    if (caret.parentNode) caret.parentNode.removeChild(caret)
    if (onComplete) onComplete()
  }

  const typeInto = (match, onDone) => {
    if (cancelled) return
    match.span.textContent = ''
    match.span.appendChild(caret)
    let i = 0

    const tick = () => {
      if (cancelled) return
      i += 1
      match.span.insertBefore(
        document.createTextNode(match.text.charAt(i - 1)),
        caret
      )
      if (i < match.text.length) {
        timers.push(window.setTimeout(tick, HERO_TYPE_CHAR_MS))
      } else {
        onDone()
      }
    }

    timers.push(window.setTimeout(tick, HERO_TYPE_CHAR_MS))
  }

  const runIndex = index => {
    if (cancelled) return
    if (index >= matches.length) {
      finish()
      return
    }
    typeInto(matches[index], () => {
      if (cancelled) return
      if (index + 1 < matches.length) {
        timers.push(
          window.setTimeout(() => runIndex(index + 1), HERO_TYPE_GAP_MS)
        )
      } else {
        finish()
      }
    })
  }

  timers.push(window.setTimeout(() => runIndex(0), HERO_TYPE_START_MS))

  return () => {
    cancelled = true
    timers.forEach(id => window.clearTimeout(id))
    if (caret.parentNode) caret.parentNode.removeChild(caret)
  }
}

const HERO_LOADING_MS = 1000

const formatBytes = bytes => {
  if (typeof bytes !== 'number') return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

const formatRelativeTime = isoDate => {
  if (!isoDate) return ''
  const then = new Date(isoDate).getTime()
  if (Number.isNaN(then)) return ''
  const diffMs = Date.now() - then
  const hours = Math.round(diffMs / (1000 * 60 * 60))
  if (hours < 1) return 'just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.round(days / 30)
  if (months < 12) return `${months}mo ago`
  const years = Math.round(months / 12)
  return `${years}y ago`
}

const formatCoordinate = (value, positiveLabel, negativeLabel) => {
  if (typeof value !== 'number') return null
  const direction = value >= 0 ? positiveLabel : negativeLabel
  return `${Math.abs(value).toFixed(4)}° ${direction}`
}

const buildBreadcrumb = url => {
  try {
    const parsed = new URL(url)
    const host = parsed.host.replace(/^www\./, '')
    const segments = parsed.pathname
      .split('/')
      .filter(Boolean)
      .slice(0, 2)
      .join(' › ')
    return {
      host,
      path: segments ? ` › ${segments}` : '',
      origin: parsed.origin
    }
  } catch {
    return { host: url, path: '', origin: '' }
  }
}

const HOST_BRAND_MAP = {
  'techcrunch.com': { icon: 'techcrunch', tint: '#FFFFFF' },
  'google.com': { icon: 'google', tint: '#FFFFFF' }
}

const HOST_MONOGRAM_OVERRIDES = {
  'openai.com': { label: 'AI', tint: '#10A37F' },
  'theverge.com': { label: 'V', tint: '#5200FF' },
  'ft.com': { label: 'FT', tint: '#FFF1E5', color: '#990F3D' }
}

const MONOGRAM_PALETTE = [
  '#5B8DEF',
  '#4DA167',
  '#F2994A',
  '#EB5757',
  '#9B51E0',
  '#2D9CDB',
  '#219653'
]

const monogramTintFor = seed => {
  if (!seed) return MONOGRAM_PALETTE[0]
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  }
  return MONOGRAM_PALETTE[hash % MONOGRAM_PALETTE.length]
}

const monogramFor = host => {
  if (!host) return '•'
  const base = host.replace(/^www\./, '').split('.')[0]
  return base.slice(0, 2).toUpperCase()
}

const brandMatchFor = host => {
  if (!host) return null
  const normalized = host.replace(/^www\./, '').toLowerCase()
  if (HOST_BRAND_MAP[normalized]) return HOST_BRAND_MAP[normalized]
  const match = Object.keys(HOST_BRAND_MAP).find(key =>
    normalized.endsWith(`.${key}`)
  )
  return match ? HOST_BRAND_MAP[match] : null
}

const monogramOverrideFor = host => {
  if (!host) return null
  const normalized = host.replace(/^www\./, '').toLowerCase()
  if (HOST_MONOGRAM_OVERRIDES[normalized]) {
    return HOST_MONOGRAM_OVERRIDES[normalized]
  }
  const match = Object.keys(HOST_MONOGRAM_OVERRIDES).find(key =>
    normalized.endsWith(`.${key}`)
  )
  return match ? HOST_MONOGRAM_OVERRIDES[match] : null
}

const HostBrandIcon = ({ host, size = '20px' }) => {
  const brand = brandMatchFor(host)
  if (brand) {
    return (
      <HeroResultBrand $size={size} $tint={brand.tint}>
        <img
          src={`https://cdn.simpleicons.org/${brand.icon}`}
          alt=''
          aria-hidden='true'
          loading='lazy'
        />
      </HeroResultBrand>
    )
  }
  const override = monogramOverrideFor(host)
  if (override) {
    return (
      <HeroResultBrand $size={size} $tint={override.tint}>
        <HeroResultMonogram $tint={override.tint} $color={override.color}>
          {override.label}
        </HeroResultMonogram>
      </HeroResultBrand>
    )
  }
  return (
    <HeroResultBrand $size={size} $tint={colors.white}>
      <HeroResultMonogram $tint={monogramTintFor(host)}>
        {monogramFor(host)}
      </HeroResultMonogram>
    </HeroResultBrand>
  )
}

const HeroResultSkeleton = () => (
  <Box css={theme({ width: '100%' })}>
    <HeroResultSkeletonLine $width='160px' $height='10px' />
    <HeroResultSkeletonLine $width='85%' $height='16px' />
    <HeroResultSkeletonLine $width='96%' $height='10px' />
    <HeroResultSkeletonLine $width='70%' $height='10px' />
  </Box>
)

const HeroSearchResultCard = ({ data, badge = null }) => {
  const { host, path, origin } = buildBreadcrumb(data.url)
  return (
    <Box>
      <HeroResultBreadcrumb>
        <HostBrandIcon host={host} size='28px' />
        <Flex
          css={theme({
            flexDirection: 'column',
            minWidth: 0,
            lineHeight: 1
          })}
        >
          <HeroResultSite>{host}</HeroResultSite>
          <HeroResultPath>
            {origin}
            {path}
          </HeroResultPath>
        </Flex>
      </HeroResultBreadcrumb>
      <HeroResultTitle>{data.title}</HeroResultTitle>
      <HeroResultDescription>{data.description}</HeroResultDescription>
      {badge && <HeroResultMeta>{badge}</HeroResultMeta>}
    </Box>
  )
}

const HeroNewsResultCard = ({ data }) => {
  return (
    <Box>
      <HeroResultBreadcrumb>
        <HeroResultSite>{data.publisher}</HeroResultSite>
        <Text
          as='span'
          css={theme({
            color: 'black50',
            fontSize: [0, 0, 1, 1]
          })}
        >
          •
        </Text>
        <Flex css={theme({ alignItems: 'center', gap: 1 })}>
          <Clock size={12} aria-hidden='true' />
          <Text
            as='span'
            css={theme({ color: 'black60', fontSize: [0, 0, 1, 1] })}
          >
            {formatRelativeTime(data.date)}
          </Text>
        </Flex>
      </HeroResultBreadcrumb>
      <HeroResultTitle>{data.title}</HeroResultTitle>
      <HeroResultDescription>{data.description}</HeroResultDescription>
    </Box>
  )
}

const HeroPlacesResultCard = ({ data }) => (
  <Box>
    <Flex css={theme({ alignItems: 'center', gap: 2, minWidth: 0 })}>
      <HeroResultBrand $size='28px' $tint={colors.white}>
        <img
          src='https://cdn.simpleicons.org/googlemaps'
          alt=''
          aria-hidden='true'
          loading='lazy'
        />
      </HeroResultBrand>
      <Text
        as='span'
        css={theme({
          m: 0,
          color: 'black',
          fontSize: [1, 1, 2, 2],
          fontWeight: 'bold',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minWidth: 0
        })}
      >
        {data.title}
      </Text>
      <HeroResultBadge>{data.category}</HeroResultBadge>
    </Flex>
    <HeroResultMeta>
      <HeroResultRating>
        <Star
          size={14}
          fill={colors.yellow5}
          color={colors.yellow5}
          aria-hidden='true'
        />
        <Text
          as='span'
          css={theme({
            color: 'black',
            fontSize: [1, 1, 2, 2],
            fontWeight: 'bold'
          })}
        >
          {data.rating.toFixed(1)}
        </Text>
        <Text
          as='span'
          css={theme({ color: 'black60', fontSize: [0, 0, 1, 1] })}
        >
          ({data.reviewCount.toLocaleString()})
        </Text>
      </HeroResultRating>
    </HeroResultMeta>
    <Flex css={theme({ alignItems: 'center', gap: 2, mt: 2 })}>
      <MapPin size={14} aria-hidden='true' color={colors.black70} />
      <Text as='span' css={theme({ color: 'black80', fontSize: [1, 1, 2, 2] })}>
        {data.address}
      </Text>
    </Flex>
    <Text
      as='span'
      css={theme({
        display: 'block',
        mt: 1,
        color: 'black50',
        fontFamily: 'mono',
        fontSize: [0, 0, 1, 1]
      })}
    >
      {data.latitude.toFixed(4)}, {data.longitude.toFixed(4)}
    </Text>
  </Box>
)

const HeroNewsListItem = ({ item }) => {
  const { host } = buildBreadcrumb(item.url)
  return (
    <HeroResultListItem>
      <HeroResultBreadcrumb>
        <HostBrandIcon host={host} size='20px' />
        <HeroResultSite>{item.publisher}</HeroResultSite>
        <Text
          as='span'
          css={theme({ color: 'black50', fontSize: [0, 0, 1, 1] })}
        >
          •
        </Text>
        <Flex css={theme({ alignItems: 'center', gap: 1 })}>
          <Clock size={12} aria-hidden='true' />
          <Text
            as='span'
            css={theme({ color: 'black60', fontSize: [0, 0, 1, 1] })}
          >
            {formatRelativeTime(item.date)}
          </Text>
        </Flex>
      </HeroResultBreadcrumb>
      <HeroResultListTitle>{item.title}</HeroResultListTitle>
      {item.description && (
        <Text
          as='p'
          css={theme({
            m: 0,
            color: 'black70',
            fontSize: [0, 0, 1, 1],
            lineHeight: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          })}
        >
          {item.description}
        </Text>
      )}
    </HeroResultListItem>
  )
}

const HeroSearchEnrichedListItem = ({ item }) => {
  const { host } = buildBreadcrumb(item.url)
  return (
    <HeroResultListItem>
      <HeroResultListRow>
        <HeroResultBreadcrumb>
          <HostBrandIcon host={host} size='20px' />
          <HeroResultSite>{host}</HeroResultSite>
        </HeroResultBreadcrumb>
        <HeroResultBadgeGroup>
          <HeroResultBadgeSmall>
            <CodeIcon aria-hidden='true' />
            html · {formatBytes(item.htmlBytes)}
          </HeroResultBadgeSmall>
          {typeof item.mdBytes === 'number' && (
            <HeroResultBadgeSmall>
              <FileText aria-hidden='true' />
              md · {formatBytes(item.mdBytes)}
            </HeroResultBadgeSmall>
          )}
        </HeroResultBadgeGroup>
      </HeroResultListRow>
      <HeroResultListTitle>{item.title}</HeroResultListTitle>
      {item.description && (
        <Text
          as='p'
          css={theme({
            m: 0,
            color: 'black70',
            fontSize: [0, 0, 1, 1],
            lineHeight: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          })}
        >
          {item.description}
        </Text>
      )}
    </HeroResultListItem>
  )
}

const HeroSearchListItem = ({ item }) => {
  const { host, path, origin } = buildBreadcrumb(item.url)
  return (
    <HeroResultListItem>
      <HeroResultBreadcrumb>
        <HostBrandIcon host={host} size='20px' />
        <Flex
          css={theme({
            flexDirection: 'column',
            minWidth: 0,
            lineHeight: 1
          })}
        >
          <HeroResultSite>{host}</HeroResultSite>
          <HeroResultPath>
            {origin}
            {path}
          </HeroResultPath>
        </Flex>
      </HeroResultBreadcrumb>
      <HeroResultListTitle>{item.title}</HeroResultListTitle>
      {item.description && (
        <Text
          as='p'
          css={theme({
            m: 0,
            color: 'black70',
            fontSize: [0, 0, 1, 1],
            lineHeight: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          })}
        >
          {item.description}
        </Text>
      )}
    </HeroResultListItem>
  )
}

const HeroImageListItem = ({ item }) => {
  const { host } = buildBreadcrumb(item.url)
  const width = item.image?.width ?? item.thumbnail?.width
  const height = item.image?.height ?? item.thumbnail?.height

  return (
    <HeroResultListItem>
      <HeroResultListRow>
        <HeroResultBreadcrumb>
          <HostBrandIcon host={host} size='20px' />
          <HeroResultSite>{host}</HeroResultSite>
        </HeroResultBreadcrumb>
        {(width || height) && (
          <HeroResultBadgeSmall>
            {width || '?'} × {height || '?'}
          </HeroResultBadgeSmall>
        )}
      </HeroResultListRow>
      <HeroResultListTitle>{item.title}</HeroResultListTitle>
    </HeroResultListItem>
  )
}

const HeroVideoListItem = ({ item }) => (
  <HeroResultListItem>
    <HeroResultListRow>
      <HeroResultBreadcrumb>
        <HeroResultSite>{item.publisher || item.channel}</HeroResultSite>
        {item.date && (
          <>
            <Text
              as='span'
              css={theme({ color: 'black50', fontSize: [0, 0, 1, 1] })}
            >
              •
            </Text>
            <Flex css={theme({ alignItems: 'center', gap: 1 })}>
              <Clock size={12} aria-hidden='true' />
              <Text
                as='span'
                css={theme({ color: 'black60', fontSize: [0, 0, 1, 1] })}
              >
                {formatRelativeTime(item.date)}
              </Text>
            </Flex>
          </>
        )}
      </HeroResultBreadcrumb>
      {item.duration_pretty && (
        <HeroResultBadgeSmall>{item.duration_pretty}</HeroResultBadgeSmall>
      )}
    </HeroResultListRow>
    <HeroResultListTitle>{item.title}</HeroResultListTitle>
    {item.description && (
      <Text
        as='p'
        css={theme({
          m: 0,
          color: 'black70',
          fontSize: [0, 0, 1, 1],
          lineHeight: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        })}
      >
        {item.description}
      </Text>
    )}
  </HeroResultListItem>
)

const HeroPlacesListItem = ({ item }) => (
  <HeroResultListItem>
    <HeroResultListRow>
      <Text
        as='span'
        css={theme({
          m: 0,
          color: 'black',
          fontSize: [1, 1, 2, 2],
          fontWeight: 'bold',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minWidth: 0
        })}
      >
        {item.title}
      </Text>
      {item.category && (
        <HeroResultBadgeSmall>{item.category}</HeroResultBadgeSmall>
      )}
    </HeroResultListRow>
    <HeroResultMeta css={theme({ mt: 1 })}>
      {typeof item.rating === 'number' && (
        <HeroResultRating>
          <Star
            size={12}
            fill={colors.yellow5}
            color={colors.yellow5}
            aria-hidden='true'
          />
          <Text
            as='span'
            css={theme({
              color: 'black',
              fontSize: [0, 0, 1, 1],
              fontWeight: 'bold'
            })}
          >
            {item.rating.toFixed(1)}
          </Text>
          {typeof item.reviewCount === 'number' && (
            <Text
              as='span'
              css={theme({ color: 'black60', fontSize: [0, 0, 1, 1] })}
            >
              ({item.reviewCount.toLocaleString()})
            </Text>
          )}
        </HeroResultRating>
      )}
    </HeroResultMeta>
    {item.address && (
      <Text
        as='p'
        css={theme({
          m: 0,
          color: 'black70',
          fontSize: [0, 0, 1, 1],
          lineHeight: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        })}
      >
        {item.address}
      </Text>
    )}
  </HeroResultListItem>
)

const HeroMapListItem = ({ item }) => (
  <HeroResultListItem>
    <Box css={theme({ minWidth: 0 })}>
      <HeroResultListRow>
        <Text
          as='span'
          css={theme({
            m: 0,
            color: 'black',
            fontSize: [1, 1, 2, 2],
            fontWeight: 'bold',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minWidth: 0
          })}
        >
          {item.title}
        </Text>
        <HeroResultBadgeSmall>map</HeroResultBadgeSmall>
      </HeroResultListRow>

      {item.address && (
        <Flex css={theme({ alignItems: 'flex-start', gap: 2, mt: 2 })}>
          <Text
            as='p'
            css={theme({
              m: 0,
              color: 'black70',
              fontSize: [0, 0, 1, 1],
              lineHeight: 2
            })}
          >
            {item.address}
          </Text>
        </Flex>
      )}

      {(typeof item.latitude === 'number' ||
        typeof item.longitude === 'number') && (
        <Box
          css={theme({
            mt: 2,
            p: 2,
            borderRadius: 3,
            bg: 'gray0',
            border: 1,
            borderColor: 'black05'
          })}
        >
          <Text
            as='p'
            css={theme({
              m: 0,
              color: 'black50',
              fontFamily: 'mono',
              fontSize: [0, 0, 1, 1],
              fontWeight: 'bold',
              lineHeight: 1
            })}
          >
            Coordinates
          </Text>
          <Flex css={theme({ gap: 2, mt: 2, flexWrap: 'wrap' })}>
            {typeof item.latitude === 'number' && (
              <HeroResultBadgeSmall>
                lat · {formatCoordinate(item.latitude, 'N', 'S')}
              </HeroResultBadgeSmall>
            )}
            {typeof item.longitude === 'number' && (
              <HeroResultBadgeSmall>
                lng · {formatCoordinate(item.longitude, 'E', 'W')}
              </HeroResultBadgeSmall>
            )}
          </Flex>
        </Box>
      )}

      {item.place?.id && (
        <HeroResultMeta css={theme({ mt: 2, gap: 1 })}>
          <HeroResultBadgeSmall>place · {item.place.id}</HeroResultBadgeSmall>
        </HeroResultMeta>
      )}
    </Box>
  </HeroResultListItem>
)

const HeroShoppingListItem = ({ item }) => (
  <HeroResultListItem>
    <HeroResultListRow>
      <HeroResultBreadcrumb>
        <HeroResultSite>{item.publisher}</HeroResultSite>
      </HeroResultBreadcrumb>
      {item.priceLabel && (
        <HeroResultBadgeSmall>{item.priceLabel}</HeroResultBadgeSmall>
      )}
    </HeroResultListRow>
    <HeroResultListTitle>{item.title}</HeroResultListTitle>
  </HeroResultListItem>
)

const HeroScholarListItem = ({ item }) => (
  <HeroResultListItem>
    <HeroResultListRow>
      <HeroResultBadgeGroup>
        {item.year && <HeroResultBadgeSmall>{item.year}</HeroResultBadgeSmall>}
        {typeof item.citations === 'number' && (
          <HeroResultBadgeSmall>
            {item.citations.toLocaleString()} cites
          </HeroResultBadgeSmall>
        )}
      </HeroResultBadgeGroup>
    </HeroResultListRow>
    <HeroResultListTitle>{item.title}</HeroResultListTitle>
    {item.publisher && (
      <Text
        as='p'
        css={theme({
          m: 0,
          color: 'black70',
          fontSize: [0, 0, 1, 1],
          lineHeight: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        })}
      >
        {item.publisher}
      </Text>
    )}
  </HeroResultListItem>
)

const HeroPatentListItem = ({ item }) => (
  <HeroResultListItem>
    <HeroResultListRow>
      <HeroResultBadgeGroup>
        {item.publicationNumber && (
          <HeroResultBadgeSmall>{item.publicationNumber}</HeroResultBadgeSmall>
        )}
        {item.language && (
          <HeroResultBadgeSmall>{item.language}</HeroResultBadgeSmall>
        )}
      </HeroResultBadgeGroup>
    </HeroResultListRow>
    <HeroResultListTitle>{item.title}</HeroResultListTitle>
    <Text
      as='p'
      css={theme({
        m: 0,
        color: 'black70',
        fontSize: [0, 0, 1, 1],
        lineHeight: 1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      })}
    >
      {item.assignee || item.inventor}
    </Text>
  </HeroResultListItem>
)

const HeroAutocompleteListItem = ({ item }) => (
  <HeroResultListItem>
    <HeroResultListRow>
      <HeroResultBadgeSmall>suggestion</HeroResultBadgeSmall>
    </HeroResultListRow>
    <HeroResultListTitle>{item.value}</HeroResultListTitle>
  </HeroResultListItem>
)

const HeroResultCard = ({ result }) => {
  if (!result) return null
  const { variant, data } = result

  if (variant === 'search' && Array.isArray(data)) {
    return (
      <HeroResultList>
        {data.map(item => (
          <HeroSearchListItem key={item.url} item={item} />
        ))}
      </HeroResultList>
    )
  }

  if (variant === 'news' && Array.isArray(data)) {
    return (
      <HeroResultList>
        {data.map(item => (
          <HeroNewsListItem key={item.url} item={item} />
        ))}
      </HeroResultList>
    )
  }

  if (variant === 'images' && Array.isArray(data)) {
    return (
      <HeroResultList>
        {data.map(item => (
          <HeroImageListItem key={item.url} item={item} />
        ))}
      </HeroResultList>
    )
  }

  if (variant === 'videos' && Array.isArray(data)) {
    return (
      <HeroResultList>
        {data.map(item => (
          <HeroVideoListItem key={item.url} item={item} />
        ))}
      </HeroResultList>
    )
  }

  if (variant === 'places' && Array.isArray(data)) {
    return (
      <HeroResultList>
        {data.map(item => (
          <HeroPlacesListItem key={item.cid || item.title} item={item} />
        ))}
      </HeroResultList>
    )
  }

  if (variant === 'maps' && Array.isArray(data)) {
    return (
      <HeroResultList>
        {data.map(item => (
          <HeroMapListItem key={item.cid || item.title} item={item} />
        ))}
      </HeroResultList>
    )
  }

  if (variant === 'shopping' && Array.isArray(data)) {
    return (
      <HeroResultList>
        {data.map(item => (
          <HeroShoppingListItem key={item.id || item.title} item={item} />
        ))}
      </HeroResultList>
    )
  }

  if (variant === 'scholar' && Array.isArray(data)) {
    return (
      <HeroResultList>
        {data.map(item => (
          <HeroScholarListItem key={item.id || item.title} item={item} />
        ))}
      </HeroResultList>
    )
  }

  if (variant === 'patents' && Array.isArray(data)) {
    return (
      <HeroResultList>
        {data.map(item => (
          <HeroPatentListItem
            key={item.publicationNumber || item.title}
            item={item}
          />
        ))}
      </HeroResultList>
    )
  }

  if (variant === 'autocomplete' && Array.isArray(data)) {
    return (
      <HeroResultList>
        {data.map(item => (
          <HeroAutocompleteListItem key={item.value} item={item} />
        ))}
      </HeroResultList>
    )
  }

  if (variant === 'search-enriched' && Array.isArray(data)) {
    return (
      <HeroResultList>
        {data.map(item => (
          <HeroSearchEnrichedListItem key={item.url} item={item} />
        ))}
      </HeroResultList>
    )
  }

  if (variant === 'news') return <HeroNewsResultCard data={data} />
  if (variant === 'places') return <HeroPlacesResultCard data={data} />
  if (variant === 'search-enriched') {
    return (
      <HeroSearchResultCard
        data={data}
        badge={
          <HeroResultBadge>
            <CodeIcon size={12} aria-hidden='true' />
            html · {formatBytes(data.htmlBytes)}
          </HeroResultBadge>
        }
      />
    )
  }
  return <HeroSearchResultCard data={data} />
}

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
  const heroCodeRef = useRef(null)
  const heroTypingTargets = useMemo(
    () => extractHeroTypingTargets(activeHeroExample.code),
    [activeHeroExample.code]
  )
  const [heroPhase, setHeroPhase] = useState('typing')
  const [heroResultCollapsed, setHeroResultCollapsed] = useState(false)

  useEffect(() => {
    setHeroPhase('typing')
    setHeroResultCollapsed(false)
  }, [activeHeroExampleId])

  useEffect(() => {
    if (heroPhase !== 'loading') return undefined
    const timer = window.setTimeout(() => {
      setHeroPhase('result')
    }, HERO_LOADING_MS)
    return () => window.clearTimeout(timer)
  }, [heroPhase, activeHeroExampleId])

  useEffect(() => {
    const container = heroCodeRef.current
    if (!container || heroTypingTargets.length === 0) {
      setHeroPhase('result')
      return undefined
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let cancelSequence = null
    let rafId = null
    let observer = null
    let activeSpans = []

    const start = () => {
      const matches = findHeroTypingSpans(container, heroTypingTargets)
      if (!matches) return false
      if (cancelSequence) cancelSequence()
      activeSpans = matches.map(match => match.span)
      cancelSequence = runHeroTypingSequence(
        matches,
        prefersReducedMotion,
        () => {
          if (observer) observer.disconnect()
          activeSpans = []
          setHeroPhase(current => (current === 'typing' ? 'loading' : current))
        }
      )
      return true
    }

    const schedule = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(() => {
        rafId = null
        start()
      })
    }

    const isInsideActiveSpan = node => {
      if (!node) return false
      return activeSpans.some(span => span === node || span.contains(node))
    }

    const isInternalNode = node => {
      if (!node) return true
      if (node.nodeType === 1 && node.classList?.contains('hero-code-caret')) {
        return true
      }
      return isInsideActiveSpan(node.parentNode || node)
    }

    observer = new window.MutationObserver(mutations => {
      if (activeSpans.length === 0) return
      const external = mutations.some(mutation => {
        if (!isInsideActiveSpan(mutation.target)) return true
        const nodes = [
          ...Array.from(mutation.addedNodes || []),
          ...Array.from(mutation.removedNodes || [])
        ]
        return nodes.some(node => !isInternalNode(node))
      })
      if (external) schedule()
    })
    observer.observe(container, { childList: true, subtree: true })
    schedule()

    return () => {
      if (observer) observer.disconnect()
      if (rafId !== null) window.cancelAnimationFrame(rafId)
      if (cancelSequence) cancelSequence()
    }
  }, [activeHeroExampleId, heroTypingTargets])
  const activeVertical =
    GOOGLE_VERTICALS.find(vertical => vertical.id === activeVerticalId) ??
    GOOGLE_VERTICALS[0]
  const activeVerticalExample = GOOGLE_VERTICAL_EXAMPLES_DATA[
    activeVertical.id
  ] ??
    GOOGLE_VERTICAL_EXAMPLES[activeVertical.id] ?? { code: '', payload: '' }
  const activeVerticalService =
    SUPPORTED_GOOGLE_SERVICES.find(
      service => service.id === activeVertical.id
    ) ?? null
  const activeVerticalPayload = parseJsonPayload(activeVerticalExample.payload)
  const activeVerticalPayloadText = JSON.stringify(
    activeVerticalPayload,
    null,
    2
  )
  const activeVerticalRequest = extractRequestConfig(activeVerticalExample.code)
  const activeVerticalRequestSnippet = buildRequestSnippet(
    activeVerticalRequest
  )
  const activeVerticalPreview = getVerticalPreviewResult(
    activeVertical.id,
    activeVerticalPayload
  )

  const [activeOutputTab, setActiveOutputTab] = useState('json')

  useEffect(() => {
    setActiveOutputTab('json')
  }, [activeVerticalId])

  const handleOutputTabSelect = tabId => {
    setActiveOutputTab(tabId)
  }

  const handleOutputTabKeyDown = (event, index) => {
    const tabs = ['json', 'preview']
    let nextIndex = null
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % tabs.length
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + tabs.length) % tabs.length
    }
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = tabs.length - 1
    if (nextIndex === null) return
    event.preventDefault()
    const nextTabId = tabs[nextIndex]
    handleOutputTabSelect(nextTabId)
    const nextTab = document.getElementById(`vertical-output-tab-${nextTabId}`)
    if (nextTab) nextTab.focus()
  }

  const focusVerticalTab = tabId => {
    const tab = document.getElementById(`google-vertical-chip-${tabId}`)
    if (tab) tab.focus()
  }

  const focusHeroExampleTab = tabId => {
    const tab = document.getElementById(`hero-example-tab-${tabId}`)
    if (tab) tab.focus()
  }

  const selectHeroExample = tabId => {
    setHeroPhase('typing')
    setHeroResultCollapsed(false)
    setActiveHeroExampleId(tabId)
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
    selectHeroExample(nextTabId)
    focusHeroExampleTab(nextTabId)
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
            pt: [3, 3, 4, 4],
            pb: [2, 2, 3, 3]
          })}
        >
          <Flex
            css={theme({
              width: '100%',
              maxWidth: HERO_LAYOUT.maxWidth,
              px: [2, 3, 4, 4],
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
                  variant='gradient'
                  css={theme({
                    m: 0,
                    color: 'black',
                    fontWeight: 'bold',
                    letterSpacing: 1,
                    lineHeight: [1, 1, 0, 0],
                    fontSize: [4, 4, 5, 5],
                    textAlign: ['center', 'center', 'center', 'left'],
                    width: '100%',
                    maxWidth: ['100%', '100%', '100%', '640px']
                  })}
                >
                  Search intelligence API for AI agents
                </Text>

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
                    10 supported search surfaces in one client.
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
                    Structured results plus LLM-ready Markdown and HTML for top
                    matches.
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
                    Structured results for prices, ratings, coordinates, and
                    citations.
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
                    Proxy-backed requests from the first call.
                  </List.Item>
                </HeroProofList>
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
                  <ArrowLink
                    href='/pricing'
                    css={theme({ fontSize: [2, 2, 3, 3] })}
                  >
                    Get the API key
                  </ArrowLink>
                </ActionRow>
              </Flex>
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
                          onClick={() => selectHeroExample(example.id)}
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

                    <HeroExampleCodePanel ref={heroCodeRef}>
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

                    <HeroResultDock
                      $visible={heroPhase !== 'typing'}
                      aria-busy={heroPhase === 'loading' ? 'true' : 'false'}
                    >
                      <HeroResultHeader>
                        <HeroResultHeaderLabel>
                          <HeroResultStatusDot
                            $loading={heroPhase === 'loading'}
                          />
                          {heroPhase === 'loading'
                            ? 'Running query…'
                            : Array.isArray(activeHeroExample.result?.data)
                              ? `200 OK · page.results (${activeHeroExample.result.data.length})`
                              : '200 OK · page.results[0]'}
                        </HeroResultHeaderLabel>
                        <HeroResultToggle
                          type='button'
                          onClick={() =>
                            setHeroResultCollapsed(value => !value)
                          }
                          aria-expanded={!heroResultCollapsed}
                          aria-controls='hero-result-body'
                          aria-label={
                            heroResultCollapsed
                              ? 'Expand results'
                              : 'Collapse results'
                          }
                          $collapsed={heroResultCollapsed}
                        >
                          <ChevronDown size={16} aria-hidden='true' />
                        </HeroResultToggle>
                      </HeroResultHeader>
                      <HeroResultBodyWrap
                        id='hero-result-body'
                        $collapsed={heroResultCollapsed}
                      >
                        <HeroResultBody>
                          {heroPhase === 'loading' ? (
                            <HeroResultSkeleton />
                          ) : (
                            <HeroResultCard result={activeHeroExample.result} />
                          )}
                        </HeroResultBody>
                      </HeroResultBodyWrap>
                    </HeroResultDock>
                  </HeroExamplePanel>
                </HeroExampleShell>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </HeroSection>

      <PageSection
        as='section'
        id='google-verticals'
        css={theme({
          pt: 6,
          maxWidth: HERO_LAYOUT.maxWidth
        })}
      >
        <Box
          css={theme({
            width: '100%',
            mx: 'auto'
          })}
        >
          <Box
            css={theme({
              maxWidth: ['100%', '100%', layout.normal, layout.medium],
              mx: 'auto'
            })}
          >
            <SectionTitle css={theme({ textAlign: 'center' })}>
              One API for recurring search workflows.
            </SectionTitle>
            <SectionDescription
              css={theme({
                maxWidth: '100%',
                fontSize: [2, 2, 3, 3],
                textAlign: 'center'
              })}
            >
              Search keeps the output consistent so monitoring jobs, SEO
              tooling, and AI agents need less parser logic.
            </SectionDescription>
          </Box>
          <Box
            as='section'
            css={theme({
              px: [5, 5, 6, 6],
              mt: [4, 4, 5, 5]
            })}
          >
            <VerticalExampleShell $accentColor={activeVertical.accentColor}>
              <VerticalExampleTopbar>
                <VerticalTabs
                  aria-label='Supported search surfaces'
                  css={theme({
                    pt: 0,
                    pb: 0,
                    gap: 2
                  })}
                >
                  {GOOGLE_VERTICALS.map((vertical, index) => {
                    const verticalService =
                      SUPPORTED_GOOGLE_SERVICES.find(
                        service => service.id === vertical.id
                      ) ?? null

                    return (
                      <VerticalTabButton
                        key={vertical.id}
                        id={`google-vertical-chip-${vertical.id}`}
                        type='button'
                        $active={activeVertical.id === vertical.id}
                        $activeColor={vertical.accentColor}
                        aria-pressed={activeVertical.id === vertical.id}
                        onClick={() => setActiveVerticalId(vertical.id)}
                        onKeyDown={event =>
                          handleVerticalTabKeyDown(event, index)
                        }
                      >
                        {verticalService && (
                          <VerticalTabIcon
                            src={verticalService.iconUrl}
                            alt=''
                            aria-hidden='true'
                          />
                        )}
                        {vertical.name.replace(/^Google\s+/, '')}
                      </VerticalTabButton>
                    )
                  })}
                </VerticalTabs>
              </VerticalExampleTopbar>

              <VerticalExampleGrid>
                <VerticalExamplePanel
                  css={theme({
                    alignSelf: 'stretch',
                    minHeight: 0,
                    height: VERTICAL_RESPONSE_HEIGHT,
                    justifyContent: 'center'
                  })}
                >
                  <VerticalPanelHeader>
                    <VerticalPanelIntro>
                      {activeVerticalService && (
                        <VerticalPanelLogo
                          src={activeVerticalService.iconUrl}
                          alt=''
                          aria-hidden='true'
                        />
                      )}
                      <VerticalPanelCopy>
                        <VerticalPanelTitle>
                          {activeVertical.name}
                        </VerticalPanelTitle>
                        <VerticalPanelDescription>
                          {activeVertical.description}
                        </VerticalPanelDescription>
                      </VerticalPanelCopy>
                    </VerticalPanelIntro>
                  </VerticalPanelHeader>

                  <VerticalCodeFrame
                    css={theme({
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      minHeight: 0
                    })}
                  >
                    <CodeEditor
                      language='javascript'
                      blinkCursor={false}
                      showHeader={false}
                      showWindowButtons={false}
                      showTitle={false}
                      showAction={false}
                      showFade={false}
                      css={theme({
                        width: '100%',
                        height: 'auto',
                        border: 0,
                        borderRadius: 0,
                        overflow: 'visible',
                        pt: 2
                      })}
                    >
                      {activeVerticalRequestSnippet}
                    </CodeEditor>
                  </VerticalCodeFrame>
                </VerticalExamplePanel>

                <VerticalExamplePanel
                  css={theme({
                    alignSelf: 'flex-start',
                    minHeight: 0,
                    height: VERTICAL_RESPONSE_HEIGHT,
                    boxShadow: 1
                  })}
                >
                  <VerticalOutputTabBar aria-label='Output format'>
                    {[
                      { id: 'json', label: 'JSON' },
                      { id: 'preview', label: 'Preview' }
                    ].map((tab, index) => {
                      const isActive = activeOutputTab === tab.id
                      return (
                        <VerticalOutputTab
                          key={tab.id}
                          id={`vertical-output-tab-${tab.id}`}
                          type='button'
                          role='tab'
                          $active={isActive}
                          aria-selected={isActive}
                          aria-controls={`vertical-output-panel-${tab.id}`}
                          tabIndex={isActive ? 0 : -1}
                          onClick={() => handleOutputTabSelect(tab.id)}
                          onKeyDown={event =>
                            handleOutputTabKeyDown(event, index)
                          }
                        >
                          {tab.label}
                        </VerticalOutputTab>
                      )
                    })}
                  </VerticalOutputTabBar>

                  {activeOutputTab === 'json' ? (
                    <VerticalCodeFrame
                      id='vertical-output-panel-json'
                      role='tabpanel'
                      aria-labelledby='vertical-output-tab-json'
                      css={theme({
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        minHeight: 0,
                        height: '100%',
                        pt: [2, 2, 3, 3],
                        pb: [2, 2, 3, 3],
                        px: 0
                      })}
                    >
                      <CodeEditor
                        language='json'
                        showFade={false}
                        showHeader={false}
                        showWindowButtons={false}
                        showTitle={false}
                        showAction={false}
                        css={theme({
                          width: '100%',
                          height: '100%',
                          minHeight: 0,
                          flex: 1,
                          border: 0,
                          borderRadius: 0,
                          pt: 2
                        })}
                      >
                        {activeVerticalPayloadText}
                      </CodeEditor>
                    </VerticalCodeFrame>
                  ) : (
                    <VerticalPreviewShell
                      id='vertical-output-panel-preview'
                      role='tabpanel'
                      aria-labelledby='vertical-output-tab-preview'
                    >
                      <VerticalPreviewBody>
                        <VerticalPreviewContent>
                          <HeroResultBody css={theme({ py: 0 })}>
                            <HeroResultCard result={activeVerticalPreview} />
                          </HeroResultBody>
                        </VerticalPreviewContent>
                      </VerticalPreviewBody>
                    </VerticalPreviewShell>
                  )}
                </VerticalExamplePanel>
              </VerticalExampleGrid>
            </VerticalExampleShell>
          </Box>
        </Box>
      </PageSection>

      <PageSection as='section' id='retrieval-workflows'>
        <Box
          css={theme({
            width: '100%',
            maxWidth: ['100%', '100%', layout.large, layout.large],
            mx: 'auto'
          })}
        >
          <SectionTitle css={theme({ textAlign: 'center' })}>
            Built for retrieval loops, not just result pages.
          </SectionTitle>
          <SectionDescription
            css={theme({
              maxWidth: ['100%', '100%', layout.normal, layout.medium],
              mx: 'auto',
              fontSize: [2, 2, 3, 3],
              textAlign: 'center'
            })}
          >
            Search stays lightweight on the first pass so technical workflows
            can stay fast under real production load.
          </SectionDescription>

          <RetrievalGrid>
            <RetrievalCard>
              <RetrievalCardHeader>
                <RetrievalCardContent>
                  <RetrievalCardLabel>
                    A. The <code>.markdown()</code> helper
                  </RetrievalCardLabel>
                  <RetrievalCardTitle>
                    Ship LLM-ready Markdown
                  </RetrievalCardTitle>
                </RetrievalCardContent>
              </RetrievalCardHeader>
              <RetrievalCardBody>
                <RetrievalCardDescription>
                  RAG pipelines rarely want raw HTML. They want cleaner text
                  that is easier to embed, rerank, cite, and pass into prompts
                  without wasting context on navigation or markup noise.
                </RetrievalCardDescription>
                <TutorialFeatureList>
                  <TutorialFeatureItem as='li'>
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
                    <RetrievalFeatureText>
                      Use <code>.markdown()</code> when the model needs
                      readable, prompt-ready context.
                    </RetrievalFeatureText>
                  </TutorialFeatureItem>
                  <TutorialFeatureItem as='li'>
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
                    <RetrievalFeatureText>
                      Keep <code>.html()</code> for DOM-aware extraction or
                      custom downstream parsing.
                    </RetrievalFeatureText>
                  </TutorialFeatureItem>
                </TutorialFeatureList>
              </RetrievalCardBody>
            </RetrievalCard>

            <RetrievalCard>
              <RetrievalCardHeader>
                <RetrievalCardContent>
                  <RetrievalCardLabel>
                    B. The two-step retrieval model
                  </RetrievalCardLabel>
                  <RetrievalCardTitle>Lazy-load the web</RetrievalCardTitle>
                </RetrievalCardContent>
              </RetrievalCardHeader>
              <RetrievalCardBody>
                <RetrievalCardDescription>
                  Search works best as a two-step system: lightweight results
                  first, deeper content second. That keeps the browse step
                  snappy, then spends the heavier extraction cost only where
                  confidence is already high.
                </RetrievalCardDescription>
                <TutorialFeatureList>
                  <TutorialFeatureItem as='li'>
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
                    <RetrievalFeatureText>
                      Browse structured results at roughly search latency
                      instead of fetching every page in full up front.
                    </RetrievalFeatureText>
                  </TutorialFeatureItem>
                  <TutorialFeatureItem as='li'>
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
                    <RetrievalFeatureText>
                      Shortlist the top 3 sources, then call{' '}
                      <code>.markdown()</code> or <code>.html()</code> only for
                      those winners.
                    </RetrievalFeatureText>
                  </TutorialFeatureItem>
                  <TutorialFeatureItem as='li'>
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
                    <RetrievalFeatureText>
                      Keep recurring jobs faster and cheaper because enrichment
                      is opt-in, not mandatory.
                    </RetrievalFeatureText>
                  </TutorialFeatureItem>
                </TutorialFeatureList>
              </RetrievalCardBody>
            </RetrievalCard>

            <RetrievalCard>
              <RetrievalCardHeader>
                <RetrievalCardContent>
                  <RetrievalCardLabel>C. Advanced operators</RetrievalCardLabel>
                  <RetrievalCardTitle>
                    Turn Search into a document discovery engine
                  </RetrievalCardTitle>
                </RetrievalCardContent>
              </RetrievalCardHeader>
              <RetrievalCardBody>
                <RetrievalCardDescription>
                  Combine operators like <code>site:</code> and{' '}
                  <code>filetype:</code> to hunt for papers, docs, filings,
                  changelogs, or PDFs before you enrich anything. That gives
                  technical teams much tighter recall from the first query.
                </RetrievalCardDescription>
                <RetrievalCommandList>
                  <RetrievalCommandRow as='li'>
                    <RetrievalCommand>
                      <RetrievalCommandStrong>site:</RetrievalCommandStrong>
                      <RetrievalCommandText>arxiv.org</RetrievalCommandText>
                      <RetrievalCommandText>
                        "deep learning"
                      </RetrievalCommandText>
                      <RetrievalCommandStrong>
                        filetype:pdf
                      </RetrievalCommandStrong>
                    </RetrievalCommand>
                  </RetrievalCommandRow>
                </RetrievalCommandList>
                <RetrievalCardDescription css={theme({ mt: 3 })}>
                  The hero example above now uses an operator-driven query so
                  the workflow reads like real technical research instead of a
                  generic web search.
                </RetrievalCardDescription>
              </RetrievalCardBody>
            </RetrievalCard>
          </RetrievalGrid>
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
              maxWidth: ['100%', '100%', '100%', layout.large],
              textAlign: 'center'
            })}
          >
            Integrate Search without scraper debt.
          </SectionTitle>

          <SectionDescription
            css={theme({
              mt: [3, 3, 4, 4],
              fontSize: [2, 2, 3, 3],
              maxWidth: ['100%', '100%', layout.normal, layout.medium],
              textAlign: 'center'
            })}
          >
            Initialize once, choose the surface you need, then paginate or
            enrich only when a workflow needs more context.
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
                      height:
                        step.title === 'Install and initialize'
                          ? ['120px', '120px', '130px', '130px']
                          : step.title === 'Run the first query'
                            ? ['280px', '280px', '320px', '320px']
                            : ['180px', '180px', '200px', '200px'],
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
              Add @microlink/google to your project
            </Button>
            <Button as='a' variant='white' href={GUIDE_URL}>
              <Flex as='span' css={theme({ alignItems: 'center', gap: 2 })}>
                Read the Search guide
                <ArrowRight size={16} aria-hidden='true' />
              </Flex>
            </Button>
          </ActionRow>
        </Box>
      </PageSection>

      <PageSection as='section' id='pricing'>
        <SectionTitle css={theme({ textAlign: 'center' })}>
          Paid from the first request.
        </SectionTitle>
        <SectionDescription
          css={theme({
            fontSize: [2, 2, 3, 3],
            textAlign: 'center',
            mx: 'auto'
          })}
        >
          Search has no free tier because reliable result collection depends on
          managed proxy capacity, regional routing, and production safeguards on
          every call.
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
              46,000 requests/month
            </Text>

            <Box css={theme({ pt: 3 })}>
              <PricingCheck>Managed proxy-backed requests</PricingCheck>
              <PricingCheck>10 supported search surfaces</PricingCheck>
              <PricingCheck>Structured normalized results</PricingCheck>
              <PricingCheck>Location and period controls</PricingCheck>
              <PricingCheck>
                Pagination with <code>.next()</code>
              </PricingCheck>
              <PricingCheck>
                Optional page Markdown or HTML via <code>.markdown()</code> and{' '}
                <code>.html()</code>
              </PricingCheck>
            </Box>

            <Flex
              css={theme({ pt: 4, fontSize: ['18px', '18px', '20px', '20px'] })}
            >
              <Link href='/pricing'>See all plans</Link>
            </Flex>
          </PricingCard>
        </PricingCardsGrid>
      </PageSection>

      <PageSection as='section' id='final-cta'>
        <Flex
          css={theme({
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            px: [2, 2, 3, 3]
          })}
        >
          <SectionTitle
            css={theme({ textAlign: 'center', maxWidth: layout.medium })}
          >
            Pick a plan, then plug Search into your workflow.
          </SectionTitle>
          <SectionDescription
            css={theme({
              fontSize: [2, 2, 3, 3],
              textAlign: 'center',
              maxWidth: [
                layout.small,
                layout.small,
                layout.normal,
                layout.normal
              ]
            })}
          >
            Install the client, add your API key, and start shipping rank
            tracking, news monitoring, local research, or agent enrichment flows
            without building proxy infrastructure in-house.
          </SectionDescription>

          <ActionRow
            css={theme({ mt: [4, 4, 5, 5], justifyContent: 'center' })}
          >
            <ArrowLink href='/pricing' css={theme({ fontSize: [2, 2, 3, 3] })}>
              See all plans
            </ArrowLink>
          </ActionRow>

          <Flex
            css={theme({
              mt: [4, 4, 5, 5],
              gap: [3, 3, 4, 4],
              flexWrap: 'wrap',
              justifyContent: 'center'
            })}
          >
            {[
              'Paid from day one',
              'Managed proxy layer included',
              'Built for SEO and AI workflows'
            ].map(label => (
              <Flex
                key={label}
                css={theme({
                  alignItems: 'center',
                  gap: 1,
                  color: 'black80',
                  fontSize: [0, 0, 1, 1]
                })}
              >
                <Check size={16} color={colors.close} aria-hidden='true' />
                <Text as='span'>{label}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </PageSection>

      <Faq
        title='Product Information'
        caption='Everything you need to know about Microlink Search, pricing, and supported search surfaces.'
        css={theme({
          mt: [5, 5, 6, 6],
          bg: 'white'
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
      <Container
        css={theme({
          justifyContent: 'center',
          pt: [3, 3, 4, 4],
          maxWidth: layout.small
        })}
      >
        <TrademarkNote>
          Google is a trademark of Google LLC. Microlink Search is an
          independent product and is not affiliated with or endorsed by Google.
        </TrademarkNote>
      </Container>
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
  offers: {
    '@type': 'Offer',
    url: 'https://microlink.io/pricing'
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
    title='Search API for SEO, Monitoring, and AI Workflows'
    description='Microlink Search is a paid search intelligence API for querying and normalizing public results from Google Search, News, Maps, Shopping, Scholar, and more.'
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
