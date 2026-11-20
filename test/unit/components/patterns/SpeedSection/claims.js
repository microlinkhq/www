import { describe, expect, test } from 'vitest'
import {
  benchmarkClaims,
  breakableName,
  displayedTotal,
  formatDuration,
  microlinkDelta,
  percentDifference,
  percentSlower,
  relativeSpeed,
  speedRatio
} from '../../../../../src/components/patterns/SpeedSection/claims'

const BENCHMARK = {
  timestamp: '2026-03',
  results: {
    microlink: {
      summary: { avgColdDuration: 4111.84 },
      perUrl: [
        { url: 'https://www.vercel.com', coldDuration: 5000 },
        { url: 'https://www.example.com', coldDuration: 1000 }
      ]
    },
    rival: {
      summary: { avgColdDuration: 7334.22 },
      perUrl: [
        { url: 'https://www.example.com', coldDuration: 2700 },
        { url: 'https://www.vercel.com', coldDuration: 6000 }
      ]
    }
  }
}

describe('benchmark claims', () => {
  test('formats durations as whole milliseconds with a non-breaking space', () => {
    expect(formatDuration(27153.57)).toBe('27,154\u00a0ms')
    expect(formatDuration(4111.84)).toBe('4,112\u00a0ms')
  })

  test('totals the rounded rows so the total matches what the table shows', () => {
    const runs = [
      { coldDuration: 1000.4 },
      { coldDuration: 2000.4 },
      { coldDuration: 3000.4 }
    ]
    expect(displayedTotal(runs)).toBe(6000)
  })

  test('derives the ratio and the percent slower from the same averages', () => {
    expect(speedRatio(7334.22, 4111.84)).toBe('1.8')
    expect(percentSlower(7334.22, 4111.84)).toBe(78)
  })

  test('summarizes a run against one competitor', () => {
    expect(benchmarkClaims(BENCHMARK, 'rival')).toEqual({
      run: 'March 2026',
      urls: 2,
      microlinkAverage: '4,112\u00a0ms',
      competitorAverage: '7,334\u00a0ms',
      averageRatio: '1.8',
      percentSlower: 78,
      widestGap: {
        host: 'example.com',
        microlink: '1,000\u00a0ms',
        competitor: '2,700\u00a0ms',
        ratio: '2.7'
      }
    })
  })

  test('skips a url the competitor did not run', () => {
    const claims = benchmarkClaims(
      {
        ...BENCHMARK,
        results: {
          ...BENCHMARK.results,
          rival: {
            ...BENCHMARK.results.rival,
            perUrl: [{ url: 'https://www.vercel.com', coldDuration: 6000 }]
          }
        }
      },
      'rival'
    )
    expect(claims.widestGap.host).toBe('vercel.com')
    expect(claims.widestGap.ratio).toBe('1.2')
  })

  test('reports no gap when no url matches', () => {
    const claims = benchmarkClaims(
      {
        ...BENCHMARK,
        results: {
          ...BENCHMARK.results,
          rival: {
            ...BENCHMARK.results.rival,
            perUrl: [{ url: 'https://other.example', coldDuration: 9000 }]
          }
        }
      },
      'rival'
    )
    expect(claims.widestGap).toEqual({
      host: '',
      microlink: '',
      competitor: '',
      ratio: '0.0'
    })
  })

  test('reads full ISO timestamps as the same month', () => {
    const claims = benchmarkClaims(
      { ...BENCHMARK, timestamp: '2026-04-30T23:00:00Z' },
      'rival'
    )
    expect(claims.run).toBe('April 2026')
  })
})

describe('relativeSpeed', () => {
  test('frames the gap as the same ratio the headline uses', () => {
    expect(relativeSpeed(8142.6, 4111.84)).toBe('2.0× slower')
    expect(relativeSpeed(4111.84, 4111.84)).toBe('1.0× slower')
  })

  test('says faster when the competitor beats Microlink', () => {
    expect(relativeSpeed(3000, 4500)).toBe('1.5× faster')
  })
})

describe('breakableName', () => {
  test('lets a column header wrap between the words of a provider name', () => {
    expect(breakableName('Screenshot\u00a0Machine')).toBe('Screenshot Machine')
    expect(breakableName('Screenshotlayer')).toBe('Screenshotlayer')
  })
})

describe('percentDifference', () => {
  test('signs the change against the baseline, rounded', () => {
    expect(percentDifference(6361, 14233)).toBe('-55%')
    expect(percentDifference(3435, 1968)).toBe('+75%')
    expect(percentDifference(1000, 1000)).toBe('0%')
  })

  test('stays empty when the baseline cannot divide', () => {
    expect(percentDifference(1000, 0)).toBeNull()
  })
})

describe('microlinkDelta', () => {
  test('compares Microlink with the fastest other service', () => {
    expect(microlinkDelta([5000, 8000, 4000], ['microlink', 'a', 'b'])).toBe(
      '+25%'
    )
  })

  test('a missing measurement is never shown as a reduction', () => {
    expect(microlinkDelta([null, 8000], ['microlink', 'a'])).toBeNull()
    expect(microlinkDelta([0, 8000], ['microlink', 'a'])).toBeNull()
    expect(microlinkDelta([5000, null, 4000], ['microlink', 'a', 'b'])).toBe(
      '+25%'
    )
    expect(microlinkDelta([5000, null], ['microlink', 'a'])).toBeNull()
  })

  test('stays empty when Microlink is absent or the only service', () => {
    expect(microlinkDelta([1000, 2000], ['a', 'b'])).toBeNull()
    expect(microlinkDelta([1000], ['microlink'])).toBeNull()
  })
})
