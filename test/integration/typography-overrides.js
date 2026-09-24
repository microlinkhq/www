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

const tagEndAt = (src, from) => {
  let depth = 0
  let quote = null
  const tmpl = []
  for (let i = from; i < src.length; i++) {
    const c = src[i]
    if (quote) {
      if (c === '\\') {
        i++
      } else if (quote === '`' && c === '$' && src[i + 1] === '{') {
        tmpl.push(depth)
        depth++
        quote = null
        i++
      } else if (c === quote) {
        quote = null
      }
      continue
    }
    if (c === "'" || c === '"' || c === '`') {
      quote = c
    } else if (c === '{' || c === '[' || c === '(') {
      depth++
    } else if (c === '}' || c === ']' || c === ')') {
      depth--
      if (tmpl.length && depth === tmpl[tmpl.length - 1]) {
        tmpl.pop()
        quote = '`'
      }
    } else if (c === '>' && depth === 0) {
      return i
    }
  }
  return -1
}

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
