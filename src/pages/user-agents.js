import { DotsBackground, ArrowLink, Caption, Layout } from 'components/patterns'
import { Li, Ul } from 'components/markdown'
import React, { useState } from 'react'
import { layout, theme } from 'theme'
import { formatDate } from 'helpers'

import {
  Box,
  Container,
  Flex,
  Heading,
  Meta,
  Toggle,
  Tooltip
} from 'components/elements'

import { useClipboard } from 'components/hook'

import userAgents from '../../data/user-agents.json'

export const Head = () => (
  <Meta
    title='User Agents'
    description='Most common user-agents used on Internet'
  />
)

const UserAgentsPage = () => {
  const [ClipboardComponent, toClipboard] = useClipboard()
  const [type, setType] = useState('top-user-agents')
  const isUserType = type === 'top-user-agents'

  const { data, updatedAt, version } = userAgents[isUserType ? 0 : 1]

  const githubUrl = isUserType
    ? 'https://github.com/microlinkhq/top-user-agents'
    : 'https://github.com/Kikobeats/top-crawler-agents'

  const downloadUrl = isUserType
    ? `https://raw.githubusercontent.com/microlinkhq/top-user-agents/v${version}/src/index.json`
    : `https://raw.githubusercontent.com/Kikobeats/top-crawler-agents/v${version}/index.json`

  return (
    <DotsBackground>
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
              maxWidth: layout.small
            })}
            titleize={false}
          >
            A self-updating list of the latest
            <br />& most common browser agents.
          </Caption>
          <Caption css={theme({ fontSize: 2, py: 3 })}>
            Last Updated: {formatDate(new Date(updatedAt))}.
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
                setType(
                  `top-${value === 'User Agent' ? 'user' : 'crawler'}-agents`
                )}
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
            <Ul>
              {data.map((userAgent, index) => (
                <Tooltip
                  type='copy'
                  key={`${userAgent}_${index}`}
                  tooltipsOpts={Tooltip.TEXT.OPTIONS}
                  content={
                    <Tooltip.Content>
                      {Tooltip.TEXT.COPY('user agent')}
                    </Tooltip.Content>
                  }
                >
                  <Li
                    key={userAgent}
                    onClick={() => {
                      toClipboard({
                        copy: userAgent,
                        text: Tooltip.TEXT.COPIED('HTML')
                      })
                    }}
                  >
                    <Box
                      css={`
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      `}
                    >
                      {userAgent}
                    </Box>
                  </Li>
                </Tooltip>
              ))}
            </Ul>
          </Flex>
          <ClipboardComponent />
        </Container>
      </Layout>
    </DotsBackground>
  )
}

export default UserAgentsPage
