import Analytics from 'components/pages/home/analytics'
import Examples from 'components/pages/home/examples'
import Faqs, { getFaqQuestions } from 'components/pages/home/faqs'
import GradualBlur from 'components/pages/home/gradual-blur'
import Hero from 'components/pages/home/hero'
import OpenSource from 'components/pages/home/open-source'
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
      'A single API for turning any URL into data. Built for apps, agents, and AI. Powered by real browsers.',
    softwareHelp: 'https://microlink.io/docs',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR'
    },
    author: {
      '@type': 'Organization',
      '@id': 'https://microlink.io/#organization',
      name: 'Microlink',
      url: 'https://microlink.io'
    },
    sameAs: ['https://github.com/microlinkhq', 'https://x.com/microlinkhq']
  })

  const organizationStructuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://microlink.io/#organization',
    name: 'Microlink',
    alternateName: ['Microlink.io', 'Microlink HQ'],
    url: 'https://microlink.io',
    logo: {
      '@type': 'ImageObject',
      url: 'https://cdn.microlink.io/logo/logo.png'
    },
    description:
      'Microlink turns any URL into data: link previews, screenshots, PDFs, markdown and web scraping, powered by real browsers.',
    foundingDate: '2017',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'hello@microlink.io',
        url: 'https://microlink.io/contact',
        availableLanguage: ['English', 'Spanish']
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'hello@microlink.io',
        url: 'https://microlink.io/enterprise',
        availableLanguage: ['English', 'Spanish']
      },
      {
        '@type': 'ContactPoint',
        contactType: 'technical support',
        email: 'hello@microlink.io',
        url: 'https://microlink.io/docs/api/getting-started/overview',
        availableLanguage: ['English', 'Spanish']
      }
    ],
    sameAs: [
      'https://github.com/microlinkhq',
      'https://x.com/microlinkhq',
      'https://www.linkedin.com/company/microlinkhq'
    ]
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
      <script type='application/ld+json'>{organizationStructuredData}</script>
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
        <Examples />
        <Analytics />
        <Pricing />
        <Production />
        <OpenSource />
        <Faqs />
        <GradualBlur />
      </Layout>
    </CurrencyProvider>
  )
}

export default HomePage
