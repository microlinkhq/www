import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const BASE_URL = (
  process.env.AGENT_ROUTES_URL || 'https://microlink.io'
).replace(/\/+$/, '')

const IS_PREVIEW = Boolean(process.env.AGENT_ROUTES_PREVIEW)

const REQUEST_TIMEOUT = 15_000

const ACCEPT_HTML = 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8'
const ACCEPT_MARKDOWN = 'text/markdown'
const ACCEPT_ANY = '*/*'

const CDN_MERGED_HEADERS = ['vary']

const { headers: headerRules } = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'vercel.json'), 'utf8')
)

const SECURITY_HEADERS = headerRules
  .find(
    ({ source, headers }) =>
      source === '/(.*)' &&
      headers.some(({ key }) => key.toLowerCase() === 'x-frame-options')
  )
  .headers.map(({ key, value }) => [key.toLowerCase(), value])
  .filter(([name]) => !CDN_MERGED_HEADERS.includes(name))

const testWithMarkdownFiles = IS_PREVIEW ? test.skip : test

const MISSING_PATHNAME = '/notexist-agent-routes-probe'

const request = async (pathname, accept, { follow = false } = {}) => {
  const response = await fetch(`${BASE_URL}${pathname}`, {
    headers: { accept },
    redirect: follow ? 'follow' : 'manual'
  })
  return {
    status: response.status,
    type: response.headers.get('content-type') || '',
    vary: response.headers.get('vary') || '',
    location: response.headers.get('location') || '',
    headers: response.headers,
    body: await response.text()
  }
}

const varyTokens = ({ vary }) =>
  vary.split(',').map(token => token.trim().toLowerCase())

const isHtmlDocument = ({ body }) => /^\s*<!doctype html/i.test(body)

describe(`agent routes on ${BASE_URL}`, () => {
  testWithMarkdownFiles(
    'home negotiates to markdown for curl -L -H "Accept: text/markdown"',
    async () => {
      const response = await request('/', ACCEPT_MARKDOWN, { follow: true })
      expect(response.status).toBe(200)
      expect(response.type).toMatch(/^text\/markdown/)
      expect(varyTokens(response)).toContain('accept')
      expect(response.body.trim().length).toBeGreaterThan(0)
      expect(isHtmlDocument(response)).toBe(false)
    },
    REQUEST_TIMEOUT
  )

  test(
    'home redirects markdown clients to /index.md',
    async () => {
      const response = await request('/', ACCEPT_MARKDOWN)
      expect([302, 307]).toContain(response.status)
      expect(response.location).toMatch(/\/index\.md$/)
    },
    REQUEST_TIMEOUT
  )

  test(
    'home serves HTML to browsers, varying by Accept',
    async () => {
      const response = await request('/', ACCEPT_HTML)
      expect(response.status).toBe(200)
      expect(response.type).toMatch(/^text\/html/)
      expect(varyTokens(response)).toContain('accept')
    },
    REQUEST_TIMEOUT
  )

  test(
    'page redirects markdown clients to its .md',
    async () => {
      const response = await request('/pricing', ACCEPT_MARKDOWN)
      expect([302, 307]).toContain(response.status)
      expect(response.location).toMatch(/\/pricing\.md$/)
    },
    REQUEST_TIMEOUT
  )

  testWithMarkdownFiles(
    'page .md is markdown, varying by Accept',
    async () => {
      const response = await request('/pricing.md', ACCEPT_ANY)
      expect(response.status).toBe(200)
      expect(response.type).toMatch(/^text\/markdown/)
      expect(varyTokens(response)).toContain('accept')
      expect(isHtmlDocument(response)).toBe(false)
    },
    REQUEST_TIMEOUT
  )

  test(
    'site redirects still fire for */* clients',
    async () => {
      const response = await request('/docs', ACCEPT_ANY)
      expect(response.status).toBe(308)
      expect(response.location).toMatch(
        /\/docs\/api\/getting-started\/overview$/
      )
    },
    REQUEST_TIMEOUT
  )

  test(
    'missing .md is a 404 that does not pose as markdown',
    async () => {
      const response = await request(`${MISSING_PATHNAME}.md`, ACCEPT_ANY)
      expect(response.status).toBe(404)
      expect(response.type).not.toMatch(/^text\/markdown/)
    },
    REQUEST_TIMEOUT
  )

  test(
    'missing page is an HTML 404 for browsers',
    async () => {
      const response = await request(MISSING_PATHNAME, ACCEPT_HTML)
      expect(response.status).toBe(404)
      expect(response.type).toMatch(/^text\/html/)
    },
    REQUEST_TIMEOUT
  )

  test(
    'pages carry the security headers configured in vercel.json',
    async () => {
      const response = await request('/pricing', ACCEPT_HTML)
      expect(SECURITY_HEADERS.length).toBeGreaterThan(0)
      for (const [name, value] of SECURITY_HEADERS) {
        expect(response.headers.get(name), name).toBe(value)
      }
    },
    REQUEST_TIMEOUT
  )
})
