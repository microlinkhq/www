import { Link, Text, Flex, Container } from 'components/elements'
import { Layout, Aside } from 'components/patterns'
import Markdown, { H1 } from 'components/markdown'
import formatDate from 'date-fns/format'
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
        name: 'url',
        href: '/docs/sdk/api-parameters/url/'
      },
      {
        name: 'apiKey',
        href: '/docs/sdk/api-parameters/api-key/'
      },
      {
        name: 'setData',
        href: '/docs/sdk/api-parameters/set-data/'
      },
      {
        name: 'contrast',
        href: '/docs/sdk/api-parameters/contrast/'
      },
      {
        name: 'media',
        href: '/docs/sdk/api-parameters/media/'
      },
      {
        name: 'direction',
        href: '/docs/sdk/api-parameters/direction/'
      },
      {
        name: 'size',
        href: '/docs/sdk/api-parameters/size/'
      },
      {
        name: 'media',
        posts: [
          {
            name: 'autoPlay',
            href: '/docs/sdk/api-parameters/media/auto-play/'
          },
          {
            name: 'controls',
            href: '/docs/sdk/api-parameters/media/controls/'
          },
          {
            name: 'muted',
            href: '/docs/sdk/api-parameters/media/muted/'
          },
          {
            name: 'loop',
            href: '/docs/sdk/api-parameters/media/loop/'
          }
        ]
      }
    ]
  },
  {
    name: 'Resources',
    posts: [
      {
        name: 'Storybook',
        href: 'https://storybook.microlink.io/',
        external: true
      },
      {
        name: 'CodeSandbox',
        href: 'https://codesandbox.io/s/n5w839zm4m',
        external: true
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
        href: '/docs/api/api-basics/endpoint'
      },
      {
        name: 'Authentication',
        href: '/docs/api/api-basics/authentication'
      },
      {
        name: 'Rate Limit',
        href: '/docs/api/api-basics/rate-limit'
      },
      {
        name: 'Format',
        href: '/docs/api/api-basics/format'
      },
      {
        name: 'Compression',
        href: '/docs/api/api-basics/compression'
      },
      {
        name: 'Cache',
        href: '/docs/api/api-basics/cache'
      }
    ]
  },
  {
    name: 'API Parameters',
    posts: [
      {
        name: 'url',
        href: '/docs/api/api-parameters/url'
      },
      {
        name: 'prerender',
        href: '/docs/api/api-parameters/prerender'
      },
      {
        name: 'screenshot',
        href: '/docs/api/api-parameters/screenshot'
      },
      {
        name: 'palette',
        href: '/docs/api/api-parameters/palette'
      },
      {
        name: 'filter',
        href: '/docs/api/api-parameters/filter'
      },
      {
        name: 'embed',
        href: '/docs/api/api-parameters/embed'
      },
      {
        name: 'audio',
        href: '/docs/api/api-parameters/audio'
      },
      {
        name: 'video',
        href: '/docs/api/api-parameters/video'
      },
      {
        name: 'user agent',
        href: '/docs/api/api-parameters/user-agent'
      },
      {
        name: 'force',
        href: '/docs/api/api-parameters/force'
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
    name: 'Rule definition',
    posts: [
      {
        name: 'selector',
        href: '/docs/mql/rule-definition/selector'
      },
      {
        name: 'attr',
        href: '/docs/mql/rule-definition/attr'
      },
      {
        name: 'type',
        href: '/docs/mql/rule-definition/type'
      }
    ]
  }
  // {
  //   name: 'Examples',
  //   posts: [
  //     {
  //       name: 'Twitter',
  //       href: '/docs/mql/rule-definition/selectors'
  //     },
  //     {
  //       name: 'Instagram',
  //       href: '/docs/mql/rule-definition/attr'
  //     },
  //     {
  //       name: 'Hacker News',
  //       href: '/docs/mql/rule-definition/selector'
  //     },
  //     {
  //       name: 'Reddit',
  //       href: '/docs/mql/rule-definition/type'
  //     }
  //   ]
  // }
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
    <Layout footer={false} {...meta} name={`Microlink ${activeRouteName}`}>
      <Container>
        <Aside routes={routes} activeRouteName={activeRouteName}>
          <Text as='header'>
            <H1
              mt={[4, 4, 4, 5]}
              children={meta.title}
              variant={null}
              mb={0}
              slug={false}
            />
          </Text>
          <Markdown children={content} />
          <Flex
            as='footer'
            borderTop='1px solid'
            borderColor='border'
            justifyContent='space-between'
            my={4}
            pt={4}
          >
            <Text color='gray5' fontSize={0}>
              Last Edited on {formatDate(meta.date, 'MMMM Do YYYY')}
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
