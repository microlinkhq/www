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

  test('composer renders the URL as an atomic chip in a contenteditable', () => {
    expect(source).toContain('contentEditable')
    expect(source).toContain('composerHtml(dSegments')
    expect(source).toContain('contenteditable="false"')
    expect(source).toContain('dangerouslySetInnerHTML')
    const editor = source.slice(
      source.indexOf('const ComposerEditor'),
      source.indexOf('const CLOSE_ICON_SVG')
    )
    expect(editor).toContain('[data-url-tag]')
    expect(editor).not.toContain('grape')
  })

  test('url chip uses the docs inline-code style', () => {
    const editor = source.slice(
      source.indexOf('const ComposerEditor'),
      source.indexOf('const CLOSE_ICON_SVG')
    )
    const tag = editor.slice(editor.indexOf('[data-url-tag]'))
    expect(tag).toContain("color: 'secondary'")
    expect(tag).toContain("fontFamily: 'mono'")
    expect(tag).toContain("fontWeight: 'normal'")
    expect(tag).toContain('text-shadow: rgba(0, 0, 0, 0.05) 0px 1px')
    expect(tag).not.toContain('content:')
    expect(source).not.toContain('LINK_ICON_SVG')
  })

  test('url chip reveals a remove button on hover', () => {
    expect(source).toContain('aria-label="Remove URL"')
    expect(source).toContain('removeUrl()')
    const editor = source.slice(
      source.indexOf('const ComposerEditor'),
      source.indexOf('const CLOSE_ICON_SVG')
    )
    expect(editor).toContain('[data-url-tag]:hover [data-url-action]')
    const remove = source.slice(
      source.indexOf('const removeUrl'),
      source.indexOf('const pickExample')
    )
    expect(remove).toContain('.replace(raw, ')
    expect(remove).toContain('.focus()')
  })

  test('focusing mid-animation completes the current example', () => {
    const focus = source.slice(
      source.indexOf('const onEditorFocus'),
      source.indexOf('useIsomorphicLayoutEffect(')
    )
    expect(focus).toContain('anim.current.userTook')
    expect(focus).toContain('CYCLE[anim.current.ci]')
    expect(focus).toContain('pendingCaret.current = target.length')
  })

  test('caret survives re-renders via offset save and restore', () => {
    expect(source).toContain('const getCaretOffset')
    expect(source).toContain('const setCaretOffset')
    expect(source).toContain('pendingCaret.current = getCaretOffset(el)')
    expect(source).toContain('setCaretOffset(el, pendingCaret.current)')
  })
})
