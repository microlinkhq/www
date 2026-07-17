import { getContrast, parseToRgb } from 'polished'
import { describe, expect, test } from 'vitest'

import {
  colors,
  accentBand,
  accentIcon,
  accentText,
  accentTile
} from '../src/theme/index.js'
import {
  SKILL_CATEGORIES,
  UNCATEGORIZED_CATEGORY
} from '../src/components/pages/skills/taxonomy.js'

const BODY_TEXT = 4.5
const LARGE_TEXT = 3
const NON_TEXT = 3

const token = name => {
  const { red, green, blue, alpha = 1 } = parseToRgb(colors[name] || name)
  return { red, green, blue, alpha }
}

const over = (source, backdrop) => ({
  red: source.red * source.alpha + backdrop.red * (1 - source.alpha),
  green: source.green * source.alpha + backdrop.green * (1 - source.alpha),
  blue: source.blue * source.alpha + backdrop.blue * (1 - source.alpha),
  alpha: 1
})

const toRgb = ({ red, green, blue }) =>
  `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`

const WHITE = token('#fff')

const onBackdrop = (fg, ...layers) => {
  const backdrop = layers.reduce(
    (composited, layer) => over(token(layer), composited),
    WHITE
  )
  return getContrast(toRgb(over(token(fg), backdrop)), toRgb(backdrop))
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
