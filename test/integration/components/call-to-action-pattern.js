import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const SRC = path.join(process.cwd(), 'src')
const read = file => fs.readFileSync(path.join(SRC, file), 'utf8')

const PATTERN_IMPORT = "from 'components/patterns/CallToAction'"
const PAGE_CTAS = [
  'components/pages/markdown/cta.js',
  'components/pages/screenshot/cta.js',
  'components/pages/pdf/cta.js',
  'components/pages/metadata/cta.js',
  'components/pages/home/call-to-action.js',
  'components/pages/blog/post-footer.js'
]

const PRODUCT_PAGES = [
  'pages/ai.js',
  'pages/api.js',
  'pages/embed/index.js',
  'pages/file-conversion.js',
  'pages/function.js',
  'pages/html.js',
  'pages/link-preview.js',
  'pages/logo.js',
  'pages/markdown.js',
  'pages/media.js',
  'pages/metadata.js',
  'pages/pdf.js',
  'pages/screenshot.js',
  'pages/text.js',
  'pages/alternative/browserbase.js',
  'pages/alternative/scrapingbee.js',
  'pages/alternative/serpapi.js'
]

const PAGE_CTA_IMPORT = /from 'components\/pages\/[a-z-]+\/cta'/

const rendersSharedPattern = source =>
  source.includes(PATTERN_IMPORT) || PAGE_CTA_IMPORT.test(source)

const docsFileFor = href =>
  path.join(SRC, 'content', `${href.replace(/^\/|\/$/g, '')}.md`)

describe('call to action pattern', () => {
  test.each(PAGE_CTAS)('%s renders the shared pattern', file => {
    const source = read(file)
    expect(source).toContain(PATTERN_IMPORT)
    expect(source).not.toMatch(/keyframes/)
    expect(source).not.toMatch(/\bSignupLink\b/)
  })

  test.each(PRODUCT_PAGES)('%s closes with the shared pattern', file => {
    const source = read(file)
    expect(rendersSharedPattern(source)).toBe(true)
    expect(source).not.toMatch(/\bProductCta\b/)
    expect(source).not.toMatch(/\bCtaNow\b|\bCTA_LEAD_TEXT\b/)
  })

  test('the legacy product call to action is gone', () => {
    expect(
      fs.existsSync(path.join(SRC, 'components/patterns/ProductStory/cta.js'))
    ).toBe(false)
  })

  test('every caller tracks signups under its own cta id', () => {
    const ids = PAGE_CTAS.map(file => read(file).match(/cta='([^']+)'/)[1])
    expect(new Set(ids).size).toBe(PAGE_CTAS.length)
    for (const id of ids) expect(id).toMatch(/^[a-z]+:footer-cta$/)
  })

  test('the homepage closes with the call to action after the FAQ', () => {
    const page = read('pages/index.js')
    const faqs = page.indexOf('<Faqs />')
    const cta = page.indexOf('<CallToAction />')
    expect(faqs).toBeGreaterThan(-1)
    expect(cta).toBeGreaterThan(faqs)
    expect(page.indexOf('<GradualBlur />')).toBeGreaterThan(cta)
  })

  test('blog posts close with the call to action instead of the community pitch', () => {
    const template = read('templates/page.js')
    expect(template).toContain('{isBlogPage && <PostFooter />}')
    expect(read('components/pages/blog/post-footer.js')).not.toMatch(
      /community/i
    )
  })

  test('homepage next steps link to docs pages that exist', () => {
    const source = read('components/pages/home/call-to-action.js')
    const hrefs = [...source.matchAll(/href: '([^']+)'/g)].map(m => m[1])
    expect(hrefs.length).toBeGreaterThan(0)
    for (const href of hrefs) {
      expect(href.startsWith('/docs/')).toBe(true)
      expect(fs.existsSync(docsFileFor(href)), href).toBe(true)
    }
  })
})
