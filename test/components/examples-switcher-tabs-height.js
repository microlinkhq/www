import { describe, expect, test } from 'vitest'

import measureTabsHeight from '../../src/components/patterns/ExamplesSwitcher/measure-tabs-height'

const TAB_SPACING = 8

const list = (offsetHeights, startsAt = 40) => {
  let offsetTop = startsAt
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
    expect(measureTabsHeight(list([100, 100, 100]), 3)).toBe(316)
  })

  test('measures only up to visibleTabs', () => {
    expect(measureTabsHeight(list([100, 100, 100]), 2)).toBe(208)
  })

  test('is independent of where the list sits in its offset parent', () => {
    expect(measureTabsHeight(list([80, 120], 0), 2)).toBe(
      measureTabsHeight(list([80, 120], 900), 2)
    )
  })

  test('returns null when there is nothing laid out to measure', () => {
    expect(measureTabsHeight(hiddenList(5), 5)).toBe(null)
    expect(measureTabsHeight(list([]), 5)).toBe(null)
  })
})
