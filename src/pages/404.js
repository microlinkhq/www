import { withTitle } from 'helpers/hoc/with-title'
import Caption from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import { RECOVERY_LINKS } from 'helpers/not-found'
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
    robots='noindex, follow'
  />
)

const RecoveryLink = ({ href, title, description }) => (
  <Text
    as='li'
    css={theme({
      color: 'black60',
      textAlign: ['center', null, 'left']
    })}
  >
    <Link href={href}>{title}</Link>
    {` — ${description}`}
  </Text>
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
          pt: [4, null, 5],
          px: 4,
          gap: 3,
          listStyle: 'none',
          flexDirection: 'column',
          maxWidth: layout.normal
        })}
      >
        {RECOVERY_LINKS.map(link => (
          <RecoveryLink key={link.href} {...link} />
        ))}
      </Flex>
    </Flex>
  </Layout>
)

export default NotFoundPage
