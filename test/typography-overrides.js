import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

// Design spec: the typography components (Heading, Subhead, Caption) own their
// size. Call sites MUST NOT pass fontSize / lineHeight / letterSpacing — the
// component default carries them, so every page stays consistent. This test
// fails the build when a per-call override sneaks in (usually AI-generated
// pages that don't follow the spec).
//
// Sanctioned escapes (a heading that legitimately needs a different size):
//   1. fontSize: 'inherit'            — a gradient sub-span tracking its parent
//   2. forwardedAs='div'              — a stat-number display reusing the style
//   3. a named UPPER_SNAKE constant   — a deliberate, centrally-defined token
//                                        (e.g. CARD_TITLE_FONT_SIZE)
//   4. Storybook demos (*.stories.*, story.jsx, patterns/Legend)

const SRC = path.join(process.cwd(), 'src')
const COMPONENTS = ['Heading', 'Subhead', 'Caption']
const PROP = /(fontSize|lineHeight|letterSpacing):/
const SKIP = /\.stories\.|[\\/]story\.jsx$|[\\/]Legend[\\/]/

const walk = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      return entry.name === 'node_modules' ? [] : walk(full)
    }
    return /\.jsx?$/.test(entry.name) ? [full] : []
  })

const isSanctioned = tag =>
  /fontSize:\s*['"]inherit['"]/.test(tag) ||
  /forwardedAs=['"]div['"]/.test(tag) ||
  /(fontSize|lineHeight|letterSpacing):\s*[A-Z][A-Z0-9_]+\b/.test(tag)

const findOverrides = file => {
  const lines = fs.readFileSync(file, 'utf8').split('\n')
  const open = new RegExp(`<(${COMPONENTS.join('|')})\\b`)
  const close = new RegExp(`</(${COMPONENTS.join('|')})`)
  const hits = []
  let inTag = false
  let comp = ''
  let tag = ''
  let start = 0
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(open)
    if (!inTag && m && !close.test(lines[i])) {
      inTag = true
      comp = m[1]
      tag = ''
      start = i
    }
    if (inTag) {
      tag += lines[i] + '\n'
      // the opening tag closes at the first '>' that is not part of '=>'
      if (/>/.test(lines[i].replace(/=>/g, ''))) {
        if (PROP.test(tag) && !isSanctioned(tag)) {
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
      .filter(f => !SKIP.test(f))
      .flatMap(findOverrides)

    expect(
      violations,
      violations.length
        ? `\n\nRemove these per-call typography overrides — use the component default instead:\n  ${violations.join(
          '\n  '
        )}\n\nIf a heading genuinely needs a different size, use one of the sanctioned escapes documented in test/typography-overrides.js (inherit, forwardedAs='div', or a named UPPER_SNAKE constant).\n`
        : undefined
    ).toEqual([])
  })
})
