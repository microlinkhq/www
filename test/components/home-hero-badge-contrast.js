import { describe, expect, test } from 'vitest'

import { colors } from '../../src/theme'

const hexToRgb = hex => {
  const value = hex.replace('#', '')
  return [0, 2, 4].map(i => parseInt(value.slice(i, i + 2), 16))
}

const relativeLuminance = rgb => {
  const [r, g, b] = rgb.map(channel => {
    const c = channel / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const contrast = (a, b) => {
  const [high, low] = [relativeLuminance(a), relativeLuminance(b)].sort(
    (x, y) => y - x
  )
  return (high + 0.05) / (low + 0.05)
}

const badgeBackground = [255, 255, 255]

describe('home hero badge contrast', () => {
  test('badge text meets WCAG 1.4.3 AA for normal text (4.5:1)', () => {
    expect(
      contrast(hexToRgb(colors.gray7), badgeBackground)
    ).toBeGreaterThanOrEqual(4.5)
  })

  test('pulse dot meets WCAG 1.4.11 non-text contrast (3:1)', () => {
    expect(
      contrast(hexToRgb(colors.green8), badgeBackground)
    ).toBeGreaterThanOrEqual(3)
  })
})
