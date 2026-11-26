import { beforeEach, describe, expect, test, vi } from 'vitest'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import Microlink from '../../../../../src/components/patterns/Microlink/Microlink'

vi.mock('@microlink/react', () => ({
  default: props => {
    globalThis.__cardProps = props
    return null
  }
}))

vi.mock('components/hook/use-card-data', () => ({
  useCardData: (url, options) => {
    globalThis.__cardOptions = options
    return [globalThis.__card, () => {}]
  }
}))

const LIVE_URL = 'https://example.com/not-a-demo-link'

const cardFor = props => {
  const html = renderToStaticMarkup(<Microlink {...props} />)
  return { props: globalThis.__cardProps, html }
}

describe('Microlink card', () => {
  beforeEach(() => {
    globalThis.__cardProps = undefined
    globalThis.__card = { phase: 'loading' }
  })

  test('the SDK only draws the card, it never fetches', () => {
    for (const phase of ['loading', 'ready', 'idle']) {
      globalThis.__card = { phase, data: {} }
      const { props } = cardFor({ url: LIVE_URL, lazy: true })
      expect(props.fetchData).toBe(false)
      expect(props.lazy).toBe(false)
    }
  })

  test('shows the skeleton while the data loads', () => {
    const { props, html } = cardFor({ url: LIVE_URL })
    expect(props.loading).toBe(true)
    expect(html).toMatch(/^<div class="[^"]+"><\/div>$/)
    expect(globalThis.__cardOptions.enabled).toBe(true)
  })

  test('draws the fetched data, with the caller data on top', () => {
    globalThis.__card = { phase: 'ready', data: { title: 'live', url: 'u' } }
    const { props } = cardFor({ url: LIVE_URL, setData: { title: 'mine' } })
    expect(props.loading).toBeUndefined()
    expect(props.setData).toEqual({ title: 'mine', url: 'u' })
  })

  test('query props go to the fetch, the rest to the card', () => {
    cardFor({
      url: LIVE_URL,
      lazy: { rootMargin: '400px' },
      contrast: true,
      ttl: '1d',
      size: 'large'
    })
    expect(globalThis.__cardOptions).toMatchObject({
      lazy: { rootMargin: '400px' },
      contrast: true,
      ttl: '1d'
    })
    expect(globalThis.__cardOptions.size).toBeUndefined()
    expect(globalThis.__cardProps.size).toBe('large')
    expect(globalThis.__cardProps.contrast).toBe(true)
    expect(globalThis.__cardProps.ttl).toBeUndefined()
  })

  test('a failed request shows the link', () => {
    globalThis.__card = { phase: 'failed' }
    const { props, html } = cardFor({ url: LIVE_URL })
    expect(props).toBeUndefined()
    expect(html).toBe(`<a href="${LIVE_URL}">${LIVE_URL}</a>`)
  })

  test('a card with its data in hand never fetches and has no wrapper', () => {
    globalThis.__card = { phase: 'idle' }
    const { props, html } = cardFor({
      url: LIVE_URL,
      fetchData: false,
      setData: () => ({ title: 'x' })
    })
    expect(globalThis.__cardOptions.enabled).toBe(false)
    expect(props.loading).toBeUndefined()
    expect(props.setData).toEqual({ title: 'x' })
    expect(html).toBe('')
  })
})
