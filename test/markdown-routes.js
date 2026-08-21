import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import { isMarkdownPage } from '../src/helpers/page-markdown.js'

const VERCEL_CONFIG = path.join(process.cwd(), 'vercel.json')
const DOCS_DIR = path.join(process.cwd(), 'src/content/docs')
const PAGE_MARKDOWN = path.join(process.cwd(), 'src/helpers/page-markdown.js')
const DOC_TEMPLATE = path.join(process.cwd(), 'src/templates/doc.js')

const { headers, redirects, rewrites } = JSON.parse(
  fs.readFileSync(VERCEL_CONFIG, 'utf8')
)

const markdownRule = headers.find(({ headers }) =>
  headers.some(
    ({ key, value }) =>
      key === 'content-type' && value.startsWith('text/markdown')
  )
)

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
  '/tools/embed-url.md'
]

const EXCLUDED_PATHNAMES = [
  '/tools/embed-url/miro.md',
  '/tools/embed-url/icosa-gallery.md',
  '/recipes.md',
  '/recipes/take-a-screenshot.md',
  '/404.md',
  '/dev-404-page.md',
  '/offline-plugin-app-shell-fallback.md'
]

describe('markdown content-type header', () => {
  test('is declared', () => {
    expect(markdownRule).toBeDefined()
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

describe('markdown variant caching', () => {
  const globalRule = headers.find(({ source }) => source === '/(.*)')

  const varyOf = rule =>
    rule.headers
      .find(({ key }) => key.toLowerCase() === 'vary')
      ?.value.split(',')
      .map(value => value.trim().toLowerCase())

  test('varies on Accept, since the same URL serves HTML and markdown', () => {
    expect(varyOf(globalRule)).toContain('accept')
  })

  test('keeps varying on Accept-Encoding, so compression stays cacheable', () => {
    expect(varyOf(globalRule)).toContain('accept-encoding')
  })

  test('covers the markdown files too', () => {
    expect(new RegExp(`^${globalRule.source}$`).test('/pricing.md')).toBe(true)
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

  test('leaves the well-known resources alone, extension or not', () => {
    for (const pathname of [
      '/.well-known/api-catalog',
      '/.well-known/security.txt'
    ]) {
      expect(matchesNegotiation(pathname), pathname).toBe(false)
    }
  })

  test('leaves the pages without a markdown file alone', () => {
    for (const pathname of EXCLUDED_PATHNAMES) {
      expect(matchesNegotiation(pathname.replace(/\.md$/, '')), pathname).toBe(
        false
      )
    }
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
