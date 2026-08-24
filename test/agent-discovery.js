import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import { buildServerCard } from '../scripts/build-mcp-card/index.mjs'
import { RECOVERY_LINKS } from '../src/helpers/not-found.js'

const read = file => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

const SITE_URL = 'https://microlink.io'
const STATIC_FILES = ['/openapi.json', '/llms.txt', '/apis.json']
const GENERATED_FILES = ['/sitemap-index.xml']

const exists = file => fs.existsSync(path.join(process.cwd(), file))

const vercelConfig = JSON.parse(read('vercel.json'))

const afterRewrites = pathname =>
  vercelConfig.rewrites?.find(({ source }) => source === pathname)
    ?.destination ?? pathname

const resolvesToAPage = pathname => {
  if (GENERATED_FILES.includes(pathname)) return true
  if (STATIC_FILES.includes(pathname)) return exists(`static${pathname}`)
  if (pathname.startsWith('/.well-known/')) {
    return exists(`static${afterRewrites(pathname)}`)
  }
  if (pathname === '/') return exists('src/pages/index.js')

  const slug = pathname.replace(/^\//, '')
  return [
    `src/pages/${slug}.js`,
    `src/pages/${slug}/index.js`,
    `src/content/${slug}.md`,
    `src/content/${slug}/index.md`,
    `src/content/docs/${slug.replace(/^docs\//, '')}.md`
  ].some(exists)
}

describe('the 404 page', () => {
  const source = read('src/pages/404.js')

  test('renders the recovery links, so an agent is never left at a dead end', () => {
    expect(source).toContain("from 'helpers/not-found'")
    expect(source).toContain('RECOVERY_LINKS.map')
  })

  test('keeps its H1 and stays out of the index', () => {
    expect(source).toContain(
      '<Heading titleize={false}>Page not found</Heading>'
    )
    expect(source).toContain("robots='noindex, follow'")
  })

  test('points at the sitemap, llms.txt and the docs', () => {
    const hrefs = RECOVERY_LINKS.map(({ href }) => href)
    expect(hrefs).toContain('/sitemap-index.xml')
    expect(hrefs).toContain('/llms.txt')
    expect(hrefs).toContain('/openapi.json')
    expect(hrefs).toContain('/docs/api/getting-started/overview')
  })

  test('describes every link, and every link resolves to something real', () => {
    for (const { href, title, description } of RECOVERY_LINKS) {
      expect(title.length, href).toBeGreaterThan(0)
      expect(description.length, href).toBeGreaterThan(20)
      expect(resolvesToAPage(href), href).toBe(true)
    }
  })
})

describe('the api catalog', () => {
  const catalog = JSON.parse(read('static/.well-known/api-catalog'))
  const [self, api] = catalog.linkset

  test('is a linkset anchored at its own URL', () => {
    expect(self.anchor).toBe(`${SITE_URL}/.well-known/api-catalog`)
    expect(self.item.map(({ href }) => href)).toEqual([
      'https://api.microlink.io'
    ])
  })

  test('describes the API it lists', () => {
    expect(api.anchor).toBe('https://api.microlink.io')
    expect(api['service-desc'][0].href).toBe(`${SITE_URL}/openapi.json`)
    expect(api['service-desc'][0].type).toBe('application/openapi+json')
    expect(api['service-doc'][0].href).toBe(
      `${SITE_URL}/docs/api/getting-started/overview`
    )
  })

  test('is served as a linkset, not as plain JSON', () => {
    const { headers } = JSON.parse(read('vercel.json'))
    const rule = headers.find(
      ({ source }) => source === '/.well-known/api-catalog'
    )
    expect(rule.headers).toContainEqual({
      key: 'content-type',
      value: 'application/linkset+json; charset=utf-8'
    })
  })

  test('links only to pages that exist', () => {
    const hrefs = catalog.linkset
      .flatMap(entry => Object.values(entry).filter(Array.isArray))
      .flat()
      .map(({ href }) => href)
      .filter(href => href.startsWith(SITE_URL))

    expect(hrefs.length).toBeGreaterThan(0)
    for (const href of hrefs) {
      expect(resolvesToAPage(href.replace(SITE_URL, '')), href).toBe(true)
    }
  })
})

describe('the mcp server card', () => {
  const card = JSON.parse(read('static/.well-known/mcp/server-card.json'))
  const [pkg] = card.packages

  test('identifies the server the way the registry does', () => {
    expect(card.name).toBe('io.github.microlinkhq/mcp')
    expect(card.title.length).toBeGreaterThan(0)
    expect(card.description.length).toBeGreaterThan(40)
    expect(card.$schema).toContain('server-card.schema.json')
  })

  test('stays in step with the packaged server, so it cannot drift', () => {
    const { version } = JSON.parse(
      read('node_modules/@microlink/mcp/package.json')
    )
    expect(card.version).toBe(version)
    expect(pkg.identifier).toBe('@microlink/mcp')
    expect(pkg.version).toBe(version)
    expect(pkg.registryType).toBe('npm')
    expect(pkg.transport.type).toBe('stdio')
  })

  test('claims no transport the server does not answer on', () => {
    expect(card.remotes).toBeUndefined()
    expect(card.serverUrl).toBeUndefined()
  })

  test('previews every tool by name and description', () => {
    expect(card.tools.length).toBeGreaterThan(0)
    for (const { name, description } of card.tools) {
      expect(name, name).toMatch(/^microlink_[a-z_]+$/)
      expect(description.length, name).toBeGreaterThan(20)
    }
  })

  test('links only to pages that exist', () => {
    for (const url of [card.websiteUrl, card.documentationUrl]) {
      expect(resolvesToAPage(url.replace(SITE_URL, '')), url).toBe(true)
    }
  })

  test('is reachable at the well-known path agents probe first', () => {
    expect(vercelConfig.rewrites).toContainEqual({
      source: '/.well-known/mcp',
      destination: '/.well-known/mcp/server-card.json'
    })
    const contentTypeOf = source =>
      vercelConfig.headers
        .find(rule => rule.source === source)
        .headers.find(({ key }) => key === 'content-type').value

    expect(contentTypeOf('/.well-known/mcp')).toBe(
      'application/json; charset=utf-8'
    )
    expect(contentTypeOf('/.well-known/mcp/server-card.json')).toBe(
      'application/mcp-server-card+json; charset=utf-8'
    )
  })

  test('is built from the handshake, not hand-written', () => {
    const built = buildServerCard({
      serverInfo: { name: 'microlink-mcp-server', version: '9.9.9' },
      tools: [
        {
          name: 'microlink_meta',
          description: 'Extract metadata.',
          inputSchema: {}
        }
      ]
    })

    expect(built.version).toBe('9.9.9')
    expect(built.packages[0].version).toBe('9.9.9')
    expect(built.tools).toEqual([
      { name: 'microlink_meta', description: 'Extract metadata.' }
    ])
    expect(built.remotes).toBeUndefined()
  })
})

describe('apis.json', () => {
  const catalog = JSON.parse(read('static/apis.json'))
  const [api] = catalog.apis
  const propertyOf = type =>
    api.properties.find(property => property.type === type)

  test('points at itself over https', () => {
    expect(catalog.url).toBe(`${SITE_URL}/apis.json`)
  })

  test('names the machine-readable resources by their conventional type', () => {
    expect(propertyOf('OpenAPI').url).toBe(`${SITE_URL}/openapi.json`)
    expect(propertyOf('Documentation').url).toBe(
      `${SITE_URL}/docs/api/getting-started/overview`
    )
    expect(propertyOf('X-mcp')).toBeDefined()
    expect(propertyOf('X-llms-txt').url).toBe(`${SITE_URL}/llms.txt`)
  })

  test('links only to pages that exist', () => {
    for (const { type, url } of api.properties) {
      if (!url.startsWith(SITE_URL)) continue
      expect(resolvesToAPage(url.replace(SITE_URL, '')), type).toBe(true)
    }
  })
})

describe('robots.txt', () => {
  const source = read('static/robots.txt')

  test('keeps the sitemap directive', () => {
    expect(source).toContain(`Sitemap: ${SITE_URL}/sitemap-index.xml`)
  })

  test('signposts the machine-readable resources', () => {
    for (const file of [
      '/llms.txt',
      '/openapi.json',
      '/apis.json',
      '/.well-known/mcp'
    ]) {
      expect(source, file).toContain(`${SITE_URL}${file}`)
    }
  })

  test('crawls stay allowed', () => {
    expect(source).toMatch(/^User-agent: \*\nAllow: \/$/m)
  })
})

describe('the document head', () => {
  const source = read('gatsby-ssr.js')

  test('advertises the API description with the IANA link relations', () => {
    expect(source).toContain("rel='service-desc'")
    expect(source).toContain("rel='service-doc'")
    expect(source).toContain("rel='api-catalog'")
    expect(source).toContain(`href='${SITE_URL}/openapi.json'`)
  })

  test('emits them on every page, not only in production', () => {
    const beforeProductionGuard = source.slice(
      source.indexOf('exports.onRenderBody'),
      source.indexOf('if (!isDevelopment)')
    )
    expect(beforeProductionGuard).toContain("rel='service-desc'")
  })
})

describe('the contact page', () => {
  const source = read('src/content/contact.md')

  test('carries enough content to read as a real trust anchor', () => {
    const body = source.split(/^---$/m)[2]
    expect(body.length).toBeGreaterThan(500)
  })

  test('names how to reach a human', () => {
    expect(source).toContain('hello@microlink.io')
    expect(source).toContain('/security')
  })

  test('is where the footer sends people', () => {
    expect(read('src/components/patterns/Footer/Footer.js')).toContain(
      "{ label: 'Contact', href: '/contact' }"
    )
  })
})

describe('the organization schema', () => {
  const source = read('src/pages/index.js')

  test('declares the contact points and the address the audit looks for', () => {
    expect(source).toContain("'@type': 'Organization'")
    expect(source).toContain('contactPoint')
    expect(source).toContain("'@type': 'PostalAddress'")
    expect(source).toContain("addressCountry: 'ES'")
  })

  test('is one node, shared with the per-page schema', () => {
    expect(source).toContain("'@id': 'https://microlink.io/#organization'")
    expect(read('src/components/elements/Meta/structured.js')).toContain(
      "'@id': 'https://microlink.io/#organization'"
    )
  })
})
