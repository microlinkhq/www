import React from 'react'
import { describe, expect, test } from 'vitest'
import { ToolError } from '../../../../../src/components/patterns/ApiError/ToolError'
import { renderMarkup } from '../../../../utils/render-markup'

const noop = () => {}

const render = props =>
  renderMarkup(
    <ToolError onRetry={noop} source='tool' product='pdf' {...props} />,
    { url: '/tools/website-to-pdf' }
  )

describe('ToolError', () => {
  test('a key-fixable error renders the signup prompt, not the error', () => {
    const markup = render({ error: { code: 'EPROXYNEEDED' } })
    expect(markup).toContain('This site blocks bots')
    expect(markup).toMatch(/cta=tool:antibot/)
    expect(markup).not.toContain('Antibot detected')
    expect(markup).not.toMatch(/>Try again</)
  })

  test('the prompt uses the url carried by the error', () => {
    const markup = render({
      error: { code: 'EPROXYNEEDED', url: 'https://example.com/a' }
    })
    expect(markup).toContain('url%3Dhttps%253A%252F%252Fexample.com%252Fa')
  })

  test('an explicit url wins over the error url', () => {
    const markup = render({
      error: { code: 'ERATE', url: 'https://example.com/a' },
      url: 'https://example.com/b'
    })
    expect(markup).toContain('example.com%252Fb')
    expect(markup).not.toContain('example.com%252Fa')
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
