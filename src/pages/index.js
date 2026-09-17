import GradualBlur from 'components/pages/home/gradual-blur'
import Hero from 'components/pages/home/hero'
import { getFaqQuestions } from 'components/pages/home/faqs'
import Meta from 'components/elements/Meta/Meta'
import Layout from 'components/patterns/Layout'
import LazyRender from 'components/elements/IntersectionObserver'
import { CurrencyProvider } from 'components/hook/use-currency'
import toPlainText from 'components/patterns/Faq/to-plain-text'
import React, { lazy, Suspense, useEffect, useState } from 'react'

const Products = lazy(() => import('components/pages/home/products'))
const CliBanner = lazy(() => import('components/pages/home/cli-banner'))
const Examples = lazy(() => import('components/pages/home/examples'))
const Analytics = lazy(() => import('components/pages/home/analytics'))
const Pricing = lazy(() => import('components/pages/home/pricing'))
const Production = lazy(() => import('components/pages/home/production'))
const OpenSource = lazy(() => import('components/pages/home/open-source'))
const Faqs = lazy(() => import('components/pages/home/faqs'))

const NEAR_VIEWPORT = { rootMargin: '25% 0px' }

const Placeholder = ({ minHeight }) => <div aria-hidden style={{ minHeight }} />

const useHashUnlock = () => {
  const [hash, setHash] = useState('')

  useEffect(() => {
    const sync = () => setHash(window.location.hash)
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => {
    if (!hash) return undefined

    let id
    try {
      id = decodeURIComponent(hash.slice(1))
    } catch {
      return undefined
    }
    if (!id) return undefined

    let tries = 0
    let lastTop = null
    let lastHeight = null
    let stable = 0
    const timer = window.setInterval(() => {
      tries += 1
      const el = document.getElementById(id)
      if (!el) {
        if (tries > 80) window.clearInterval(timer)
        return
      }
      el.scrollIntoView()
      const top = el.getBoundingClientRect().top + window.scrollY
      const height = document.documentElement.scrollHeight
      const topStable = lastTop !== null && Math.abs(top - lastTop) < 2
      const heightStable =
        lastHeight !== null && Math.abs(height - lastHeight) < 2
      if (topStable && heightStable) {
        stable += 1
        if (stable >= 4) window.clearInterval(timer)
      } else {
        stable = 0
      }
      lastTop = top
      lastHeight = height
      if (tries > 80) window.clearInterval(timer)
    }, 100)

    return () => window.clearInterval(timer)
  }, [hash])

  return Boolean(hash)
}

const Deferred = ({ minHeight, force, children }) => {
  if (force) {
    return (
      <Suspense fallback={<Placeholder minHeight={minHeight} />}>
        {children}
      </Suspense>
    )
  }

  return (
    <LazyRender
      options={NEAR_VIEWPORT}
      placeholder={() => <Placeholder minHeight={minHeight} />}
      onView={() => (
        <Suspense fallback={<Placeholder minHeight={minHeight} />}>
          {children}
        </Suspense>
      )}
    />
  )
}

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
  const forceDeferred = useHashUnlock()

  return (
    <CurrencyProvider>
      <Layout toolbarAnimated>
        <Hero />
        <Deferred force={forceDeferred} minHeight='80vh'>
          <Products />
        </Deferred>
        <Deferred force={forceDeferred} minHeight='60vh'>
          <CliBanner />
        </Deferred>
        <Deferred force={forceDeferred} minHeight='40vh'>
          <Examples />
        </Deferred>
        <Deferred force={forceDeferred} minHeight='30vh'>
          <Analytics />
        </Deferred>
        <Deferred force={forceDeferred} minHeight='50vh'>
          <Pricing />
        </Deferred>
        <Deferred force={forceDeferred} minHeight='30vh'>
          <Production />
        </Deferred>
        <Deferred force={forceDeferred} minHeight='40vh'>
          <OpenSource />
        </Deferred>
        <Deferred force={forceDeferred} minHeight='40vh'>
          <Faqs />
        </Deferred>
        <GradualBlur />
      </Layout>
    </CurrencyProvider>
  )
}

export default HomePage
