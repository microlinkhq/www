import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const root = process.cwd()
const analytics = fs.readFileSync(
  path.join(root, 'src/components/pages/home/analytics.js'),
  'utf8'
)

describe('home analytics band', () => {
  test('layers the globe artwork behind the Fast Anywhere display title', () => {
    expect(fs.existsSync(path.join(root, 'static/images/globe.webp'))).toBe(
      true
    )
    expect(analytics).toContain("const GLOBE_SRC = '/images/globe.webp'")
    expect(analytics).toContain('src={GLOBE_SRC}')
    expect(analytics).toContain("alt='Global edge network'")
    expect(analytics).toContain('fontSize: FAST_TITLE_FONT_SIZE')
    expect(analytics).toContain('clamp(')
    expect(analytics).toContain("id='fast-anywhere-title'")
    expect(analytics).toContain('...textGradient')
    expect(analytics).toMatch(/maskImage: `url\(\$\{GLOBE_SRC\}\)`/)
    expect(analytics).toContain("mixBlendMode: 'multiply'")
  })

  test('keeps the production metrics compact and legible across screen sizes', () => {
    expect(analytics).toContain("'repeat(4, minmax(0, 1fr))'")
    expect(analytics).toContain("minWidth: 0, textAlign: 'center'")
    expect(analytics).toContain("fontVariantNumeric: 'tabular-nums'")
    expect(analytics).toContain('\\u00a0')
    expect(analytics).toContain('py: SECTION_VERTICAL_SPACING')
    expect(analytics).toContain('maxWidth: layout.large')
    expect(analytics).toMatch(
      /linear-gradient\(transparent, \$\{colors\.white\}\)/
    )
  })
})
