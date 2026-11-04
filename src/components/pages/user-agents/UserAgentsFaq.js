import React from 'react'

import { layout, space, theme } from 'theme'

import { Link } from 'components/elements/Link'
import Terminal from 'components/elements/Terminal/Terminal'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Faq from 'components/patterns/Faq/Faq'

import { USER_AGENTS_COUNT } from './counts'

const PUPPETEER_EXAMPLE = `import puppeteer from 'puppeteer'

const ENDPOINT = 'https://microlink.io/user-agents.json'
const { user } = await fetch(ENDPOINT).then(res => res.json())
const userAgent = user[Math.floor(Math.random() * user.length)]

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setUserAgent({ userAgent })
await page.goto('https://example.com')
await browser.close()
`

let questions

export const getFaqQuestions = () => {
  if (questions) return questions
  questions = [
    {
      question: 'What is in the list?',
      answer: (
        <div>
          Three lists, one per tab:
          <Faq.List>
            <li>
              <b>User</b>: the {USER_AGENTS_COUNT.user} most common browser user
              agents, as full strings you can send in the{' '}
              <code>User-Agent</code> header.
            </li>
            <li>
              <b>AI</b>: the names of {USER_AGENTS_COUNT.ai} AI crawlers and
              assistants, such as <code>gptbot</code>, <code>claudebot</code>{' '}
              and <code>perplexitybot</code>.
            </li>
            <li>
              <b>Crawler</b>: the names of {USER_AGENTS_COUNT.crawler} other
              bots, from search engines and SEO tools to uptime monitors and
              HTTP libraries, such as <code>googlebot</code>,{' '}
              <code>ahrefsbot</code> and <code>uptimerobot</code>.
            </li>
          </Faq.List>
          Bot names are lowercase, taken from the product name in each bot's
          user agent.
        </div>
      )
    },
    {
      question: 'Why use an up-to-date user agent?',
      answer: (
        <>
          <div>
            Chrome and Firefox ship new major versions every few weeks. A
            scraper that still sends a version from last year stands out, and{' '}
            <Link href='https://www.cloudflare.com/learning/ddos/glossary/web-application-firewall-waf/'>
              WAFs
            </Link>{' '}
            and anti-bot services can block it before the page loads.
          </div>
          <div>
            The user agent is only one signal. Those services also compare it
            with the rest of the request, like the client hints headers and the{' '}
            <Link href='https://github.com/Kikobeats/https-tls' logoIcon>
              TLS fingerprint
            </Link>
            , so a Chrome user agent sent from a plain HTTP library can still be
            caught.
          </div>
        </>
      )
    },
    {
      question: 'What can I use this list for?',
      answer: (
        <div>
          <Faq.List>
            <li>
              <b>Scraping and automation</b>: send the user agent of a browser
              people actually use.
            </li>
            <li>
              <b>Testing</b>: check how your site responds to each browser and
              device.
            </li>
            <li>
              <b>Bot management</b>: see which AI crawlers exist before you
              decide which ones to allow or block.
            </li>
            <li>
              <b>Analytics</b>: tell crawler visits apart from human ones in
              your logs.
            </li>
          </Faq.List>
        </div>
      )
    },
    {
      question: 'Where does the data come from?',
      answer: (
        <>
          <div>
            The browser list comes from{' '}
            <Link
              href='https://github.com/microlinkhq/top-user-agents'
              logoIcon
            >
              top-user-agents
            </Link>
            , which ranks the user agents that reach the Microlink API and{' '}
            <Link href='https://unavatar.io'>unavatar.io</Link>. Each client
            counts once a day, so one busy script can't push its user agent to
            the top. Bots, HTTP libraries, Electron apps, in-app webviews and
            malformed strings are dropped.
          </div>
          <div>
            The AI and crawler names are merged from three public directories:
          </div>
          <Faq.List>
            <li>
              <Link
                href='https://github.com/microlinkhq/cloudflare-bot-directory'
                logoIcon
              >
                Cloudflare Bot Directory
              </Link>
              : an unofficial package of the bots Cloudflare Radar has verified.
            </li>
            <li>
              <Link href='https://github.com/arcjet/well-known-bots' logoIcon>
                Well-Known Bots
              </Link>
              : Arcjet's catalog of known bots.
            </li>
            <li>
              <Link
                href='https://github.com/monperrus/crawler-user-agents'
                logoIcon
              >
                Crawler User Agents
              </Link>
              : a community list of crawler user agents.
            </li>
          </Faq.List>
          <div>
            A bot goes in the AI list when a source files it under AI.
            Duplicates are merged without regard to case, and a name in the AI
            list doesn't appear again under Crawler.
          </div>
        </>
      )
    },
    {
      question: 'How often is the list updated?',
      answer: (
        <div>
          Every Tuesday, a job pulls the latest top-user-agents and Cloudflare
          data, and the date at the top of the page shows when that data was
          published. The Arcjet and community directories are read again each
          time the site is built.
        </div>
      )
    },
    {
      question: 'How do I use the list in my code?',
      answer: (
        <>
          <div>
            Use the copy button on the list to copy the tab you're on as JSON,
            or fetch all three lists from the{' '}
            <Link
              href='https://microlink.io/user-agents.json'
              target='_blank'
              rel='noreferrer'
            >
              JSON endpoint
            </Link>
            :
          </div>
          <Terminal blinkCursor={false}>
            curl -L microlink.io/user-agents.json
          </Terminal>
          <div>
            It returns an object with <code>user</code>, <code>ai</code> and{' '}
            <code>crawler</code> arrays, plus an <code>updatedAt</code>{' '}
            timestamp. CORS is open, so you can call it from a browser too.
          </div>
          <div>To give a Puppeteer session a random browser user agent:</div>
          <CodeEditor
            title='puppeteer.mjs'
            language='javascript'
            css={theme({
              width: [`calc(100vw - ${space[4]})`, layout.small]
            })}
          >
            {PUPPETEER_EXAMPLE}
          </CodeEditor>
          <div>
            Pick a new user agent per session rather than per request, and pace
            your requests. A session that changes browser halfway through looks
            more suspicious than one that never changes.
          </div>
          <div>
            If you'd rather not run that yourself, the{' '}
            <Link href='https://microlink.io/docs/api/getting-started/overview'>
              Microlink API
            </Link>{' '}
            handles proxy rotation,{' '}
            <Link href='/blog/antibot-detection-at-scale'>bot detection</Link>{' '}
            and hard-to-reach platforms such as the major social networks for
            you. Plans{' '}
            <Link href='https://microlink.io/pricing'>start for free</Link>.
          </div>
        </>
      )
    },
    {
      question: 'Other questions?',
      answer: (
        <div>
          Write to us at{' '}
          <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>.
        </div>
      )
    }
  ]
  return questions
}

const UserAgentsFaq = () => (
  <Faq css={theme({ pt: 0, px: 0 })} questions={getFaqQuestions()} />
)

export default UserAgentsFaq
