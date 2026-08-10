import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const VERCEL_CONFIG = path.join(process.cwd(), 'vercel.json')
const DOCS_DIR = path.join(process.cwd(), 'src/content/docs')

const { headers } = JSON.parse(fs.readFileSync(VERCEL_CONFIG, 'utf8'))

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
