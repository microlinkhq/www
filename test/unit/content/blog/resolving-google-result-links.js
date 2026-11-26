import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

const read = path =>
  readFileSync(new URL(`../../../../${path}`, import.meta.url), 'utf8')

const post = read('src/content/blog/resolving-google-result-links.md')
const errorCodes = read('src/content/docs/api/basics/error-codes.md')

const sectionOf = (markdown, heading) => {
  const start = markdown.indexOf(`## ${heading}\n`)
  const end = markdown.indexOf('\n## ', start + 1)
  return markdown.slice(start, end === -1 ? undefined : end)
}

const egooglelink = sectionOf(errorCodes, 'EGOOGLELINK')

describe('resolving google result links', () => {
  test('quotes the held message exactly as the error code reference does', () => {
    const held = egooglelink
      .split('\n')
      .find(line => line.startsWith('Google is holding'))
    expect(held).toBeDefined()
    expect(post).toContain(
      held.replace(
        'https://www.google.com/goto?url=…',
        'https://www.google.com/goto?url=CAES…'
      )
    )
  })

  test('states the same Retry-After cap as the error code reference', () => {
    const cap = egooglelink.match(/at most (\d+)/)[1]
    expect(post).toContain(`in seconds, at most ${cap}.`)
  })

  test('links the EGOOGLELINK reference and the search guide', () => {
    expect(post).toContain('(/docs/api/basics/error-codes#egooglelink)')
    expect(post).toContain('(/docs/guides/search)')
  })

  test('recommends microlink.io, not the low-level HTTP client', () => {
    expect(post).toContain("import createClient from 'microlink.io'")
    expect(post).not.toContain('@microlink/mql')
  })

  test('names no third-party resolver', () => {
    expect(post).not.toMatch(/serper|scrape\.do/i)
  })
})
