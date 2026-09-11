import { expect, test } from 'vitest'

import { formatSyntaxError } from '../../src/components/pages/editor/syntax-errors'

test('formats monaco syntax errors', () => {
  expect(
    formatSyntaxError([
      {
        file: 'main.mjs',
        line: 1,
        column: 5,
        message: "';' expected."
      },
      {
        file: 'scrape.ts',
        line: 4,
        column: 12,
        message: "'}' expected."
      }
    ])
  ).toEqual({
    name: 'SyntaxError',
    message: "main.mjs:1:5 ';' expected.\nscrape.ts:4:12 '}' expected."
  })
})
