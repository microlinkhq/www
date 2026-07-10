import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const source = fs.readFileSync(
  path.join(process.cwd(), 'src/components/pages/home/hero.js'),
  'utf8'
)

const extract = (start, end, name) =>
  // eslint-disable-next-line no-new-func
  new Function(
    `${source.slice(
      source.indexOf(start),
      source.indexOf(end)
    )}; return ${name}`
  )()

const parseLocal = extract(
  'const parseLocal',
  'const DEFAULT_URLS',
  'parseLocal'
)
const PROMPTS = extract('const PROMPTS', 'const parseLocal', 'PROMPTS')
const CYCLE = extract('const CYCLE', 'const EXAMPLES', 'CYCLE')
const EXAMPLES = extract('const EXAMPLES', 'const PROMPTS', 'EXAMPLES')

describe('home hero prompts', () => {
  test('example chips use the terse naming', () => {
    expect(EXAMPLES).toEqual([
      'take screenshot',
      'detect technologies',
      'extract metadata',
      'get markdown',
      'get logo'
    ])
  })

  test('every product prompt parses back to its vertical', () => {
    for (const [vertical, prompt] of Object.entries(PROMPTS)) {
      expect({ prompt, vertical: parseLocal(prompt).vertical }).toEqual({
        prompt,
        vertical
      })
    }
  })

  test('every example chip parses to the intended vertical', () => {
    const want = ['screenshot', 'technologies', 'metadata', 'markdown', 'logo']
    EXAMPLES.forEach((text, i) => {
      expect(parseLocal(text).vertical).toBe(want[i])
    })
  })

  test('every typing-cycle sentence parses to the intended vertical', () => {
    const want = [
      'screenshot',
      'pdf',
      'lighthouse',
      'technologies',
      'text',
      'function',
      'markdown',
      'logo'
    ]
    CYCLE.forEach((text, i) => {
      expect(parseLocal(text).vertical).toBe(want[i])
    })
  })

  test('composer wraps the URL segment in a tag over a transparent input', () => {
    expect(source).toContain('const UrlTag')
    expect(source).toContain('{dSegments.url}')
    const input = source.slice(
      source.indexOf('const ComposerInput'),
      source.indexOf('const InputWrap')
    )
    expect(input).toContain('color: transparent')
    expect(input).toContain('caret-color')
  })

  test('url tag is blue with a logo that swaps to a remove button', () => {
    const tag = source.slice(
      source.indexOf('const UrlTag'),
      source.indexOf('const Caret')
    )
    expect(tag).toContain('colors.blue')
    expect(tag).not.toContain('grape')
    expect(tag).toContain('pointer-events: auto')
    expect(source).toContain("aria-label='Remove URL'")
    expect(source).toContain('onClick={removeUrl}')
    expect(source).toContain("<LinkIcon className='logo'")
    expect(source).toContain("<CloseIcon className='close'")
    const remove = source.slice(
      source.indexOf('const removeUrl'),
      source.indexOf('const pickExample')
    )
    expect(remove).toContain('.replace(raw, ')
    expect(remove).toContain('.focus()')
  })
})
