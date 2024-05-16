import { ArrowLink, Caption, Layout } from 'components/patterns'
import Markdown from 'components/markdown'
import React, { useState } from 'react'
import { layout, theme } from 'theme'

import { Toggle, Container, Flex, Heading, Meta } from 'components/elements'

import userAgents from 'top-user-agents'
import crawlerAgents from 'top-crawler-agents'

export const Head = () => (
  <Meta description='Most common user-agents used on Internet' />
)

const UserAgentsPage = () => {
  const [type, setType] = useState('user')
  const isUserType = type === 'user'

  const list = isUserType ? userAgents : crawlerAgents

  const githubUrl = isUserType
    ? 'https://github.com/microlinkhq/top-user-agents'
    : 'https://github.com/Kikobeats/top-crawler-agents'

  const downloadUrl = isUserType
    ? 'https://raw.githubusercontent.com/microlinkhq/top-user-agents/master/src/index.json'
    : 'https://raw.githubusercontent.com/Kikobeats/top-crawler-agents/master/index.json'

  const content = list.map(userAgent => `* ${userAgent}`).join('\n')

  return (
    <Layout>
      <Container
        css={theme({
          pt: 2,
          pb: 3,
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <Heading css={theme({ px: 5, maxWidth: layout.large })}>
          User Agents
        </Heading>
        <Caption
          forwardedAs='h2'
          css={theme({
            pt: [3, null, 4],
            px: ['48px', 4],
            maxWidth: layout.small
          })}
          titleize={false}
        >
          Most common `user-agent` used on Internet.
        </Caption>
        <Flex
          css={theme({
            py: [3, null, 4],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          })}
        >
          <Toggle
            css={theme({ alignItems: 'center', justifyContent: 'center' })}
            defaultValue='User Agent'
            onChange={value =>
              setType(value === 'User Agent' ? 'user' : 'crawler')}
          >
            {['User Agent', 'Crawler Agent']}
          </Toggle>
          <Flex
            css={theme({
              pt: [3, null, 4],
              gap: [2, 4],
              fontSize: [2, null, 3]
            })}
          >
            <ArrowLink href={downloadUrl}>Download</ArrowLink>
            <ArrowLink href={githubUrl}>See on GitHub</ArrowLink>
          </Flex>
        </Flex>
        <Flex css={theme({ flexDirection: 'column', maxWidth: '95vw' })}>
          <Markdown>{content}</Markdown>
        </Flex>
      </Container>
    </Layout>
  )
}

export default UserAgentsPage
