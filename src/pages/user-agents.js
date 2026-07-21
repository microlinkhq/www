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
import UserAgentsFaq from 'components/pages/user-agents/UserAgentsFaq'

import userAgents from '../../static/user-agents.json'

export const Head = () => (
  <Meta
    title={`The latest User Agent list (${new Date().getFullYear()})`}
    description='Most common User Agent list up to date. Essential for web scraping, testing, and bot development. Covers browsers, crawlers, and AI agents. Updated weekly.'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: 'Latest User Agent List',
        description:
          'The latest User Agent list for 2026. A self-updating list of the latest and most common user agents for browsers, crawlers, and AI bots. Aggregated weekly from high-authority sources to ensure reliability.',
        url: 'https://microlink.io/user-agents',
        keywords: [
          'user agent list',
          'user agent strings',
          'browser user agents',
          'crawler user agents',
          'web scraping user agents',
          'bot user agents',
          'AI user agents',
          'user agent list'
        ],
        license: 'https://microlink.io/tos',
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
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How is the user agent list obtained?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The data comes from multiple reliable sources including CloudFlare Bot Directory, Top User Agents, Well-Known Bots, and Crawler User Agents. This data undergoes rigorous normalization including deduplication, standardization, validation, categorization, and quality assurance to ensure reliability and production-readiness.'
            }
          },
          {
            '@type': 'Question',
            name: 'How frequently is the user agent list updated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The user agent list is updated weekly to ensure you have the latest and most effective user agents. Check the "Last updated" timestamp at the top of the page to see when the most recent refresh occurred.'
            }
          },
          {
            '@type': 'Question',
            name: 'How to consume the user agent list?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Access the full list programmatically via the API endpoint at microlink.io/user-agents.json. It's CORS-enabled and ready for direct integration into any frontend or backend application. You can also copy the JSON directly from the terminal display for testing purposes."
            }
          }
        ]
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
          A self-updating list of the latest
          <br />& most common user agents.
        </Caption>
        <Text as='p' css={theme({ pt: 3, color: 'black60' })}>
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
