import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const root = process.cwd()
const analytics = fs.readFileSync(
  path.join(root, 'src/components/pages/home/analytics.js'),
  'utf8'
)

describe('home analytics band', () => {
  test('layers the supplied Upstash globe artwork behind the Fast Anywhere display title', () => {
    expect(
      fs.existsSync(path.join(root, 'static/images/upstash-globe-light.webp'))
    ).toBe(true)
    expect(analytics).toContain("src='/images/upstash-globe-light.webp'")
    expect(analytics).toContain("alt='Global edge network'")
    expect(analytics).toContain(
      "const FAST_TITLE_FONT_SIZE = 'clamp(64px, 12vw, 180px)'"
    )
    expect(analytics).toContain("id='fast-anywhere-title'")
    expect(analytics).toContain("top: ['64px', '64px', '96px', '96px']")
    expect(analytics).not.toContain("borderRadius: '50%'")
    expect(analytics).toContain(
      "maskImage: 'url(/images/upstash-globe-light.webp)'"
    )
    expect(analytics).toContain("mixBlendMode: 'multiply'")
  })

  test('keeps the production metrics compact and legible across screen sizes', () => {
    expect(analytics).toContain("'repeat(4, minmax(0, 1fr))'")
    expect(analytics).toContain("minWidth: 0, textAlign: 'center'")
    expect(analytics).toContain("fontVariantNumeric: 'tabular-nums'")
    expect(analytics).toContain("height: ['320px', '400px', '500px', '500px']")
    expect(analytics).toContain(
      'zIndex: 2,\n        right: 0,\n        bottom: SECTION_VERTICAL_SPACING'
    )
    expect(analytics).toContain('linear-gradient(transparent,')
    expect(analytics).toContain('colors.white')
  })
})
