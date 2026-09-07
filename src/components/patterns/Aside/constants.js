import { Sparkles } from 'components/icons/Sparkles'

export const ASIDE_WIDTH = '320px'
export const SDK = 'SDK'
export const API = 'API'
export const CARDS = 'Cards'
export const GUIDES = 'Guides'

export const DEFAULT_ACTIVE_ROUTE_NAME = API

export const getActiveRouteName = ({ pathname }) => {
  if (pathname.startsWith('/docs/guides')) return GUIDES
  if (pathname.startsWith('/docs/sdk')) return SDK
  if (pathname.startsWith('/docs/api')) return API
  if (pathname.startsWith('/docs/cards')) return CARDS
}

export const DOC_TABS = [
  { name: 'API', path: '/docs/api/getting-started/overview' },
  {
    name: 'GUIDES',
    path: '/docs/guides'
  },
  { name: 'SDK', path: '/docs/sdk/getting-started/overview' },
  {
    name: 'CARDS',
    path: '/docs/cards/getting-started/overview'
  },
  { name: 'Skills', path: '/skills', icon: Sparkles }
]

const ROUTES_SDK = [
  {
    name: 'Getting Started',
    posts: [
      {
        name: 'Overview',
        href: '/docs/sdk/getting-started/overview/'
      },
      {
        name: 'Options',
        href: '/docs/sdk/getting-started/options/'
      },
      {
        name: 'Errors',
        href: '/docs/sdk/getting-started/errors/'
      },
      {
        name: 'CLI',
        href: '/docs/sdk/getting-started/cli/'
      }
    ]
  },
  {
    name: 'Methods',
    posts: [
      {
        name: 'metadata',
        href: '/docs/sdk/methods/metadata/'
      },
      {
        name: 'screenshot',
        href: '/docs/sdk/methods/screenshot/'
      },
      {
        name: 'pdf',
        href: '/docs/sdk/methods/pdf/'
      },
      {
        name: 'markdown',
        href: '/docs/sdk/methods/markdown/'
      },
      {
        name: 'html',
        href: '/docs/sdk/methods/html/'
      },
      {
        name: 'text',
        href: '/docs/sdk/methods/text/'
      },
      {
        name: 'logo',
        href: '/docs/sdk/methods/logo/'
      },
      {
        name: 'embed',
        href: '/docs/sdk/methods/embed/'
      },
      {
        name: 'extract',
        href: '/docs/sdk/methods/extract/',
        posts: [
          {
            name: 'Nested rules',
            href: '/docs/sdk/methods/extract/nested/'
          },
          {
            name: 'Fallback rules',
            href: '/docs/sdk/methods/extract/fallbacks/'
          },
          {
            name: 'attr',
            href: '/docs/sdk/methods/extract/attr/'
          },
          {
            name: 'evaluate',
            href: '/docs/sdk/methods/extract/evaluate/'
          },
          {
            name: 'selector',
            href: '/docs/sdk/methods/extract/selector/'
          },
          {
            name: 'selectorAll',
            href: '/docs/sdk/methods/extract/selectorAll/'
          },
          {
            name: 'type',
            href: '/docs/sdk/methods/extract/type/'
          }
        ]
      },
      {
        name: 'run',
        href: '/docs/sdk/methods/run/'
      },
      {
        name: 'search',
        href: '/docs/sdk/methods/search/'
      },
      {
        name: 'media',
        href: '/docs/sdk/methods/media/',
        posts: [
          {
            name: 'video',
            href: '/docs/sdk/methods/media/video/'
          },
          {
            name: 'audio',
            href: '/docs/sdk/methods/media/audio/'
          }
        ]
      },
      {
        name: 'collections',
        href: '/docs/sdk/methods/collections/',
        posts: [
          {
            name: 'links',
            href: '/docs/sdk/methods/collections/links/'
          },
          {
            name: 'images',
            href: '/docs/sdk/methods/collections/images/'
          },
          {
            name: 'videos',
            href: '/docs/sdk/methods/collections/videos/'
          },
          {
            name: 'audios',
            href: '/docs/sdk/methods/collections/audios/'
          },
          {
            name: 'emails',
            href: '/docs/sdk/methods/collections/emails/'
          }
        ]
      },
      {
        name: 'insights',
        href: '/docs/sdk/methods/insights/',
        posts: [
          {
            name: 'technologies',
            href: '/docs/sdk/methods/insights/technologies/'
          },
          {
            name: 'lighthouse',
            href: '/docs/sdk/methods/insights/lighthouse/'
          }
        ]
      }
    ]
  }
]

