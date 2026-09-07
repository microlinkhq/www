import React from 'react'
import { SECTION_VERTICAL_SPACING, theme } from 'theme'

import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import OpenSource, { getRepoStars } from 'components/patterns/OpenSource'
import {
  ProductHero,
  ProductTimings,
  ProductCapabilities,
  ProductPricing,
  ProductCta,
  ProductFaq,
  Subhead,
  productStructured,
  toFaqQuestions
} from 'components/patterns/ProductStory'
import { FunctionCapabilitiesVisual } from 'components/pages/function/capabilities-visual'
import {
  ACCENT,
  TIMINGS_ACCENT,
  HERO,
  TIMINGS,
  CAPABILITIES,
  PRICING_CAPTION,
  CTA,
  FAQ_CAPTION,
  FAQ_ITEMS,
  META
} from 'components/pages/function/product-shared'

const FEATURES = [
  {
    title: 'Browser Optional',
    description:
      'A function that never reads page never starts Chrome. Plain compute stays fast and cheap; Puppeteer is there the moment you need it.'
  },
  {
    title: 'Full Puppeteer Access',
    description:
      'Clicks, waits, evaluation, screenshots of a subtree — the same page object you would use locally, without operating a browser fleet.'
  },
  {
    title: 'npm On The Fly',
    description:
      'require() any package. The runtime detects dependencies, installs them into the sandbox, and caches them for later runs.'
  },
  {
    title: 'Errors As Values',
    description:
      'A throw does not fail the HTTP request. isFulfilled tells you whether the function completed, and value carries the result or the error.'
  },
  {
    title: 'Execution Profiling',
    description:
      'Every response includes install, build, spawn, and run timings plus CPU and memory, so a slow function is diagnosable without extra tooling.'
  },
  {
    title: 'Residential Proxy Resolution',
    description:
      'Route hard targets through residential IPs to get past Cloudflare, DataDome and Akamai without maintaining a proxy pool yourself.'
  },
  {
    title: 'Edge Cached Responses',
    description:
      'Configurable TTL from 1 minute to 31 days. Cache hits are free, return instantly, and never run the sandbox again.'
  },
  {
    title: 'Enterprise-Grade Reliability',
    description:
      'Production-ready infrastructure with a 99.9% uptime SLA and guaranteed performance for business-critical automation workflows.'
  },
  {
    title: 'Generous Free Tier',
    description:
      'Start immediately with 25 requests/day. No setup fees, no credit card, and pay-as-you-grow pricing that scales with your usage.'
  }
]

const REPOS = ['function', 'browserless', 'mql']

export const Head = () => (
  <Meta
    title={META.title}
    description={META.description}
    structured={productStructured({
      path: '/function',
      name: META.structuredName,
      description: META.structuredDescription,
      keywords: META.keywords,
      about: META.about,
      stars: getRepoStars(REPOS[0]),
      starsRepo: REPOS[0],
      faqItems: FAQ_ITEMS
    })}
  />
)

const FunctionPage = () => (
  <Layout>
    <ProductHero {...HERO} accent={ACCENT} />
    <ProductTimings accent={TIMINGS_ACCENT} {...TIMINGS} />
    <ProductCapabilities
      {...CAPABILITIES}
      accent={ACCENT}
      visual={<FunctionCapabilitiesVisual />}
    />
    <ProductPricing caption={PRICING_CAPTION} />
    <OpenSource
      repos={REPOS}
      accent={ACCENT}
      caption='The Microlink function runtime is powered by battle-tested open source libraries used by thousands of developers worldwide. Our functions API is built on an open source foundation: explore the code, contribute, or run it yourself.'
    />
    <Features
      css={theme({ px: 4, py: SECTION_VERTICAL_SPACING })}
      title={
        <Subhead css={theme({ width: '100%', textAlign: 'left' })}>
          The browser is optional.{' '}
          <span
            css={{
              display: 'block',
              color: ACCENT,
              width: '100%',
              textAlign: 'left'
            }}
          >
            The value isn’t.
          </span>
        </Subhead>
      }
      caption={
        <>
          No Lambda bundle, no browser fleet, no server to babysit. Send a
          function and get the return value via the{' '}
          <Link href='/docs/api/parameters/function'>function API</Link>.
        </>
      }
      features={FEATURES}
    />
    <ProductCta {...CTA} accent={ACCENT} />
    <ProductFaq caption={FAQ_CAPTION} questions={toFaqQuestions(FAQ_ITEMS)} />
  </Layout>
)

export default FunctionPage
