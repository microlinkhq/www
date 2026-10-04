import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import { INSTALL_COMMAND } from '../../../src/helpers/install-command'
import { colors } from '../../../src/theme'

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

const readSource = file =>
  fs.readFileSync(
    path.join(process.cwd(), 'src/components/pages/home/hero', file),
    'utf8'
  )

const badgeSource = readSource('badge.js')
const heroSource = readSource('index.js')

describe('home hero badge contrast', () => {
  test('badge text meets WCAG 1.4.3 AA for normal text (4.5:1)', () => {
    expect(
      contrast(hexToRgb(colors.gray7), badgeBackground)
    ).toBeGreaterThanOrEqual(4.5)
  })

  test('badge reuses the shared footer status dot', () => {
    expect(badgeSource).toContain('<Dot.Success />')
  })
})

describe('home hero badge copy swap', () => {
  test('badge carries the requests stat and the install command', () => {
    expect(badgeSource).toContain('Handling {reqsPretty}+ requests every month')
    expect(badgeSource).toContain('<Command>{INSTALL_COMMAND}</Command>')
    expect(INSTALL_COMMAND).toBe('npx microlink.io setup')
  })

  test('the hero renders the swapping badge', () => {
    expect(heroSource).toContain('<HeroBadge />')
  })

  test('both copies share one grid cell so the pill never resizes', () => {
    expect(badgeSource).toContain('grid-area: 1 / 1')
    expect(badgeSource).toContain("display: 'inline-grid'")
  })

  test('the swap only animates opacity and transform', () => {
    const anchor = 'const swapCopy = keyframes`'
    const start = badgeSource.indexOf(anchor) + anchor.length
    const frames = badgeSource.slice(start, badgeSource.indexOf('`', start))
    const properties = [...frames.matchAll(/([a-z-]+):/g)].map(([, p]) => p)
    expect(new Set(properties)).toEqual(new Set(['opacity', 'transform']))
  })

  test('the swap runs only when motion is allowed', () => {
    const [beforeMotionGate, motionGate] = badgeSource.split(
      '@media (prefers-reduced-motion: no-preference)'
    )
    expect(motionGate).toMatch(/animation: \$\{swapCopy\}/)
    expect(beforeMotionGate.split('const Copy = styled')[1]).not.toContain(
      'animation'
    )
  })

  test('the second copy stays hidden when the swap does not run', () => {
    const [beforeMotionGate] = badgeSource.split(
      '@media (prefers-reduced-motion: no-preference)'
    )
    expect(beforeMotionGate).toMatch(
      /&:nth-child\(n \+ 2\) \{\s+opacity: 0;\s+\}/
    )
  })

  test('hovering pauses the swap', () => {
    expect(badgeSource).toMatch(
      /&:hover \$\{Copy\} \{\s+animation-play-state: paused;/
    )
  })
})
