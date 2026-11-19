import React from 'react'

import { GradientText } from 'components/patterns/ProductStory/section'
import { Story } from 'story'

import { ProductPriceComparison } from './price-comparison'

const PROPS = {
  title: (
    <>
      More requests. <GradientText>Lower price.</GradientText>
    </>
  ),
  caption: 'Get 4.6× more requests for 38% less.',
  microlink: {
    cta: 'storybook:pricing',
    secondaryHref: '/screenshot',
    secondaryLabel: 'Explore the Screenshot API',
    items: ['Screenshots, PDF, metadata, previews, and remote\u00a0JS']
  },
  competitor: {
    name: 'Acme Shots',
    price: 79,
    quota: 10000,
    unit: 'screenshots',
    items: ['80 requests/minute cap', '$0.006 per extra screenshot'],
    source: 'https://example.com/pricing',
    checkedAt: '2026-05-12'
  },
  note: 'Enterprise clients cover the infrastructure cost, so the entry price stays low.'
}

const code = `
<ProductPriceComparison
  title='More requests. Lower price.'
  caption='Get 4.6× more requests for 38% less.'
  microlink={{ cta, secondaryHref, secondaryLabel, items }}
  competitor={{ name, price: 79, quota: 10000, unit: 'screenshots', items, source, checkedAt: '2026-05-12' }}
  note='…'
/>
`

const DecimalCompetitor = () => (
  <ProductPriceComparison
    {...PROPS}
    competitor={{
      ...PROPS.competitor,
      price: 59.99,
      quota: undefined,
      volume: '$1 per 10,000\u00a0hits',
      items: []
    }}
  />
)

export default {
  title: 'Patterns/ProductStory/PriceComparison'
}

export const Default = () => (
  <Story name='PriceComparison' code={code}>
    <ProductPriceComparison {...PROPS} />
  </Story>
)

export const DecimalPrice = () => (
  <Story name='PriceComparison (decimal price, usage pricing, no items)'>
    <DecimalCompetitor />
  </Story>
)
