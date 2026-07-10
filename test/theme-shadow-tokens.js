import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import { shadows, shadowInk } from '../src/theme/index.js'

const SRC = path.join(process.cwd(), 'src')

const walk = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return entry.name.endsWith('.js') ? [full] : []
  })

/* eslint-disable no-template-curly-in-string */
const RETIRED_VALUES = [
  '0 24px 64px ${colors.black20}, 0 4px 16px ${colors.black10}',
  '0 25px 50px ${colors.black10}, 0 0 0 1px ${colors.black05}',
  '0 16px 40px ${colors.black20}',
  '0 12px 40px ${colors.black20}',
  '0 12px 32px ${colors.black10}',
  '0 8px 24px ${colors.black10}',
  '0 8px 32px ${colors.black10}',
  '0 4px 16px ${colors.black10}',
  '0 4px 18px ${colors.black10}',
  '0 4px 12px ${colors.black10}',
  '0 2px 8px ${colors.black05}',
  '0 1px 2px ${colors.black05}',
  '0 1px 3px ${colors.black10}',
  '0 1px 4px ${colors.black10}',
  '0 0 0 1px ${colors.black10}'
]
/* eslint-enable no-template-curly-in-string */

describe('theme shadow tokens', () => {
  test('exposes the ink-tinted elevation ladder', () => {
    expect(Array.isArray(shadows)).toBe(true)
    expect(shadows).toHaveLength(5)
    for (const value of shadows) {
      expect(value).toContain(`rgba(${shadowInk}`)
    }
  })

  test('elevation steps are ordered by vertical offset', () => {
    const offsets = shadows.map(value => parseInt(value.split(' ')[1], 10))
    expect(offsets).toEqual([...offsets].sort((a, b) => a - b))
  })

  test('no component hardcodes a retired shadow value', () => {
    const offenders = []
    for (const file of walk(SRC)) {
      const source = fs.readFileSync(file, 'utf8')
      for (const value of RETIRED_VALUES) {
        if (source.includes(value)) {
          offenders.push(`${path.relative(SRC, file)}: ${value}`)
        }
      }
    }
    expect(offenders).toEqual([])
  })
})