const ROUTES_API = [
  {
    name: 'Getting Started',
    posts: [
      {
        name: 'Overview',
        href: '/docs/api/getting-started/overview'
      },
      {
        name: 'Data fields',
        href: '/docs/api/getting-started/data-fields'
      },
      {
        name: 'CLI',
        href: '/docs/api/getting-started/cli'
      },
      {
        name: 'MCP',
        href: '/docs/api/getting-started/mcp'
      }
    ]
  },
  {
    name: 'Basics',
    posts: [
      {
        name: 'Authentication',
        href: '/docs/api/basics/authentication'
      },
      {
        name: 'Cache',
        href: '/docs/api/basics/cache'
      },
      {
        name: 'Compression',
        href: '/docs/api/basics/compression'
      },
      {
        name: 'Endpoint',
        href: '/docs/api/basics/endpoint'
      },
      {
        name: 'Error codes',
        href: '/docs/api/basics/error-codes'
      },
      {
        name: 'Format',
        href: '/docs/api/basics/format'
      },
      {
        name: 'Rate limit',
        href: '/docs/api/basics/rate-limit'
      }
    ]
  },
  {
    name: 'Query Parameters',
    posts: [
      {
        name: 'adblock',
        href: '/docs/api/parameters/adblock'
      },
      {
        name: 'animations',
        href: '/docs/api/parameters/animations'
      },
      {
        name: 'audio',
        href: '/docs/api/parameters/audio'
      },
      {
        name: 'cacheKey',
        href: '/docs/api/parameters/cacheKey'
      },
      {
        name: 'click',
        href: '/docs/api/parameters/click'
      },
      {
        name: 'colorScheme',
        href: '/docs/api/parameters/colorScheme'
      },
      {
        name: 'data',
        href: '/docs/api/parameters/data'
      },
      {
        name: 'device',
        href: '/docs/api/parameters/device'
      },
      {
        name: 'embed',
        href: '/docs/api/parameters/embed'
      },
      {
        name: 'filename',
        href: '/docs/api/parameters/filename'
      },
      {
        name: 'filter',
        href: '/docs/api/parameters/filter'
      },
      {
        name: 'force',
        href: '/docs/api/parameters/force'
      },
      {
        name: 'function',
        href: '/docs/api/parameters/function'
      },
      {
        name: 'headers',
        href: '/docs/api/parameters/headers'
      },
      {
        name: 'iframe',
        href: '/docs/api/parameters/iframe'
      },
      {
        name: 'insights',
        href: '/docs/api/parameters/insights',
        posts: [
          {
            name: 'lighthouse',
            href: '/docs/api/parameters/insights/lighthouse'
          },
          {
            name: 'technologies',
            href: '/docs/api/parameters/insights/technologies'
          }
        ]
      },
      {
        name: 'javascript',
        href: '/docs/api/parameters/javascript'
      },
      {
        name: 'mediaType',
        href: '/docs/api/parameters/mediaType'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta'
      },
      {
        name: 'modules',
        href: '/docs/api/parameters/modules'
      },
      {
        name: 'palette',
        href: '/docs/api/parameters/palette'
      },
      {
        name: 'pdf',
        href: '/docs/api/parameters/pdf',
        posts: [
          {
            name: 'format',
            href: '/docs/api/parameters/pdf/format'
          },
          {
            name: 'height',
            href: '/docs/api/parameters/pdf/height'
          },
          {
            name: 'landscape',
            href: '/docs/api/parameters/pdf/landscape'
          },
          {
            name: 'margin',
            href: '/docs/api/parameters/pdf/margin'
          },
          {
            name: 'pageRanges',
            href: '/docs/api/parameters/pdf/pageRanges'
          },
          {
            name: 'scale',
            href: '/docs/api/parameters/pdf/scale'
          },
          {
            name: 'width',
            href: '/docs/api/parameters/pdf/width'
          }
        ]
      },
      {
        name: 'ping',
        href: '/docs/api/parameters/ping'
      },
      {
        name: 'prerender',
        href: '/docs/api/parameters/prerender'
      },
      {
        name: 'proxy',
        href: '/docs/api/parameters/proxy',
        posts: [
          {
            name: 'url',
            href: '/docs/api/parameters/proxy/url'
          },
          {
            name: 'location',
            href: '/docs/api/parameters/proxy/location'
          }
        ]
      },
      {
        name: 'retry',
        href: '/docs/api/parameters/retry'
      },
      {
        name: 'screenshot',
        href: '/docs/api/parameters/screenshot',
        posts: [
          {
            name: 'animated',
            href: '/docs/api/parameters/screenshot/animated'
          },
          {
            name: 'codeScheme',
            href: '/docs/api/parameters/screenshot/codeScheme'
          },
          {
            name: 'element',
            href: '/docs/api/parameters/screenshot/element'
          },
          {
            name: 'fullPage',
            href: '/docs/api/parameters/screenshot/fullPage'
          },
          {
            name: 'overlay',
            href: '/docs/api/parameters/screenshot/overlay'
          },
          {
            name: 'omitBackground',
            href: '/docs/api/parameters/screenshot/omitBackground'
          },
          {
            name: 'quality',
            href: '/docs/api/parameters/screenshot/quality'
          },
          {
            name: 'type',
            href: '/docs/api/parameters/screenshot/type'
          }
        ]
      },
      {
        name: 'scripts',
        href: '/docs/api/parameters/scripts'
      },
      {
        name: 'scroll',
        href: '/docs/api/parameters/scroll'
      },
      {
        name: 'styles',
        href: '/docs/api/parameters/styles'
      },
      {
        name: 'staleTtl',
        href: '/docs/api/parameters/staleTtl'
      },
      {
        name: 'timeout',
        href: '/docs/api/parameters/timeout'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl'
      },
      {
        name: 'url',
        href: '/docs/api/parameters/url'
      },
      {
        name: 'video',
        href: '/docs/api/parameters/video'
      },
      {
        name: 'viewport',
        href: '/docs/api/parameters/viewport'
      },
      {
        name: 'waitForSelector',
        href: '/docs/api/parameters/waitForSelector'
      },
      {
        name: 'waitForTimeout',
        href: '/docs/api/parameters/waitForTimeout'
      },
      {
        name: 'waitUntil',
        href: '/docs/api/parameters/waitUntil'
      }
    ]
  }
]

