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
    expect(badgeSource).toMatch(
      /<\/Prompt>\s+\{INSTALL_COMMAND\}\s+<\/CommandCopy>/
    )
    expect(INSTALL_COMMAND).toBe('npx microlink.io setup')
  })

  test('the hero renders the swapping badge', () => {
    expect(heroSource).toContain('<HeroBadge />')
  })

  test('both copies share one grid cell so the pill never resizes', () => {
    expect(badgeSource).toContain('grid-area: 1 / 1')
    expect(badgeSource).toContain("display: 'inline-grid'")
  })

  const keyframeProperties = name => {
    const anchor = `const ${name} = keyframes\``
    const start = badgeSource.indexOf(anchor) + anchor.length
    const frames = badgeSource
      .slice(start, badgeSource.indexOf('`', start))
      .replace(/\$\{[^}]+\}/g, '')
    return new Set([...frames.matchAll(/([a-z-]+):/g)].map(([, p]) => p))
  }

  test('the swap never animates a layout property', () => {
    expect(keyframeProperties('swapCopy')).toEqual(
      new Set(['opacity', 'z-index', 'transform'])
    )
  })

  test('the reduced-motion swap fades without movement', () => {
    expect(keyframeProperties('fadeCopy')).toEqual(
      new Set(['opacity', 'z-index'])
    )
  })

  test('movement is opt-in for users who allow motion', () => {
    expect(badgeSource).toMatch(/animation: \$\{fadeCopy\}/)
    expect(badgeSource).toMatch(
      /@media \(prefers-reduced-motion: no-preference\) \{\s+animation-name: \$\{swapCopy\};/
    )
  })

  test('the reduced-motion fade outlives the global one-shot override', () => {
    expect(badgeSource).toMatch(
      /\$\{REDUCED_MOTION_MEDIA\} \{\s+animation-duration: \$\{SWAP_CYCLE_MS\}ms !important;\s+animation-iteration-count: infinite !important;/
    )
  })

  test('timing and travel come from theme tokens', () => {
    expect(badgeSource).toContain('const SWAP_SHIFT = space[1]')
    expect(badgeSource).toContain(
      'const SWAP_PHASE_PERCENT = (speed.quickly / SWAP_CYCLE_MS) * 100'
    )
    expect(badgeSource).toMatch(/\$\{SWAP_CYCLE_MS\}ms \$\{timings\.long\}/)
  })

  test('the hidden copy sits under the visible one', () => {
    expect(badgeSource).toMatch(
      /&:nth-child\(n \+ 2\) \{\s+opacity: 0;\s+z-index: 0;/
    )
  })

  test('hovering or copying the command pauses the swap', () => {
    expect(badgeSource).toMatch(
      /&:has\(button:hover\) \$\{Copy\} \{\s+animation-play-state: paused;/
    )
    expect(badgeSource).toMatch(
      /&\[data-copied='true'\] \$\{Copy\} \{\s+animation-play-state: paused;/
    )
  })

  test('keyboard focus pins the command in view', () => {
    expect(badgeSource).toMatch(
      /&:has\(button:focus-visible\) \$\{CommandCopy\} \{\s+opacity: 1;/
    )
  })
})

describe('home hero badge copy command', () => {
  test('the command is a real button that copies the install command', () => {
    expect(badgeSource).toContain("attrs({ as: 'button', type: 'button' })")
    expect(badgeSource).toContain('onClick={copyInstallCommand}')
    expect(badgeSource).toContain('.writeText(INSTALL_COMMAND)')
  })

  test('the button name includes the visible command', () => {
    expect(badgeSource).toMatch(
      /aria-label=\{`Copy install command: \$\{INSTALL_COMMAND\}`\}/
    )
  })

  test('copy feedback is announced politely', () => {
    expect(badgeSource).toContain("aria-live='polite'")
    expect(badgeSource).toContain("copied ? 'Install command copied' : ''")
  })
})
