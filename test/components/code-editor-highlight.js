import { describe, expect, test } from 'vitest'
import { lang } from 'sugar-high/lang'

import {
  highlightSource,
  toAlias
} from '../../src/components/elements/CodeEditor/highlight-source.js'

const tokenValues = (html, className) =>
  [
    ...html.matchAll(
      new RegExp(`class="[^"]*${className}[^"]*"[^>]*>([^<]*)`, 'g')
    )
  ]
    .map(match => match[1])
    .filter(Boolean)

const lineHasClass = (html, className) =>
  html.split('\n').map(line => line.includes(className))

describe('highlightSource', () => {
  test('marks the bash command after a $ prompt', () => {
    const html = highlightSource(
      "$ curl -i -I -X GET 'https://api.microlink.io'",
      'bash'
    )

    expect(tokenValues(html, 'sh__token--bash-command')).toEqual(['curl'])
    expect(tokenValues(html, 'sh__token--identifier')).toContain('$')
  })

  test('marks a bare bash command and comments', () => {
    const html = highlightSource(
      '# fetch metadata\ncurl https://api.microlink.io\necho done # inline',
      'bash'
    )

    expect(tokenValues(html, 'sh__token--bash-command')).toEqual([
      'curl',
      'echo'
    ])
    expect(tokenValues(html, 'sh__token--comment')).toEqual([
      '# fetch metadata',
      '# inline'
    ])
  })

  test('mutes SFC usage banners and leaves the script live', () => {
    const html = highlightSource(
      `<!--
  Link preview
-->
<script>
  const x = 1
</script>`,
      'sfc'
    )
    const muted = lineHasClass(html, 'sh__token--html-comment')

    expect(muted.slice(0, 3)).toEqual([true, true, true])
    expect(muted[3]).toBe(false)
    expect(html).toContain('const')
  })

  test('does not treat <!DOCTYPE as an SFC comment opener', () => {
    const html = highlightSource(
      `<!DOCTYPE html>
<!-- banner -->
<script></script>`,
      'sfc'
    )
    const muted = lineHasClass(html, 'sh__token--html-comment')

    expect(muted[0]).toBe(false)
    expect(muted[1]).toBe(true)
    expect(muted[2]).toBe(false)
  })

  test('resolves editor languages to sugar-high grammars', () => {
    expect(lang('bash')).toBe('shell')
    expect(lang('js')).toBe('javascript')
    expect(lang('python')).toBe('python')
    expect(lang('go')).toBe('go')
    expect(lang('php')).toBe('php')

    expect(highlightSource('# wait', 'python')).toContain('sh__token--comment')
    expect(highlightSource('# wait', 'js')).not.toContain('sh__token--comment')
  })

  test('does not highlight plaintext URLs as javascript comments', () => {
    const url =
      'https://api.microlink.io/?url=https://example.com&function=()=>5*5'

    expect(highlightSource(url, 'text')).toBe(
      'https://api.microlink.io/?url=https://example.com&amp;function=()=&gt;5*5'
    )
    expect(highlightSource(url, 'js')).toContain('sh__token--comment')
  })

  test('aliases languages sugar-high does not ship a grammar for', () => {
    expect(lang('ruby')).toBeUndefined()
    expect(lang(toAlias('ruby'))).toBe('python')
    expect(lang(toAlias('Node.js'))).toBe('javascript')
    expect(lang(toAlias('cURL'))).toBe('shell')
  })

  test('keeps Ruby comments out of the code', () => {
    const html = highlightSource(
      "# GET /pdf?url=https://example.com\n'pdf.format': 'A4', # Letter | Legal",
      toAlias('ruby')
    )

    expect(tokenValues(html, 'sh__token--comment')).toEqual([
      '# GET /pdf?url=https://example.com',
      '# Letter | Legal'
    ])
  })
})
