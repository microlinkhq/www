import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import { isRateLimited } from '../../src/helpers/api-error'

const HERO_DIR = path.join(process.cwd(), 'src/components/pages/home/hero')

const runRequest = fs.readFileSync(
  path.join(HERO_DIR, 'use-run-request.js'),
  'utf8'
)

const source = fs
  .readdirSync(HERO_DIR)
  .sort()
  .map(file => fs.readFileSync(path.join(HERO_DIR, file), 'utf8'))
  .join('\n')

describe('home hero rate limit', () => {
  test('detects rate limits by status code and by ERATE code', () => {
    expect(isRateLimited(429)).toBe(true)
    expect(isRateLimited('ERATE')).toBe(true)
    expect(isRateLimited(500)).toBe(false)
    expect(isRateLimited('EFATAL')).toBe(false)
  })

  test('hero checks both err.statusCode and err.code via the shared helper', () => {
    expect(runRequest).toContain(
      "import { isRateLimited } from 'helpers/api-error'"
    )
    expect(runRequest).toContain(
      'isRateLimited(err.statusCode) || isRateLimited(err.code)'
    )
  })

  test('rate-limited state never auto-retries', () => {
    expect(source).not.toContain('retryAt')
    expect(source).not.toContain('Retry-After')
    expect(source).not.toContain('retry-after')
  })
})
