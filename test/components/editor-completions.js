import { expect, test } from 'vitest'

import { MICROLINK_TYPES } from '../../src/components/pages/editor/monaco-types'

test('types the function callback with a Puppeteer page', () => {
  expect(MICROLINK_TYPES).toContain('page: Page')
  expect(MICROLINK_TYPES).toContain('response: HTTPResponse')
  expect(MICROLINK_TYPES).toContain('url: string')
  expect(MICROLINK_TYPES).toContain('code: FunctionInput')
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
    expect(MICROLINK_TYPES).toContain(member)
  }
})
