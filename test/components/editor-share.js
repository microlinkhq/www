import { expect, test } from 'vitest'

import {
  applyEditorParams,
  exampleFromSearch,
  sanitizeShareCode
} from '../../src/components/pages/editor/use-share'

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

test('writes the selected template into the query', () => {
  const url = new URL('https://microlink.io/editor')
  expect(applyEditorParams(url, { templateId: 'typescript' })).toBe(
    '/editor?template=typescript'
  )
})

test('replaces a share payload when a template is selected', () => {
  const url = new URL('https://microlink.io/editor?q=abc')
  expect(applyEditorParams(url, { templateId: 'eval' })).toBe(
    '/editor?template=eval'
  )
})

test('writes a share payload for custom files', () => {
  const url = new URL('https://microlink.io/editor?template=eval')
  expect(applyEditorParams(url, { templateId: 'custom', encoded: 'xyz' })).toBe(
    '/editor?q=xyz'
  )
})

test('resolves a known template from the query', () => {
  expect(exampleFromSearch('?template=typescript')?.id).toBe('typescript')
  expect(exampleFromSearch('?template=missing')).toBe(null)
})
