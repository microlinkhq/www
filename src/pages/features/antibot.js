import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Meta from 'components/elements/Meta/Meta'

import { DashedGridOverlay } from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { CodeExample } from 'components/pages/antibot/code-example'
import { Cta } from 'components/pages/antibot/cta'
import { FAQ_ITEMS, FaqSection } from 'components/pages/antibot/faq'
import { Hero } from 'components/pages/antibot/hero'
import { HowItWorks } from 'components/pages/antibot/how-it-works'
import { Providers } from 'components/pages/antibot/providers'
import { Resolve } from 'components/pages/antibot/resolve'
import { Why } from 'components/pages/antibot/why'

const AntibotFeaturePage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <Why />
      <HowItWorks />
      <Providers />
      <CodeExample />
      <Resolve />
      <Cta />
      <FaqSection />
    </Box>
  </Layout>
)

export const Head = () => (
  <Meta
    title='Antibot Detection: Know Who Blocked Your Request'
    description='Detect antibot and CAPTCHA challenges from 30+ providers — Cloudflare, Akamai, DataDome, reCAPTCHA, hCaptcha, and more — on every HTTP response. Pro plans route detected blocks through automatic proxy resolution; the detection layer is open source as is-antibot.'
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map(({ question, text }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text
          }
        }))
      }
    ]}
  />
)

export default AntibotFeaturePage
