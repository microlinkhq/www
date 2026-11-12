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

const NAVIGATION_SOURCE = 'components/patterns/Toolbar/ToolbarLinks.js'
const PRODUCTS_SECTION = /label: 'Products',[\s\S]*?\n {2}\},?\n/
const INTERNAL_HREF = /href: '(\/[a-z-]+)'/g

const pageFileFor = route =>
  [`pages${route}.js`, `pages${route}/index.js`].find(file =>
    fs.existsSync(path.join(SRC, file))
  )

const NAV_PRODUCT_ROUTES = [
  ...read(NAVIGATION_SOURCE).match(PRODUCTS_SECTION)[0].matchAll(INTERNAL_HREF)
].map(match => match[1])

const OTHER_PRODUCT_PAGES = [
  'pages/ai.js',
  'pages/alternative/browserbase.js',
  'pages/alternative/clearbit.js',
  'pages/alternative/index.js',
  'pages/alternative/jina-reader.js',
  'pages/alternative/playwright.js',
  'pages/alternative/puppeteer.js',
  'pages/alternative/scraperapi.js',
  'pages/alternative/scrapingbee.js',
  'pages/alternative/serpapi.js'
]

const PRODUCT_PAGES = [
  ...NAV_PRODUCT_ROUTES.map(pageFileFor),
  ...OTHER_PRODUCT_PAGES
]

const PAGE_CTA_IMPORT = /from '(components\/pages\/[a-z-]+\/cta)'/

const rendersSharedPattern = source =>
  source.includes(PATTERN_IMPORT) || PAGE_CTA_IMPORT.test(source)

const FAQ_ELEMENT = /<(ProductInformation|ProductFaq|Faq)\b/g
const CTA_ELEMENT = /<CallToAction\b/

const lastFaqIndex = source =>
  Math.max(-1, ...[...source.matchAll(FAQ_ELEMENT)].map(m => m.index))

const langNavBlocks = source =>
  [...source.matchAll(/<LangLandingsNav\b[\s\S]*?\/>/g)].map(m => m[0])

const SHARED_CTA_IMPORT =
  /import \{[^}]*\bCTA\b[^}]*\} from '(components\/pages\/[a-z-]+\/[a-z-]+)'/
const SHARED_CTA_BLOCK = /export const CTA = \{[\s\S]*?\n\}/
const CTA_JSX_BLOCK = /<(?:FreeKeyCallToAction|CallToAction)\b[^>]*>/
const LINKS_CONST = /links=\{([A-Z_]+)\}/
const CTA_ID = /\bcta[:=]\s*'([^']+)'/
const HREF = /href: '([^']+)'/g

const ctaConfigFor = file => {
  const source = read(file)
  if (source.includes('{...CTA}')) {
    const sharedFile = `${source.match(SHARED_CTA_IMPORT)[1]}.js`
    return read(sharedFile).match(SHARED_CTA_BLOCK)[0]
  }
  const pageCta = source.match(PAGE_CTA_IMPORT)
  if (pageCta) return ctaConfigFor(`${pageCta[1]}.js`)
  const block = source.match(CTA_JSX_BLOCK)[0]
  const linksConst = block.match(LINKS_CONST)
  if (!linksConst) return block
  const links = source.match(
    new RegExp(`const ${linksConst[1]} = \\[[\\s\\S]*?\\n\\]`)
  )[0]
  return `${block}\n${links}`
}

const CALLERS = [...PAGE_CTAS, ...PRODUCT_PAGES]

const routeFileFor = href => {
  const route = href.replace(/^\/|\/$/g, '')
  const base = route.startsWith('docs/')
    ? path.join(SRC, 'content', route)
    : path.join(SRC, 'pages', route)
  const ext = route.startsWith('docs/') ? '.md' : '.js'
  return [`${base}${ext}`, path.join(base, `index${ext}`)].find(fs.existsSync)
}

const SIDE_LONGHANDS = {
  p: ['pt', 'pb', 'pl', 'pr', 'px', 'py'],
  m: ['mt', 'mb', 'ml', 'mr', 'mx', 'my'],
  px: ['pl', 'pr'],
  py: ['pt', 'pb'],
  mx: ['ml', 'mr'],
  my: ['mt', 'mb']
}