const ROUTES_CARDS = [
  {
    name: 'Getting Started',
    posts: [
      {
        name: 'Overview',
        href: '/docs/cards/getting-started/overview'
      },
      {
        name: 'Editor',
        href: '/docs/cards/getting-started/editor'
      },
      {
        name: 'Presets',
        href: '/docs/cards/getting-started/presets'
      },
      {
        name: 'Query Variables',
        href: '/docs/cards/getting-started/query-variables'
      },
      {
        name: 'Embed',
        href: '/docs/cards/getting-started/embed'
      }
    ]
  },
  {
    name: 'Others',
    posts: [
      {
        name: 'Authentication',
        href: '/docs/cards/others/authentication'
      },
      {
        name: 'Encoding',
        href: '/docs/cards/others/encoding'
      },
      {
        name: 'Pricing',
        href: '/docs/cards/others/pricing'
      }
    ]
  }
]

const ROUTES_GUIDES = [
  {
    name: 'Getting Started',
    posts: [
      {
        name: 'Overview',
        href: '/docs/guides'
      },
      {
        name: 'What is Microlink',
        href: '/docs/guides/what-is-microlink'
      },
      {
        name: 'Screenshot',
        href: '/docs/guides/screenshot',
        posts: [
          {
            name: 'Customizing output',
            href: '/docs/guides/screenshot/customizing-output'
          },
          {
            name: 'Browser settings',
            href: '/docs/guides/screenshot/browser-settings'
          },
          {
            name: 'Page interaction',
            href: '/docs/guides/screenshot/page-interaction'
          },
          {
            name: 'Delivery and embedding',
            href: '/docs/guides/screenshot/embedding'
          },
          {
            name: 'Caching and performance',
            href: '/docs/guides/screenshot/caching-and-performance'
          },
          {
            name: 'Private pages',
            href: '/docs/guides/screenshot/private-pages'
          },
          {
            name: 'Troubleshooting',
            href: '/docs/guides/screenshot/troubleshooting'
          }
        ]
      },
      {
        name: 'Data extraction',
        href: '/docs/guides/data-extraction',
        posts: [
          {
            name: 'Defining rules',
            href: '/docs/guides/data-extraction/defining-rules'
          },
          {
            name: 'Page preparation',
            href: '/docs/guides/data-extraction/page-preparation'
          },
          {
            name: 'Delivery and response shaping',
            href: '/docs/guides/data-extraction/delivery-and-response'
          },
          {
            name: 'Caching and performance',
            href: '/docs/guides/data-extraction/caching-and-performance'
          },
          {
            name: 'Private pages',
            href: '/docs/guides/data-extraction/private-pages'
          },
          {
            name: 'Troubleshooting',
            href: '/docs/guides/data-extraction/troubleshooting'
          }
        ]
      },
      {
        name: 'Embed',
        href: '/docs/guides/embed',
        posts: [
          {
            name: 'SDK',
            href: '/docs/guides/embed/sdk'
          },
          {
            name: 'Iframe parameter',
            href: '/docs/guides/embed/iframe'
          },
          {
            name: 'Custom HTML/CSS',
            href: '/docs/guides/embed/metadata-api'
          },
          {
            name: 'Custom previews with AI',
            href: '/docs/guides/embed/custom-previews-with-ai'
          },
          {
            name: 'Caching and performance',
            href: '/docs/guides/embed/caching-and-performance'
          },
          {
            name: 'Private pages and proxy',
            href: '/docs/guides/embed/private-pages-and-proxy'
          },
          {
            name: 'Troubleshooting',
            href: '/docs/guides/embed/troubleshooting'
          }
        ]
      },
      {
        name: 'Content conversion',
        href: '/docs/guides/content-conversion',
        posts: [
          {
            name: 'URL to Text',
            href: '/docs/guides/content-conversion/url-to-text'
          },
          {
            name: 'URL to Markdown',
            href: '/docs/guides/content-conversion/url-to-markdown'
          },
          {
            name: 'URL to HTML',
            href: '/docs/guides/content-conversion/url-to-html'
          },
          {
            name: 'JSON endpoint to JSON',
            href: '/docs/guides/content-conversion/json-endpoint-to-json'
          }
        ]
      },
      {
        name: 'Function',
        href: '/docs/guides/function',
        posts: [
          {
            name: 'Writing functions',
            href: '/docs/guides/function/writing-functions'
          },
          {
            name: 'Browser interaction',
            href: '/docs/guides/function/browser-interaction'
          },
          {
            name: 'Profiling and performance',
            href: '/docs/guides/function/profiling-and-performance'
          },
          {
            name: 'Troubleshooting',
            href: '/docs/guides/function/troubleshooting'
          }
        ]
      },
      {
        name: 'PDF',
        href: '/docs/guides/pdf',
        posts: [
          {
            name: 'Page size and layout',
            href: '/docs/guides/pdf/page-size-and-layout'
          },
          {
            name: 'Page preparation',
            href: '/docs/guides/pdf/page-preparation'
          },
          {
            name: 'Delivery and embedding',
            href: '/docs/guides/pdf/embedding'
          },
          {
            name: 'Caching and performance',
            href: '/docs/guides/pdf/caching-and-performance'
          },
          {
            name: 'Private pages',
            href: '/docs/guides/pdf/private-pages'
          },
          {
            name: 'Troubleshooting',
            href: '/docs/guides/pdf/troubleshooting'
          }
        ]
      },
      {
        name: 'Metadata',
        href: '/docs/guides/metadata',
        posts: [
          {
            name: 'Choosing fields',
            href: '/docs/guides/metadata/choosing-fields'
          },
          {
            name: 'Extending results',
            href: '/docs/guides/metadata/extending-results'
          },
          {
            name: 'Delivery and response shaping',
            href: '/docs/guides/metadata/delivery-and-response'
          },
          {
            name: 'Page preparation',
            href: '/docs/guides/metadata/page-preparation'
          },
          {
            name: 'Caching and performance',
            href: '/docs/guides/metadata/caching-and-performance'
          },
          {
            name: 'Private pages',
            href: '/docs/guides/metadata/private-pages'
          },
          {
            name: 'Troubleshooting',
            href: '/docs/guides/metadata/troubleshooting'
          }
        ]
      },
      {
        name: 'Insights',
        href: '/docs/guides/insights',
        posts: [
          {
            name: 'Technology detection',
            href: '/docs/guides/insights/technology-detection'
          },
          {
            name: 'Lighthouse reports',
            href: '/docs/guides/insights/lighthouse-reports'
          },
          {
            name: 'Caching and performance',
            href: '/docs/guides/insights/caching-and-performance'
          },
          {
            name: 'Troubleshooting',
            href: '/docs/guides/insights/troubleshooting'
          }
        ]
      },
      {
        name: 'Search',
        href: '/docs/guides/search',
        posts: [
          {
            name: 'Web Search',
            href: '/docs/guides/search/search'
          },
          {
            name: 'News',
            href: '/docs/guides/search/news'
          },
          {
            name: 'Images',
            href: '/docs/guides/search/images'
          },
          {
            name: 'Videos',
            href: '/docs/guides/search/videos'
          },
          {
            name: 'Places',
            href: '/docs/guides/search/places'
          },
          {
            name: 'Maps',
            href: '/docs/guides/search/maps'
          },
          {
            name: 'Shopping',
            href: '/docs/guides/search/shopping'
          },
          {
            name: 'Scholar',
            href: '/docs/guides/search/scholar'
          },
          {
            name: 'Patents',
            href: '/docs/guides/search/patents'
          },
          {
            name: 'Autocomplete',
            href: '/docs/guides/search/autocomplete'
          },
          {
            name: 'Content expansion',
            href: '/docs/guides/search/content-expansion'
          },
          {
            name: 'Integration patterns',
            href: '/docs/guides/search/patterns'
          }
        ]
      },
      {
        name: 'Common patterns',
        href: '/docs/guides/common/caching',
        posts: [
          {
            name: 'Caching patterns',
            href: '/docs/guides/common/caching'
          },
          {
            name: 'Private pages',
            href: '/docs/guides/common/private-pages'
          },
          {
            name: 'Proxy',
            href: '/docs/guides/common/proxy'
          },
          {
            name: 'Troubleshooting',
            href: '/docs/guides/common/troubleshooting'
          },
          {
            name: 'Production patterns',
            href: '/docs/guides/common/production-patterns'
          }
        ]
      }
    ]
  }
]

export const ROUTES = {
  [SDK]: ROUTES_SDK,
  [CARDS]: ROUTES_CARDS,
  [API]: ROUTES_API,
  [GUIDES]: ROUTES_GUIDES
}
