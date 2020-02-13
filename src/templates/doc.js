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
import * as Icons from 'components/icons'
import { colors, layout } from 'theme'
import { formatDate } from 'helpers'
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
      },
      {
        name: 'Storybook',
        href: '/integrations'
      },
      {
        name: 'CodeSandbox',
        href: '/integrations'
      }
    ]
  },
  {
    name: 'Integrations',
    posts: [
      {
        name: 'React',
        href: '/docs/sdk/integrations/react/',
        icon: Icons.React
      },
      {
        name: 'Vue',
        href: '/docs/sdk/integrations/vue/',
        icon: Icons.Vue
      },
      {
        name: 'Angular',
        href: '/docs/sdk/integrations/angular/',
        icon: Icons.Angular
      },
      {
        name: 'Jekyll',
        href: '/docs/sdk/integrations/jekyll/',
        icon: Icons.Jekyll
      },
      {
        name: 'Vanilla',
        href: '/docs/sdk/integrations/vanilla/',
        icon: Icons.JavaScript
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
        href: '/docs/api/parameters/color-scheme'
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
        name: 'hide',
        href: '/docs/api/parameters/hide'
      },
      {
        name: 'iframe',
        href: '/docs/api/parameters/iframe'
      },
      {
        name: 'insights',
        href: '/docs/api/parameters/insights'
      },
      {
        name: 'javascript',
        href: '/docs/api/parameters/javascript'
      },
      {
        name: 'mediaType',
        href: '/docs/api/parameters/media-type'
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
            name: 'landscape',
            href: '/docs/api/parameters/pdf/landscape'
          },
          {
            name: 'margin',
            href: '/docs/api/parameters/pdf/margin'
          },
          {
            name: 'pageRanges',
            href: '/docs/api/parameters/pdf/page-ranges'
          },
          {
            name: 'scale',
            href: '/docs/api/parameters/pdf/scale'
          }
        ]
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
        name: 'remove',
        href: '/docs/api/parameters/remove'
      },
      {
        name: 'screenshot',
        href: '/docs/api/parameters/screenshot',
        posts: [
          {
            name: 'element',
            href: '/docs/api/parameters/screenshot/element'
          },
          {
            name: 'fullPage',
            href: '/docs/api/parameters/screenshot/full-page'
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
        name: 'scrollTo',
        href: '/docs/api/parameters/scroll-to'
      },
      {
        name: 'styles',
        href: '/docs/api/parameters/styles'
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
        name: 'waitFor',
        href: '/docs/api/parameters/wait-for'
      },
      {
        name: 'waitUntil',
        href: '/docs/api/parameters/wait-until'
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

const getImage = ({ pathname }) => {
  if (pathname.includes('angular')) {
    return 'https://images.weserv.nl/?url=https%3A%2F%2Ficongr.am%2Fdevicon%2Fangularjs-original.svg%3Fsize%3D500&output=jpg&bg=white'
  }

  if (pathname.includes('react')) {
    return 'https://images.weserv.nl/?url=https%3A%2F%2Ficongr.am%2Fdevicon%2Freact-original.svg%3Fsize%3D500&output=jpg&bg=white'
  }

  if (pathname.includes('vue')) {
    return 'https://images.weserv.nl/?url=https%3A%2F%2Ficongr.am%2Fdevicon%2Fvuejs-original.svg%3Fsize%3D500&output=jpg&bg=white'
  }

  if (pathname.includes('vanilla')) {
    return 'https://images.weserv.nl/?url=https%3A%2F%2Ficongr.am%2Fdevicon%javascript-original.svg%3Fsize%3D500&output=jpg&bg=white'
  }
}

export default ({ meta, content, githubUrl, ...props }) => {
  const activeRouteName = getActiveRouteName(props.location)
  const image = getImage(props.location)

  return (
    <Layout
      footer={false}
      {...meta}
      name={`Microlink ${activeRouteName}`}
      image={image}
      twitterCard='summary'
    >
      <Container maxWidth={layout.large}>
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
            <Text color='gray' fontSize={0}>
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
