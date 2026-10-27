import { describe, expect, it } from 'vitest'
import { readFileSync } from 'fs'
import { gzipSync } from 'zlib'
import path from 'path'

import {
  generate,
  serialize,
  OUTPUT_FILE
} from '../../../scripts/build-feature-icons'
import { ICONS } from '../../../scripts/build-feature-icons/models'

const GZIP_BUDGET_BYTES = 30 * 1024
const GENERATION_TIMEOUT_MS = 60 * 1000

const PRODUCTION = readFileSync(
  path.join(process.cwd(), 'src/components/pages/home/production.js'),
  'utf8'
)
const COMMITTED = readFileSync(OUTPUT_FILE, 'utf8')
const GEOMETRY = JSON.parse(COMMITTED)

describe('feature icons', () => {
  it('every production card names a generated icon', () => {
    const used = [...PRODUCTION.matchAll(/icon: '([^']+)'/g)].map(
      ([, id]) => id
    )
    expect(used).toHaveLength(6)
    expect(PRODUCTION).toContain('<FeatureIcon name={icon} />')
    expect(PRODUCTION).toContain('[FEATURE_CARD_ATTRIBUTE]: true')
    expect(Object.keys(GEOMETRY).sort()).toEqual([...used].sort())
  })

  it(
    'geometry.json was generated from the current models',
    () => {
      expect(COMMITTED).toBe(serialize(generate()))
    },
    GENERATION_TIMEOUT_MS
  )

  it('stays inside the home page payload budget', () => {
    expect(gzipSync(COMMITTED).length).toBeLessThanOrEqual(GZIP_BUDGET_BYTES)
  })

  it.each(ICONS.map(icon => [icon.id]))(
    '%s fits the card and every part can move on hover',
    id => {
      const icon = GEOMETRY[id]
      expect(icon.width).toBeLessThanOrEqual(240)
      expect(icon.height).toBeLessThanOrEqual(168)
      expect(icon.viewBox.every(Number.isFinite)).toBe(true)
      expect(icon.accentSpan.every(Number.isFinite)).toBe(true)
      expect(icon.parts.some(part => part.accent)).toBe(true)
      expect(icon.parts.some(part => part.shift.some(n => n !== 0))).toBe(true)
      for (const part of icon.parts) {
        expect(part.shift.every(Number.isFinite)).toBe(true)
        expect(part.lines.outline).toMatch(/^m-?[\d.]/)
        expect(Object.values(part.lines).join('')).not.toMatch(/NaN|Infinity/)
      }
    }
  )
})