const shorthandsAfterLonghands = source =>
  [...source.matchAll(/theme\(\{([\s\S]*?)\}\)/g)].flatMap(([, body]) => {
    const keys = [...body.matchAll(/(?:^|[,{])\s*([a-zA-Z]+)\s*:/g)].map(
      ([, key]) => key
    )
    return keys.filter(
      (key, index) =>
        SIDE_LONGHANDS[key] &&
        keys.slice(0, index).some(seen => SIDE_LONGHANDS[key].includes(seen))
    )
  })

const langNavAccents = source =>
  langNavBlocks(source).filter(block => /\baccent=/.test(block))

describe('call to action pattern', () => {
  test.each(PAGE_CTAS)('%s renders the shared pattern', file => {
    const source = read(file)
    expect(source).toContain(PATTERN_IMPORT)
    expect(source).not.toMatch(/keyframes/)
    expect(source).not.toMatch(/\bSignupLink\b/)
  })

  test('reads every product from the Products menu', () => {
    expect(NAV_PRODUCT_ROUTES).toEqual(
      expect.arrayContaining(['/api', '/screenshot', '/search', '/insights'])
    )
    for (const route of NAV_PRODUCT_ROUTES) {
      expect(pageFileFor(route), route).toBeDefined()
    }
  })

  test.each(PRODUCT_PAGES)('%s closes with the shared pattern', file => {
    const source = read(file)
    expect(rendersSharedPattern(source)).toBe(true)
    expect(source).not.toMatch(/\bProductCta\b/)
    expect(source).not.toMatch(/\bCtaNow\b|\bCTA_LEAD_TEXT\b/)
  })

  test.each(PRODUCT_PAGES)(
    '%s places the call to action after the FAQ',
    file => {
      const source = read(file)
      const faq = lastFaqIndex(source)
      expect(faq, 'page renders a FAQ').toBeGreaterThan(-1)
      expect(source.search(CTA_ELEMENT)).toBeGreaterThan(faq)
    }
  )

  test.each([...PAGE_CTAS, 'pages/html.js', 'pages/logo.js'])(
    '%s keeps language guide links in the default link color',
    file => {
      expect(langNavAccents(read(file))).toEqual([])
    }
  )

  test('only an accent prop on the language guide links is rejected', () => {
    const allowed =
      "<LangLandingsNav langs={LANGS} current='nodejs' label='Language guides' />"
    expect(langNavAccents(allowed)).toEqual([])
    expect(
      langNavAccents('<LangLandingsNav langs={LANGS} accent={colors.red7} />')
    ).toHaveLength(1)
  })

  test('the legacy product call to action is gone', () => {
    expect(
      fs.existsSync(path.join(SRC, 'components/patterns/ProductStory/cta.js'))
    ).toBe(false)
  })

  test('every file rendering the pattern is a known caller', () => {
    const importers = fs
      .readdirSync(SRC, { recursive: true })
      .filter(file => file.endsWith('.js'))
      .filter(file => read(file).includes(PATTERN_IMPORT))
    expect(importers).toContain('components/pages/home/call-to-action.js')
    expect(CALLERS).toEqual(expect.arrayContaining(importers))
  })

  test.each(CALLERS)('%s sets the call to action copy', file => {
    expect(ctaConfigFor(file)).toMatch(/\b(outcome|caption)[:=]/)
  })

  test('every caller tracks signups under its own cta id', () => {
    const signupCallers = CALLERS.filter(
      file => !/\baction:/.test(ctaConfigFor(file))
    )
    expect(signupCallers).toEqual(
      CALLERS.filter(file => file !== 'pages/ai.js')
    )
    const configs = [...new Set(signupCallers.map(ctaConfigFor))]
    const ids = configs.map(config => config.match(CTA_ID)[1])
    expect(new Set(ids).size).toBe(configs.length)
    for (const id of ids) expect(id).toMatch(/^[a-z-]+:footer-cta$/)
  })

  test('next steps declared in a constant are read from it', () => {
    expect(ctaConfigFor('components/pages/home/call-to-action.js')).toContain(
      "href: '/docs/api/getting-started/mcp'"
    )
  })

  test.each(CALLERS)('%s links its next steps to pages that exist', file => {
    for (const [, href] of ctaConfigFor(file).matchAll(HREF)) {
      expect(routeFileFor(href), href).toBeDefined()
    }
  })

  test('the pattern never resets a side spacing with a later shorthand', () => {
    expect(
      shorthandsAfterLonghands(
        read('components/patterns/CallToAction/index.js')
      )
    ).toEqual([])
    expect(shorthandsAfterLonghands('theme({ p: 0, pt: 4, mx: 0 })')).toEqual(
      []
    )
  })

  test.each([
    ['pt', 'p'],
    ['pb', 'p'],
    ['pl', 'p'],
    ['pr', 'p'],
    ['px', 'p'],
    ['py', 'p'],
    ['mt', 'm'],
    ['mb', 'm'],
    ['ml', 'm'],
    ['mr', 'm'],
    ['mx', 'm'],
    ['my', 'm'],
    ['pl', 'px'],
    ['pr', 'px'],
    ['pt', 'py'],
    ['pb', 'py'],
    ['ml', 'mx'],
    ['mr', 'mx'],
    ['mt', 'my'],
    ['mb', 'my']
  ])('%s followed by %s is flagged as a reset', (longhand, shorthand) => {
    expect(
      shorthandsAfterLonghands(`theme({ ${longhand}: 4, ${shorthand}: 0 })`)
    ).toEqual([shorthand])
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

  test('next step links resolve docs index pages and site pages', () => {
    expect(routeFileFor('/docs/guides')).toMatch(/guides\/index\.md$/)
    expect(routeFileFor('/docs/api/getting-started/mcp')).toMatch(/mcp\.md$/)
    expect(routeFileFor('/pricing')).toMatch(/pages\/pricing\.js$/)
    expect(routeFileFor('/embed')).toMatch(/pages\/embed\/index\.js$/)
    expect(routeFileFor('/docs/does-not-exist')).toBeUndefined()
  })
})
