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

vi.mock('components/hook/use-account-keys', () => ({
  useAccountKeys: () => globalThis.__accountKeys
}))

const LIVE_URL = 'https://example.com/not-a-demo-link'

const cardFor = props => {
  renderToStaticMarkup(<Microlink {...props} />)
  return globalThis.__cardProps
}

describe('Microlink card', () => {
  beforeEach(() => {
    globalThis.__cardProps = undefined
    globalThis.__accountKeys = undefined
  })

  test('holds a live card on its skeleton until the keys are known', () => {
    const card = cardFor({ url: LIVE_URL })
    expect(card.fetchData).toBe(false)
    expect(card.loading).toBe(true)
    expect(card.apiKey).toBeUndefined()
  })

  test('a signed-in visitor gets the first account key', () => {
    globalThis.__accountKeys = ['dev', 'paid']
    const card = cardFor({ url: LIVE_URL })
    expect(card.fetchData).toBe(true)
    expect(card.loading).toBeUndefined()
    expect(card.apiKey).toBe('dev')
  })

  test('a signed-out visitor fetches keyless once the empty key list is known', () => {
    globalThis.__accountKeys = []
    const card = cardFor({ url: LIVE_URL })
    expect(card.fetchData).toBe(true)
    expect(card.apiKey).toBeUndefined()
  })

  test('a card with its data in hand never waits for keys', () => {
    const card = cardFor({
      url: LIVE_URL,
      fetchData: false,
      setData: { title: 'x' }
    })
    expect(card.fetchData).toBe(false)
    expect(card.loading).toBeUndefined()
  })
})
