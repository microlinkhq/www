import { expect, describe, it } from 'vitest'

import { roundPretty } from '../../scripts/fetch-data/providers/fetch-analytics'

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
})
