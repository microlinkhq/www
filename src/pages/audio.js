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
import {
  ACCENT,
  TILE_BG,
  TIMINGS_ACCENT,
  HERO,
  TIMINGS,
  CAPABILITIES,
  PRICING_CAPTION,
  CTA,
  FAQ_CAPTION,
  FAQ_ITEMS,
  META
} from 'components/pages/audio/shared'

const FEATURES = [
  {
    title: 'Direct File URLs',
    description:
      'The response carries a playable audio URL rather than an embedded widget, so it can be streamed, transcribed or archived directly.'
  },
  {
    title: 'Transcription Ready',
    description:
      'You receive the media rather than the page hosting it, so the output drops straight into a speech-to-text pipeline with no scraping step.'
  },
  {
    title: 'One Shape, Every Platform',
    description:
      'Podcast hosts, music platforms, news sites and blogs all return the same response shape instead of a bespoke integration per provider.'
  },
  {
    title: 'Real Browser Detection',
    description:
      'Players that only mount after JavaScript runs are still found, because detection happens after the page has fully settled.'
  },
  {
    title: 'Metadata In The Same Call',
    description:
      'Request title, author and artwork alongside the audio and pay for a single render instead of several.'
  },
  {
    title: 'Residential Proxy Resolution',
    description:
      'Route hard targets through residential IPs to get past Cloudflare, DataDome and Akamai without maintaining a proxy pool yourself.'
  },
  {
    title: 'Edge Cached Responses',
    description:
      'Configurable TTL from 1 minute to 31 days. Cache hits are free, return instantly, and never boot a browser.'
  },
  {
    title: 'Enterprise-Grade Reliability',
    description:
      'Production-ready infrastructure with a 99.9% uptime SLA and guaranteed performance for business-critical media workflows.'
  },
  {
    title: 'Generous Free Tier',
    description:
      'Start immediately with 25 requests/day. No setup fees, no credit card, and pay-as-you-grow pricing that scales with your usage.'
  }
]

const REPOS = ['spotify-url-info', 'ffprobe', 'metascraper']

export const Head = () => (
  <Meta
    title={META.title}
    description={META.description}
    structured={productStructured({
      path: '/audio',
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

const AudioPage = () => (
  <Layout>
    <ProductHero {...HERO} />
    <ProductTimings accent={TIMINGS_ACCENT} {...TIMINGS} />
    <ProductCapabilities {...CAPABILITIES} accent={ACCENT} tileBg={TILE_BG} />
    <ProductPricing caption={PRICING_CAPTION} />
    <OpenSource
      repos={REPOS}
      accent={ACCENT}
      caption='The Microlink media pipeline is powered by battle-tested open source libraries used by thousands of developers worldwide. Our audio extraction API is built on an open source foundation: explore the code, contribute, or run it yourself.'
    />
    <Features
      css={theme({ px: 4, py: SECTION_VERTICAL_SPACING })}
      title={
        <Subhead css={theme({ width: '100%', textAlign: 'left' })}>
          Skip the player.{' '}
          <span
            css={{
              display: 'block',
              color: ACCENT,
              width: '100%',
              textAlign: 'left'
            }}
          >
            Get the audio.
          </span>
        </Subhead>
      }
      caption={
        <>
          No widget markup to reverse-engineer and no provider-specific
          integrations to maintain. Send a URL and get a playable file back via
          the <Link href='/docs/api/parameters/audio'>audio API</Link>.
        </>
      }
      features={FEATURES}
    />
    <ProductCta {...CTA} accent={ACCENT} />
    <ProductFaq caption={FAQ_CAPTION} questions={toFaqQuestions(FAQ_ITEMS)} />
  </Layout>
)

export default AudioPage
