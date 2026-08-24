import fs from 'node:fs'
import path from 'node:path'
import { afterEach, describe, expect, test, vi } from 'vitest'

import middleware, { config } from '../middleware.js'
import { buildNotFoundMarkdown } from '../src/helpers/not-found.js'

const read = file => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

const SITE_URL = 'https://microlink.io'
const MISSING_URL = `${SITE_URL}/not-a-real-page.md`

const respondWith = status => {
  const fetch = vi.fn(async () => new Response(null, { status }))
  vi.stubGlobal('fetch', fetch)
  return fetch
}

const isFallThrough = response =>
  response.status === 200 && response.headers.get('x-middleware-next') === '1'

afterEach(() => vi.unstubAllGlobals())

describe('the markdown 404 body', () => {
  const markdown = buildNotFoundMarkdown()

  test('opens with a heading, so an agent parses it as markdown', () => {
    expect(markdown.startsWith('# ')).toBe(true)
  })

  test('stays small enough to read in one gulp', () => {
    expect(Buffer.byteLength(markdown)).toBeLessThan(2048)
  })

  test('points at every recovery index as an absolute link', () => {
    for (const pathname of [
      '/',
      '/sitemap-index.xml',
      '/llms.txt',
      '/openapi.json',
      '/docs/api/getting-started/overview',
      '/contact'
    ]) {
      expect(markdown, pathname).toContain(`(${SITE_URL}${pathname})`)
    }
    expect(markdown).not.toMatch(/\]\(\//)
  })
})

describe('the markdown 404 middleware', () => {
  test('runs on markdown twins only', () => {
    expect(config.matcher).toBe('/:path*.md')
  })

  test('answers a missing twin with markdown instead of the app shell', async () => {
    respondWith(404)
    const response = await middleware(new Request(MISSING_URL))

    expect(response.status).toBe(404)
    expect(response.headers.get('content-type')).toBe(
      'text/markdown; charset=utf-8'
    )
    expect(response.headers.get('vary')).toBe('Accept, Accept-Encoding')
    expect(response.headers.get('x-robots-tag')).toBe('noindex')
    expect(await response.text()).toBe(buildNotFoundMarkdown())
  })

  test('leaves a twin that exists to the static file', async () => {
    respondWith(200)
    expect(
      isFallThrough(await middleware(new Request(`${SITE_URL}/pricing.md`)))
    ).toBe(true)
  })

  test('probes with HEAD, and never probes its own probe', async () => {
    const fetch = respondWith(404)
    const response = await middleware(
      new Request(MISSING_URL, { headers: { 'x-markdown-probe': '1' } })
    )

    expect(isFallThrough(response)).toBe(true)
    expect(fetch).not.toHaveBeenCalled()

    await middleware(new Request(MISSING_URL))
    expect(fetch).toHaveBeenCalledWith(MISSING_URL, {
      method: 'HEAD',
      headers: { 'x-markdown-probe': '1' },
      redirect: 'manual'
    })
  })
})

describe('the markdown 404 route', () => {
  test('covers every path the markdown negotiation redirect can produce', () => {
    const { redirects } = JSON.parse(read('vercel.json'))
    const destinations = redirects
      .filter(({ has }) => has?.some(({ key }) => key === 'accept'))
      .map(({ destination }) => destination)

    expect(destinations.length).toBeGreaterThan(0)
    for (const destination of destinations) {
      expect(destination, destination).toMatch(/\.md$/)
    }
  })
})
