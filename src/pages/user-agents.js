import DotsBackground from 'components/patterns/DotsBackground/DotsBackground'
import Layout from 'components/patterns/Layout'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import { formatDate } from 'helpers/format-date'
import React, { useState } from 'react'
import { layout, theme } from 'theme'

import { Link } from 'components/elements/Link/base'
import Terminal from 'components/elements/Terminal/Terminal'
import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Meta from 'components/elements/Meta/Meta'
import Toggle from 'components/elements/Toggle/Toggle'
import Faq from 'components/patterns/Faq/Faq'

import userAgents from '../../static/user-agents.json'

const Caption = withTitle(CaptionBase)
const Heading = withTitle(HeadingBase)

export const Head = () => (
  <Meta
    title={`The Ultimate User Agents List (${new Date().getFullYear()})`}
    description='Most common User Agents used on the Internet up to date'
  />
)

const UserAgentsPage = () => {
  const [type, setType] = useState('user')
  const data = userAgents[type]
  return (
    <DotsBackground>
      <Layout>
        <Container
          css={theme({
            pt: 2,
            px: 3,
            width: '100%',
            alignItems: 'center'
          })}
        >
          <Heading
            css={theme({ px: 5, maxWidth: layout.large, textAlign: 'center' })}
            title='demo demo demo'
          >
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
          <Caption
            forwardedAs='p'
            css={theme({ fontSize: 2, pt: 3, color: 'black60' })}
            titleize={false}
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
                defaultValue='user'
                onChange={setType}
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
              flexDirection: 'column',
              width: '100%',
              px: [3, 0],
              mx: 'auto',
              alignItems: 'center'
            })}
          >
            <Terminal
              title={`${type} agents`}
              blinkCursor={false}
              shellSymbol={false}
              height='350px'
              text={JSON.stringify(data, null, 2)}
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
        </Container>

        <Faq
          css={theme({ pt: 5 })}
          questions={[
            {
              question: 'What is a User Agent string?',
              answer: (
                <>
                  <div>
                    A User Agent is a request header (User-Agent) that lets
                    servers identify the application, operating system, vendor,
                    and version of the requesting client. For developers, it's
                    essential for ensuring browser compatibility and
                    bypassing basic bot detection systems.
                  </div>
                </>
              )
            },
            {
              question: 'Why do I need a User Agent list?',
              answer: (
                <>
                  <div>
                    Rotating User Agents is critical for web scraping and automation.
                    By randomizing the User Agent header, you mimic organic traffic
                    and reduce the risk of being blocked by WAFs
                    (Web Application Firewalls) or anti-bot measures.
                  </div>
                </>
              )
            },
            {
              question: 'How often is this list updated?',
              answer: (
                <>
                  <div>
                    This list is self-updating. We automatically fetch the
                    latest user agents from reliable sources to ensure the list
                    remains current.
                  </div>
                </>
              )
            },
            {
              question: 'How do I use these user agents?',
              answer: (
                <>
                  <div>
                    You can use the copy icon in the top right corner of the
                    terminal to copy the entire list as JSON. You can then use
                    it in your code, for example, when setting the{' '}
                    <code>User-Agent</code> header in an HTTP request.
                  </div>
                </>
              )
            },
            {
              question: 'How do I rotate User Agents in a Headless Browser?',
              answer: (
                <>
                  <div>
                    You can manually set the header in Puppeteer or Playwright
                    using a random string from this list. However, scaling a
                    Headless Browser infrastructure is complex.
                    {' '}<Link href='/'>Microlink API</Link>{' '}
                    runs a remote Headless Chrome instance for you, automatically
                    handling User Agent rotation, proxy management,
                    and browser fingerprinting so you never get blocked.
                  </div>
                </>
              )
            },
            {
              question: 'Does this list include Mobile User Agents?',
              answer: (
                <>
                  <div>
                    Yes. The list distinguishes between Desktop (Windows, macOS, Linux)
                    and Mobile (Android, iOS) strings. Using a Mobile User Agent is
                    often effective for scraping simpler HTML versions of
                    complex websites or testing responsive designs.
                  </div>
                </>
              )
            },
            {
              question: 'Is there an API for this list?',
              answer: (
                <>
                  <div>
                    Yes. You can fetch the full, up-to-date database programmatically at GET{' '}
                    <Link href='/user-agents.json'>
                      microlink.io/user-agents.json
                    </Link>
                    . It's CORS-enabled and ready for direct integration into your frontend or backend logic.
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
    </DotsBackground>
  )
}

export default UserAgentsPage
