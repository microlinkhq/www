import { describe, expect, test } from 'vitest'

import { onDesktop } from '../../src/components/patterns/ExamplesSwitcher/slots'

const SLOT_VALUES = ['a', 'b', 'c', 'd']

describe('ExamplesSwitcher onDesktop', () => {
  test('overrides only the desktop slots', () => {
    expect(onDesktop('z', SLOT_VALUES)).toEqual(['a', 'b', 'z', 'z'])
  })

  test('falls back to every mobile value when there is no override', () => {
    expect(onDesktop(undefined, SLOT_VALUES)).toEqual(SLOT_VALUES)
  })
})
