import { HourGlass } from 'components/icons/HourGlass'
import { JavaScript } from 'components/icons/JavaScript'
import { Jekyll } from 'components/icons/Jekyll'
import { Vue } from 'components/icons/Vue'
import { Hugo } from 'components/icons/Hugo'
import { Eleventy } from 'components/icons/Eleventy'
import { _React as ReactIcon } from 'components/icons/React'

const Icons = {
  HourGlass,
  JavaScript,
  Jekyll,
  Vue,
  Hugo,
  Eleventy,
  React: ReactIcon
}

export const ASIDE_WIDTH = '320px'
export const SDK = 'SDK'
export const API = 'API'
export const MQL = 'MQL'
export const CARDS = 'Cards'

export const DEFAULT_ACTIVE_ROUTE_NAME = API

export const getActiveRouteName = ({ pathname }) => {
  if (pathname.startsWith('/docs/sdk')) return SDK
  if (pathname.startsWith('/docs/api')) return API
  if (pathname.startsWith('/docs/cards')) return CARDS
  if (pathname.startsWith('/docs/mql')) return MQL
}

export const DOC_TABS = [
  { name: 'API', path: '/docs/api/getting-started/overview' },
  {
    name: 'MQL',
    path: '/docs/mql/getting-started/overview'
  },
  { name: 'SDK', path: '/docs/sdk/getting-started/overview' },
  {
    name: 'CARDS',
    path: '/docs/cards/getting-started/overview'
  }
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
        name: 'Styling',
        href: '/docs/sdk/getting-started/styling/'
      }
    ]
  },
  {
    name: 'Integrations',
    posts: [
      {
        name: 'Eleventy',
        href: 'https://github.com/daviddarnes/eleventy-plugin-unfurl',
        icon: Icons.Eleventy
      },
      {
        name: 'Hugo',
        href: 'https://blog.ypertex.com/articles/useful-hugo-templating',
        icon: Icons.Hugo
      },
      {
        name: 'Jekyll',
        href: '/docs/sdk/integrations/jekyll/',
        icon: Icons.Jekyll
      },
      {
        name: 'React',
        href: '/docs/sdk/integrations/react/',
        icon: Icons.React
      },
      {
        name: 'Vanilla',
        href: '/docs/sdk/integrations/vanilla/',
        icon: Icons.JavaScript
      },
      {
        name: 'Vue',
        href: '/docs/sdk/integrations/vue/',
        icon: Icons.Vue
      }
    ]
  },
  {
    name: 'Query Parameters',
    posts: [
      {
        name: 'apiKey',
        href: '/docs/sdk/parameters/api-key/'
      },
      {
        name: 'contrast',
        href: '/docs/sdk/parameters/contrast/'
      },
      {
        name: 'direction',
        href: '/docs/sdk/parameters/direction/'
      },
      {
        name: 'fetchData',
        href: '/docs/sdk/parameters/fetch-data/'
      },
      {
        name: 'lazy',
        href: '/docs/sdk/parameters/lazy/'
      },
      {
        name: 'media',
        href: '/docs/sdk/parameters/media/',
        posts: [
          {
            name: 'autoPlay',
            href: '/docs/sdk/parameters/media/auto-play/'
          },
          {
            name: 'controls',
            href: '/docs/sdk/parameters/media/controls/'
          },
          {
            name: 'muted',
            href: '/docs/sdk/parameters/media/muted/'
          },
          {
            name: 'loop',
            href: '/docs/sdk/parameters/media/loop/'
          }
        ]
      },
      {
        name: 'mediaRef',
        href: '/docs/sdk/parameters/media-ref/'
      },
      {
        name: 'setData',
        href: '/docs/sdk/parameters/set-data/'
      },
      {
        name: 'size',
        href: '/docs/sdk/parameters/size/'
      },
      {
        name: 'url',
        href: '/docs/sdk/parameters/url/'
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
        href: '/docs/api/parameters/proxy'
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

const ROUTES_MQL = [
  {
    name: 'Getting Started',
    posts: [
      {
        name: 'Overview',
        href: '/docs/mql/getting-started/overview'
      },
      {
        name: 'Installation',
        href: '/docs/mql/getting-started/installation'
      },
      {
        name: 'Usage',
        href: '/docs/mql/getting-started/usage'
      },
      {
        name: 'API',
        href: '/docs/mql/getting-started/api'
      }
    ]
  },
  {
    name: 'Rules Definition',
    posts: [
      {
        name: 'Basic rule',
        href: '/docs/mql/rules/basic'
      },
      {
        name: 'Nested rules',
        href: '/docs/mql/rules/nested'
      },
      {
        name: 'Rules fallbacks',
        href: '/docs/mql/rules/fallbacks'
      }
    ]
  },
  {
    name: 'Data definition',
    posts: [
      {
        name: 'attr',
        href: '/docs/mql/data/attr'
      },
      {
        name: 'evaluate',
        href: '/docs/mql/data/evaluate'
      },
      {
        name: 'selector',
        href: '/docs/mql/data/selector'
      },
      {
        name: 'selectorAll',
        href: '/docs/mql/data/selectorAll'
      },
      {
        name: 'type',
        href: '/docs/mql/data/type'
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

export const ROUTES = {
  [SDK]: ROUTES_SDK,
  [MQL]: ROUTES_MQL,
  [CARDS]: ROUTES_CARDS,
  [API]: ROUTES_API
}

export const ALL_ROUTES_NAMES = Object.keys(ROUTES)
