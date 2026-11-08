import React from 'react'
import { describe, expect, test } from 'vitest'
import {
  SignupPrompt,
  hasSignupPrompt
} from '../../../../../src/components/patterns/ApiError/SignupPrompt'
import {
  FREE_PLAN_REQUESTS_PER_DAY,
  KEYLESS_REQUESTS_PER_DAY
} from '../../../../../src/helpers/free-tier'
import { renderMarkup } from '../../../../utils/render-markup'

const render = code =>
  renderMarkup(<SignupPrompt code={code} source='embed-url' />, {
    url: '/tools/embed-url'
  })

describe('SignupPrompt', () => {
  test('covers the errors a free API key fixes, nothing else', () => {
    expect(hasSignupPrompt('EPROXYNEEDED')).toBe(true)
    expect(hasSignupPrompt('ERATE')).toBe(true)
    expect(hasSignupPrompt('ETIMEOUT')).toBe(false)
    expect(hasSignupPrompt('EFATAL')).toBe(false)
    expect(hasSignupPrompt(undefined)).toBe(false)
    expect(hasSignupPrompt('toString')).toBe(false)
  })

  test('antibot prompt links to signup, tracked under the source', () => {
    const markup = render('EPROXYNEEDED')
    expect(markup).toContain('This site blocks bots')
    expect(markup).toContain('Get your free API key')
    expect(markup).toMatch(
      /href="https:\/\/dashboard\.microlink\.io\/signup\?[^"]*cta=embed-url:antibot/
    )
  })

  test('rate limit prompt states both daily limits', () => {
    const markup = render('ERATE')
    expect(markup).toContain('Daily limit reached')
    expect(markup).toContain(`${KEYLESS_REQUESTS_PER_DAY} anonymous requests`)
    expect(markup).toContain(`${FREE_PLAN_REQUESTS_PER_DAY} a day`)
    expect(markup).toMatch(/cta=embed-url:rate-limit/)
  })

  test('lands the visitor in the product playground with the url', () => {
    const markup = renderMarkup(
      <SignupPrompt
        code='EPROXYNEEDED'
        source='embed-url'
        product='embed'
        url='https://www.nytimes.com/a.html'
      />,
      { url: '/tools/embed-url' }
    )
    const href = markup.match(/href="([^"]+)"/)[1].replace(/&amp;/g, '&')
    const redirect = new URL(href).searchParams.get('redirect')
    expect(redirect).toBe(
      '/playground?product=embed&url=https%3A%2F%2Fwww.nytimes.com%2Fa.html'
    )
    const target = new URL(redirect, 'https://dashboard.microlink.io')
    expect(target.searchParams.get('url')).toBe(
      'https://www.nytimes.com/a.html'
    )
  })

  test('without a url it opens the product playground', () => {
    expect(
      renderMarkup(
        <SignupPrompt code='ERATE' source='sitemap' product='links' />,
        { url: '/tools/sitemap' }
      )
    ).toContain('redirect=/playground%3Fproduct%3Dlinks')
  })

  test('lists the free key facts', () => {
    expect(render('ERATE')).toContain('No credit card')
  })

  test('copy has no em dashes', () => {
    expect(render('EPROXYNEEDED') + render('ERATE')).not.toContain('—')
  })
})
