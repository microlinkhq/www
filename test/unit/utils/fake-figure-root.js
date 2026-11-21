import { describe, expect, test } from 'vitest'

import { createFakeFigureRoot } from '../../utils/fake-figure-root'

const html =
  '<g data-part="ram"></g><g data-part="bolt"></g><g data-card="0"></g>'

describe('createFakeFigureRoot', () => {
  test('a presence selector matches an attribute that has a value', () => {
    const root = createFakeFigureRoot(html)
    expect(root.querySelector('[data-part]').dataset.part).toBe('ram')
    expect(
      [...root.querySelectorAll('[data-part]')].map(node => node.dataset.part)
    ).toEqual(['ram', 'bolt'])
  })

  test('a valued selector matches only that value', () => {
    const root = createFakeFigureRoot(html)
    expect(root.querySelector('[data-part="bolt"]').dataset.part).toBe('bolt')
    expect(root.querySelector('[data-part="missing"]')).toBeNull()
    expect(
      [...root.querySelectorAll('[data-part="bolt"]')].map(
        node => node.dataset.part
      )
    ).toEqual(['bolt'])
    expect(root.querySelectorAll('[data-card]')).toHaveLength(1)
  })
})
