import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Meta from 'components/elements/Meta/Meta'

import { DashedGridOverlay } from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { Cta } from 'components/pages/security/cta'
import { Enterprise } from 'components/pages/security/enterprise'
import { FAQ_ITEMS, FaqSection } from 'components/pages/security/faq'
import { Hero } from 'components/pages/security/hero'
import { Isolation } from 'components/pages/security/isolation'
import { Privacy } from 'components/pages/security/privacy'
import { Sandbox } from 'components/pages/security/sandbox'
import { Ssrf } from 'components/pages/security/ssrf'
import { Why } from 'components/pages/security/why'

const SecurityFeaturePage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <Why />
      <Isolation />
      <Ssrf />
      <Sandbox />
      <Privacy />
      <Enterprise />
      <Cta />
      <FaqSection />
    </Box>
  </Layout>
)

export const Head = () => (
  <Meta
    title='Request Security: One Isolated Browser per Request'
    description='Every Microlink API request runs in its own incognito browser context — no shared cookies, caches, or profiles — with dual-layer SSRF protection that blocks private and reserved IP ranges before and during rendering. Enterprise adds dedicated hardware.'
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

export default SecurityFeaturePage
