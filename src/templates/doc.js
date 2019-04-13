import * as mdComponents from 'components/markdown'
import React from 'react'
import styled from 'styled-components'
import { Layout, Aside } from 'components/patterns'
import { Text, Flex, Container } from 'components/elements'
import Head from 'components/Head'
import MDX from 'mdx-scoped-runtime'
import slug from 'remark-slug'
import { omit } from 'lodash'

import { ASIDE_WIDTH } from 'components/patterns/Aside'

const scopeComponents = omit(mdComponents, 'default')

const { H1 } = mdComponents

const docPaths = [
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
          },
          {
            name: 'autoPlay',
            href: '/docs/sdk/api-parameters/media/auto-play/'
          }
        ]
      }
    ]
  }
]

export default ({ meta, content }) => {
  return (
    <Layout footer={false}>
      <Head {...meta} />
      <Container pl={0}>
        <Aside children={docPaths} />
        <Flex pl={ASIDE_WIDTH} flexDirection='column' as='article'>
          <Text as='header'>
            <H1 children={meta.title} variant={null} mb={0} />
          </Text>
          <MDX
            components={mdComponents.default}
            scope={scopeComponents}
            mdPlugins={[slug]}
          >
            {content}
          </MDX>
        </Flex>
      </Container>
    </Layout>
  )
}
