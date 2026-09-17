import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { expect, test } from 'vitest'

import { MICROLINK_DTS } from '../../src/components/pages/editor/monaco-dts'
import {
  MICROLINK_TYPES,
  PUPPETEER_CORE_TYPES
} from '../../src/components/pages/editor/monaco-types'

const require = createRequire(import.meta.url)
const published = readFileSync(
  join(dirname(require.resolve('microlink.io')), 'index.d.ts'),
  'utf8'
)

test('uses published microlink.io types for the function callback', () => {
  expect(MICROLINK_DTS).toBe(published)
  expect(MICROLINK_TYPES).toContain('page: Page')
  expect(MICROLINK_TYPES).toContain('response: HTTPResponse')
  expect(MICROLINK_TYPES).toContain('url: string')
  expect(MICROLINK_TYPES).toContain('code: FunctionInput')
  expect(MICROLINK_TYPES).toContain('search: GoogleClient')
})

test('stubs Puppeteer page methods Monaco cannot resolve', () => {
  for (const member of [
    'title()',
    'url()',
    '$eval<T>',
    '$$eval<T>',
    'evaluate<T>',
    'waitForSelector',
    'waitForNavigation',
    'click(',
    'content()',
    'keyboard:'
  ]) {
    expect(PUPPETEER_CORE_TYPES).toContain(member)
  }
})
