import CliBanner from 'components/pages/home/cli-banner'
import GradualBlur from 'components/pages/home/gradual-blur'
import Hero from 'components/pages/home/hero'
import { getFaqQuestions } from 'components/pages/home/faqs'
import Meta from 'components/elements/Meta/Meta'
import Layout from 'components/patterns/Layout'
import LazyRender from 'components/elements/IntersectionObserver'
import { CurrencyProvider } from 'components/hook/use-currency'
import toPlainText from 'components/patterns/Faq/to-plain-text'
import React, { lazy, Suspense } from 'react'

const Products = lazy(() => import('components/pages/home/products'))
const Examples = lazy(() => import('components/pages/home/examples'))
const Analytics = lazy(() => import('components/pages/home/analytics'))
const Pricing = lazy(() => import('components/pages/home/pricing'))
const Production = lazy(() => import('components/pages/home/production'))
const OpenSource = lazy(() => import('components/pages/home/open-source'))
const Faqs = lazy(() => import('components/pages/home/faqs'))

const NEAR_VIEWPORT = { rootMargin: '25% 0px' }

const Deferred = ({ minHeight, children }) => (
  <LazyRender
    options={NEAR_VIEWPORT}
    placeholder={() => <div aria-hidden style={{ minHeight }} />}
    onView={() => (
      <Suspense fallback={<div aria-hidden style={{ minHeight }} />}>
        {children}
      </Suspense>
    )}
  />
)

export const Head = () => {
  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Microlink',
    alternateName: ['Microlink.io', 'Microlink API', 'Microlink HQ'],
    operatingSystem: 'Any',
    applicationCategory: ['DeveloperApplication', 'WebApplication'],
    url: 'https://microlink.io',
    image: 'https://cdn.microlink.io/logo/logo.png',
    description:
      'A single API for turning any URL into data. Built for apps & agents. Powered by real browsers.',
    softwareHelp: 'https://microlink.io/docs',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR'
    },
    author: {
      '@type': 'Organization',
      name: 'Microlink',
      url: 'https://microlink.io'
    },
    sameAs: ['https://github.com/microlinkhq', 'https://x.com/microlinkhq']
  })

  const faqStructuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://microlink.io/#faq',
    url: 'https://microlink.io',
    mainEntity: getFaqQuestions().map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: toPlainText(answer)
      }
    }))
  })

  return (
    <>
      <Meta noSuffix />
      <script type='application/ld+json'>{structuredData}</script>
      <script type='application/ld+json'>{faqStructuredData}</script>
    </>
  )
}

const HomePage = () => {
  return (
    <CurrencyProvider>
      <Layout>
        <Hero />
        <CliBanner />
        <Deferred minHeight='80vh'>
          <Products />
        </Deferred>
        <Deferred minHeight='40vh'>
          <Examples />
        </Deferred>
        <Deferred minHeight='30vh'>
          <Analytics />
        </Deferred>
        <Deferred minHeight='50vh'>
          <Pricing />
        </Deferred>
        <Deferred minHeight='30vh'>
          <Production />
        </Deferred>
        <Deferred minHeight='40vh'>
          <OpenSource />
        </Deferred>
        <Deferred minHeight='40vh'>
          <Faqs />
        </Deferred>
        <GradualBlur />
      </Layout>
    </CurrencyProvider>
  )
}

export default HomePage
