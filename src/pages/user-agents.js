import Layout from 'components/patterns/Layout'
import Caption from 'components/patterns/Caption/Caption'
import { formatDate } from 'helpers/format-date'
import { useBreakpoint } from 'components/hook/use-breakpoint'
import { useQueryState } from 'components/hook/use-query-state'
import React from 'react'
import { layout, space, theme } from 'theme'
import { Link } from 'components/elements/Link'
import Terminal from 'components/elements/Terminal/Terminal'
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
    description='Most common user-agents used on the Internet up to date'
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
          A self-updating list of the latest
          <br />& most common user agents.
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
                { id: 'crawler', node: 'Crawler' },
                { id: 'ai', node: 'AI' }
              ]}
            </Toggle>
          </Box>
        </Flex>

        <Flex
          css={theme({
            alignItems: 'center',
            justifyContent: 'center'
          })}
        >
          <Terminal
            title={terminalTitle}
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
        </Flex>
      </Box>

      <Faq
        css={theme({ pt: 0, px: 0 })}
        questions={[
          {
            question: 'What is a user agent string?',
            answer: (
              <>
                <div>
                  A User Agent is a request header (User-Agent) that lets
                  servers identify the application, operating system, vendor,
                  and version of the requesting client. For developers, it's
                  essential for ensuring browser compatibility and bypassing
                  basic bot detection systems.
                </div>
              </>
            )
          },
          {
            question: 'Why do I need an updated user agent list?',
            answer: (
              <>
                <div>
                  Browsers have aggressive release cycles.{' '}
                  <b>Rotating User Agents</b> is critical for web scraping and
                  automation. By randomizing the User Agent header, you mimic
                  organic traffic and reduce the risk of being blocked by{' '}
                  <Link href='https://www.cloudflare.com/learning/ddos/glossary/web-application-firewall-waf/'>
                    WAFs
                  </Link>{' '}
                  (Web Application Firewalls) or anti-bot measures. You can use
                  this list to rotate the User Agent header in your project.
                </div>
              </>
            )
          },
          {
            question: 'How often is this list updated?',
            answer: (
              <>
                <div>
                  This list is self-updating. We automatically fetch the latest
                  user agents from reliable sources to ensure the list remains
                  current.
                </div>
              </>
            )
          },
          {
            question: 'How do I use these user agents list on my project?',
            answer: (
              <>
                <div>
                  You can use the copy icon in the top right corner of the
                  terminal to copy the entire list as JSON. You can then use it
                  in your code, for example, when setting the{' '}
                  <code>User-Agent</code> header in an HTTP request.
                </div>
              </>
            )
          },
          {
            question: 'Is there an API for this list?',
            answer: (
              <>
                <div>
                  Yes, you can get the full list in the following endpoint:
                </div>
                <Terminal blinkCursor={false}>
                  curl -L microlink.io/user-agents.json
                </Terminal>
                <div>
                  It's CORS-enabled and ready for direct integration into any
                  frontend or backend application, ensuring your project always
                  has access to the most up-to-date strings.
                </div>
              </>
            )
          },
          {
            question: 'How do I rotate user-agents in a headless browser?',
            answer: (
              <>
                <div>
                  You can manually set the header in Puppeteer or Playwright
                  using a random string from this list. However,{' '}
                  <Link href='/blog/what-is-a-headless-browser'>
                    scaling a Headless Browser
                  </Link>{' '}
                  infrastructure is complex.{' '}
                  <Link href='/docs/api/getting-started/overview'>
                    Microlink API
                  </Link>{' '}
                  runs a remote Headless Chrome instance for you, automatically
                  handling User Agent rotation, proxy management, and browser
                  fingerprinting so you never get blocked.
                </div>
              </>
            )
          },
          {
            question: 'Does this list include mobile user-agents?',
            answer: (
              <>
                <div>
                  Yes. The list distinguishes between Desktop (Windows, macOS,
                  Linux) and Mobile (Android, iOS) strings. Using a Mobile User
                  Agent is often effective for scraping simpler HTML versions of
                  complex websites or testing responsive designs.
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
