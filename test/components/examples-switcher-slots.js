import { describe, expect, test } from 'vitest'

import {
  DESKTOP_ONLY,
  onDesktop
} from '../../src/components/patterns/ExamplesSwitcher/slots'

const PANEL_HEIGHT = ['360px', '48%', '68%', '68%']

describe('ExamplesSwitcher breakpoint slots', () => {
  test('overrides exactly the slots DESKTOP_ONLY shows', () => {
    const shown = DESKTOP_ONLY.map(value => value === 'block')
    expect(onDesktop(true, [false, false, false, false])).toEqual(shown)
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
