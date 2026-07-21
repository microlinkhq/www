import React from 'react'

import { layout, space, theme } from 'theme'

import { Link } from 'components/elements/Link'
import Terminal from 'components/elements/Terminal/Terminal'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Faq from 'components/patterns/Faq/Faq'

const UserAgentsFaq = () => (
  <Faq
    css={theme({ pt: 0, px: 0 })}
    questions={[
      {
        question:
          'Why is using the latest User Agent list critical for web scraping?',
        answer: (
          <>
            <div>
              <div>
                Browsers have aggressive release cycles. Rotating User Agents is
                critical for <b>web scraping</b> and <b>automation</b>.
              </div>
              <br />
              <div>
                By randomizing the User Agent header, you mimic organic traffic
                and reduce the risk of being blocked by{' '}
                <Link href='https://www.cloudflare.com/learning/ddos/glossary/web-application-firewall-waf/'>
                  WAFs
                </Link>{' '}
                (Web Application Firewalls) or anti-bot measures.
              </div>
            </div>
          </>
        )
      },
      {
        question: 'What can I use this user agent list for?',
        answer: (
          <div>
            Build robust web scraping, testing, and automation solutions. This
            comprehensive list supports:
            <Faq.List>
              <li>
                <strong>Web Scraping</strong>: Rotate user agents to avoid
                detection and access restricted content
              </li>
              <li>
                <strong>Browser Testing</strong>: Ensure compatibility across
                different browsers and devices
              </li>
              <li>
                <strong>Bot Development</strong>: Build sophisticated automation
                tools that mimic real user behavior
              </li>
              <li>
                <strong>SEO Monitoring</strong>: Test how search engines and
                crawlers see your website
              </li>
            </Faq.List>
            Whether you're building scraping tools, testing frameworks, or
            automation systems, our comprehensive list ensures you have the
            right user agents for any use case.
          </div>
        )
      },
      {
        question: 'How is the list of User Agents obtained?',
        answer: (
          <div>
            <div>
              The data comes from <b>multiple high-authority sources</b> to
              provide comprehensive user agent detection, then undergoes
              rigorous normalization to ensure reliability and quality:
            </div>
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
                : Our always up-to-date list of the{' '}
                <b>top 100 HTTP user agents</b> most used over the Internet.
              </li>
              <li>
                <Link href='https://github.com/arcjet/well-known-bots' logoIcon>
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
            Raw User Agent data is notoriously messy. Our pipeline transforms
            this "chaos" into production-ready JSON through:
            <Faq.List>
              <li>
                <b>Deduplication</b>: We identify and merge duplicate user
                agents while preserving the most accurate representations
              </li>
              <li>
                <b>Standardization</b>: Consistent formatting ensures
                compatibility across different systems and programming languages
              </li>
              <li>
                <b>Validation</b>: Filtering malformed strings that would
                trigger 403 Forbidden errors in{' '}
                <Link href='/blog/what-is-a-headless-browser'>
                  headless browsers
                </Link>
              </li>
              <li>
                <b>Categorization</b>: Intelligent classification separates
                bots, crawlers, browsers, and AI agents for targeted use cases
              </li>
            </Faq.List>
            <div>
              This rigorous process means you get battle-tested list of{' '}
              <b>popular User Agent strings</b> that just work, without the
              headaches of manual cleanup and validation.
            </div>
          </div>
        )
      },
      {
        question: 'How frequently is the User Agent list updated?',
        answer: (
          <>
            <div>
              The user agent list is <b>updated weekly</b> by fetching the
              latest data from reliable sources. The last update timestamp is
              displayed at the top of the page, and the data is refreshed as new
              user agents become available from these sources.
            </div>
            <div>
              Each update ensures you have access to the most common User
              Agents.
            </div>
          </>
        )
      },
      {
        question: 'How to consume the User Agent list?',
        answer: (
          <>
            <div>
              For rapid testing, you can use the <b>Copy JSON</b> icon in the
              terminal UI above to get the full array immediately.
            </div>
            <div>
              Or access the full list programmatically via our{' '}
              <Link
                href='https://microlink.io/user-agents.json'
                target='_blank'
                rel='noreferrer'
              >
                JSON API endpoint
              </Link>
            </div>
            <Terminal blinkCursor={false}>
              curl -L microlink.io/user-agents.json
            </Terminal>
            <div>
              It's <b>CORS-enabled</b> and ready for direct integration into any
              frontend or backend application, ensuring your project always has
              access to the most up-to-date User Agent strings.
            </div>
          </>
        )
      },
      {
        question: 'Best practices for using the list of User Agents',
        answer: (
          <>
            When using User Agents in your applications, follow these best
            practices:
            <div>
              <Faq.List>
                <li>
                  <strong>Rotate regularly</strong>: Change user agents
                  frequently to avoid detection patterns
                </li>
                <li>
                  <strong>Match device context</strong>: Use appropriate User
                  Agents for the target platform (mobile, desktop, crawler)
                </li>
                <li>
                  <strong>Respect rate limits</strong>: Combine User Agent
                  rotation with appropriate delays to avoid blocking
                </li>
                <li>
                  <strong>Test compatibility</strong>: Verify your applications
                  work with different browser User Agents
                </li>
              </Faq.List>
            </div>
            Our categorized list makes it easy to select the right User Agents
            for your specific use case.
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
              If you don’t want to manage that infrastructure, you can use the
              fully managed{' '}
              <Link href='https://microlink.io/docs/api/getting-started/overview'>
                Microlink API
              </Link>
              : It automatically handles proxy rotation, paywalls,{' '}
              <Link href='/blog/antibot-detection-at-scale'>bot detection</Link>
              , and restricted platforms such as major social networks, while
              scaling on demand. Pricing is pay-as-you-go and{' '}
              <Link href='https://microlink.io/pricing'>starts for free</Link>.
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
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>.
            </div>
          </>
        )
      }
    ]}
  />
)

export default UserAgentsFaq
