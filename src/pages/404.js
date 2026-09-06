import { withTitle } from 'helpers/hoc/with-title'
import Caption from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import { notFoundLinks } from 'helpers/page-markdown'
import { layout, theme } from 'theme'
import React from 'react'

import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import Text from 'components/elements/Text'

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
        as='ul'
        css={theme({
          flexDirection: 'column',
          alignItems: 'center',
          pt: [3, null, 4],
          px: 4,
          pl: 0,
          m: 0,
          maxWidth: layout.small
        })}
        style={{ listStyle: 'none' }}
      >
        {notFoundLinks.map(({ href, label }) => (
          <Text
            as='li'
            key={href}
            css={theme({
              py: [3, 3, 2, 2],
              textAlign: 'center'
            })}
          >
            <Link href={href} prefetch={false}>
              {label}
            </Link>
          </Text>
        ))}
      </Flex>
    </Flex>
  </Layout>
)

export default NotFoundPage
