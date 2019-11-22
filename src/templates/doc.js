import {
  Tooltip,
  Badge,
  Link,
  Text,
  Flex,
  Container
} from 'components/elements'
import { Layout, Aside } from 'components/patterns'
import Markdown, { H1 } from 'components/markdown'
import { formatDate } from 'helpers'
import { colors } from 'theme'
import React from 'react'

const ROUTES_SDK = [
  {
    name: 'Getting Started',
    posts: [
      {
        name: 'Overview',
        href: '/docs/sdk/getting-started/overview/'
      },
      {
        name: 'Considerations',
        href: '/docs/sdk/getting-started/considerations/'
      }
    ]
  },
  {
    name: 'Integrations',
    posts: [
      {
        name: 'React',
        href: '/docs/sdk/integrations/react/'
      },
      {
        name: 'Vanilla',
        href: '/docs/sdk/integrations/vanilla/'
      },
      {
        name: 'Jekyll',
        href: '/docs/sdk/integrations/jekyll/'
      }
    ]
  },
  {
    name: 'API Parameters',
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
  },
  {
    name: 'Resources',
    posts: [
      {
        name: 'Storybook',
        href: 'https://storybook.microlink.io/'
      },
      {
        name: 'CodeSandbox',
        href: 'https://codesandbox.io/s/n5w839zm4m'
      }
    ]
  }
]

const SDK = 'SDK'
const API = 'API'
const MQL = 'MQL'

const ROUTES_API = [
  {
    name: 'Getting Started',
    posts: [
      {
        name: 'Overview',
        href: '/docs/api/getting-started/overview'
      },
      {
        name: 'Data Fields',
        href: '/docs/api/getting-started/data-fields'
      },
      {
        name: 'CLI',
        href: '/docs/api/getting-started/cli'
      }
    ]
  },
  {
    name: 'API Basics',
    posts: [
      {
        name: 'Endpoint',
        href: '/docs/api/basics/endpoint'
      },
      {
        name: 'Authentication',
        href: '/docs/api/basics/authentication'
      },
      {
        name: 'Rate Limit',
        href: '/docs/api/basics/rate-limit'
      },
      {
        name: 'Format',
        href: '/docs/api/basics/format'
      },
      {
        name: 'Compression',
        href: '/docs/api/basics/compression'
      },
      {
        name: 'Cache',
        href: '/docs/api/basics/cache'
      }
    ]
  },
  {
    name: 'API Parameters',
    posts: [
      {
        name: 'audio',
        href: '/docs/api/parameters/audio'
      },
      {
        name: 'data',
        href: '/docs/api/parameters/data'
      },
      {
        name: 'embed',
        href: '/docs/api/parameters/embed'
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
        name: 'headers',
        href: '/docs/api/parameters/headers'
      },
      {
        name: 'iframe',
        href: '/docs/api/parameters/iframe'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta'
      },
      {
        name: 'palette',
        href: '/docs/api/parameters/palette'
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
        name: 'screenshot',
        href: '/docs/api/parameters/screenshot',
        posts: [
          {
            name: 'background',
            href: '/docs/api/parameters/screenshot/background'
          },
          {
            name: 'browser',
            href: '/docs/api/parameters/screenshot/browser'
          },
          {
            name: 'click',
            href: '/docs/api/parameters/screenshot/click'
          },
          {
            name: 'deviceScaleFactor',
            href: '/docs/api/parameters/screenshot/device-scale-factor'
          },
          {
            name: 'disableAnimations',
            href: '/docs/api/parameters/screenshot/disable-animations'
          },
          {
            name: 'emulation',
            href: '/docs/api/parameters/screenshot/emulation'
          },
          {
            name: 'fullPage',
            href: '/docs/api/parameters/screenshot/full-page'
          },
          {
            name: 'hasTouch',
            href: '/docs/api/parameters/screenshot/has-touch'
          },
          {
            name: 'height',
            href: '/docs/api/parameters/screenshot/height'
          },
          {
            name: 'hide',
            href: '/docs/api/parameters/screenshot/hide'
          },
          {
            name: 'isLandscape',
            href: '/docs/api/parameters/screenshot/is-landscape'
          },
          {
            name: 'isMobile',
            href: '/docs/api/parameters/screenshot/is-mobile'
          },
          {
            name: 'scrollTo',
            href: '/docs/api/parameters/screenshot/scroll-to'
          },
          {
            name: 'type',
            href: '/docs/api/parameters/screenshot/type'
          },
          {
            name: 'waitFor',
            href: '/docs/api/parameters/screenshot/wait-for'
          },
          {
            name: 'waitUntil',
            href: '/docs/api/parameters/screenshot/wait-until'
          },
          {
            name: 'width',
            href: '/docs/api/parameters/screenshot/width'
          }
        ]
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
      }
    ]
  },
  {
    name: 'Basics',
    posts: [
      {
        name: 'Installation',
        href: '/docs/mql/basics/installation'
      },
      {
        name: 'Usage',
        href: '/docs/mql/basics/usage'
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
        name: 'selector',
        href: '/docs/mql/data/selector'
      },
      {
        name: 'selectorAll',
        href: '/docs/mql/data/selector-all'
      },
      {
        name: 'type',
        href: '/docs/mql/data/type'
      }
    ]
  },
  {
    name: 'Resources',
    posts: [
      {
        name: 'CodeSandbox',
        href: 'https://codesandbox.io/s/wn2y4x4327'
      }
    ]
  }
]

const routes = {
  [SDK]: ROUTES_SDK,
  [MQL]: ROUTES_MQL,
  [API]: ROUTES_API
}

const getActiveRouteName = ({ pathname }) => {
  if (pathname.startsWith('/docs/sdk')) return SDK
  if (pathname.startsWith('/docs/api')) return API
  if (pathname.startsWith('/docs/mql')) return MQL
}

export default ({ meta, content, githubUrl, ...props }) => {
  const activeRouteName = getActiveRouteName(props.location)

  return (
    <Layout
      footer={false}
      {...meta}
      name={`Microlink ${activeRouteName}`}
      image={`https://cdn.microlink.io/page/docs/${activeRouteName.toLowerCase()}.png`}
    >
      <Container>
        <Aside routes={routes} activeRouteName={activeRouteName}>
          <Text as='header'>
            <H1 mt={[4, 4, 4, 5]} variant={null} mb={0} slug={false}>
              <span>{meta.title}</span>
              {meta.isPro && (
                <Tooltip
                  ml={2}
                  display='inline'
                  content='This feature is only for pro plans.'
                >
                  <Badge>PRO</Badge>
                </Tooltip>
              )}
            </H1>
          </Text>
          <Markdown children={content} />
          <Flex
            as='footer'
            borderTop={1}
            borderColor={colors.border}
            justifyContent='space-between'
            my={4}
            pt={4}
          >
            <Text color='gray5' fontSize={0}>
              Last Edited on {formatDate(meta.date)}
            </Text>
            <Link href={githubUrl} fontSize={0}>
              Edit This Page on GitHub
            </Link>
          </Flex>
        </Aside>
      </Container>
    </Layout>
  )
}
