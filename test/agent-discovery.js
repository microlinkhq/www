import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import {
  buildServerCard,
  DESCRIPTION_MAX_LENGTH
} from '../scripts/build-mcp-card/index.mjs'
import { RECOVERY_LINKS } from '../src/helpers/not-found.js'

const read = file => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

const SITE_URL = 'https://microlink.io'
const STATIC_FILES = ['/openapi.json', '/apis.json', '/auth.md']
const GENERATED_FILES = [
  '/sitemap-index.xml',
  '/llms.txt',
  '/llms-full.txt',
  '/.well-known/agent-skills/index.json'
]

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
      value:
        'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"; charset=utf-8'
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
    expect(card.description.length).toBeLessThanOrEqual(DESCRIPTION_MAX_LENGTH)
    expect(card.$schema).toBe(
      'https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json'
    )
  })

  test('points at the monorepo folder the server is published from', () => {
    const { repository } = JSON.parse(
      read('node_modules/@microlink/mcp/package.json')
    )
    expect(card.repository.source).toBe('github')
    expect(card.repository.url).toBe('https://github.com/microlinkhq/microlink')
    expect(card.repository.subfolder).toBe(repository.directory)
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

describe('the ai catalog', () => {
  const catalog = JSON.parse(read('static/.well-known/ai-catalog.json'))

  test('names the host an agent is talking to', () => {
    expect(catalog.specVersion).toBe('1.0')
    expect(catalog.host.identifier).toBe('microlink.io')
    expect(catalog.host.displayName.length).toBeGreaterThan(0)
  })

  test('lists every agentic resource, not only the API', () => {
    expect(catalog.entries.map(({ type }) => type)).toEqual(
      expect.arrayContaining([
        'application/vnd.oai.openapi+json;version=3.1',
        'application/mcp-server-card+json',
        'application/ai-skill+md',
        'text/markdown'
      ])
    )
  })

  test('gives every entry what an agent needs to use it', () => {
    for (const entry of catalog.entries) {
      expect(entry.identifier, entry.displayName).toMatch(
        /^urn:air:microlink\.io:[a-z]+:[a-z0-9-]+$/
      )
      expect(entry.displayName.length, entry.identifier).toBeGreaterThan(0)
      expect(entry.description.length, entry.identifier).toBeGreaterThan(20)
      expect(
        Number('url' in entry) + Number('data' in entry),
        entry.identifier
      ).toBe(1)
    }
  })

  test('claims nothing this site does not publish', () => {
    expect(catalog.entries.map(({ type }) => type)).not.toContain(
      'application/a2a-agent-card+json'
    )
  })

  test('links only to pages that exist', () => {
    for (const { url } of catalog.entries) {
      expect(resolvesToAPage(url.replace(SITE_URL, '')), url).toBe(true)
    }
  })

  test('is served as a catalog, not as plain JSON', () => {
    const rule = vercelConfig.headers.find(
      ({ source }) => source === '/.well-known/ai-catalog.json'
    )
    expect(rule.headers).toContainEqual({
      key: 'content-type',
      value: 'application/ai-catalog+json; charset=utf-8'
    })
  })
})

describe('the agent skills index', () => {
  const gatsbyNode = read('gatsby-node.js')

  test('publishes the skills this site already lists at /skills', () => {
    expect(gatsbyNode).toContain('createAgentSkillFiles({ reporter })')
    expect(gatsbyNode).toContain("path.join(SKILLS_REPO_DIR, slug, 'SKILL.md')")
    expect(gatsbyNode).toContain('buildSkillsIndex(skills)')
  })

  test('is built in every build, so a preview carries it too', () => {
    const body = gatsbyNode
      .slice(gatsbyNode.indexOf('const createAgentSkillFiles = '))
      .split('\n}\n')[0]
    expect(body).not.toContain('isProductionBuild()')
  })

  test('digests the bytes it writes, not the bytes in the repo', () => {
    const body = gatsbyNode
      .slice(gatsbyNode.indexOf('const createAgentSkillFiles = '))
      .split('\n}\n')[0]
    expect(body.indexOf('writeFileSync(outputPath, contents)')).toBeLessThan(
      body.indexOf('buildSkillsIndex(skills)')
    )
  })
})

describe('auth.md', () => {
  const source = read('static/auth.md')

  test('reads as markdown prose, not as a placeholder', () => {
    expect(source.startsWith('# ')).toBe(true)
    expect(source.length).toBeGreaterThan(200)
  })

  test('walks an agent through every step the convention names', () => {
    expect(source.match(/^## .+$/gm)).toEqual([
      '## Discover',
      '## Pick a method',
      '## Register',
      '## Claim',
      '## Use the credential',
      '## Errors',
      '## Revocation'
    ])
  })

  test('names the one credential this API actually takes', () => {
    expect(source).toContain('x-api-key')
    expect(source).toContain('https://api.microlink.io')
    expect(source).toContain('https://pro.microlink.io')
    expect(source).toContain('25 requests per day')
  })

  test('claims no mechanism the API does not implement', () => {
    expect(source).toContain('There is no OAuth 2.0')
    expect(source).not.toMatch(/\bregister_uri\b/)
    expect(source).not.toMatch(/\bid-jag\b/)
  })

  test('sends an agent to the errors it will actually hit', () => {
    expect(source).toContain('EAUTH')
    expect(source).toContain('ERATE')
  })

  test('says how a key is revoked, by a human', () => {
    expect(source).toContain('hello@microlink.io')
    expect(source).toContain(`${SITE_URL}/contact`)
    expect(source).toContain(`${SITE_URL}/security`)
  })

  test('links only to pages that exist', () => {
    const links = [...source.matchAll(/https:\/\/microlink\.io(\/\S*)/g)]
      .map(([, pathname]) => pathname.replace(/[).,]+$/, ''))
      .filter(pathname => pathname !== '/auth.md')

    expect(links.length).toBeGreaterThan(0)
    for (const pathname of new Set(links)) {
      expect(resolvesToAPage(pathname), pathname).toBe(true)
    }
  })

  test('is served as markdown by the markdown rule', () => {
    const rule = vercelConfig.headers.find(({ headers }) =>
      headers.some(
        ({ key, value }) =>
          key === 'content-type' && value.startsWith('text/markdown')
      )
    )
    expect(new RegExp(`^${rule.source}$`).test('/auth.md')).toBe(true)
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

  test('points every page at its own markdown twin', () => {
    expect(source).toContain("rel='alternate'")
    expect(source).toContain("type='text/markdown'")
    expect(source).toContain('isMarkdownPage(pathname)')
    expect(source).toContain('toMarkdownPath(pathname)')
    expect(source).toContain(`href={\`${SITE_URL}/`)
  })

  test('emits them on every page, not only in production', () => {
    const beforeProductionGuard = source.slice(
      source.indexOf('exports.onRenderBody'),
      source.indexOf('if (!isDevelopment)')
    )
    expect(beforeProductionGuard).toContain("rel='service-desc'")
    expect(beforeProductionGuard).toContain("rel='alternate'")
  })
})

describe('the link headers', () => {
  const rule = vercelConfig.headers.find(({ source }) => source === '/(.*)')
  const link = rule.headers.find(({ key }) => key === 'link').value

  test('advertises the indexes before an agent parses a single page', () => {
    for (const [target, relation] of [
      ['/sitemap-index.xml', 'sitemap'],
      ['/openapi.json', 'service-desc'],
      ['/docs/api/getting-started/overview', 'service-doc'],
      ['/.well-known/api-catalog', 'api-catalog'],
      ['/.well-known/mcp', 'describedby'],
      ['/llms.txt', 'describedby']
    ]) {
      expect(link, target).toContain(`<${target}>; rel="${relation}"`)
    }
  })

  test('advertises only targets that exist', () => {
    const targets = [...link.matchAll(/<([^>]+)>/g)].map(([, target]) => target)
    expect(targets.length).toBeGreaterThan(0)
    for (const target of targets) {
      expect(resolvesToAPage(target), target).toBe(true)
    }
  })

  test('survives a regeneration of the security headers', () => {
    const generator = read('scripts/security-headers.js')
    expect(generator).toContain('mergeHeaders(rule.headers, headers)')
    expect(generator).not.toContain('rule.headers = headers')
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
