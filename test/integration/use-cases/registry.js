import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { describe, expect, test } from 'vitest'

import {
  INDUSTRIES,
  USE_CASES,
  VERTICALS,
  verticalUseCases
} from '../../../src/components/patterns/UseCaseStory/use-cases.js'
import {
  CUSTOMERS,
  CUSTOMERS_PATH,
  customerPath
} from '../../../src/components/patterns/CustomerStory/customers.js'

const ROOT = process.cwd()
const PAGES_DIR = path.join(ROOT, 'src', 'pages', 'use-cases')
const CONTENT_DIR = path.join(ROOT, 'src', 'components', 'pages', 'use-cases')
const DOCS_DIR = path.join(ROOT, 'src', 'content', 'docs')
const PARAMETERS_DIR = path.join(DOCS_DIR, 'api', 'parameters')

const TITLE_LENGTH = [30, 58]
const HUB_TITLE_LENGTH = [20, 58]
const DESCRIPTION_LENGTH = [70, 155]
const FAQ_LENGTH = [3, 5]
const RELATED_LENGTHS = [3, 6]
const INLINE_LINK = /\[[^\]]+\]\((\/[^)\s]*)\)/g
const BANNED_TEXT = [
  ['—', 'an em dash'],
  ['...', 'three dots instead of an ellipsis']
]

const exists = file => fs.existsSync(file)
const read = file => fs.readFileSync(file, 'utf8')

const walk = dir =>
  exists(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
      const file = path.join(dir, entry.name)
      if (entry.isDirectory()) return walk(file)
      return entry.name.endsWith('.js') ? [file] : []
    })
    : []

const walkMarkdown = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) return walkMarkdown(file)
    return entry.name.endsWith('.md') ? [file] : []
  })

const documentedParameters = new Set(
  walkMarkdown(PARAMETERS_DIR).map(file =>
    path
      .relative(PARAMETERS_DIR, file)
      .replace(/\.md$/, '')
      .replace(/\/?index$/, '')
      .split(path.sep)
      .join('.')
  )
)

const isDocumentedParameter = key =>
  key
    .split('.')
    .map((_, index, parts) => parts.slice(0, index + 1).join('.'))
    .some(prefix => documentedParameters.has(prefix))

