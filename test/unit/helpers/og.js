import { expect, describe, it } from 'vitest'

import { ogImageUrl } from '../../../src/helpers/og.js'

const BASE = 'https://microlink.io'

describe('ogImageUrl', () => {
  it('returns null without a base', () => {
    expect(ogImageUrl('/pricing', undefined)).toBe(null)
    expect(ogImageUrl('/pricing', '')).toBe(null)
  })

  it('returns null for pathnames without a card', () => {
    expect(ogImageUrl('/404', BASE)).toBe(null)
    expect(ogImageUrl('', BASE)).toBe(null)
  })

  it('builds the card url without a query when no content is given', () => {
    expect(ogImageUrl('/pricing', BASE)).toBe(`${BASE}/images/og/pricing.png`)
    expect(ogImageUrl('/', BASE)).toBe(`${BASE}/images/og/home.png`)
  })

  it('appends a url-safe card fingerprint as `?v=`', () => {
    const url = ogImageUrl('/pricing', BASE, {
      version: '1.5.0',
      title: 'Pricing',
      description: 'Simple, transparent.'
    })
    expect(url).toMatch(
      /^https:\/\/microlink\.io\/images\/og\/pricing\.png\?v=[0-9a-z]+$/
    )
  })

  it('is deterministic for the same card', () => {
    const card = { version: '1.5.0', title: 'Pricing', description: 'Simple.' }
    expect(ogImageUrl('/pricing', BASE, card)).toBe(
      ogImageUrl('/pricing', BASE, { ...card })
    )
  })

  it('changes the fingerprint when the title or description changes', () => {
    const card = { version: '1.5.0', title: 'Pricing', description: 'Simple.' }
    const base = ogImageUrl('/pricing', BASE, card)
    expect(ogImageUrl('/pricing', BASE, { ...card, title: 'Plans' })).not.toBe(
      base
    )
    expect(
      ogImageUrl('/pricing', BASE, { ...card, description: 'Transparent.' })
    ).not.toBe(base)
  })

  it('changes the fingerprint when the @microlink/og version changes', () => {
    const card = { title: 'Pricing', description: 'Simple.' }
    expect(
      ogImageUrl('/pricing', BASE, { ...card, version: '1.5.0' })
    ).not.toBe(ogImageUrl('/pricing', BASE, { ...card, version: '1.6.0' }))
  })

  it('keeps fields distinct so text cannot shift between them', () => {
    const a = ogImageUrl('/pricing', BASE, { title: 'ab', description: 'c' })
    const b = ogImageUrl('/pricing', BASE, { title: 'a', description: 'bc' })
    expect(a).not.toBe(b)
  })
})
