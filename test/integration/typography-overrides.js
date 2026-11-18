import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import { SRC, tagEndAt, walk } from '../utils/jsx-source'

const COMPONENTS = ['Heading', 'Subhead', 'Caption']
const PROP = /(fontSize|lineHeight|letterSpacing)\s*[:=]/
const SANCTIONED = [
  /(fontSize|lineHeight|letterSpacing)\s*[:=]\s*\{?\s*['"]inherit['"]/,
  /forwardedAs=['"]div['"]/,
  /(fontSize|lineHeight|letterSpacing)\s*[:=]\s*\{?\s*[A-Z][A-Z0-9_]+/
]
const SKIP = /\.stories\.|[\\/]story\.jsx$|[\\/]Legend[\\/]/

const isSanctioned = openingTag =>
  SANCTIONED.some(rule => rule.test(openingTag))

const findOverrides = file => {
  const open = new RegExp(`<(${COMPONENTS.join('|')})(Base)?\\b`, 'g')
  const src = fs.readFileSync(file, 'utf8')
  const hits = []
  let match
  while ((match = open.exec(src))) {
    const end = tagEndAt(src, open.lastIndex)
    if (end === -1) break
    const openingTag = src.slice(match.index, end + 1)
    if (PROP.test(openingTag) && !isSanctioned(openingTag)) {
      const line = src.slice(0, match.index).split('\n').length
      const comp = match[1] + (match[2] || '')
      hits.push(`${path.relative(process.cwd(), file)}:${line} <${comp}>`)
    }
    open.lastIndex = end + 1
  }
  return hits
}

describe('typography components own their size', () => {
  test('no per-call fontSize / lineHeight / letterSpacing on Heading/Subhead/Caption', () => {
    const violations = walk(SRC)
      .filter(file => !SKIP.test(file))
      .flatMap(findOverrides)

    expect(
      violations,
      violations.length
        ? `\n\nRemove these per-call typography overrides — use the component default instead:\n  ${violations.join(
          '\n  '
        )}\n\nSanctioned escapes (see CLAUDE.md › Typography Components): fontSize: 'inherit', forwardedAs='div', or a named UPPER_SNAKE constant.\n`
        : undefined
    ).toEqual([])
  })
})
