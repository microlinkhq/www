import { describe, expect, it } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import path from 'path'

import { renderIcon, OUTPUT_DIR } from '../../../scripts/build-feature-icons'
import { ICONS } from '../../../scripts/build-feature-icons/models'

const PRODUCTION = readFileSync(
  path.join(process.cwd(), 'src/components/pages/home/production.js'),
  'utf8'
)

const committed = id => readFileSync(path.join(OUTPUT_DIR, `${id}.svg`), 'utf8')

const frameOf = svg => ({
  width: svg.match(/<svg[^>]* width="(\d+)"/)[1],
  height: svg.match(/<svg[^>]* height="(\d+)"/)[1],
  viewBox: svg
    .match(/viewBox="([^"]+)"/)[1]
    .split(' ')
    .map(n => Number(n).toFixed(1)),
  title: svg.match(/<title>([^<]+)<\/title>/)[1]
})

describe('feature icons', () => {
  it('every production card points at a generated icon', () => {
    const used = [...PRODUCTION.matchAll(/icon: '([^']+)'/g)].map(
      ([, id]) => id
    )
    expect(used).toHaveLength(6)
    expect(PRODUCTION).toMatch(/\/images\/icons\/features\/\$\{icon\}\.svg/)
    for (const id of used) {
      expect(ICONS.map(icon => icon.id)).toContain(id)
      expect(existsSync(path.join(OUTPUT_DIR, `${id}.svg`))).toBe(true)
    }
  })

  it.each(ICONS.map(icon => [icon.id, icon]))(
    '%s.svg was generated from its current model',
    (_, icon) => {
      expect(frameOf(committed(icon.id))).toEqual(frameOf(renderIcon(icon)))
    }
  )

  it.each(ICONS.map(icon => [icon.id]))(
    '%s.svg is self-contained and sized for the card',
    id => {
      const svg = committed(id)
      const { width, height } = frameOf(svg)
      expect(Number(width)).toBeLessThanOrEqual(246)
      expect(Number(height)).toBeLessThanOrEqual(174)
      expect(svg).not.toMatch(/href=|url\(|<script|NaN|Infinity/)
      expect(svg).toMatch(/\[data-line-role=outline\]\{stroke-width:/)
      expect(svg).toMatch(/data-line-role="outline"/)
    }
  )

  it('separates parts when exploded', () => {
    for (const icon of ICONS) {
      expect(frameOf(renderIcon(icon, 0))).not.toEqual(
        frameOf(renderIcon(icon, 1))
      )
    }
  })
})
