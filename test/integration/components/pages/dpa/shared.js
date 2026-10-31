import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const ROOT = process.cwd()
const read = file => fs.readFileSync(path.join(ROOT, file), 'utf8')

const shared = read('src/components/pages/dpa/shared.js')
const dpa = read('src/content/dpa.md')

const legalSections = () => {
  const [, body] = shared.match(/LEGAL_SECTIONS = \[([\s\S]*?)\]/)
  return [...body.matchAll(/'([^']+)'/g)].map(([, title]) => title)
}

const headings = [...dpa.matchAll(/^## (.+)$/gm)].map(([, title]) => title)

describe('dpa page', () => {
  test('the table of contents lists every legal heading, in order', () => {
    expect(headings.length).toBeGreaterThan(0)
    expect(headings).toEqual(legalSections())
  })
})
