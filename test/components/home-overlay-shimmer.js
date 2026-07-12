import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const source = fs.readFileSync(
  path.join(process.cwd(), 'src/components/pages/home/overlay.js'),
  'utf8'
)

const blockFor = anchor => {
  const start = source.indexOf(anchor)
  return source.slice(start, source.indexOf('`', start + anchor.length))
}

describe('home overlay grid shimmer', () => {
  test('the perspective container blurs the grid in screen space', () => {
    const perspective = blockFor('perspective: 1000px')
    expect(perspective).toContain('filter: blur(1px)')
  })

  test('the animated plane itself stays unfiltered', () => {
    const plane = blockFor('mask-size: 80px 80px')
    expect(plane).not.toContain('filter:')
    expect(plane).toContain('animation:')
  })

  test('reduced motion still disables the translation', () => {
    const start = source.indexOf('@media (prefers-reduced-motion: reduce)')
    expect(start).toBeGreaterThan(-1)
    const block = source.slice(start, source.indexOf('}', start))
    expect(block).toContain('animation: none')
  })
})
