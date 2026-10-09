import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const SRC = path.join(process.cwd(), 'src')
const SOURCE_FILE = /\.(jsx?|mdx?)$/
const TITLEIZE_REFERENCE =
  /\btitleize\b|\bomitTitleize\b|\bwithTitle\b|helpers\/title['"]|microsoft-capitalize/

const walk = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return SOURCE_FILE.test(entry.name) ? [full] : []
  })

const offendingLines = file =>
  fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .flatMap((line, index) =>
      TITLEIZE_REFERENCE.test(line)
        ? [`${path.relative(process.cwd(), file)}:${index + 1}: ${line.trim()}`]
        : []
    )

describe('headings render authored casing', () => {
  test('no source references the removed titleize machinery', () => {
    expect(walk(SRC).flatMap(offendingLines)).toEqual([])
  })

  test('microsoft-capitalize is not a dependency', () => {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
    )
    expect(pkg.dependencies).not.toHaveProperty('microsoft-capitalize')
    expect(pkg.devDependencies ?? {}).not.toHaveProperty('microsoft-capitalize')
  })
})
