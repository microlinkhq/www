import React from 'react'
import { describe, expect, test } from 'vitest'
import Checkout, {
  BUY_REDIRECT,
  buyCta
} from '../../../../src/components/patterns/Checkout'
import { renderMarkup } from '../../../utils/render-markup'

const hrefOf = markup => {
  const [, href] = markup.match(/href="([^"]+)"/)
  return new URL(href.replaceAll('&amp;', '&'))
}

describe('Checkout', () => {
  test('renders Buy when no label is passed', () => {
    const markup = renderMarkup(<Checkout />)
    expect(markup).toMatch(/>Buy</)
    expect(markup).not.toContain('Get Pro')
  })

  test('renders the caller label instead of Buy', () => {
    const markup = renderMarkup(<Checkout>Get Pro for $49/month</Checkout>)
    expect(markup).toContain('Get Pro for $49/month')
    expect(markup).not.toMatch(/>Buy</)
  })

  test('links to dashboard signup, then the buy dialog', () => {
    const url = hrefOf(renderMarkup(<Checkout />, { url: '/pricing' }))
    expect(url.origin).toBe('https://dashboard.microlink.io')
    expect(url.pathname).toBe('/signup')
    expect(url.searchParams.get('redirect')).toBe(BUY_REDIRECT)
    expect(BUY_REDIRECT).toBe('/plans/create')
  })

  test('carries the chosen volume into the buy dialog', () => {
    const url = hrefOf(
      renderMarkup(<Checkout requests={140000} />, { url: '/pricing' })
    )
    expect(url.search).toContain('redirect=/plans/create&requests=140000')
    expect(url.searchParams.get('redirect')).toBe(BUY_REDIRECT)
    expect(url.searchParams.get('requests')).toBe('140000')
  })

  test('drops the volume when it is not a positive integer', () => {
    ;[undefined, 0, -1, 1.5, '140000', NaN].forEach(requests => {
      const url = hrefOf(
        renderMarkup(<Checkout requests={requests} />, { url: '/pricing' })
      )
      expect(url.searchParams.has('requests')).toBe(false)
      expect(url.searchParams.get('redirect')).toBe(BUY_REDIRECT)
    })
  })

  test('defaults the cta to the page buy slot', () => {
    const url = hrefOf(renderMarkup(<Checkout />, { url: '/pricing' }))
    expect(url.searchParams.get('cta')).toBe('pricing:buy')
    expect(buyCta('/')).toBe('home:buy')
    expect(buyCta('/screenshot')).toBe('screenshot:buy')
  })

  test('keeps a caller cta', () => {
    const url = hrefOf(
      renderMarkup(<Checkout cta='embed-url:antibot' />, {
        url: '/tools/embed-url'
      })
    )
    expect(url.searchParams.get('cta')).toBe('embed-url:antibot')
  })
})
