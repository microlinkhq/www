import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerLocation } from '@gatsbyjs/reach-router'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { describe, expect, test, vi } from 'vitest'

import {
  MICROLINK_PLAN,
  ProductPriceComparison,
  formatCheckedAt,
  formatPerThousand,
  formatPrice,
  microlinkFacts,
  microlinkPlan,
  missing
} from '../../../../../src/components/patterns/ProductStory/price-comparison'
import { DEFAULT_PLAN } from '../../../../../src/helpers/pro-plans'
import themeSpec from '../../../../../src/theme'

vi.mock('helpers/template', () => ({ template: value => value }))

const PROPS = {
  title: 'More requests. Lower price.',
  caption: 'Get more for less.',
  microlink: {
    cta: 'alternative-acme:pricing',
    secondaryHref: '/screenshot',
    secondaryLabel: 'Explore the Screenshot API',
    items: ['No requests-per-minute cap']
  },
  competitor: {
    name: 'Acme',
    price: 59.99,
    volume: '30,000 snapshots/month',
    items: ['80 requests per minute cap'],
    source: 'https://www.acme.com/pricing',
    checkedAt: '2026-05-12'
  },
  note: 'Prices in USD.'
}

const render = element => {
  const sheet = new ServerStyleSheet()
  try {
    const html = renderToStaticMarkup(
      sheet.collectStyles(
        <ServerLocation url='/'>
          <ThemeProvider theme={themeSpec}>{element}</ThemeProvider>
        </ServerLocation>
      )
    )
    return { html, css: sheet.getStyleTags() }
  } finally {
    sheet.seal()
  }
}

describe('MICROLINK_PLAN', () => {
  test('keeps cents on per-1,000 prices when the plan price has cents', () => {
    expect(formatPerThousand(59.99, 30000, 'snapshots')).toBe(
      '$2.00 per 1,000 snapshots'
    )
    expect(formatPerThousand(49, 49000, 'requests')).toBe(
      '$1 per 1,000 requests'
    )
  })

  test('is the entry Pro plan, so every page quotes the real price', () => {
    expect(MICROLINK_PLAN.price).toBe(DEFAULT_PLAN.monthlyPrice.USD)
    expect(MICROLINK_PLAN.volume).toBe(
      `${DEFAULT_PLAN.reqsPerMonthTotal.toLocaleString(
        'en-US'
      )}\u00a0requests/month`
    )
  })
})

describe('formatPrice', () => {
  test.each([
    [49, '$49'],
    [59.99, '$59.99'],
    [5, '$5'],
    [1199, '$1,199']
  ])('%s → %s', (amount, expected) => {
    expect(formatPrice(amount)).toBe(expected)
  })
})

describe('currency', () => {
  test('formats euros with the euro sign', () => {
    expect(formatPrice(59, 'EUR')).toBe('€59')
  })

  test('quotes the Microlink plan in the same currency as the competitor', () => {
    expect(microlinkPlan('EUR').price).toBe(DEFAULT_PLAN.monthlyPrice.EUR)
    const { html } = render(
      <ProductPriceComparison
        {...PROPS}
        currency='EUR'
        competitor={{ ...PROPS.competitor, price: 59 }}
      />
    )
    expect(html).toContain(`€${DEFAULT_PLAN.monthlyPrice.EUR}<`)
    expect(html).toContain('€59<')
    expect(html).not.toMatch(/\$\d/)
  })
})

describe('microlinkFacts', () => {
  test('derives the per-1,000 price from the plan in each currency', () => {
    expect(microlinkFacts().pricePerThousand).toBe('$1.07 per 1,000 requests')
    expect(microlinkFacts('EUR').pricePerThousand).toBe(
      '€0.85 per 1,000 requests'
    )
  })

  test('states the paid-plan throttle the way the rate-limit docs do', () => {
    expect(microlinkFacts().noRateCap).toBe('No rate limit on paid plans')
  })
})

describe('formatPerThousand', () => {
  test('rounds to cents in the given currency', () => {
    expect(formatPerThousand(35, 10000, 'screenshots', 'USD')).toBe(
      '$3.50 per 1,000 screenshots'
    )
    expect(formatPerThousand(69, 40000, 'credits', 'USD')).toBe(
      '$1.73 per 1,000 credits'
    )
    expect(formatPerThousand(59, 20000, 'screenshots', 'EUR')).toBe(
      '€2.95 per 1,000 screenshots'
    )
  })
})

describe('formatCheckedAt', () => {
  test('shows month and year, independent of the local timezone', () => {
    expect(formatCheckedAt('2026-05-01')).toBe('May 2026')
    expect(formatCheckedAt('2026-12-31')).toBe('December 2026')
  })
})

