import React from 'react'

import BuildVsBuy from 'components/pages/pricing/build-vs-buy'
import Capabilities from 'components/pages/pricing/capabilities'
import Clients from 'components/pages/pricing/clients'
import Comparison from 'components/pages/pricing/comparison'
import Cta from 'components/pages/pricing/cta'
import Faqs from 'components/pages/pricing/faqs'
import Hero from 'components/pages/pricing/hero'
import Plans from 'components/pages/pricing/plans'
import Testimonials from 'components/pages/pricing/testimonials'

import Meta from 'components/elements/Meta/Meta'
import { useSiteMetadata } from 'components/hook/use-site-meta'
import Layout from 'components/patterns/Layout'
import { PLANS } from 'components/elements/PricePicker'

export const Head = () => {
  const proOffers = PLANS.map(({ id, monthlyPrice, reqsPerMonth }) => ({
    '@type': 'Offer',
    sku: id,
    name: `Pro · ${reqsPerMonth} requests / month`,
    price: monthlyPrice.toFixed(2),
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: 'https://microlink.io/pricing',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: monthlyPrice.toFixed(2),
      priceCurrency: 'EUR',
      billingIncrement: 1,
      unitCode: 'MON',
      referenceQuantity: {
        '@type': 'QuantitativeValue',
        value: reqsPerMonth.replace(/,/g, ''),
        unitCode: 'C62'
      }
    }
  }))

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Microlink — Pricing',
    description:
      'Simple, predictable pricing for the Microlink browser API. Start free, scale to millions of requests, with custom Enterprise tiers when you need them.',
    brand: { '@type': 'Brand', name: 'Microlink' },
    image: 'https://cdn.microlink.io/logo/logo.png',
    url: 'https://microlink.io/pricing',
    offers: [
      {
        '@type': 'Offer',
        sku: 'free',
        name: 'Free · 50 requests / day',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: 'https://microlink.io/pricing'
      },
      ...proOffers,
      {
        '@type': 'Offer',
        sku: 'enterprise',
        name: 'Enterprise · custom volume',
        price: '500',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: 'https://microlink.io/enterprise'
      }
    ]
  }

  return (
    <Meta
      title='Pricing'
      description='Simple, predictable pricing for the Microlink browser API. Start free, scale to millions of requests, with custom Enterprise tiers when you need them.'
      structured={structuredData}
    />
  )
}

const PricingPage = () => {
  const { canonicalUrl, stripeKey, paymentEndpoint } = useSiteMetadata()

  return (
    <Layout>
      <Hero />
      <Plans
        canonicalUrl={canonicalUrl}
        stripeKey={stripeKey}
        apiEndpoint={paymentEndpoint}
      />
      <Comparison />
      <Capabilities />
      <BuildVsBuy />
      <Testimonials />
      <Clients />
      <Faqs />
      <Cta />
    </Layout>
  )
}

export default PricingPage
