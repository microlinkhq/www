import { expect, describe, it } from 'vitest'

import {
  roundPretty,
  parseCdnEdges,
  toAnalyticsRecord
} from '../../../scripts/fetch-data/providers/fetch-analytics'

describe('roundPretty', () => {
  it('rounds down to two significant figures keeping the unit', () => {
    expect(roundPretty(145159956)).toBe('140M')
    expect(roundPretty(778400000)).toBe('770M')
    expect(roundPretty(245145473)).toBe('240M')
    expect(roundPretty(82906227)).toBe('82M')
    expect(roundPretty(800000000)).toBe('800M')
  })

  it('never rounds up past the real count', () => {
    expect(roundPretty(149999999)).toBe('140M')
    expect(roundPretty(9999999)).toBe('9.9M')
  })

  it('switches unit across magnitudes', () => {
    expect(roundPretty(1234567890)).toBe('1.2B')
    expect(roundPretty(1000000000)).toBe('1B')
    expect(roundPretty(999999999)).toBe('990M')
    expect(roundPretty(1000000)).toBe('1M')
    expect(roundPretty(999999)).toBe('990K')
    expect(roundPretty(45678)).toBe('45K')
    expect(roundPretty(1000)).toBe('1K')
    expect(roundPretty(999)).toBe('990')
    expect(roundPretty(7)).toBe('7')
    expect(roundPretty(1)).toBe('1')
  })

  it('formats the raw request count, ignoring the api pretty string', () => {
    expect(
      toAnalyticsRecord({ reqs: 145159956, reqs_pretty: '999M' }, 348)
    ).toMatchObject({ reqs_pretty: '140M', cdn_edges: 348 })
  })

  it('throws on unexpected input instead of writing garbage', () => {
    expect(() => roundPretty(0)).toThrow('ANALYTICS_REQS_UNEXPECTED')
    expect(() => roundPretty(-5)).toThrow('ANALYTICS_REQS_UNEXPECTED')
    expect(() => roundPretty(NaN)).toThrow('ANALYTICS_REQS_UNEXPECTED')
    expect(() => roundPretty(undefined)).toThrow('ANALYTICS_REQS_UNEXPECTED')
    expect(() => roundPretty('145M')).toThrow('ANALYTICS_REQS_UNEXPECTED')
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
