import { expect, test } from 'vitest'

import { EXAMPLES } from '../../src/components/pages/editor/examples'
import {
  editorLanguage,
  isTypeScriptFile,
  nextFileName
} from '../../src/components/pages/editor/shared'
import { toModuleSource } from '../../src/components/pages/editor/to-module-source'

const typescriptExample = EXAMPLES.find(example => example.id === 'typescript')

test('detects TypeScript files', () => {
  expect(isTypeScriptFile('scrape.ts')).toBe(true)
  expect(isTypeScriptFile('helper.tsx')).toBe(true)
  expect(isTypeScriptFile('main.mjs')).toBe(false)
  expect(editorLanguage('scrape.ts')).toBe('typescript')
  expect(editorLanguage('main.mjs')).toBe('javascript')
})

test('names new helpers with the project extension', () => {
  expect(nextFileName({ 'main.mjs': '' })).toBe('helper.mjs')
  expect(nextFileName({ 'main.mjs': '', 'scrape.ts': '' })).toBe('helper.ts')
})

test('strips types from a TypeScript module', async () => {
  const source = `export const scrape = ({ page }: { page: { title: () => Promise<string> } }) =>
  page.title()
`
  const code = await toModuleSource('scrape.ts', source)
  expect(code).toContain('export const scrape')
  expect(code).not.toContain(': { page:')
})

test('transpiles the TypeScript template', async () => {
  const code = await toModuleSource(
    'scrape.ts',
    typescriptExample.files['scrape.ts']
  )
  expect(code).toContain('export const scrape')
  expect(code).not.toContain('type Page')
  expect(code).not.toContain('$eval: <T>')
})
