import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const WORD_BREAK_MIXIN = ['$', '{wordBreak}'].join('')

const CODE_COMPONENTS = [
  'src/components/elements/CodeEditor/CodeEditor.js',
  'src/components/elements/Terminal/Terminal.js'
]

const styledBlocksWithWordBreak = src =>
  [...src.matchAll(/styled\([^)]*\)`([^`]*)`/g)]
    .map(match => match[1])
    .filter(block => block.includes(WORD_BREAK_MIXIN))

describe('code blocks', () => {
  test.each(CODE_COMPONENTS)('%s never hyphenates code', file => {
    const src = fs.readFileSync(path.join(process.cwd(), file), 'utf8')
    const blocks = styledBlocksWithWordBreak(src)
    expect(blocks.length).toBeGreaterThan(0)
    blocks.forEach(block => expect(block).toMatch(/hyphens:\s*none/))
  })
})
