import { describe, expect, test } from 'vitest'
import {
  closesMenu,
  linkActivatedBySpace,
  nextMenuIndex,
  openMenuTarget,
  popupPosition
} from '../../../../../src/components/patterns/Toolbar/use-account-menu'

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

describe('menu keys', () => {
  test('arrow down, enter, and space open on the first item, and arrow up opens on the last', () => {
    expect(openMenuTarget('ArrowDown')).toBe('first')
    expect(openMenuTarget('Enter')).toBe('first')
    expect(openMenuTarget(' ')).toBe('first')
    expect(openMenuTarget('ArrowUp')).toBe('last')
  })

  test('escape and tab close the menu', () => {
    expect(closesMenu('Escape')).toBe(true)
    expect(closesMenu('Tab')).toBe(true)
  })

  test('space activates a menu link and leaves buttons and enter alone', () => {
    expect(linkActivatedBySpace(' ', 'A')).toBe(true)
    expect(linkActivatedBySpace(' ', 'BUTTON')).toBe(false)
    expect(linkActivatedBySpace('Enter', 'A')).toBe(false)
  })
})

describe('popupPosition', () => {
  test('places the menu just under the trigger, aligned to its right edge', () => {
    expect(popupPosition({ bottom: 64, right: 800 }, 1000, 8)).toEqual({
      top: 72,
      right: 200
    })
  })
})
