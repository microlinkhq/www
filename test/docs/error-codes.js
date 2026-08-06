import { readFileSync } from 'fs'
import { expect, test } from 'vitest'

import { getErrorMeta } from '../../src/helpers/api-error'

const read = path =>
  readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8')

const documentedCodes = read('src/content/docs/api/basics/error-codes.md')
  .split('\n')
  .filter(line => line.startsWith('## '))
  .map(line => line.slice(3).trim())

const { redirects } = JSON.parse(read('vercel.json'))

test('every error code has a heading', () => {
  expect(documentedCodes.length).toBeGreaterThan(0)
  documentedCodes.forEach(code => expect(code).toBe(code.toUpperCase()))
})

// The API answers with `more: https://microlink.io/<code>`, so a code without
// its redirect ships a 404 to whoever hits the error.
test('every error code resolves from its short URL', () => {
  documentedCodes.forEach(code => {
    const source = `/${code.toLowerCase()}`
    const redirect = redirects.find(redirect => redirect.source === source)

    expect(redirect, `missing redirect for ${source}`).toBeDefined()
    expect(redirect.destination).toBe(
      `/docs/api/basics/error-codes#${code.toLowerCase()}`
    )
  })
})

test('a code with no retry path does not offer one', () => {
  expect(getErrorMeta('EPAGERANGE')).toEqual({
    title: 'Page range not found',
    showRetry: false
  })
  expect(getErrorMeta('EPDFTOOLARGE').showRetry).toBe(false)
  expect(getErrorMeta('ETIMEOUT').showRetry).toBe(true)
})
