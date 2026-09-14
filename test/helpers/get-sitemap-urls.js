import { expect, test } from 'vitest'

import {
  getSitemapUrls,
  FREE_FUNCTION_CODE_LIMIT,
  sitemapCardCode,
  sitemapSdkSnippet
} from '../../src/helpers/get-sitemap-urls'

test('function source stays under the free plan code limit', () => {
  expect(Buffer.byteLength(getSitemapUrls)).toBeLessThanOrEqual(
    FREE_FUNCTION_CODE_LIMIT
  )
})

test('reads the origin from page.url()', () => {
  expect(getSitemapUrls).toMatch(/async \(\{ page \}\)/)
  expect(getSitemapUrls).toMatch(/page\.url\(\)/)
  expect(getSitemapUrls).not.toMatch(/\bsite\b/)
})

test('walks sitemaps with xml-urls and isolate fetch', () => {
  expect(getSitemapUrls).toMatch(/xml-urls/)
  expect(getSitemapUrls).toMatch(/fetcher:\s*fetch/)
  expect(getSitemapUrls).toMatch(/robots-parser/)
})

test('SDK snippet is JavaScript, not a query-string function', () => {
  const snippet = sitemapSdkSnippet('https://microlink.io')
  expect(snippet).toContain("import createClient from 'microlink.io'")
  expect(snippet).toContain('microlink.function')
  expect(snippet).not.toContain('curl')
  expect(snippet).not.toContain('function=async')
  expect(snippet).not.toMatch(/site:\s*['"]https:\/\/microlink\.io['"]/)
})

test('card code is the function call without the SDK preamble', () => {
  const code = sitemapCardCode('https://microlink.io')
  expect(code).toContain('microlink.function')
  expect(code).toContain('xml-urls')
  expect(code).toContain('page.url()')
  expect(code).not.toContain('import createClient')
  expect(code).not.toMatch(/site:\s*['"]https:\/\/microlink\.io['"]/)
})
