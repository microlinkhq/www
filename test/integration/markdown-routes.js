import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import { isMarkdownPage } from '../../src/helpers/page-markdown.js'

const VERCEL_CONFIG = path.join(process.cwd(), 'vercel.json')
const DOCS_DIR = path.join(process.cwd(), 'src/content/docs')
const PAGE_MARKDOWN = path.join(process.cwd(), 'src/helpers/page-markdown.js')
const DOC_TEMPLATE = path.join(process.cwd(), 'src/templates/doc.js')

const vercelConfig = JSON.parse(fs.readFileSync(VERCEL_CONFIG, 'utf8'))

const { headers, redirects, rewrites } = vercelConfig

const MARKDOWN_FILE_SOURCE_SUFFIX = '\\.md'

const markdownRule = headers.find(({ source }) =>
  source.endsWith(MARKDOWN_FILE_SOURCE_SUFFIX)
)

const setsContentType = ({ headers: ruleHeaders }) =>
  ruleHeaders.some(({ key }) => key.toLowerCase() === 'content-type')

const matchesRule = pathname =>
  new RegExp(`^${markdownRule.source}$`).test(pathname)

const toMarkdownPathname = file =>
  `/docs/${file.replace(/\.md$/, '').replace(/\/?index$/, '')}`.replace(
    /\/$/,
    ''
  ) + '.md'

const docsMarkdownPathnames = fs
  .readdirSync(DOCS_DIR, { recursive: true })
  .filter(entry => entry.endsWith('.md'))
  .map(entry => entry.split(path.sep).join('/'))
  .map(toMarkdownPathname)

const PAGE_MARKDOWN_PATHNAMES = [
  '/index.md',
  '/pricing.md',
  '/screenshot/php.md',
  '/features/screenshot.md',
  '/blog/some-post.md',
  '/tools/embed-url.md',
  '/404.md'
]

const EXCLUDED_PATHNAMES = [
  '/tools/embed-url/miro.md',
  '/tools/embed-url/icosa-gallery.md',
  '/recipes.md',
  '/recipes/take-a-screenshot.md',
  '/dev-404-page.md',
  '/offline-plugin-app-shell-fallback.md'
]

const varyValue = headers =>
  headers.find(({ key }) => key.toLowerCase() === 'vary')?.value

describe('vercel.json routing mode', () => {
  test('never mixes legacy routes with headers, redirects or rewrites', () => {
    expect(
      vercelConfig.routes,
      'Vercel compiles `routes` ahead of every redirect and header rule, so a `handle: filesystem` there serves pages before markdown negotiation and security headers run (regression from #2227)'
    ).toBeUndefined()
  })
})

describe('markdown file headers', () => {
  test('is declared', () => {
    expect(markdownRule).toBeDefined()
  })

  test('varies by Accept so caches do not mix HTML and markdown', () => {
    expect(varyValue(markdownRule.headers)).toBe('Accept, Accept-Encoding')
  })

  test('leaves content-type to Vercel, so a missing .md 404s as HTML instead of posing as markdown', () => {
    const markdownPathRules = headers.filter(({ source }) =>
      source.endsWith(MARKDOWN_FILE_SOURCE_SUFFIX)
    )
    expect(markdownPathRules.length).toBeGreaterThan(0)
    for (const rule of markdownPathRules) {
      expect(setsContentType(rule), rule.source).toBe(false)
    }
  })

  test('covers every generated markdown file', () => {
    expect(docsMarkdownPathnames.length).toBeGreaterThan(0)
    for (const pathname of [
      ...docsMarkdownPathnames,
      ...PAGE_MARKDOWN_PATHNAMES
    ]) {
      expect(matchesRule(pathname), pathname).toBe(true)
    }
  })

  test('never labels a page without a markdown file as markdown', () => {
    for (const pathname of EXCLUDED_PATHNAMES) {
      expect(matchesRule(pathname), pathname).toBe(false)
      expect(isMarkdownPage(pathname.replace(/\.md$/, '')), pathname).toBe(
        false
      )
    }
  })
})

