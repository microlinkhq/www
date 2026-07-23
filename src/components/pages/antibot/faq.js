import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import { Link } from 'components/elements/Link'

import { CodeInline } from 'components/markdown/CodeInline'

import Faq from 'components/patterns/Faq/Faq'
import {
  SECTION_MAX_WIDTH,
  SECTION_PX,
  SECTION_PY
} from 'components/patterns/FeatureStory'

export const FAQ_ITEMS = [
  {
    question: 'How does Microlink detect an antibot challenge?',
    text: 'Every HTTP response is inspected across five signals — headers, cookies, HTML, URL, and status code. Each provider leaves a distinct combination of fingerprints, like cf-mitigated: challenge for Cloudflare or status code 999 for LinkedIn. Checks run in priority order and the first match identifies the provider. The analysis is static and deterministic, designed to run on every request without becoming a bottleneck.',
    answer: (
      <>
        <div>
          Every HTTP response is inspected across five signals — headers,
          cookies, HTML, URL, and status code. Each provider leaves a distinct
          combination of fingerprints, like{' '}
          <CodeInline>cf-mitigated: challenge</CodeInline> for Cloudflare or
          status code <CodeInline>999</CodeInline> for LinkedIn.
        </div>
        <div>
          Checks run in priority order and the first match identifies the
          provider. The analysis is static and deterministic, designed to run on
          every request without becoming a bottleneck.
        </div>
      </>
    )
  },
  {
    question: 'Which providers can be detected?',
    text: 'More than 30 providers across three categories: antibot systems (Cloudflare, Akamai, DataDome, PerimeterX, Kasada, Imperva, AWS WAF, Vercel, and more), CAPTCHA vendors (reCAPTCHA, hCaptcha, Cloudflare Turnstile, FunCaptcha, GeeTest, Friendly Captcha), and platform-specific protection flows (LinkedIn, Reddit, Instagram, YouTube). Coverage keeps evolving — missing providers can be reported on GitHub.',
    answer: (
      <>
        <div>
          More than 30 providers across three categories: antibot systems
          (Cloudflare, Akamai, DataDome, PerimeterX, Kasada, Imperva,
          AWS&nbsp;WAF, Vercel, and more), CAPTCHA vendors (reCAPTCHA, hCaptcha,
          Cloudflare Turnstile, FunCaptcha, GeeTest, Friendly Captcha), and
          platform-specific protection flows (LinkedIn, Reddit, Instagram,
          YouTube).
        </div>
        <div>
          Coverage keeps evolving — missing providers can be{' '}
          <Link href='https://github.com/microlinkhq/is-antibot/issues/new?title=Request%20a%20provider'>
            reported on GitHub
          </Link>
          .
        </div>
      </>
    )
  },
  {
    question: 'Is the detection logic open source?',
    text: 'Yes. The detection layer is published as is-antibot on GitHub and npm. It performs static HTTP response analysis — no headless browser required — and works with any HTTP client, including fetch, got, axios, and undici. It does detection only: it tells you which provider blocked a request, not how to solve the challenge. The resolution paths live inside the Microlink API.',
    answer: (
      <>
        <div>
          Yes. The detection layer is published as{' '}
          <Link href='https://github.com/microlinkhq/is-antibot'>
            is-antibot
          </Link>{' '}
          on GitHub and npm. It performs static HTTP response analysis — no
          headless browser required — and works with any HTTP client, including{' '}
          <CodeInline>fetch</CodeInline>, <CodeInline>got</CodeInline>,{' '}
          <CodeInline>axios</CodeInline>, and <CodeInline>undici</CodeInline>.
        </div>
        <div>
          It does detection only: it tells you which provider blocked a request,
          not how to solve the challenge. The resolution paths live inside the
          Microlink API.
        </div>
      </>
    )
  },
  {
    question: 'What happens after a block is detected?',
    text: 'On Pro plans, the request is automatically routed through the resolution path that provider requires — rotating residential IPs, full browser rendering, retries. A response served through the proxy layer carries x-fetch-mode prefixed with proxy-. Without a Pro plan, the API returns EPROXYNEEDED, so a block is never silent.',
    answer: (
      <>
        <div>
          On <Link href='/pricing'>Pro plans</Link>, the request is
          automatically routed through the resolution path that provider
          requires — rotating residential IPs, full browser rendering, retries.
          A response served through the proxy layer carries{' '}
          <CodeInline>x-fetch-mode</CodeInline> prefixed with{' '}
          <CodeInline>proxy-</CodeInline>.
        </div>
        <div>
          Without a Pro plan, the API returns{' '}
          <CodeInline>EPROXYNEEDED</CodeInline>, so a block is never silent —
          see <Link href='/features/proxy'>how the proxy works</Link>.
        </div>
      </>
    )
  },
  {
    question: 'Does detection slow down my requests?',
    text: 'No. Detection is static response analysis — headers, cookies, HTML, URL, and status code are checked against known fingerprints without launching a browser or making extra network calls. The result is deterministic and fast, which is why it runs on every request that goes through the API.',
    answer: (
      <div>
        No. Detection is static response analysis — headers, cookies, HTML, URL,
        and status code are checked against known fingerprints without launching
        a browser or making extra network calls. The result is deterministic and
        fast, which is why it runs on every request that goes through the API.
      </div>
    )
  }
]

export const FaqSection = () => (
  <Box
    css={theme({
      bg: 'pinky',
      borderTop: 1,
      borderTopColor: 'pinkest',
      width: '100%'
    })}
  >
    <Box css={theme({ maxWidth: SECTION_MAX_WIDTH, mx: 'auto' })}>
      <Faq
        css={theme({
          py: SECTION_PY,
          px: SECTION_PX
        })}
        questions={FAQ_ITEMS}
      />
    </Box>
  </Box>
)
