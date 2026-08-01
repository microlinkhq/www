import { describe, expect, test } from 'vitest'

import {
  DESKTOP_ONLY,
  MOBILE_ONLY,
  onDesktop
} from '../../src/components/patterns/ExamplesSwitcher/slots'

const SLOT_VALUES = ['a', 'b', 'c', 'd']

describe('ExamplesSwitcher breakpoint slots', () => {
  test('shows each branch on exactly one side of the boundary', () => {
    expect(MOBILE_ONLY).toEqual(['block', 'block', 'none', 'none'])
    expect(DESKTOP_ONLY).toEqual(['none', 'none', 'block', 'block'])
  })

  test('overrides only the desktop slots', () => {
    expect(onDesktop('z', SLOT_VALUES)).toEqual(['a', 'b', 'z', 'z'])
  })

  test('falls back to every mobile value when there is no override', () => {
    expect(onDesktop(undefined, SLOT_VALUES)).toEqual(SLOT_VALUES)
  })
})
