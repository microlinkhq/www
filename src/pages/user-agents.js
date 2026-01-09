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
    title='User Agents'
    description='Most common user-agents used on Internet'
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
              question: 'What is a user agent?',
              answer: (
                <>
                  <div>
                    A user agent is a string that a browser or application sends
                    to a server to identify itself. It typically includes
                    information about the browser type, operating system, and
                    hardware.
                  </div>
                </>
              )
            },
            {
              question: 'Why is this list useful?',
              answer: (
                <>
                  <div>
                    Having a curated list of common user agents is useful for
                    developers who need to emulate different browsers for
                    testing, web scraping, or security auditing.
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
              question: 'Is there an API for this list?',
              answer: (
                <>
                  <div>
                    Yes, you can access the full list in JSON format at{' '}
                    <Link href='/user-agents.json'>
                      microlink.io/user-agents.json
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
    </DotsBackground>
  )
}

export default UserAgentsPage
