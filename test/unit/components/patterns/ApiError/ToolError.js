import React from 'react'
import { describe, expect, test, vi } from 'vitest'
import { ToolError } from '../../../../../src/components/patterns/ApiError/ToolError'
import { renderMarkup } from '../../../../utils/render-markup'

vi.mock('components/hook/use-site-meta', () => ({
  useSiteMetadata: () => ({ canonicalUrl: 'https://microlink.io' })
}))

const noop = () => {}

const render = props =>
  renderMarkup(<ToolError onRetry={noop} source='tool' {...props} />, {
    url: '/tools/website-to-pdf'
  })

describe('ToolError', () => {
  test('a Pro-fixable error renders the upgrade prompt, not the error', () => {
    const markup = render({ error: { code: 'EPROXYNEEDED' } })
    expect(markup).toContain('This site blocks bots')
    expect(markup).toContain('Get Pro for')
    expect(markup).not.toContain('signup')
    expect(markup).not.toContain('Antibot detected')
    expect(markup).not.toMatch(/>Try again</)
  })

  test('a numeric 429 code is the rate-limit upgrade', () => {
    const markup = render({ error: { code: 429 } })
    expect(markup).toContain('Daily limit reached')
    expect(markup).not.toMatch(/>Try again</)
  })

  test('an HTTP 429 status with no code is the rate-limit upgrade', () => {
    const markup = render({ error: { statusCode: 429 } })
    expect(markup).toContain('Daily limit reached')
    expect(markup).not.toMatch(/>Try again</)
  })

  test('a keyed rate limit stays the error, not the anonymous upgrade', () => {
    const markup = render({ error: { code: 'ERATE', keyed: true } })
    expect(markup).toContain('Rate limit reached')
    expect(markup).toContain('Try again once it resets')
    expect(markup).not.toContain('Daily limit reached')
    expect(markup).not.toContain('Get Pro for')
  })

  test('a string ERATE status with no code is the rate-limit upgrade', () => {
    const markup = render({ error: { statusCode: 'ERATE' } })
    expect(markup).toContain('Daily limit reached')
    expect(markup).not.toMatch(/>Try again</)
  })

  test('an HTTP 429 status wins over another code', () => {
    const markup = render({
      error: { code: 'EPROXYNEEDED', statusCode: 429 }
    })
    expect(markup).toContain('Daily limit reached')
    expect(markup).not.toContain('This site blocks bots')
  })

  test('an upgrade error ignores the caller fallback and extra actions', () => {
    const markup = render({
      error: { code: 'EPROXYNEEDED' },
      fallback: 'Own fallback',
      children: <a href='https://example.com/report'>Report it</a>
    })
    expect(markup).toContain('This site blocks bots')
    expect(markup).not.toContain('Own fallback')
    expect(markup).not.toContain('Report it')
  })

  test('framed wraps an upgrade prompt', () => {
    const plain = render({ error: { code: 'ERATE' } })
    const framed = render({ error: { code: 'ERATE' }, framed: true })
    expect(framed.length).toBeGreaterThan(plain.length)
    expect(framed).toContain('Daily limit reached')
  })

  test('other errors render title, body and retry', () => {
    const markup = render({ error: { code: 'ETIMEOUT' } })
    expect(markup).toContain('Request timed out')
    expect(markup).toContain('The page took too long to respond.')
    expect(markup).toMatch(/>Try again</)
  })

  test('no retry when the code is not retryable', () => {
    expect(render({ error: { code: 'EUNREACHABLE' } })).not.toMatch(
      />Try again</
    )
  })

  test('no retry without a handler', () => {
    expect(
      render({ error: { code: 'ETIMEOUT' }, onRetry: undefined })
    ).not.toMatch(/>Try again</)
  })

  test('falls back to the caller copy, then the error message', () => {
    expect(
      render({ error: { code: 'EUNKNOWN', message: 'raw' }, fallback: 'Own' })
    ).toContain('Own')
    expect(render({ error: { code: 'EUNKNOWN', message: 'raw' } })).toContain(
      'raw'
    )
  })

  test('renders extra actions next to retry', () => {
    const markup = render({
      error: { code: 'ETIMEOUT' },
      children: <a href='https://example.com/report'>Report it</a>
    })
    expect(markup).toContain('Report it')
  })

  test('framed wraps the content in the bordered card', () => {
    const plain = render({ error: { code: 'ETIMEOUT' } })
    const framed = render({ error: { code: 'ETIMEOUT' }, framed: true })
    expect(framed.length).toBeGreaterThan(plain.length)
    expect(framed).toContain('Request timed out')
  })
})
