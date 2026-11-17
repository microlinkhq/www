import { describe, expect, test } from 'vitest'
import { inputModeForStep } from '../../../../../src/components/pages/builder/input-mode'

describe('inputModeForStep', () => {
  test('an integer step asks for the numeric keyboard', () => {
    expect(inputModeForStep(1)).toBe('numeric')
  })

  test('a fractional step asks for the decimal keyboard', () => {
    expect(inputModeForStep(0.1)).toBe('decimal')
  })
})