describe('ProductPriceComparison', () => {
  test('puts the featured Microlink plan first and the competitor second', () => {
    const { html } = render(<ProductPriceComparison {...PROPS} />)
    const plans = [
      ...html.matchAll(/<article[^>]*data-featured="(\w+)"[^>]*>/g)
    ].map(([, featured]) => featured)

    expect(plans).toEqual(['true', 'false'])
    expect(html.indexOf('Microlink pricing')).toBeLessThan(
      html.indexOf('Acme pricing')
    )
  })

  test('shows both prices and volumes', () => {
    const { html } = render(<ProductPriceComparison {...PROPS} />)
    expect(html).toContain(formatPrice(MICROLINK_PLAN.price))
    expect(html).toContain('$59.99')
    expect(html).toContain('30,000 snapshots/month')
  })

  test('cites where and when the competitor price was read', () => {
    const { html } = render(<ProductPriceComparison {...PROPS} />)
    expect(html).toContain('href="https://www.acme.com/pricing"')
    expect(html).toMatch(/>acme\.com</)
    expect(html).toContain('dateTime="2026-05-12"')
    expect(html).toMatch(/<time[^>]*>May 2026<\/time>/)
  })

  test('omits the product link when the Microlink plan has no href for it', () => {
    const { html } = render(
      <ProductPriceComparison
        {...PROPS}
        microlink={{
          ...PROPS.microlink,
          secondaryHref: undefined,
          secondaryLabel: 'Explore the Screenshot API'
        }}
      />
    )
    expect(html).toContain('Get your free API key')
    expect(html).not.toContain('Explore the Screenshot API')
  })

  test('offers the signup as a button and the product as a link, like the home pricing', () => {
    const { html } = render(<ProductPriceComparison {...PROPS} />)
    expect(html).toMatch(
      /<a[^>]*href="[^"]*signup[^"]*cta=alternative-acme:pricing[^"]*"[^>]*>Get your free API key<\/a>/
    )
    expect(html).not.toMatch(/<button/)
    expect(html).toContain('Explore the Screenshot API')
    expect(html).toContain('Prices in USD.')
  })

  test('keeps footer links on one line', () => {
    const { css } = render(<ProductPriceComparison {...PROPS} />)
    expect(css).toMatch(/white-space:nowrap/)
  })

  test('lists every Microlink fact, in the same order, on every page', () => {
    const { html } = render(<ProductPriceComparison {...PROPS} />)
    const facts = Object.values(microlinkFacts())
    const positions = facts.map(fact =>
      html.indexOf(fact.replace(/&/g, '&amp;'))
    )
    positions.forEach(position => expect(position).toBeGreaterThan(-1))
    expect([...positions].sort((a, b) => a - b)).toEqual(positions)
    const pageItem = html.indexOf('No requests-per-minute cap')
    expect(pageItem).toBeGreaterThan(positions[0])
    expect(pageItem).toBeLessThan(positions[1])
  })

  test('derives volume and price per 1,000 from a numeric quota', () => {
    const { html } = render(
      <ProductPriceComparison
        {...PROPS}
        competitor={{
          ...PROPS.competitor,
          volume: undefined,
          price: 35,
          quota: 10000,
          unit: 'screenshots'
        }}
      />
    )
    expect(html).toContain('10,000\u00a0screenshots/month')
    expect(html).toContain('$3.50 per 1,000 screenshots')
    expect(html.indexOf('$3.50 per 1,000 screenshots')).toBeLessThan(
      html.indexOf('80 requests per minute cap')
    )
  })

  test('renders without competitor items or a note', () => {
    const { html } = render(
      <ProductPriceComparison
        {...PROPS}
        note={undefined}
        competitor={{ ...PROPS.competitor, items: [] }}
      />
    )
    expect(html.match(/<ul/g)).toHaveLength(1)
    expect(html.match(/<li[\s>]/g)).toHaveLength(
      PROPS.microlink.items.length + Object.keys(microlinkFacts()).length
    )
    expect(html).not.toContain('Prices in USD.')
  })

  test('marks competitor limitations with a minus instead of a check', () => {
    const { html } = render(
      <ProductPriceComparison
        {...PROPS}
        competitor={{
          ...PROPS.competitor,
          items: [missing('No free plan'), 'S3 upload']
        }}
      />
    )
    const limitation = html.slice(0, html.indexOf('No free plan'))
    const lastIcon = limitation.lastIndexOf('<svg')
    expect(limitation.slice(lastIcon)).toMatch(
      /<line[^>]*x1="5"[^>]*y1="12"[^>]*x2="19"/
    )
    expect(limitation.slice(lastIcon)).not.toContain('polyline')
    const feature = html.slice(0, html.indexOf('S3 upload'))
    expect(feature.slice(feature.lastIndexOf('<svg'))).toContain('polyline')
  })

  test('keeps "Price checked" with its date', () => {
    const { html } = render(<ProductPriceComparison {...PROPS} />)
    expect(html).toMatch(/>Price checked <time/)
  })
})
