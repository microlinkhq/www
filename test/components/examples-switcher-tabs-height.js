import { describe, expect, test } from 'vitest'

import measureVisibleTabsHeight from '../../src/components/patterns/ExamplesSwitcher/measure-tabs-height'

const GAP = 8

const list = (offsetHeights, { hidden = false } = {}) => ({
  offsetParent: hidden ? null : {},
  children: offsetHeights.map(offsetHeight => ({ offsetHeight }))
})

describe('ExamplesSwitcher tab height measurement', () => {
  test('sums the visible tabs plus the gaps between them', () => {
    expect(measureVisibleTabsHeight(list([100, 100, 100]), 3, GAP)).toBe(316)
  })

  test('measures only up to visibleTabs', () => {
    expect(measureVisibleTabsHeight(list([100, 100, 100]), 2, GAP)).toBe(208)
  })

  test('returns null for a list that is not laid out', () => {
    const hidden = list([0, 0, 0, 0, 0], { hidden: true })
    expect(measureVisibleTabsHeight(hidden, 5, GAP)).toBe(null)
  })

  test('returns zero, not gap-only height, for an empty list', () => {
    expect(measureVisibleTabsHeight(list([]), 5, GAP)).toBe(0)
  })
})
