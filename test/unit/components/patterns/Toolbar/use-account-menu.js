import { describe, expect, test } from 'vitest'
import { nextMenuIndex } from '../../../../../src/components/patterns/Toolbar/use-account-menu'

describe('nextMenuIndex', () => {
  test('arrows move one item and wrap at both ends', () => {
    expect(nextMenuIndex('ArrowDown', 0, 3)).toBe(1)
    expect(nextMenuIndex('ArrowDown', 2, 3)).toBe(0)
    expect(nextMenuIndex('ArrowUp', 1, 3)).toBe(0)
    expect(nextMenuIndex('ArrowUp', 0, 3)).toBe(2)
  })

  test('with nothing focused, down goes to the first item and up to the last', () => {
    expect(nextMenuIndex('ArrowDown', -1, 3)).toBe(0)
    expect(nextMenuIndex('ArrowUp', -1, 3)).toBe(2)
  })

  test('Home and End jump to the ends', () => {
    expect(nextMenuIndex('Home', 2, 4)).toBe(0)
    expect(nextMenuIndex('End', 0, 4)).toBe(3)
  })

  test('other keys are left to the browser', () => {
    expect(nextMenuIndex('Enter', 0, 3)).toBe(null)
    expect(nextMenuIndex('a', 0, 3)).toBe(null)
  })

  test('an empty menu has nowhere to go', () => {
    expect(nextMenuIndex('ArrowDown', -1, 0)).toBe(-1)
  })
})
