import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const root = process.cwd()
const analytics = fs.readFileSync(
  path.join(root, 'src/components/pages/home/analytics.js'),
  'utf8'
)

describe('home analytics band', () => {
  test('layers the supplied globe artwork behind the Fast Anywhere display title', () => {
    expect(
      fs.existsSync(path.join(root, 'static/images/fast-anywhere.png'))
    ).toBe(true)
    expect(analytics).toContain("src='/images/fast-anywhere.png'")
    expect(analytics).toContain("alt='Microlink’s global edge network'")
    expect(analytics).toContain(
      "const FAST_TITLE_FONT_SIZE = 'clamp(64px, 12vw, 180px)'"
    )
    expect(analytics).toContain("id='fast-anywhere-title'")
  })

  test('keeps the production metrics compact and legible across screen sizes', () => {
    expect(analytics).toContain("'repeat(4, minmax(0, 1fr))'")
    expect(analytics).toContain("fontVariantNumeric: 'tabular-nums'")
    expect(analytics).toContain("height: ['320px', '400px', '500px', '500px']")
    expect(analytics).toContain('linear-gradient(transparent,')
    expect(analytics).toContain('colors.white')
  })
})
