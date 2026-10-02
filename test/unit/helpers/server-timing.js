import { describe, expect, test } from 'vitest'
import { parseServerTiming } from '../../../src/helpers/server-timing'

const SLOW_REQUEST =
  'total;dur=9385, fn.require;dur=45, fn.connect;dur=109, fn.pages;dur=7483, fn.resolve;dur=0, fn.run;dur=32'

describe('parseServerTiming', () => {
  test('an empty header has no bars', () => {
    expect(parseServerTiming(undefined)).toEqual({ bars: [], totalMs: null })
  })

  test('the total entry sets the scale, not the sum of the spans', () => {
    const { totalMs, bars } = parseServerTiming(SLOW_REQUEST)
    expect(totalMs).toBe(9385)
    expect(bars.find(b => b.name === 'fn.pages')).toMatchObject({
      dur: '7483.0ms',
      share: '79.7%',
      width: '80%'
    })
  })

  test('a zero span still draws a visible sliver', () => {
    const { bars } = parseServerTiming(SLOW_REQUEST)
    expect(bars.find(b => b.name === 'fn.resolve')).toMatchObject({
      dur: '0.0ms',
      share: '0%',
      width: '2%'
    })
  })

  test('without a total entry the spans are summed', () => {
    expect(parseServerTiming('a;dur=30, b;dur=10').totalMs).toBe(40)
  })

  test('bars keep header order and cycle the palette', () => {
    const { bars } = parseServerTiming(SLOW_REQUEST)
    expect(bars.map(b => b.name)).toEqual([
      'total',
      'fn.require',
      'fn.connect',
      'fn.pages',
      'fn.resolve',
      'fn.run'
    ])
    expect(bars.map(b => b.color)).toEqual([
      'green5',
      'blue5',
      'yellow5',
      'pink5',
      'grape5',
      'teal5'
    ])
  })
})
