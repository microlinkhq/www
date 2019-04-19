import * as mdComponents from 'components/markdown'
import { Link, Text, Flex, Container } from 'components/elements'
import { Layout, Aside } from 'components/patterns'
import formatDate from 'date-fns/format'
import MDX from 'mdx-scoped-runtime'
import Head from 'components/Head'
import { navigate } from 'gatsby'
import slug from 'remark-slug'
import { omit } from 'lodash'
import React from 'react'

import { ASIDE_WIDTH } from 'components/patterns/Aside'

const scopeComponents = omit(mdComponents, 'default')

const { H1 } = mdComponents

const PATHS_SDK = [
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
  }
]

const SDK = 'SDK'
const API = 'API'

const PATHS_API = [
  {
    name: 'Getting Started',
    posts: [
      {
        name: 'Overview',
        href: '/docs/api/getting-started/overview'
      }
      // {
      //   name: 'Data Types',
      //   href: '/docs/api/getting-started/data-types'
      // }
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

const paths = {
  [SDK]: PATHS_SDK,
  [API]: PATHS_API
}

const getActivePathname = pathname => {
  if (pathname.startsWith('/docs/sdk')) return SDK
  if (pathname.startsWith('/docs/api')) return API
}

const onChange = value => {
  switch (value) {
    case SDK:
      return navigate('/docs/sdk/getting-started/overview/')
    case API:
      return navigate('/docs/api/getting-started/overview')
  }
}

export default ({ meta, content, githubUrl, ...props }) => {
  const { pathname } = props.location
  const activePathname = getActivePathname(pathname)

  return (
    <Layout footer={false}>
      <Head {...meta} />
      <Container pl={0}>
        <Aside
          paths={paths}
          activePathname={activePathname}
          onChange={onChange}
        />
        <Flex pl={ASIDE_WIDTH} flexDirection='column' as='article'>
          <Text as='header'>
            <H1 children={meta.title} variant={null} mb={0} slug={false} />
          </Text>
          <MDX
            components={mdComponents.default}
            scope={scopeComponents}
            mdPlugins={[slug]}
          >
            {content}
          </MDX>
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
        </Flex>
      </Container>
    </Layout>
  )
}
