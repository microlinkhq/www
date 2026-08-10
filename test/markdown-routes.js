import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const VERCEL_CONFIG = path.join(process.cwd(), 'vercel.json')
const DOCS_DIR = path.join(process.cwd(), 'src/content/docs')
const DOCS_MARKDOWN = path.join(process.cwd(), 'src/helpers/docs-markdown.js')
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

const NON_DOCS_PATHNAMES = [
  '/screenshot/php.md',
  '/screenshot.md',
  '/pricing.md',
  '/index.md',
  '/blog/some-post.md'
]

describe('markdown content-type header', () => {
  test('is declared', () => {
    expect(markdownRule).toBeDefined()
  })

  test('covers every generated docs markdown file', () => {
    expect(docsMarkdownPathnames.length).toBeGreaterThan(0)
    for (const pathname of docsMarkdownPathnames) {
      expect(matchesRule(pathname), pathname).toBe(true)
    }
  })

  test('never labels a page without a markdown file as markdown', () => {
    for (const pathname of NON_DOCS_PATHNAMES) {
      expect(matchesRule(pathname), pathname).toBe(false)
    }
  })
})

const acceptsMarkdown = ({ has = [] }) =>
  has.some(
    ({ type, key, value }) =>
      type === 'header' && key === 'accept' && value.includes('text/markdown')
  )

const negotiation = (redirects || []).find(acceptsMarkdown)

const matchesNegotiation = pathname =>
  new RegExp(`^${negotiation.source}$`).test(pathname)

describe('markdown content negotiation', () => {
  test('is a redirect, since rewrites run after the filesystem check', () => {
    expect(negotiation).toBeDefined()
    expect((rewrites || []).find(acceptsMarkdown)).toBeUndefined()
  })

  test('does not cache the negotiated location', () => {
    expect(negotiation.permanent).toBe(false)
  })

  test('sends a docs page to its markdown file', () => {
    expect(matchesNegotiation('/docs/api/parameters/filename')).toBe(true)
    expect(negotiation.destination).toBe('/docs/$1.md')
  })

  test('leaves a markdown file alone, so it cannot redirect to itself', () => {
    for (const pathname of docsMarkdownPathnames) {
      expect(matchesNegotiation(pathname), pathname).toBe(false)
    }
  })
})

const selector = fs
  .readFileSync(DOCS_MARKDOWN, 'utf8')
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
