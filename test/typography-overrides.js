import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const SRC = path.join(process.cwd(), 'src')
const COMPONENTS = ['Heading', 'Subhead', 'Caption']
const PROP = /(fontSize|lineHeight|letterSpacing)\s*[:=]/
const SANCTIONED = [
  /(fontSize|lineHeight|letterSpacing)\s*[:=]\s*\{?\s*['"]inherit['"]/,
  /forwardedAs=['"]div['"]/,
  /(fontSize|lineHeight|letterSpacing)\s*[:=]\s*\{?\s*[A-Z][A-Z0-9_]+/
]
const SKIP = /\.stories\.|[\\/]story\.jsx$|[\\/]Legend[\\/]/

const walk = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      return entry.name === 'node_modules' ? [] : walk(full)
    }
    return /\.[jt]sx?$/.test(entry.name) ? [full] : []
  })

const isSanctioned = openingTag =>
  SANCTIONED.some(rule => rule.test(openingTag))

const findOverrides = file => {
  const open = new RegExp(`<(${COMPONENTS.join('|')})\\b`)
  const lines = fs.readFileSync(file, 'utf8').split('\n')
  const hits = []
  let inTag = false
  let comp = ''
  let openingTag = ''
  let start = 0
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(open)
    if (!inTag && match) {
      inTag = true
      comp = match[1]
      openingTag = ''
      start = i
    }
    if (inTag) {
      const tagEnd = lines[i].replace(/=>/g, '  ').indexOf('>')
      const isTagClosed = tagEnd !== -1
      openingTag += (isTagClosed ? lines[i].slice(0, tagEnd) : lines[i]) + '\n'
      if (isTagClosed) {
        if (PROP.test(openingTag) && !isSanctioned(openingTag)) {
          hits.push(
            `${path.relative(process.cwd(), file)}:${start + 1} <${comp}>`
          )
        }
        inTag = false
      }
    }
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
