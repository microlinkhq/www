import { withTitle } from 'helpers/hoc/with-title'
import Caption from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import { layout, theme } from 'theme'
import React from 'react'

import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'

const Heading = withTitle(HeadingBase)

export const Head = () => (
  <Meta
    title='Page not found'
    description='The page you’re looking for doesn’t exist or has been moved.'
  />
)

const NotFoundPage = () => (
  <Layout>
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center'
      })}
    >
      <Heading titleize={false}>Page not found</Heading>

      <Caption
        css={theme({
          pt: [3, null, 4],
          px: 4,
          maxWidth: layout.small
        })}
      >
        The page you’re looking for doesn’t exist or has been moved.
      </Caption>

      <Flex
        css={theme({
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          pt: [3, null, 4]
        })}
      >
        <Link href='/'>
          <Caps css={theme({ fontSize: 0 })}>Home</Caps>
        </Link>
        <Link href='/docs/api/getting-started/overview'>
          <Caps css={theme({ fontSize: 0 })}>Documentation</Caps>
        </Link>
        <Link href='/search'>
          <Caps css={theme({ fontSize: 0 })}>Search</Caps>
        </Link>
      </Flex>
    </Flex>
  </Layout>
)

export default NotFoundPage
