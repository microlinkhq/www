import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

const read = path =>
  readFileSync(new URL(`../../../../${path}`, import.meta.url), 'utf8')

const post = read('src/content/blog/google-goto-urls-explained.md')

describe('resolving google result links', () => {
  test('retries after Retry-After without starting the wait over', () => {
    expect(post).toContain('`503` with `Retry-After: N`')
    expect(post).toMatch(/^<RetryDiagram \/>$/m)
  })

  test('says the IP address plays no part in the wait', () => {
    expect(post).toContain('The IP address plays no part in it.')
  })

  test('links the EGOOGLELINK reference and the search guide', () => {
    expect(post).toContain('(/docs/api/basics/error-codes#egooglelink)')
    expect(post).toContain('(/docs/guides/search)')
  })

  test('shows the retry handled by microlink.io, never the low-level HTTP client', () => {
    expect(post).toContain("import createClient from 'microlink.io'")
    expect(post).not.toContain('@microlink/mql')
  })

  test('every code block names its language, which the code card needs to render', () => {
    const fences = post.match(/^```.*$/gm)
    const openings = fences.filter((_, index) => index % 2 === 0)
    expect(openings.length).toBeGreaterThan(0)
    openings.forEach(fence => expect(fence).toMatch(/^```[a-z]+$/))
  })

  test('names no third-party resolver', () => {
    expect(post).not.toMatch(/serper|scrape\.do/i)
  })
})
