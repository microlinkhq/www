import { describe, expect, test } from 'vitest'

import {
  COMPARISON,
  HERO
} from '../../../../../src/components/pages/jina-reader/shared'

const row = feature => COMPARISON.rows.find(item => item.feature === feature)

describe('Jina Reader comparison claims', () => {
  test('does not say one Reader call returns one shape', () => {
    expect(HERO.description).not.toMatch(/one shape/)
    expect(row('Formats in one response').jina).not.toMatch(/One per call/)
    expect(row('Formats in one response').note).not.toMatch(/single value/)
    expect(row('Formats in one response').note).toMatch(
      /markdown\+html\+screenshot/
    )
  })

  test('uses the documented cache lifetime', () => {
    const cache = row('Response caching')
    expect(cache.jina).toBe('1 hour')
    expect(cache.note).toMatch(/3600 seconds/)
    expect(cache.note).not.toMatch(/5 minutes/)
  })

  test('credits Reader with a documented viewport', () => {
    const shot = row('Screenshot controls')
    expect(shot.note).not.toMatch(/no documented device or viewport/)
    expect(shot.note).toMatch(/device scale/)
  })
})
