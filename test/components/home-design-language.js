import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const read = file =>
  fs.readFileSync(path.join(process.cwd(), 'src', file), 'utf8')

const products = read('components/pages/home/products.js')
const hero = read('components/pages/home/hero.js')
const production = read('components/pages/home/production.js')
const home = read('pages/index.js')

describe('home design language', () => {
  test('products grid uses theme palette instead of a private one', () => {
    const offPalette = [
      '#7c3aed',
      '#ec4899',
      '#4f5bd5',
      '#f2542d',
      '#eef0f4',
      '#c026d3',
      '#8b8f9a',
      '#161821'
    ]
    for (const hex of offPalette) {
      expect(products.toLowerCase()).not.toContain(hex)
    }
  })

  test('products grid matches the production section width and padding', () => {
    for (const source of [products, production]) {
      expect(source).toContain("maxWidth: '1180px'")
      expect(source).toContain('px: [3, 3, 4]')
    }
    expect(products).not.toContain('1280px')
    expect(products).not.toContain('clamp(16px, 4vw, 28px)')
  })

  test('products section opens like every other home section', () => {
    expect(products).toContain('<Subhead>')
    expect(products).toContain("<Subhead variant='gradient' as='span'>")
    expect(products).toContain('pt: [4, 4, 5, 5]')
    expect(products).not.toMatch(/<Heading\b/)
  })

  test('every product card gets its icon from the shared catalog', () => {
    expect(products).toContain('icon: Icon')
    expect(products).not.toMatch(/icon=\{</)
    const extra = products.slice(
      products.indexOf('const EXTRA'),
      products.indexOf('const CATALOG')
    )
    expect(extra.match(/icon:/g)).toHaveLength(3)
  })

  test('window chrome uses the shared traffic light tokens', () => {
    expect(products).toContain('colors.fullscreen')
    expect(products).toContain('colors.minimize')
    expect(products).toContain('colors.close')
  })

  test('hero accents come from the theme, not a private gradient', () => {
    expect(hero).toContain('const GRADIENT = gradient')
    expect(hero).toContain('const PINK = colors.secondary')
    expect(hero.toLowerCase()).not.toContain('#ff1e8c')
    expect(hero.toLowerCase()).not.toContain('#9b26d6')
    expect(hero.toLowerCase()).not.toContain('#b026e0')
  })

  test('hero code panel speaks the docs syntax palette', () => {
    const syntax = hero.slice(
      hero.indexOf('const SYNTAX'),
      hero.indexOf('const reduceMotion')
    )
    expect(syntax).toContain('key: colors.link')
    expect(syntax).toContain('boolean: colors.secondary')
    expect(syntax).toContain('string: colors.gray9')
  })

  test('pricing header reuses the canonical Subhead gradient pattern', () => {
    expect(home).toContain("<Subhead variant='gradient' as='span'>")
    expect(home).not.toContain('textGradient')
    expect(home).not.toContain("fontSize: ['34px'")
  })
})
