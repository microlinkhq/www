import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import {
  FREE_PLAN_REQUESTS_PER_DAY,
  KEYLESS_REQUESTS_PER_DAY
} from '../../src/helpers/free-tier.js'

const ROOT = process.cwd()
const STATIC = path.join(ROOT, 'static')
const SITE = 'https://microlink.io'

const readStatic = pathname =>
  fs.readFileSync(path.join(STATIC, pathname), 'utf8')
const readStaticJson = pathname => JSON.parse(readStatic(pathname))

const { headers } = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8')
)

const headersFor = source => {
  const rule = headers.find(entry => entry.source === source)
  if (!rule) throw new Error(`vercel.json has no headers rule for ${source}`)
  return Object.fromEntries(
    rule.headers.map(({ key, value }) => [key.toLowerCase(), value])
  )
}

const BUILD_GENERATED = new Set(['/.well-known/agent-skills/index.json'])

const isServedPath = pathname => {
  if (BUILD_GENERATED.has(pathname)) return true
  const route = pathname.replace(/\/$/, '')
  return [
    path.join(STATIC, pathname),
    path.join(ROOT, 'src/content', `${route}.md`),
    path.join(ROOT, 'src/pages', `${route}.js`),
    path.join(ROOT, 'src/pages', route, 'index.js')
  ].some(candidate => fs.existsSync(candidate))
}

const expectServed = href => {
  const url = new URL(href, SITE)
  if (url.origin !== SITE) return
  expect(isServedPath(url.pathname), `${href} is not served by this repo`).toBe(
    true
  )
}

const parseLinkHeader = value =>
  value.split(/,\s*(?=<)/).map(part => {
    const [, target] = part.match(/^<([^>]+)>/)
    const params = Object.fromEntries(
      [...part.matchAll(/;\s*([a-z-]+)="([^"]*)"/g)].map(([, key, val]) => [
        key,
        val
      ])
    )
    return { target, ...params }
  })

describe('homepage Link header (RFC 8288)', () => {
  const links = parseLinkHeader(headersFor('/').link)

  test('advertises the registered discovery relations', () => {
    expect(links).toEqual([
      {
        target: '/.well-known/api-catalog',
        rel: 'api-catalog',
        type: 'application/linkset+json'
      },
      {
        target: '/openapi.json',
        rel: 'service-desc',
        type: 'application/vnd.oai.openapi+json'
      },
      {
        target: '/docs/api/getting-started/overview',
        rel: 'service-doc',
        type: 'text/html'
      },
      {
        target: '/llms.txt',
        rel: 'describedby',
        type: 'text/markdown'
      }
    ])
  })

  test('every target is served', () => {
    for (const link of links) expectServed(link.target)
  })
})

describe('API catalog (RFC 9727)', () => {
  const catalog = readStaticJson('.well-known/api-catalog')

  test('is served as linkset+json with CORS', () => {
    const served = headersFor('/.well-known/api-catalog')
    expect(served['content-type']).toMatch(/^application\/linkset\+json/)
    expect(served['access-control-allow-origin']).toBe('*')
    expect(served['cross-origin-resource-policy']).toBe('cross-origin')
  })

  test('describes the API with service-desc, service-doc and status', () => {
    expect(catalog.linkset).toEqual([
      {
        anchor: 'https://api.microlink.io',
        'service-desc': [
          {
            href: `${SITE}/openapi.json`,
            type: 'application/vnd.oai.openapi+json'
          }
        ],
        'service-doc': [
          {
            href: `${SITE}/docs/api/getting-started/overview`,
            type: 'text/html'
          },
          {
            href: `${SITE}/llms.txt`,
            type: 'text/markdown'
          }
        ],
        status: [
          {
            href: 'https://healthcheck.microlink.io',
            type: 'application/json'
          }
        ]
      }
    ])
    for (const link of catalog.linkset[0]['service-desc'].concat(
      catalog.linkset[0]['service-doc']
    )) {
      expectServed(link.href)
    }
  })
})

describe('MCP server card (SEP-2127)', () => {
  const card = readStaticJson('.well-known/mcp/server-card.json')

  test('has the fields required by the server card schema', () => {
    for (const key of ['$schema', 'name', 'version', 'description']) {
      expect(card[key], key).toBeTruthy()
    }
    expect(card.name).toMatch(/^[a-z0-9.-]+\/[a-z0-9._-]+$/)
  })

  test('advertises a streamable-http remote that matches the transport endpoint', () => {
    const [remote] = card.remotes
    expect(remote.type).toBe('streamable-http')
    expect(remote.url).toBe(card.transport.endpoint)
    expect(card.serverInfo).toEqual({
      name: expect.any(String),
      version: card.version
    })
    expect(card.capabilities.tools).toBeDefined()
  })

  test('marks the API key header as an optional secret', () => {
    const [header] = card.remotes[0].headers
    expect(header).toMatchObject({
      name: 'x-api-key',
      isSecret: true,
      isRequired: false
    })
  })

  test('is served with its media type and CORS', () => {
    const served = headersFor('/.well-known/mcp/server-card.json')
    expect(served['content-type']).toMatch(
      /^application\/mcp-server-card\+json/
    )
    expect(served['access-control-allow-origin']).toBe('*')
    expect(served['cross-origin-resource-policy']).toBe('cross-origin')
  })
})

