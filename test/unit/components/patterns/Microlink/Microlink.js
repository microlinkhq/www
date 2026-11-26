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

vi.mock('components/hook/use-session-card', () => ({
  useSessionCard: (url, options) => {
    globalThis.__cardOptions = options
    return globalThis.__card
  }
}))

vi.mock('helpers/template', () => ({ template: value => value }))

vi.mock('helpers/demo-links', () => ({
  findDemoLinkByVariations: () => undefined
}))

const LIVE_URL = 'https://example.com/not-a-demo-link'

const cardFor = props => {
  const html = renderToStaticMarkup(<Microlink {...props} />)
  return { props: globalThis.__cardProps, html }
}

describe('Microlink card', () => {
  beforeEach(() => {
    globalThis.__cardProps = undefined
    globalThis.__card = { phase: 'pending' }
  })

  test('holds a live card on its skeleton until the visitor is known', () => {
    const { props } = cardFor({ url: LIVE_URL })
    expect(props.fetchData).toBe(false)
    expect(props.loading).toBe(true)
    expect(globalThis.__cardOptions.enabled).toBe(true)
  })

  test('a signed-out visitor lets the card fetch keyless', () => {
    globalThis.__card = { phase: 'keyless' }
    const { props } = cardFor({ url: LIVE_URL })
    expect(props.fetchData).toBe(true)
    expect(props.loading).toBeUndefined()
    expect(props.apiKey).toBeUndefined()
  })

  test('a signed-in visitor gets the data from the session request', () => {
    globalThis.__card = { phase: 'session', data: { title: 'live' } }
    const { props } = cardFor({ url: LIVE_URL, setData: { title: 'mine' } })
    expect(props.fetchData).toBe(false)
    expect(props.loading).toBeUndefined()
    expect(props.setData).toEqual({ title: 'mine' })
    globalThis.__card = { phase: 'session', data: { title: 'live', url: 'u' } }
    expect(cardFor({ url: LIVE_URL }).props.setData).toEqual({
      title: 'live',
      url: 'u'
    })
  })

  test('a failed session request shows the link, never a keyless card', () => {
    globalThis.__card = { phase: 'failed' }
    const { props, html } = cardFor({ url: LIVE_URL })
    expect(props).toBeUndefined()
    expect(html).toBe(`<a href="${LIVE_URL}">${LIVE_URL}</a>`)
  })

  test('a card with its data in hand never fetches', () => {
    globalThis.__card = { phase: 'idle' }
    const { props } = cardFor({
      url: LIVE_URL,
      fetchData: false,
      setData: { title: 'x' }
    })
    expect(globalThis.__cardOptions.enabled).toBe(false)
    expect(props.fetchData).toBe(false)
    expect(props.loading).toBeUndefined()
  })
})
