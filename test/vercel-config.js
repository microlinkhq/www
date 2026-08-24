import fs from 'node:fs'
import path from 'node:path'
import { getTransformedRoutes, sourceToRegex } from '@vercel/routing-utils'
import { describe, expect, test } from 'vitest'

const config = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'vercel.json'), 'utf8')
)

const matcherFor = source => {
  const { src } = sourceToRegex(source)
  return pathname => new RegExp(src).test(pathname)
}

const headerRule = key =>
  config.headers.find(({ headers }) => headers.some(rule => rule.key === key))

describe('vercel.json', () => {
  test('compiles the way the deployment compiles it', () => {
    const { error, routes } = getTransformedRoutes(config)

    expect(error?.errors, error?.message).toBeUndefined()
    expect(routes.length).toBeGreaterThan(0)
  })

  test('would have caught the pattern that broke the deploy', () => {
    const { error } = getTransformedRoutes({
      ...config,
      headers: [
        ...config.headers,
        {
          source: '/(?:.+/)?llms(?:-full)?\\.txt',
          headers: [{ key: 'X-Robots-Tag', value: 'noindex' }]
        }
      ]
    })

    expect(error?.code).toBe('invalid_header')
  })

  test('every source is a pattern vercel accepts, not a raw regex', () => {
    const sources = [
      ...config.headers,
      ...config.redirects,
      ...(config.rewrites ?? [])
    ].map(({ source }) => source)

    for (const source of sources) {
      expect(() => sourceToRegex(source), source).not.toThrow()
    }
  })
})

describe('the noindex rule for the agent indexes', () => {
  const matches = matcherFor(headerRule('X-Robots-Tag').source)
  const fullIndex = matcherFor(
    config.headers.find(({ source }) => source === '/llms-full.txt').source
  )

  test('covers the index and every section index', () => {
    for (const pathname of [
      '/llms.txt',
      '/docs/llms.txt',
      '/docs/api/llms.txt',
      '/blog/llms.txt'
    ]) {
      expect(matches(pathname), pathname).toBe(true)
    }
    expect(fullIndex('/llms-full.txt')).toBe(true)
  })

  test('does not spill onto other text files', () => {
    for (const pathname of ['/xllms.txt', '/pricing.txt', '/llms.txt.md']) {
      expect(matches(pathname), pathname).toBe(false)
    }
  })
})
