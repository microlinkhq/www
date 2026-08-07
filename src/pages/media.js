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
import { MediaCapabilitiesVisual } from 'components/pages/media/capabilities-visual'
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
} from 'components/pages/media/shared'

const FEATURES = [
  {
    title: 'Direct File URLs',
    description:
      'The response carries a playable media URL rather than an iframe or a widget, so you can render it, stream it or queue it for processing.'
  },
  {
    title: 'Dimensions And Duration',
    description:
      'Width, height, duration and media type arrive with the URL, so players can be laid out without a probe request or a layout shift.'
  },
  {
    title: 'Transcription Ready',
    description:
      'You receive the media rather than the page hosting it, so audio drops straight into a speech-to-text pipeline with no scraping step.'
  },
  {
    title: 'Real Browser Detection',
    description:
      'Players that only mount after JavaScript runs are still found, because detection happens after the page has fully settled.'
  },
  {
    title: 'Metadata In The Same Call',
    description:
      'Request title, description, artwork and poster image alongside the media and pay for a single render instead of several.'
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

const REPOS = ['youtube-dl-exec', 'spotify-url-info', 'ffprobe']

export const Head = () => (
  <Meta
    title={META.title}
    description={META.description}
    structured={productStructured({
      path: '/media',
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

const MediaPage = () => (
  <Layout>
    <ProductHero {...HERO} accent={ACCENT} />
    <ProductTimings accent={TIMINGS_ACCENT} {...TIMINGS} />
    <ProductCapabilities
      {...CAPABILITIES}
      accent={ACCENT}
      visual={<MediaCapabilitiesVisual />}
    />
    <ProductPricing caption={PRICING_CAPTION} />
    <OpenSource
      repos={REPOS}
      accent={ACCENT}
      caption='The Microlink media pipeline is powered by battle-tested open source libraries used by thousands of developers worldwide. Our media extraction API is built on an open source foundation: explore the code, contribute, or run it yourself.'
    />
    <Features
      css={theme({ px: 4, py: SECTION_VERTICAL_SPACING })}
      title={
        <Subhead css={theme({ width: '100%', textAlign: 'left' })}>
          Every player is different.{' '}
          <span
            css={{
              display: 'block',
              color: ACCENT,
              width: '100%',
              textAlign: 'left'
            }}
          >
            The file never is.
          </span>
        </Subhead>
      }
      caption={
        <>
          No player markup to reverse-engineer and no provider-specific
          integrations to maintain. Send a URL and get a playable file back via
          the <Link href='/docs/api/parameters/video'>video</Link> and{' '}
          <Link href='/docs/api/parameters/audio'>audio</Link> APIs.
        </>
      }
      features={FEATURES}
    />
    <ProductCta {...CTA} accent={ACCENT} />
    <ProductFaq caption={FAQ_CAPTION} questions={toFaqQuestions(FAQ_ITEMS)} />
  </Layout>
)

export default MediaPage
