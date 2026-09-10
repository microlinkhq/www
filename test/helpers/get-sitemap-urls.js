import { expect, test } from 'vitest'

import {
  getSitemapUrls,
  FREE_FUNCTION_CODE_LIMIT,
  sitemapSdkSnippet
} from '../../src/helpers/get-sitemap-urls'

test('function source stays under the free plan code limit', () => {
  expect(Buffer.byteLength(getSitemapUrls)).toBeLessThanOrEqual(
    FREE_FUNCTION_CODE_LIMIT
  )
})

test('does not reference page', () => {
  expect(getSitemapUrls).not.toMatch(/\bpage\b/)
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
})
