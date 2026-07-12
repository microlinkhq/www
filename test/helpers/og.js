import { expect, describe, it } from 'vitest'

import { ogImageUrl } from '../../src/helpers/og.js'

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

  it('appends a url-safe content fingerprint as `?v=`', () => {
    const url = ogImageUrl('/pricing', BASE, 'Pricing\nSimple, transparent.')
    expect(url).toMatch(
      /^https:\/\/microlink\.io\/images\/og\/pricing\.png\?v=[0-9a-z]+$/
    )
  })

  it('is deterministic for the same content', () => {
    const content = 'Pricing\nSimple, transparent.'
    expect(ogImageUrl('/pricing', BASE, content)).toBe(
      ogImageUrl('/pricing', BASE, content)
    )
  })

  it('changes the fingerprint when the content changes', () => {
    const before = ogImageUrl('/pricing', BASE, 'Pricing\nSimple.')
    const after = ogImageUrl('/pricing', BASE, 'Pricing\nSimple, transparent.')
    expect(before).not.toBe(after)
  })

  it('keeps fingerprints distinct across similar content', () => {
    const a = ogImageUrl('/pricing', BASE, 'ab')
    const b = ogImageUrl('/pricing', BASE, 'ba')
    expect(a).not.toBe(b)
  })
})