describe('AI catalog (ARD)', () => {
  const catalog = readStaticJson('.well-known/ai-catalog.json')

  test('is served as JSON with CORS', () => {
    const served = headersFor('/.well-known/ai-catalog.json')
    expect(served['content-type']).toMatch(/^application\/json/)
    expect(served['access-control-allow-origin']).toBe('*')
    expect(served['cross-origin-resource-policy']).toBe('cross-origin')
  })

  test('declares a spec version and a host', () => {
    expect(catalog.specVersion).toBeTruthy()
    expect(catalog.host).toMatchObject({
      displayName: 'Microlink',
      identifier: 'did:web:microlink.io'
    })
  })

  test('every entry is well formed and resolvable', () => {
    expect(catalog.entries.length).toBeGreaterThan(0)
    const identifiers = catalog.entries.map(entry => entry.identifier)
    expect(new Set(identifiers).size).toBe(identifiers.length)
    for (const entry of catalog.entries) {
      expect(entry.identifier).toMatch(
        /^urn:air:microlink\.io:[a-z0-9-]+:[a-z0-9-]+$/
      )
      expect(entry.displayName).toBeTruthy()
      expect(entry.type).toMatch(/^[a-z]+\/[a-z0-9.+-]+$/)
      expect(
        'url' in entry !== 'data' in entry,
        `${entry.identifier} needs exactly one of url or data`
      ).toBe(true)
      expect(entry.representativeQueries.length).toBeGreaterThanOrEqual(2)
      expect(entry.representativeQueries.length).toBeLessThanOrEqual(5)
      if (entry.url) expectServed(entry.url)
    }
  })

  test('the MCP entry links to the server card', () => {
    const mcp = catalog.entries.find(
      entry => entry.type === 'application/mcp-server-card+json'
    )
    expect(mcp.url).toBe(`${SITE}/.well-known/mcp/server-card.json`)
  })
})

describe('agent skills index', () => {
  test('artifacts are served with CORS', () => {
    const served = headersFor('/.well-known/agent-skills/(.*)')
    expect(served['access-control-allow-origin']).toBe('*')
    expect(served['cross-origin-resource-policy']).toBe('cross-origin')
  })
})

describe('robots.txt Content Signals', () => {
  const robots = readStatic('robots.txt')

  test('declares ai-train, search and ai-input inside the wildcard group', () => {
    const lines = robots.split('\n')
    const group = lines.indexOf('User-agent: *')
    const signal = lines.findIndex(line => line.startsWith('Content-Signal:'))
    expect(group).toBeGreaterThanOrEqual(0)
    expect(signal).toBeGreaterThan(group)
    const values = Object.fromEntries(
      lines[signal]
        .replace('Content-Signal:', '')
        .split(',')
        .map(pair => pair.trim().split('='))
    )
    expect(values).toEqual({
      'ai-train': 'yes',
      search: 'yes',
      'ai-input': 'yes'
    })
  })

  test('keeps the sitemap', () => {
    expect(robots).toContain('Sitemap: https://microlink.io/sitemap-index.xml')
  })
})

describe('auth.md', () => {
  const authMd = readStatic('auth.md')

  test('opens with an H1 naming auth.md', () => {
    expect(authMd.split('\n')[0]).toMatch(/^# .*auth\.md/)
  })

  test('documents the x-api-key credential and the signup endpoint', () => {
    expect(authMd).toContain('x-api-key')
    expect(authMd).toContain('https://dashboard.microlink.io/signup')
    expect(authMd).toContain('https://pro.microlink.io')
  })

  test('every microlink.io link is served', () => {
    const links = [
      ...authMd.matchAll(/\]\((https:\/\/microlink\.io[^)]*)\)/g)
    ].map(([, href]) => href)
    expect(links.length).toBeGreaterThan(0)
    for (const href of links) expectServed(href)
  })

  test('quotes the quotas from helpers/free-tier', () => {
    expect(authMd).toContain(
      `| Anonymous | \`https://api.microlink.io\` | ${KEYLESS_REQUESTS_PER_DAY} requests per day |`
    )
    expect(authMd).toContain(
      `| Free API key | \`https://pro.microlink.io\` | ${FREE_PLAN_REQUESTS_PER_DAY} requests per day |`
    )
  })

  test('is served as markdown and readable cross-origin', () => {
    const served = headersFor('/auth.md')
    expect(served['content-type']).toMatch(/^text\/markdown/)
    expect(served['access-control-allow-origin']).toBe('*')
    expect(served['cross-origin-resource-policy']).toBe('cross-origin')
  })
})
