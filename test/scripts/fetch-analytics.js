import { expect, describe, it } from 'vitest'

import {
  roundPretty,
  parseCdnEdges
} from '../../scripts/fetch-data/providers/fetch-analytics'

describe('roundPretty', () => {
  it('rounds down to the nearest 50 keeping the unit', () => {
    expect(roundPretty('778M')).toBe('750M')
    expect(roundPretty('245M')).toBe('200M')
    expect(roundPretty('750M')).toBe('750M')
    expect(roundPretty('799M')).toBe('750M')
    expect(roundPretty('800M')).toBe('800M')
  })

  it('handles decimal values', () => {
    expect(roundPretty('778.4M')).toBe('750M')
    expect(roundPretty('249.9M')).toBe('200M')
  })

  it('throws on unexpected formats instead of writing garbage', () => {
    expect(() => roundPretty('')).toThrow('ANALYTICS_PRETTY_UNEXPECTED')
    expect(() => roundPretty('M778')).toThrow('ANALYTICS_PRETTY_UNEXPECTED')
    expect(() => roundPretty(undefined)).toThrow('ANALYTICS_PRETTY_UNEXPECTED')
    expect(() => roundPretty('778')).toThrow('ANALYTICS_PRETTY_UNEXPECTED')
  })
})

describe('parseCdnEdges', () => {
  it('extracts the city count from the network summary', () => {
    expect(
      parseCdnEdges(
        '<small data-cms-type="text">337 cities · 8 regions</small>'
      )
    ).toBe(337)
  })

  it('ignores per-region breakdown numbers before the summary', () => {
    const html =
      '<h6>55 cities</h6><p>North America</p><h6>67 cities</h6><p>Europe</p>' +
      '<small data-cms-type="text">337 cities · 8 regions</small>'
    expect(parseCdnEdges(html)).toBe(337)
  })

  it('handles thousands separators', () => {
    expect(parseCdnEdges('1,024 cities · 12 regions')).toBe(1024)
  })

  it('throws when the summary is missing', () => {
    expect(() => parseCdnEdges('<p>no network data here</p>')).toThrow(
      'CDN_EDGES_NOT_FOUND'
    )
  })
})
