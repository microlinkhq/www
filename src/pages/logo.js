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
import { LogoCapabilitiesVisual } from 'components/pages/logo/capabilities-visual'
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
} from 'components/pages/logo/shared'

const FEATURES = [
  {
    title: 'Three Detection Sources',
    description:
      'Page markup, the DNS BIMI record and the favicon are checked in order, so the best available asset wins and coverage never drops to zero.'
  },
  {
    title: 'Brand Palette Extraction',
    description:
      'Dominant colors arrive ordered by presence, plus background and foreground pairs picked for WCAG contrast — ready to theme UI with.'
  },
  {
    title: 'Complete Image Metadata',
    description:
      'Format, file size and exact dimensions ship with every logo, so layouts render without a probe request or a layout shift.'
  },
  {
    title: 'Hotlink-Ready Embedding',
    description:
      'One query parameter turns the response into the image itself, so the logo drops straight into an image tag with nothing to store.'
  },
  {
    title: 'Real Browser Detection',
    description:
      'Markup injected by JavaScript is still found, because detection happens after the page has fully rendered.'
  },
  {
    title: 'No HTML Required',
    description:
      'The DNS source resolves without touching the page, so a logo still comes back when a site is rate-limited or answers with a 403.'
  },
  {
    title: 'Edge Cached Responses',
    description:
      'Configurable TTL from 1 minute to 31 days. Cache hits are free, return instantly, and never boot a browser.'
  },
  {
    title: 'Enterprise-Grade Reliability',
    description:
      'Production-ready infrastructure with a 99.9% uptime SLA and guaranteed performance for business-critical brand pipelines.'
  },
  {
    title: 'Generous Free Tier',
    description:
      'Start immediately with 25 requests/day. No setup fees, no credit card, and pay-as-you-grow pricing that scales with your usage.'
  }
]

const REPOS = ['metascraper', 'unavatar', 'splashy']

export const Head = () => (
  <Meta
    title={META.title}
    description={META.description}
    structured={productStructured({
      path: '/logo',
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

const LogoPage = () => (
  <Layout>
    <ProductHero {...HERO} accent={ACCENT} />
    <ProductTimings accent={TIMINGS_ACCENT} {...TIMINGS} />
    <ProductCapabilities
      {...CAPABILITIES}
      accent={ACCENT}
      visual={<LogoCapabilitiesVisual />}
    />
    <ProductPricing caption={PRICING_CAPTION} />
    <OpenSource
      repos={REPOS}
      accent={ACCENT}
      caption='The Microlink logo pipeline is powered by battle-tested open source libraries used by thousands of developers worldwide. Our logo API is built on an open source foundation: explore the code, contribute, or run it yourself.'
    />
    <Features
      css={theme({ px: 4, py: SECTION_VERTICAL_SPACING })}
      title={
        <Subhead css={theme({ width: '100%', textAlign: 'left' })}>
          The web never standardized the logo.{' '}
          <span
            css={{
              display: 'block',
              color: ACCENT,
              width: '100%',
              textAlign: 'left'
            }}
          >
            We standardized finding it.
          </span>
        </Subhead>
      }
      caption={
        <>
          One request checks every markup convention, the DNS record and the
          favicon via the{' '}
          <Link href='/docs/api/parameters/meta'>metadata API</Link>, then
          returns the winner with its colors.
        </>
      }
      features={FEATURES}
    />
    <ProductCta {...CTA} accent={ACCENT} />
    <ProductFaq caption={FAQ_CAPTION} questions={toFaqQuestions(FAQ_ITEMS)} />
  </Layout>
)

export default LogoPage
