import Layout from 'components/patterns/Layout'
import Caption from 'components/patterns/Caption/Caption'
import { formatDate } from 'helpers/format-date'
import { useBreakpoint } from 'components/hook/use-breakpoint'
import { useQueryState } from 'components/hook/use-query-state'
import React from 'react'
import { layout, space, theme } from 'theme'
import { Link } from 'components/elements/Link'
import Terminal from 'components/elements/Terminal/Terminal'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Meta from 'components/elements/Meta/Meta'
import Toggle from 'components/elements/Toggle/Toggle'
import Faq from 'components/patterns/Faq/Faq'

import userAgents from '../../static/user-agents.json'

export const Head = () => (
  <Meta
    title={`The ultimate user agent list (${new Date().getFullYear()})`}
    description='Comprehensive, up-to-date user agent database. Essential for web scraping, testing, and bot development. Covers browsers, crawlers, and AI agents with regular updates.'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: 'User Agent List',
        description:
          'A self-updating list of the latest and most common user agents for browsers, crawlers, and AI bots.',
        url: 'https://microlink.io/user-agents',
        keywords: [
          'user agent database',
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
        <Heading>User Agent List</Heading>
        <Caption forwardedAs='h2' css={theme({ pt: [3, 3, 4, 4], px: [4, 0] })}>
          Comprehensive database of user agents for all major browsers and
          crawlers. Essential resource for web scraping, bot development, and
          browser testing.
        </Caption>
        <Caption
          forwardedAs='p'
          css={theme({ fontSize: 2, pt: 3, color: 'black60' })}
        >
          Last updated on {formatDate(new Date(userAgents.updatedAt))}
        </Caption>

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

        <Terminal
          title={`${terminalTitle} (${data.length})`}
          blinkCursor={false}
          shellSymbol={false}
          text={JSON.stringify(data, null, 2)}
          css={theme({
            height: '350px',
            width: [`calc(100vw - ${space[4]})`, layout.small]
          })}
        >
          {data.map((userAgent, index) => (
            <Box
              key={`${userAgent}_${index}`}
              as='span'
              css={theme({
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              })}
            >
              {userAgent}
            </Box>
          ))}
        </Terminal>
      </Box>

      <Faq
        css={theme({ pt: 0, px: 0 })}
        questions={[
          {
            question: 'What can I use this user agent database for?',
            answer: (
              <div>
                Build robust web scraping, testing, and automation solutions.
                This comprehensive database supports:
                <Faq.List>
                  <li>
                    <strong>Web Scraping</strong>: Rotate user agents to avoid
                    detection and access restricted content
                  </li>
                  <li>
                    <strong>Browser Testing</strong>: Ensure compatibility
                    across different browsers and devices
                  </li>
                  <li>
                    <strong>Bot Development</strong>: Build sophisticated
                    automation tools that mimic real user behavior
                  </li>
                  <li>
                    <strong>SEO Monitoring</strong>: Test how search engines and
                    crawlers see your website
                  </li>
                </Faq.List>
                Whether you're building scraping tools, testing frameworks, or
                automation systems, our comprehensive database ensures you have
                the right user agents for any use case.
              </div>
            )
          },
          {
            question: 'How is the user agent list obtained?',
            answer: (
              <div>
                The data comes from multiple sources to provide comprehensive
                user agent detection, then undergoes rigorous normalization to
                ensure reliability and quality:
                <Faq.List>
                  <li>
                    <Link
                      href='https://github.com/microlinkhq/cloudflare-bot-directory'
                      logoIcon
                    >
                      CloudFlare Bot Directory
                    </Link>{' '}
                    : a wrapper of CloudFlare Radar verified bots directory.
                  </li>
                  <li>
                    <Link
                      href='https://github.com/microlinkhq/top-user-agents'
                      logoIcon
                    >
                      Top User Agents
                    </Link>{' '}
                    : an always up-to-date list of the top 100 HTTP user agents
                    most used over the Internet.
                  </li>
                  <li>
                    <Link
                      href='https://github.com/arcjet/well-known-bots'
                      logoIcon
                    >
                      Well-Known Bots
                    </Link>{' '}
                    : comprehensive collection of known bot user agents.
                  </li>
                  <li>
                    <Link
                      href='https://github.com/monperrus/crawler-user-agents'
                      logoIcon
                    >
                      Crawler User Agents
                    </Link>{' '}
                    : curated list of web crawler user agents.
                  </li>
                </Faq.List>
                The data obtained from these sources is messy—duplicates,
                inconsistencies, and formatting issues abound. Our normalization
                process transforms this chaos into reliable, production-ready
                data through:
                <Faq.List>
                  <li>
                    <b>Deduplication</b>: We identify and merge duplicate user
                    agents while preserving the most accurate representations
                  </li>
                  <li>
                    <b>Standardization</b>: Consistent formatting ensures
                    compatibility across different systems and programming
                    languages
                  </li>
                  <li>
                    <b>Validation</b>: Each user agent is validated against
                    known patterns to filter out malformed or outdated entries
                  </li>
                  <li>
                    <b>Categorization</b>: Intelligent classification separates
                    bots, crawlers, browsers, and AI agents for targeted use
                    cases
                  </li>
                  <li>
                    <b>Quality Assurance</b>: Automated testing ensures the
                    normalized data works reliably in real-world applications
                  </li>
                </Faq.List>
                This rigorous process means you get battle-tested user agents
                that just work, without the headaches of manual cleanup and
                validation.
              </div>
            )
          },
          {
            question: 'How current and reliable is the data?',
            answer: (
              <>
                <div>
                  Our database is continuously updated with the latest user
                  agents from trusted sources. We maintain high data quality
                  through rigorous validation, deduplication, and
                  categorization. The last update timestamp shows when the data
                  was refreshed, ensuring you always have access to current,
                  production-ready user agents.
                </div>
                <div>
                  Each entry is validated and tested to ensure compatibility and
                  effectiveness across different platforms and use cases. This
                  reliability is crucial for production applications where user
                  agent accuracy matters.
                </div>
              </>
            )
          },
          {
            question: 'How do I integrate this into my projects?',
            answer: (
              <>
                <div>
                  The preferred way is to consume it as an API by accessing the
                  full list programmatically via this endpoint:
                </div>
                <Terminal blinkCursor={false}>
                  curl -L microlink.io/user-agents.json
                </Terminal>
                <div>
                  Alternatively, for testing purposes, you can use the copy icon
                  in the top right corner of the terminal to copy the entire
                  list as JSON and use it directly in your code.
                </div>
                <div>
                  It's CORS-enabled and ready for direct integration into any
                  frontend or backend application, ensuring your project always
                  has access to the most up-to-date strings.
                </div>
              </>
            )
          },
          {
            question: 'What are best practices for using user agents?',
            answer: (
              <>
                <div>
                  When using user agents in your applications, follow these best
                  practices:
                  <Faq.List>
                    <li>
                      <strong>Rotate regularly</strong>: Change user agents
                      frequently to avoid detection patterns
                    </li>
                    <li>
                      <strong>Match device context</strong>: Use appropriate
                      user agents for the target platform (mobile, desktop,
                      crawler)
                    </li>
                    <li>
                      <strong>Respect rate limits</strong>: Combine user agent
                      rotation with appropriate delays to avoid blocking
                    </li>
                    <li>
                      <strong>Test compatibility</strong>: Verify your
                      applications work with different browser user agents
                    </li>
                  </Faq.List>
                  Our categorized database makes it easy to select the right
                  user agents for your specific use case.
                </div>
                <CodeEditor
                  title='puppeteer.js'
                  language='javascript'
                  css={theme({
                    width: [`calc(100vw - ${space[4]})`, layout.small]
                  })}
                >
                  {`const ENDPOINT = 'https://microlink.io/user-agents.json'

const puppeteer = require('puppeteer')

const browser = await puppeteer.launch()
const page = await browser.newPage()

// Fetch user agents from the API
const userAgents = await fetch(ENDPOINT).then(res => res.json())

// Pick a random user agent
const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)]
await page.setUserAgent(userAgent)

await page.goto('https://example.com')
`}
                </CodeEditor>
                <div>
                  If you don’t want to manage that infrastructure, you can use
                  the fully managed{' '}
                  <Link href='https://microlink.io/docs/api/getting-started/overview'>
                    Microlink API
                  </Link>
                  : It automatically handles proxy rotation, paywalls, bot
                  detection, and restricted platforms such as major social
                  networks, while scaling on demand. Pricing is pay-as-you-go
                  and{' '}
                  <Link href='https://microlink.io/#pricing'>
                    starts for free
                  </Link>
                  .
                </div>
              </>
            )
          },
          {
            question: 'Other questions?',
            answer: (
              <>
                <div>
                  We’re always available at{' '}
                  <Link href='mailto:hello@microlink.io'>
                    hello@microlink.io
                  </Link>
                  .
                </div>
              </>
            )
          }
        ]}
      />
    </Layout>
  )
}

export default UserAgentsPage
