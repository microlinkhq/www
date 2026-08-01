import { describe, expect, test } from 'vitest'

import {
  DESKTOP_ONLY,
  MOBILE_ONLY,
  onDesktop
} from '../../src/components/patterns/ExamplesSwitcher/slots'

const PANEL_HEIGHT = ['360px', '48%', '68%', '68%']

describe('ExamplesSwitcher breakpoint slots', () => {
  test('the two display arrays are complements', () => {
    expect(MOBILE_ONLY).toEqual(['block', 'block', 'none', 'none'])
    expect(DESKTOP_ONLY).toEqual(['none', 'none', 'block', 'block'])
  })

  test('overrides only the desktop slots', () => {
    expect(onDesktop('320px', PANEL_HEIGHT)).toEqual([
      '360px',
      '48%',
      '320px',
      '320px'
    ])
  })

  test('falls back to every mobile value when there is no override', () => {
    expect(onDesktop(undefined, PANEL_HEIGHT)).toEqual(PANEL_HEIGHT)
  })
})
