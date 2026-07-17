import { describe, expect, test } from 'vitest'

import { colors } from '../src/theme/index.js'
import {
  SKILL_CATEGORIES,
  UNCATEGORIZED_CATEGORY,
  accentBand,
  accentIcon,
  accentText,
  accentTile
} from '../src/components/pages/skills/taxonomy.js'

const BODY_TEXT = 4.5
const LARGE_TEXT = 3
const NON_TEXT = 3

const parse = value => {
  let match = value.match(/^#([0-9a-f]{6})$/i)
  if (match) {
    const n = parseInt(match[1], 16)
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 1]
  }

  match = value.match(/^#([0-9a-f]{3})$/i)
  if (match) {
    const [r, g, b] = match[1].split('')
    return [parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), 1]
  }

  match = value.match(/^rgba?\(([^)]+)\)$/)
  if (match) {
    const parts = match[1].split(',').map(part => parseFloat(part.trim()))
    return [parts[0], parts[1], parts[2], parts[3] === undefined ? 1 : parts[3]]
  }

  throw new Error(`unsupported color: ${value}`)
}

const token = name => parse(colors[name] || name)

const over = (source, backdrop) => {
  const alpha = source[3]
  return [
    source[0] * alpha + backdrop[0] * (1 - alpha),
    source[1] * alpha + backdrop[1] * (1 - alpha),
    source[2] * alpha + backdrop[2] * (1 - alpha),
    1
  ]
}

const luminance = ([r, g, b]) => {
  const channel = value => {
    const ratio = value / 255
    return ratio <= 0.03928
      ? ratio / 12.92
      : Math.pow((ratio + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

const contrast = (foreground, backdrop) => {
  const a = luminance(foreground)
  const b = luminance(backdrop)
  const [high, low] = a > b ? [a, b] : [b, a]
  return (high + 0.05) / (low + 0.05)
}

const WHITE = parse('#fff')

const onBackdrop = (fg, ...layers) => {
  let backdrop = WHITE
  for (const layer of layers) backdrop = over(token(layer), backdrop)
  return contrast(over(token(fg), backdrop), backdrop)
}

const accents = [...SKILL_CATEGORIES, UNCATEGORIZED_CATEGORY].map(category => [
  category.title,
  category.accent
])

describe('skills page colors meet WCAG 2.2 AA', () => {
  test.each(accents)('%s: active chip label is readable', (_title, accent) => {
    expect(
      onBackdrop(accentText(accent), accentBand(accent))
    ).toBeGreaterThanOrEqual(BODY_TEXT)
  })

  test.each(accents)('%s: category icon on its tile', (_title, accent) => {
    expect(
      onBackdrop(accentIcon(accent), accentTile(accent))
    ).toBeGreaterThanOrEqual(NON_TEXT)
  })

  test.each(accents)('%s: skill icon on its tile', (_title, accent) => {
    expect(
      onBackdrop(
        accentIcon(accent),
        accentBand(accent),
        'white',
        accentBand(accent)
      )
    ).toBeGreaterThanOrEqual(NON_TEXT)
  })

  test.each(accents)('%s: card arrow on the white card', (_title, accent) => {
    expect(
      onBackdrop(accentIcon(accent), accentBand(accent), 'white')
    ).toBeGreaterThanOrEqual(NON_TEXT)
  })

  test.each(accents)('%s: description copy on the band', (_title, accent) => {
    expect(onBackdrop('black60', accentBand(accent))).toBeGreaterThanOrEqual(
      BODY_TEXT
    )
  })

  test.each(accents)('%s: category title on the band', (_title, accent) => {
    expect(onBackdrop('black', accentBand(accent))).toBeGreaterThanOrEqual(
      LARGE_TEXT
    )
  })

  test('inactive chip label and icon are readable on white', () => {
    expect(onBackdrop('black60')).toBeGreaterThanOrEqual(BODY_TEXT)
  })

  test('card title and description are readable on white', () => {
    expect(onBackdrop('black')).toBeGreaterThanOrEqual(BODY_TEXT)
    expect(onBackdrop('black60')).toBeGreaterThanOrEqual(BODY_TEXT)
  })

  test('request a skill button label is readable', () => {
    expect(onBackdrop('white', 'link')).toBeGreaterThanOrEqual(BODY_TEXT)
  })
})
