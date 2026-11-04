import Layout from 'components/patterns/Layout'
import Caption from 'components/patterns/Caption/Caption'
import { formatDate } from 'helpers/format-date'
import { useBreakpoint } from 'components/hook/use-breakpoint'
import { useQueryState } from 'components/hook/use-query-state'
import React from 'react'
import { layout, theme } from 'theme'
import Text from 'components/elements/Text'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Meta from 'components/elements/Meta/Meta'
import Toggle from 'components/elements/Toggle/Toggle'

import UserAgentList from 'components/pages/user-agents/UserAgentList'
import UserAgentsFaq, {
  getFaqQuestions
} from 'components/pages/user-agents/UserAgentsFaq'
import toPlainText from 'components/patterns/Faq/to-plain-text'
import { USER_AGENTS_COUNT } from 'components/pages/user-agents/counts'

import userAgents from '../../static/user-agents.json'

export const Head = () => (
  <Meta
    title={`The latest User Agent list (${new Date().getFullYear()})`}
    description={`The ${USER_AGENTS_COUNT.user} most common browser user agents from real traffic, plus ${USER_AGENTS_COUNT.ai} AI bot and ${USER_AGENTS_COUNT.crawler} crawler names. Free JSON endpoint, updated weekly.`}
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: 'Latest User Agent List',
        description: `The ${USER_AGENTS_COUNT.user} most common browser user agents seen in real traffic, plus the names of ${USER_AGENTS_COUNT.ai} AI bots and ${USER_AGENTS_COUNT.crawler} crawlers. Updated weekly.`,
        url: 'https://microlink.io/user-agents',
        keywords: [
          'user agent list',
          'user agent strings',
          'browser user agents',
          'crawler user agents',
          'web scraping user agents',
          'bot user agents',
          'AI user agents'
        ],
        license: 'https://microlink.io/terms',
        creator: {
          '@type': 'Organization',
          name: 'Microlink',
          url: 'https://microlink.io'
        },
        distribution: {
          '@type': 'DataDownload',
          encodingFormat: 'application/json',
          contentUrl: 'https://microlink.io/user-agents.json'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: getFaqQuestions().map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: toPlainText(answer)
          }
        }))
      }
    ]}
  />
)

const UserAgentsPage = () => {
  const [{ type = 'user' }, setType] = useQueryState()
  const breakpoint = useBreakpoint()

  const terminalTitle =
    breakpoint === 0
      ? 'microlink.io/user-agents.json'
      : 'curl -L microlink.io/user-agents.json'

  const data = userAgents[type] || userAgents.user

  return (
    <Layout css={theme({ maxWidth: layout.small, mx: 'auto' })}>
      <Box as='section' id='hero'>
        <Heading>User agent list</Heading>
        <Caption forwardedAs='h2' css={theme({ pt: [3, 3, 4, 4], px: [4, 0] })}>
          The most common browser user agents,
          <br />
          plus the names of AI bots & crawlers.
        </Caption>
        <Text
          as='p'
          css={theme({ pt: 3, color: 'black60', textAlign: 'center' })}
        >
          Last updated on {formatDate(new Date(userAgents.updatedAt))}
        </Text>

        <Flex
          css={theme({
            py: [3, null, 4],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4
          })}
        >
          <Box>
            <Toggle
              css={theme({
                width: 'auto'
              })}
              defaultValue={type}
              onChange={value => setType({ type: value })}
            >
              {[
                { id: 'user', node: 'User' },
                { id: 'ai', node: 'AI' },
                { id: 'crawler', node: 'Crawler' }
              ]}
            </Toggle>
          </Box>
        </Flex>

        <UserAgentList terminalTitle={terminalTitle} data={data} />
      </Box>

      <UserAgentsFaq />
    </Layout>
  )
}

export default UserAgentsPage
