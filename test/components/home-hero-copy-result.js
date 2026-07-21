import { describe, expect, test } from 'vitest'
import { sourceHarness } from '../utils/eval-source.mjs'

const { source, slice, evaluate } = sourceHarness(
  'src/components/pages/home/hero/result-panel.js'
)

const helpers = [
  "const INSTALL_COMMENT = '// npm install microlink.io'",
  slice('const jsValueText', 'const CopyResultButton')
].join('\n')

const copyPayload = evaluate(helpers, 'copyPayload')
const snippetText = evaluate(helpers, 'snippetText')

describe('hero copy result', () => {
  test('the tab bar hosts a copy result button', () => {
    expect(source).toContain("aria-label='Copy result'")
    expect(source).toContain('copyPayload(req, tab, snippet, snippetArg)')
    expect(source).toContain("trackEvent('hero copy result'")
  })

  const API_URL = 'https://api.microlink.io/?url=x'
  const REQUEST_COMMENT = `// ${API_URL}\n`

  test('every copy starts with the request as a comment', () => {
    const req = { apiUrl: API_URL, body: { status: 'success' } }
    expect(copyPayload(req, 'data').startsWith(REQUEST_COMMENT)).toBe(true)
  })

  test('output and data tabs copy the pretty printed response', () => {
    const req = {
      apiUrl: API_URL,
      body: { status: 'success', data: { url: 'x' } }
    }
    const json = REQUEST_COMMENT + JSON.stringify(req.body, null, 2)
    expect(copyPayload(req, 'output')).toBe(json)
    expect(copyPayload(req, 'data')).toBe(json)
  })

  test('headers tab copies header lines', () => {
    const req = {
      apiUrl: API_URL,
      headerRows: [
        { k: 'a', v: '1' },
        { k: 'b', v: '2' }
      ]
    }
    expect(copyPayload(req, 'headers')).toBe(REQUEST_COMMENT + 'a: 1\nb: 2')
  })

  test('timing tab copies the metric rows', () => {
    const req = {
      apiUrl: API_URL,
      rows: [{ name: 'total', dur: '10.0ms', pct: '100.0%' }]
    }
    expect(copyPayload(req, 'timing')).toBe(
      REQUEST_COMMENT + 'total  10.0ms  100.0%'
    )
  })

  test('code tab copies the runnable snippet', () => {
    const snippet = {
      binding: 'screenshot',
      method: 'screenshot',
      log: 'screenshot.url',
      comment: 'hosted screenshot URL'
    }
    const text = snippetText(snippet, 'https://example.com')
    expect(text).toContain('// npm install microlink.io')
    expect(text).toContain(
      "const screenshot = await microlink.screenshot('https://example.com')"
    )
    expect(text).toContain('console.log(screenshot.url)')
    const withOpts = snippetText(
      { ...snippet, opts: { animated: true } },
      'https://example.com'
    )
    expect(withOpts).toContain("('https://example.com', { animated: true })")
  })
})
