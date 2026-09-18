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

test('does not reference page', () => {
  expect(getSitemapUrls).toMatch(/async \(\{ url \}\)/)
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
  expect(snippet).toContain('https://microlink.io')
  expect(snippet).not.toContain('site:')
})

test('card code is the function call without the SDK preamble', () => {
  const code = sitemapCardCode('https://microlink.io')
  expect(code).toContain('microlink.function')
  expect(code).toContain('xml-urls')
  expect(code).toContain('async ({ url })')
  expect(code).not.toContain('page.url()')
  expect(code).not.toContain('import createClient')
  expect(code).not.toContain('site:')
})
