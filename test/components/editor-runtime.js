import fs from 'node:fs'
import path from 'node:path'
import { expect, test } from 'vitest'

import {
  createRuntimeSrcdoc,
  decodeRpcValue,
  encodeRpcValue,
  FN_MARKER,
  RUNTIME_SANDBOX
} from '../../src/components/pages/editor/runtime-frame'

const withScriptSource = fs.readFileSync(
  path.join(process.cwd(), 'src/components/pages/editor/with-script.js'),
  'utf8'
)

test('runtime iframe is unique-origin', () => {
  expect(RUNTIME_SANDBOX).toBe('allow-scripts')
  expect(RUNTIME_SANDBOX).not.toContain('allow-same-origin')
  expect(withScriptSource).toContain('RUNTIME_SANDBOX')
  expect(withScriptSource).not.toContain('allow-same-origin')
})

test('srcdoc bootstrap stays unique-origin and origin-locked', () => {
  const srcdoc = createRuntimeSrcdoc('https://microlink.io')
  expect(srcdoc).toContain('https://microlink.io')
  expect(srcdoc).not.toContain('allow-same-origin')
  expect(srcdoc).toContain('event.origin !== parentOrigin')
  expect(srcdoc).toContain("type: 'mql'")
})

test('encodes functions as source strings for parent RPC', () => {
  const encoded = encodeRpcValue({
    fn: ({ page }) => page.title(),
    nested: [() => 42]
  })
  expect(encoded.fn[FN_MARKER]).toBe(true)
  expect(encoded.fn.source).toContain('page.title()')
  expect(encoded.nested[0][FN_MARKER]).toBe(true)
  expect(decodeRpcValue(encoded)).toEqual({
    fn: encoded.fn.source,
    nested: [encoded.nested[0].source]
  })
})

test('leaves cloneable values unchanged', () => {
  const value = { url: 'https://example.com', opts: { ttl: '1d' } }
  expect(encodeRpcValue(value)).toEqual(value)
  expect(decodeRpcValue(value)).toEqual(value)
})
