import { describe, expect, test } from 'vitest'

import measureVisibleTabsHeight from '../../src/components/patterns/ExamplesSwitcher/measure-tabs-height'

const GAP = 8

const list = offsetHeights => {
  let offsetTop = 40
  return {
    offsetParent: {},
    children: offsetHeights.map(offsetHeight => {
      const child = { offsetTop, offsetHeight }
      offsetTop += offsetHeight + GAP
      return child
    })
  }
}

const hiddenList = count => ({
  offsetParent: null,
  children: Array.from({ length: count }, () => ({
    offsetTop: 0,
    offsetHeight: 0
  }))
})

describe('ExamplesSwitcher tab height measurement', () => {
  test('spans the visible tabs including the gaps between them', () => {
    expect(measureVisibleTabsHeight(list([100, 100, 100]), 3)).toBe(316)
  })

  test('measures only up to visibleTabs', () => {
    expect(measureVisibleTabsHeight(list([100, 100, 100]), 2)).toBe(208)
  })

  test('is independent of where the list sits in its offset parent', () => {
    expect(measureVisibleTabsHeight(list([80, 120]), 2)).toBe(208)
  })

  test('returns null for a list that is not laid out', () => {
    expect(measureVisibleTabsHeight(hiddenList(5), 5)).toBe(null)
  })

  test('returns zero, not gap-only height, for an empty list', () => {
    expect(measureVisibleTabsHeight(list([]), 5)).toBe(0)
  })
})