const docsFileFor = href => {
  const relative = href.replace(/^\/docs\/?/, '').replace(/#.*$/, '')
  return [
    path.join(DOCS_DIR, `${relative}.md`),
    path.join(DOCS_DIR, relative, 'index.md')
  ].some(exists)
}

const SITE_PAGES_DIR = path.join(ROOT, 'src', 'pages')

const pageFileFor = href => {
  const relative = href.replace(/^\//, '').replace(/[#?].*$/, '')
  return [
    path.join(SITE_PAGES_DIR, `${relative}.js`),
    path.join(SITE_PAGES_DIR, relative, 'index.js')
  ].some(exists)
}

const resolvesInternally = href =>
  href.startsWith('/docs/') ? docsFileFor(href) : pageFileFor(href)

const inlineLinksOf = content =>
  [...JSON.stringify(content).matchAll(INLINE_LINK)].map(([, href]) => href)

const flattenKeys = (value, prefix = '') =>
  value && typeof value === 'object' && !Array.isArray(value)
    ? Object.entries(value).flatMap(([key, child]) =>
      flattenKeys(child, prefix ? `${prefix}.${key}` : key)
    )
    : [prefix]

const between =
  ([min, max]) =>
    value =>
      value.length >= min && value.length <= max

const landings = USE_CASES.filter(entry => entry.vertical)
const verticalSlugs = VERTICALS.map(({ slug }) => slug)

const pageFile = slug => path.join(PAGES_DIR, `${slug}.js`)
const contentFile = slug => path.join(CONTENT_DIR, `${slug}.js`)
const hubFile = vertical => path.join(PAGES_DIR, vertical, 'index.js')

const loadContent = async slug => {
  const module = await import(pathToFileURL(contentFile(slug)).href)
  return module.CONTENT
}

const contents = new Map(
  await Promise.all(
    landings.map(async entry => [entry.slug, await loadContent(entry.slug)])
  )
)

const requestsOf = content => {
  const steps = content.how.steps.filter(step => step.request)
  const figures = [content.problem.figure, content.problem.live].filter(Boolean)
  return [...steps, ...figures].map(({ request }) => request)
}

describe('use case verticals', () => {
  test.each(VERTICALS)('$slug hub copy fits the SEO budgets', vertical => {
    expect(vertical.hub.title).toSatisfy(between(HUB_TITLE_LENGTH))
    expect(vertical.hub.description).toSatisfy(between(DESCRIPTION_LENGTH))
    expect(vertical.hub.h1).toBeTruthy()
    expect(vertical.hub.intro).toBeTruthy()
  })

  test.each(VERTICALS)(
    '$slug has a hub page when it has landings',
    vertical => {
      if (verticalUseCases(vertical.slug).length === 0) return
      expect(exists(hubFile(vertical.slug)), hubFile(vertical.slug)).toBe(true)
    }
  )
})

describe('use case registry', () => {
  test('landing slugs are unique and namespaced by vertical', () => {
    const slugs = USE_CASES.map(({ slug }) => slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const entry of landings) {
      expect(verticalSlugs).toContain(entry.vertical)
      expect(entry.slug.startsWith(`${entry.vertical}/`)).toBe(true)
    }
  })

  test('card link labels are present and never repeat', () => {
    const labels = [...USE_CASES, ...INDUSTRIES].map(({ cta }) => cta)
    expect(labels.filter(label => !label)).toEqual([])
    expect(new Set(labels).size).toBe(labels.length)
  })

  test('every page under src/pages/use-cases is registered', () => {
    const known = new Set([
      ...USE_CASES.map(({ slug }) => slug),
      'customers',
      ...CUSTOMERS.map(({ slug }) => `customers/${slug}`),
      ...INDUSTRIES.map(({ slug }) => slug),
      ...verticalSlugs
    ])
    const orphans = walk(PAGES_DIR)
      .map(file => path.relative(PAGES_DIR, file).split(path.sep).join('/'))
      .map(name => name.replace(/\.js$/, '').replace(/\/?index$/, ''))
      .filter(slug => slug !== '' && !known.has(slug))
    expect(orphans).toEqual([])
  })

  test.each(landings)('$slug related slugs resolve', entry => {
    const slugs = USE_CASES.map(({ slug }) => slug)
    expect(RELATED_LENGTHS).toContain(entry.related.length)
    expect(entry.related).not.toContain(entry.slug)
    expect(entry.related.filter(slug => !slugs.includes(slug))).toEqual([])
    expect(
      entry.related.some(slug => slug.startsWith(`${entry.vertical}/`))
    ).toBe(true)
  })

  test.each(landings)('$slug ships a page and a content module', entry => {
    expect(exists(pageFile(entry.slug)), pageFile(entry.slug)).toBe(true)
    expect(exists(contentFile(entry.slug)), contentFile(entry.slug)).toBe(true)
    const page = read(pageFile(entry.slug))
    expect(page).toContain(`components/pages/use-cases/${entry.slug}'`)
    expect(page).toContain("schemaType='TechArticle'")
    expect(page).toContain('useCaseStructured(')
    expect(page).toContain('<UseCaseLanding')
  })
})

describe('customer stories', () => {
  const { redirects } = JSON.parse(read(path.join(ROOT, 'vercel.json')))
  const destinationOf = source =>
    redirects.find(redirect => redirect.source === source)?.destination

  test('the hub page lives under the customers path', () => {
    expect(CUSTOMERS_PATH).toBe('/use-cases/customers')
    expect(exists(path.join(PAGES_DIR, 'customers', 'index.js'))).toBe(true)
  })

  test.each(CUSTOMERS)('$slug ships a page under the customers path', entry => {
    expect(exists(pageFile(`customers/${entry.slug}`))).toBe(true)
    expect(exists(pageFile(entry.slug))).toBe(false)
  })

  test.each(CUSTOMERS)('$slug old URL redirects to the new one', entry => {
    expect(destinationOf(`/use-cases/${entry.slug}`)).toBe(
      customerPath(entry.slug)
    )
  })

  test('legacy /customers URLs skip the intermediate hop', () => {
    expect(destinationOf('/customers')).toBe(CUSTOMERS_PATH)
    expect(destinationOf('/customers/:path*')).toBe(`${CUSTOMERS_PATH}/:path*`)
  })

  test('customer slugs never collide with a use case route', () => {
    const taken = new Set([
      ...USE_CASES.map(({ slug }) => slug),
      ...verticalSlugs,
      'customers'
    ])
    expect(CUSTOMERS.filter(({ slug }) => taken.has(slug))).toEqual([])
  })
})

describe('use case content', () => {
  test.each(landings)('$slug content matches the registry', entry => {
    const content = contents.get(entry.slug)
    expect(content.slug).toBe(entry.slug)
    expect(entry.name).toBeTruthy()
    expect(entry.blurb).toBeTruthy()
    expect(entry.category).toBeTruthy()
    expect(entry.keywords.length).toBeGreaterThan(0)
  })

  test.each(landings)('$slug head copy fits the SEO budgets', entry => {
    const { head } = contents.get(entry.slug)
    expect(head.title).toSatisfy(between(TITLE_LENGTH))
    expect(head.description).toSatisfy(between(DESCRIPTION_LENGTH))
    expect(head.title).not.toMatch(/microlink/i)
  })

  test.each(landings)('$slug has every section filled', entry => {
    const content = contents.get(entry.slug)
    expect(content.hero.title).toBeTruthy()
    expect(content.hero.intro).toBeTruthy()
    expect(content.hero.cta.href).toBeTruthy()
    expect(content.problem.paragraphs.length).toBeGreaterThan(0)
    expect(content.how.steps.length).toBeGreaterThan(0)
    expect(content.how.steps.some(step => step.sdk || step.request)).toBe(true)
    expect(content.why.cards).toHaveLength(3)
    expect(content.faq).toSatisfy(between(FAQ_LENGTH))
    expect(content.cta.href).toBeTruthy()
    expect(content.cta.label).toBeTruthy()
  })

  test.each(landings)('$slug parameters are documented', entry => {
    const content = contents.get(entry.slug)
    for (const { name, href } of content.how.params || []) {
      expect(name).toBeTruthy()
      expect(docsFileFor(href), href).toBe(true)
    }
    for (const request of requestsOf(content)) {
      expect(request.url).toMatch(/^https?:\/\//)
      for (const key of flattenKeys(request.params || {})) {
        expect(isDocumentedParameter(key), key).toBe(true)
        expect(Array.isArray(request.params[key.split('.')[0]]), key).toBe(
          false
        )
      }
    }
  })

  test.each(landings)(
    '$slug inline links resolve to a page or a doc',
    entry => {
      const content = contents.get(entry.slug)
      const broken = inlineLinksOf(content).filter(
        href => !resolvesInternally(href)
      )
      expect(broken).toEqual([])
      expect(inlineLinksOf(content)).not.toContain(`/use-cases/${entry.slug}`)
    }
  )

  test.each(landings)('$slug copy avoids banned characters', entry => {
    const text = JSON.stringify(contents.get(entry.slug))
    for (const [needle, reason] of BANNED_TEXT) {
      expect(text.includes(needle), reason).toBe(false)
    }
  })

  test('titles, headlines and FAQ questions are unique across the catalog', () => {
    const titles = []
    const headlines = []
    const questions = []
    for (const content of contents.values()) {
      titles.push(content.head.title.toLowerCase())
      headlines.push(content.hero.title.toLowerCase())
      questions.push(
        ...content.faq.map(({ question }) => question.toLowerCase())
      )
    }
    for (const list of [titles, headlines, questions]) {
      expect(new Set(list).size).toBe(list.length)
    }
  })
})

describe('industry hubs', () => {
  test.each(INDUSTRIES)('$slug ships a page', industry => {
    expect(industry.slug.startsWith('industries/')).toBe(true)
    const page = read(pageFile(industry.slug))
    expect(page).toContain(`getIndustry('${industry.slug}')`)
    expect(page).toContain('industryStructured(')
    expect(page).toContain('<IndustryHub')
  })

  test.each(INDUSTRIES)('$slug head copy fits the SEO budgets', industry => {
    expect(industry.head.title).toSatisfy(between(TITLE_LENGTH))
    expect(industry.head.description).toSatisfy(between(DESCRIPTION_LENGTH))
    expect(industry.head.title).not.toMatch(/microlink/i)
  })

  test.each(INDUSTRIES)('$slug groups landings that exist', industry => {
    const slugs = landings.map(({ slug }) => slug)
    expect(RELATED_LENGTHS).toContain(industry.useCases.length)
    expect(industry.useCases.filter(slug => !slugs.includes(slug))).toEqual([])
    expect(new Set(industry.useCases).size).toBe(industry.useCases.length)
  })

  test.each(INDUSTRIES)('$slug has every section filled', industry => {
    expect(industry.h1).toBeTruthy()
    expect(industry.intro).toBeTruthy()
    expect(industry.productHref).toBeTruthy()
    expect(industry.productLabel).toBeTruthy()
    expect(industry.pipeline.cards).toHaveLength(3)
    expect(industry.build.paragraphs.length).toBeGreaterThan(0)
    expect(industry.faq).toSatisfy(between(FAQ_LENGTH))
    expect(industry.ctaSection.href).toBeTruthy()
    expect(typeof industry.cta).toBe('string')
  })

  test.each(INDUSTRIES)('$slug inline links resolve and copy avoids banned characters', industry => {
    expect(inlineLinksOf(industry).filter(href => !resolvesInternally(href))).toEqual([])
    const text = JSON.stringify(industry)
    for (const [needle, reason] of BANNED_TEXT) {
      expect(text.includes(needle), reason).toBe(false)
    }
  })

  test('industry titles and questions never repeat a landing', () => {
    const titles = [...contents.values()].map(({ head }) => head.title.toLowerCase())
    const questions = [...contents.values()].flatMap(({ faq }) =>
      faq.map(({ question }) => question.toLowerCase())
    )
    for (const industry of INDUSTRIES) {
      expect(titles).not.toContain(industry.head.title.toLowerCase())
      for (const { question } of industry.faq) {
        expect(questions).not.toContain(question.toLowerCase())
      }
    }
  })
})
