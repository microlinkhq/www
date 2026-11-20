import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const ROOT = path.resolve(__dirname, '../..')

const rows = () =>
  execFileSync('bash', ['.agents/skills/alternative-pages/inventory.sh'], {
    cwd: ROOT,
    encoding: 'utf8'
  })
    .trim()
    .split('\n')
    .map(line => {
      const [slug, family, checked] = line.split('\t')
      return { slug, family, checked }
    })

describe('alternative page inventory', () => {
  test('lists the 21 pages, skips the index, and dates every price card', () => {
    const list = rows()
    expect(list.map(row => row.slug)).not.toContain('index')
    expect(list).toHaveLength(21)
    const priceCards = list.filter(row => row.family === 'price-card')
    const references = list.filter(row => row.family === 'reference')
    expect(priceCards).toHaveLength(13)
    expect(references).toHaveLength(8)
    for (const row of priceCards) {
      expect(row.checked).toMatch(/^checked=\d{4}-\d{2}-\d{2}$/)
    }
  })
})
