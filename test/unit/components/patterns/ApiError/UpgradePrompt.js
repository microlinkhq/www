import React from 'react'
import { describe, expect, test, vi } from 'vitest'
import { PLANS } from '../../../../../src/components/elements/PricePicker'
import {
  ENTRY_PLAN,
  UpgradePrompt,
  hasUpgradePrompt,
  upgradeCodeFor
} from '../../../../../src/components/patterns/ApiError/UpgradePrompt'
import { KEYLESS_REQUESTS_PER_DAY } from '../../../../../src/helpers/free-tier'
import { renderMarkup } from '../../../../utils/render-markup'

vi.mock('components/hook/use-site-meta', () => ({
  useSiteMetadata: () => ({
    canonicalUrl: 'https://microlink.io',
    paymentApiKey: 'key',
    paymentEndpoint: 'https://api.microlink.io'
  })
}))

const render = code =>
  renderMarkup(<UpgradePrompt code={code} source='embed-url' />, {
    url: '/tools/embed-url'
  })

describe('UpgradePrompt', () => {
  test('covers the errors a Pro plan fixes, nothing else', () => {
    expect(hasUpgradePrompt('EPROXYNEEDED')).toBe(true)
    expect(hasUpgradePrompt('ERATE')).toBe(true)
    expect(hasUpgradePrompt('ETIMEOUT')).toBe(false)
    expect(hasUpgradePrompt('EFATAL')).toBe(false)
    expect(hasUpgradePrompt(undefined)).toBe(false)
    expect(hasUpgradePrompt('toString')).toBe(false)
  })

  test('maps rate limits by code or status to ERATE', () => {
    expect(upgradeCodeFor({ statusCode: 429 })).toBe('ERATE')
    expect(upgradeCodeFor({ statusCode: 'ERATE' })).toBe('ERATE')
    expect(upgradeCodeFor({ code: 429 })).toBe('ERATE')
    expect(upgradeCodeFor({ code: 'ERATE' })).toBe('ERATE')
    expect(upgradeCodeFor({ code: 'EPROXYNEEDED' })).toBe('EPROXYNEEDED')
    expect(upgradeCodeFor({ code: 'ETIMEOUT' })).toBeNull()
    expect(upgradeCodeFor(undefined)).toBeNull()
  })

  test('sells the cheapest Pro plan', () => {
    const prices = PLANS.map(plan => plan.monthlyPrice.USD)
    expect(ENTRY_PLAN.monthlyPrice.USD).toBe(Math.min(...prices))
    expect(ENTRY_PLAN.id).toBe('pro-1_625k-v4')
  })

  test('antibot prompt sends the visitor to checkout, not signup', () => {
    const markup = render('EPROXYNEEDED')
    expect(markup).toContain('This site blocks bots')
    expect(markup).toMatch(/<button[^>]*>Get Pro for \$49\/month<\/button>/)
    expect(markup).not.toContain('signup')
    expect(markup).not.toContain('free API key')
    expect(markup).not.toContain('No credit card')
  })

  test('rate limit prompt states the anonymous limit and the Pro quota', () => {
    const markup = render('ERATE')
    expect(markup).toContain('Daily limit reached')
    expect(markup).toContain(`${KEYLESS_REQUESTS_PER_DAY} anonymous requests`)
    expect(markup).toContain(`${ENTRY_PLAN.reqsPerMonth} requests a month`)
    expect(markup).toContain('Get Pro for')
  })

  test('lists the entry plan facts', () => {
    const markup = render('EPROXYNEEDED')
    expect(markup).toContain(`${ENTRY_PLAN.reqsPerMonth} requests/month`)
    expect(markup).toContain('Proxy included')
    expect(markup).toContain('Cancel anytime')
  })

  test('copy has no em dashes', () => {
    expect(render('EPROXYNEEDED') + render('ERATE')).not.toContain('—')
  })
})
