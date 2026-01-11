import Meta from 'components/elements/Meta/Meta'
import HeadingBase from 'components/elements/Heading'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import Chat from 'components/patterns/Chat/Chat'
import { cdnUrl } from 'helpers/cdn-url'
import { layout, theme } from 'theme'
import React from 'react'

const Heading = withTitle(HeadingBase)

const Caption = withTitle(CaptionBase)

export const Head = () => (
  <Meta
    description='Direct support via chat with guaranteed response from exclusive top-tier engineers.'
    image={cdnUrl('banner/community.jpeg')}
  />
)

const CommunityPage = () => (
  <Layout>
    <Container
      css={theme({
        pt: [2, null, 3],
        justifyContent: 'center',
        alignItems: 'center'
      })}
    >
      <Heading>Community</Heading>

      <Caption
        forwardedAs='h2'
        css={theme({
          pt: [3, null, 4],
          px: 4,
          maxWidth: layout.small
        })}
        titleize={false}
      >
        Direct support via chat with guaranteed response from exclusive top-tier engineers.
      </Caption>

      <Text css={theme({ maxWidth: layout.small, marginTop: 4 })}>
        We prioritize <strong>developer-to-developer interaction</strong>, ensuring you
        get technical, code-level assistance rather than generic automated responses.
      </Text>

      <Text css={theme({ maxWidth: layout.small, marginTop: 4 })}>
        Whether you are debugging a complex Puppeteer integration, optimizing concurrency,
        or want to propose a new feature for our roadmap, our channels are
        {' '}<strong>open and free</strong>. It's the fastest way to get your project moving.
      </Text>

      <Flex
        css={theme({
          justifyContent: 'center',
          alignItems: 'center',
          pt: [4, null, 4]
        })}
      >
        <img
          src='/images/jjJdsrv.png'
          alt='Microlink Developer Slack Community Interface'
          style={{
            maxWidth: '100%',
            width: 675,
            height: 'auto',
            display: 'block'
          }}
        />
      </Flex>

      <Text css={theme({ maxWidth: layout.small, marginTop: 4 })}>
        Join our dedicated <strong>Slack community</strong> and collaborate
        directly with the core engineering team.
      </Text>

      <Flex
        css={theme({
          alignItems: 'center',
          justifyContent: 'center',
          pt: [3, null, 4]
        })}
      >
        <Chat />
      </Flex>

    </Container>
  </Layout>
)

export default CommunityPage
