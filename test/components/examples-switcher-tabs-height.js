import { describe, expect, test } from 'vitest'

import measureVisibleTabsHeight from '../../src/components/patterns/ExamplesSwitcher/measure-tabs-height'

const TAB_SPACING = 8

const list = offsetHeights => {
  let offsetTop = 40
  return {
    offsetParent: {},
    children: offsetHeights.map(offsetHeight => {
      const child = { offsetTop, offsetHeight }
      offsetTop += offsetHeight + TAB_SPACING
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
  test('spans the visible tabs including the spacing between them', () => {
    expect(measureVisibleTabsHeight(list([100, 100, 100]), 3)).toBe(316)
  })

  test('measures only up to visibleTabs', () => {
    expect(measureVisibleTabsHeight(list([100, 100, 100]), 2)).toBe(208)
  })

  test('is independent of where the list sits in its offset parent', () => {
    expect(measureVisibleTabsHeight(list([80, 120]), 2)).toBe(208)
  })

  test('returns null when there is nothing laid out to measure', () => {
    expect(measureVisibleTabsHeight(hiddenList(5), 5)).toBe(null)
    expect(measureVisibleTabsHeight(list([]), 5)).toBe(null)
  })
})
