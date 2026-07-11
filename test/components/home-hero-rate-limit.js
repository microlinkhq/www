import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import { isRateLimited } from '../../src/helpers/api-error'

const source = fs.readFileSync(
  path.join(process.cwd(), 'src/components/pages/home/hero.js'),
  'utf8'
)

describe('home hero rate limit', () => {
  test('detects rate limits by status code and by ERATE code', () => {
    expect(isRateLimited(429)).toBe(true)
    expect(isRateLimited('ERATE')).toBe(true)
    expect(isRateLimited(500)).toBe(false)
    expect(isRateLimited('EFATAL')).toBe(false)
  })

  test('hero checks both err.statusCode and err.code via the shared helper', () => {
    expect(source).toContain(
      "import { isRateLimited } from 'helpers/api-error'"
    )
    expect(source).toContain(
      'isRateLimited(err.statusCode) || isRateLimited(err.code)'
    )
  })

  test('rate-limited state never auto-retries', () => {
    expect(source).not.toContain('retryAt')
    expect(source).not.toContain('Retry-After')
    expect(source).not.toContain('retry-after')
  })
})