const acceptsMarkdown = ({ has = [] }) =>
  has.some(
    ({ type, key, value }) =>
      type === 'header' && key === 'accept' && value.includes('text/markdown')
  )

const negotiations = (redirects || []).filter(acceptsMarkdown)

const negotiation = negotiations.find(({ source }) => source !== '/')

const matchesNegotiation = pathname =>
  new RegExp(`^${negotiation.source}$`).test(pathname)

describe('markdown content negotiation', () => {
  test('is a redirect, since rewrites run after the filesystem check', () => {
    expect(negotiation).toBeDefined()
    expect((rewrites || []).find(acceptsMarkdown)).toBeUndefined()
  })

  test('does not cache the negotiated location', () => {
    for (const rule of negotiations) expect(rule.permanent).toBe(false)
  })

  test('sends a page to its markdown file', () => {
    for (const pathname of [
      '/pricing',
      '/screenshot/php',
      '/docs/api/parameters/filename'
    ]) {
      expect(matchesNegotiation(pathname), pathname).toBe(true)
    }
    expect(negotiation.destination).toBe('/$1.md')
  })

  test('names the home page markdown file explicitly', () => {
    const root = negotiations.find(({ source }) => source === '/')
    expect(root?.destination).toBe('/index.md')
  })

  test('leaves a markdown file alone, so it cannot redirect to itself', () => {
    for (const pathname of docsMarkdownPathnames) {
      expect(matchesNegotiation(pathname), pathname).toBe(false)
    }
    for (const pathname of PAGE_MARKDOWN_PATHNAMES) {
      expect(matchesNegotiation(pathname), pathname).toBe(false)
    }
  })

  test('leaves anything with a file extension alone', () => {
    for (const pathname of [
      '/images/og/pricing.png',
      '/llms.txt',
      '/sitemap-index.xml',
      '/static/main.css'
    ]) {
      expect(matchesNegotiation(pathname), pathname).toBe(false)
    }
  })

  test('leaves the pages without a markdown file alone', () => {
    for (const pathname of [...EXCLUDED_PATHNAMES, '/404.md']) {
      expect(matchesNegotiation(pathname.replace(/\.md$/, '')), pathname).toBe(
        false
      )
    }
  })

  test('marks HTML pages as varying by Accept', () => {
    const htmlVary = headers.find(
      ({ source, headers: ruleHeaders }) =>
        source === '/((?!.*\\.[a-zA-Z0-9]+$).*)' && varyValue(ruleHeaders)
    )
    expect(htmlVary).toBeDefined()
    expect(varyValue(htmlVary.headers)).toBe('Accept, Accept-Encoding')
    expect(new RegExp(`^${htmlVary.source}$`).test('/pricing')).toBe(true)
    expect(new RegExp(`^${htmlVary.source}$`).test('/pricing.md')).toBe(false)
  })

  test('also varies extension paths so HTML 404s are not reused for markdown', () => {
    const catchAll = headers.find(
      ({ source, headers: ruleHeaders }) =>
        source === '/(.*)' && varyValue(ruleHeaders)
    )
    expect(catchAll).toBeDefined()
    expect(varyValue(catchAll.headers)).toBe('Accept, Accept-Encoding')
    expect(new RegExp(`^${catchAll.source}$`).test('/missing.txt')).toBe(true)
  })
})

const selector = fs
  .readFileSync(PAGE_MARKDOWN, 'utf8')
  .match(/DOCS_CONTENT_SELECTOR = '\[([\w-]+)\]'/)

describe('docs markdown extraction', () => {
  test('scopes to a selector', () => {
    expect(selector).not.toBeNull()
  })

  test('targets an attribute the doc template renders', () => {
    expect(fs.readFileSync(DOC_TEMPLATE, 'utf8')).toContain(
      `<Markdown ${selector[1]}`
    )
  })
})
