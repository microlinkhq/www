import { ArrowLink, Caption, Layout } from 'components/patterns'
import Markdown from 'components/markdown'
import React, { useState } from 'react'
import { layout } from 'theme'

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
      <Container pt={2} pb={3} justifyContent='center' alignItems='center'>
        <Heading px={5} maxWidth={layout.large}>
          User Agents
        </Heading>
        <Caption
          pt={[3, 3, 4, 4]}
          px={['48px', 4, 4, 4]}
          titleize={false}
          maxWidth={[layout.small, layout.small, layout.small, layout.small]}
        >
          Most common `user-agent` used on Internet.
        </Caption>
        <Flex
          py={[3, 3, 4, 4]}
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <Toggle
            alignItems='center'
            justifyContent='center'
            defaultValue='User Agent'
            onChange={value =>
              setType(value === 'User Agent' ? 'user' : 'crawler')
            }
          >
            {['User Agent', 'Crawler Agent']}
          </Toggle>
          <Flex pt={[3, 3, 4, 4]}>
            <ArrowLink pr={[2, 4, 4, 4]} href={downloadUrl}>
              Download
            </ArrowLink>
            <ArrowLink href={githubUrl}>See on GitHub</ArrowLink>
          </Flex>
        </Flex>
        <Flex
          flexDirection='column'
          maxWidth={['95vw', '95vw', undefined, undefined]}
        >
          <Markdown>{content}</Markdown>
        </Flex>
      </Container>
    </Layout>
  )
}

export default UserAgentsPage
