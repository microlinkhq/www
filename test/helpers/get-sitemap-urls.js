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

test('walks gzipped sitemap indexes and isolates fetch errors', () => {
  expect(getSitemapUrls).toMatch(/\\.xml(\\.gz)?/)
  expect(getSitemapUrls).toMatch(/gunzipSync/)
  expect(getSitemapUrls).toMatch(/catch/)
  expect(getSitemapUrls).toMatch(/seen\.size >= 1e3/)
})

test('SDK snippet is JavaScript, not a query-string function', () => {
  const snippet = sitemapSdkSnippet('https://microlink.io')
  expect(snippet).toContain("import createClient from 'microlink.io'")
  expect(snippet).toContain('microlink.function')
  expect(snippet).not.toContain('curl')
  expect(snippet).not.toContain('function=async')
})
