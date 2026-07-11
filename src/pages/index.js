import Analytics from 'components/pages/home/analytics'
import Faqs, { getFaqQuestions } from 'components/pages/home/faqs'
import Hero from 'components/pages/home/hero'
import Products from 'components/pages/home/products'
import Production from 'components/pages/home/production'
import Pricing from 'components/pages/home/pricing'
import Meta from 'components/elements/Meta/Meta'
import Layout from 'components/patterns/Layout'
import { CurrencyProvider } from 'components/hook/use-currency'
import toPlainText from 'components/patterns/Faq/to-plain-text'
import React from 'react'

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
      'Microlink is a web API that turns any link into screenshots, PDFs, clean text, and data, built for people and their AI agents.',
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
        <Products />
        <Analytics />
        <Pricing />
        <Production />
        <Faqs />
      </Layout>
    </CurrencyProvider>
  )
}

export default HomePage
