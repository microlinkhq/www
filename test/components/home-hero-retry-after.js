import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const source = fs.readFileSync(
  path.join(process.cwd(), 'src/components/pages/home/hero.js'),
  'utf8'
)

const extract = (start, end, name) =>
  // eslint-disable-next-line no-new-func
  new Function(
    `${source.slice(
      source.indexOf(start),
      source.indexOf(end)
    )}; return ${name}`
  )()

const parseRetryAfter = extract(
  'const parseRetryAfter',
  'const RetryCountdown',
  'parseRetryAfter'
)

describe('parseRetryAfter', () => {
  test('reads the header from a plain object', () => {
    expect(parseRetryAfter({ 'retry-after': '7' })).toBe(7)
    expect(parseRetryAfter({ 'Retry-After': '3' })).toBe(3)
  })

  test('reads the header from a Fetch Headers instance', () => {
    expect(parseRetryAfter(new Headers({ 'retry-after': '9' }))).toBe(9)
    expect(parseRetryAfter(new Headers({ 'Retry-After': '4' }))).toBe(4)
  })

  test('parses HTTP-date values into seconds from now', () => {
    const at = new Date(Date.now() + 10_000).toUTCString()
    const secs = parseRetryAfter(new Headers({ 'retry-after': at }))
    expect(secs).toBeGreaterThanOrEqual(8)
    expect(secs).toBeLessThanOrEqual(10)
  })

  test('returns null when the header is missing or invalid', () => {
    expect(parseRetryAfter(undefined)).toBe(null)
    expect(parseRetryAfter({})).toBe(null)
    expect(parseRetryAfter(new Headers())).toBe(null)
    expect(parseRetryAfter({ 'retry-after': 'not-a-date' })).toBe(null)
  })

  test('clamps past dates and negative values to zero', () => {
    expect(parseRetryAfter({ 'retry-after': '-5' })).toBe(0)
    const past = new Date(Date.now() - 10_000).toUTCString()
    expect(parseRetryAfter({ 'retry-after': past })).toBe(0)
  })
})
