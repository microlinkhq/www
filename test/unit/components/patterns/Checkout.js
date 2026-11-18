import React from 'react'
import { describe, expect, test, vi } from 'vitest'
import { colors } from '../../../../src/theme'
import Checkout, {
  checkoutButtonCss,
  loadingCss
} from '../../../../src/components/patterns/Checkout'
import { renderMarkup } from '../../../utils/render-markup'

vi.mock('components/hook/use-site-meta', () => ({
  useSiteMetadata: () => ({
    canonicalUrl: 'https://microlink.io',
    paymentApiKey: 'key',
    paymentEndpoint: 'https://api.microlink.io'
  })
}))

const plan = { planId: 'pro-1_625k-v4', canonicalUrl: 'https://microlink.io' }

describe('Checkout', () => {
  test('renders Buy when no label is passed', () => {
    const markup = renderMarkup(<Checkout {...plan} />)
    expect(markup).toMatch(/>Buy</)
    expect(markup).not.toContain('Get Pro')
  })

  test('renders the caller label instead of Buy', () => {
    const markup = renderMarkup(
      <Checkout {...plan}>Get Pro for $49/month</Checkout>
    )
    expect(markup).toContain('Get Pro for $49/month')
    expect(markup).not.toMatch(/>Buy</)
  })

  test('an unknown or omitted variant keeps the default background', () => {
    expect(loadingCss('featured')).toContain(colors.secondary)
    expect(loadingCss('default')).toContain(colors.link)
    expect(loadingCss('nope')).toContain(colors.link)
    expect(loadingCss()).toContain(colors.link)
  })

  test('loading styles follow the caller styles so the variant background wins', () => {
    const caller = 'width:100%'
    expect(checkoutButtonCss(caller, 'featured', false)).toBe(caller)
    const loading = checkoutButtonCss(caller, 'featured', true)
    expect(loading[0]).toBe(caller)
    expect(loading.at(-1)).toContain(colors.secondary)
  })
})
