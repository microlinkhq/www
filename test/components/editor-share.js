import { expect, test } from 'vitest'

import { sanitizeShareCode } from '../../src/components/pages/editor/use-share'

test('strips unquoted apiKey literals', () => {
  expect(sanitizeShareCode("createClient({ apiKey: 'secret' })")).not.toContain(
    'secret'
  )
  expect(sanitizeShareCode("createClient({ apiKey: 'secret' })")).not.toContain(
    'apiKey'
  )
})

test('strips single-quoted apiKey keys', () => {
  expect(
    sanitizeShareCode("createClient({ 'apiKey': 'secret' })")
  ).not.toContain('secret')
})

test('strips double-quoted apiKey keys', () => {
  expect(
    sanitizeShareCode('createClient({ "apiKey": "secret" })')
  ).not.toContain('secret')
})

test('leaves code without an apiKey unchanged', () => {
  const source = "createClient({ ttl: '1d' })"
  expect(sanitizeShareCode(source)).toBe(source)
})
