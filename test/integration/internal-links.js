import { existsSync, readdirSync, readFileSync } from 'fs'
import path from 'path'
import { kebabCase } from 'lodash'
import recipes from '@microlink/recipes'
import { expect, test } from 'vitest'

import { dists } from '../../scripts/fetch-data/clean'
import { SKILL_CATEGORY } from '../../src/components/pages/skills/taxonomy'

const ROOT = path.resolve(__dirname, '../..')
const CONTENT_DIR = path.join(ROOT, 'src/content')
const PAGES_DIR = path.join(ROOT, 'src/pages')
const COMPONENTS_DIR = path.join(ROOT, 'src/components')
const SKILLS_DIR = path.join(ROOT, 'data/skills-content')
const STATIC_DIR = path.join(ROOT, 'static')
const VERCEL_CONFIG = path.join(ROOT, 'vercel.json')

const MARKDOWN_EXTENSION = /\.mdx?$/
const SCRIPT_EXTENSION = /\.js$/
const SITE_ORIGIN = String.raw`(?:(?:https?:)?\/\/(?:www\.)?microlink\.io)?`
const SITE_PATH = String.raw`(\/(?!\/)[^)\s]*)`
const LINK_TITLE = String.raw`(?:\s+(?:"[^"]*"|'[^']*'))?`
const OPTIONAL_INTERNAL = String.raw`(?:${SITE_ORIGIN}${SITE_PATH}|[^)\s]*)`
const NESTED_IMAGE_LINK = String.raw`\[!\[[^\]]*\]\(${OPTIONAL_INTERNAL}${LINK_TITLE}\)\]\(${OPTIONAL_INTERNAL}${LINK_TITLE}\)`
const MARKDOWN_LINK = new RegExp(
  String.raw`${NESTED_IMAGE_LINK}|\[[^\]]*\]\(${SITE_ORIGIN}${SITE_PATH}${LINK_TITLE}\)|href=["']${SITE_ORIGIN}(\/(?!\/)[^"']*)["']|^\[[^\]]+\]:\s*${SITE_ORIGIN}(\/(?!\/)\S+)`,
  'gm'
)
const JSX_LINK = new RegExp(
  String.raw`\bhref(?:=|: )'${SITE_ORIGIN}(\/(?!\/)[^']*)'|\[[^\]\n]*\]\(${SITE_ORIGIN}(\/(?!\/)[^)\s]*)\)`,
  'g'
)
const PATH_SUFFIX = /[?#].*$/
const TRAILING_SLASH = /(.)\/+$/
const DYNAMIC_SEGMENT = /[[:*(]/
const NAMED_SEGMENT = /^\/[\w/-]*:\w+/
const GATSBY_SITEMAP_INDEX = '/sitemap-index.xml'
const ABSOLUTE_SITE_LINK =
  /(?:\]\(|\bhref(?:=|: ?)\{?\s*["'`])(?:https?:)?\/\/(?:www\.)?microlink\.io(\/[^)"'`\s]*)?(?=[)"'`\s])/g
const SAMPLE_OUTPUT_FILES = new Set([
  'src/components/pages/markdown/lang/markdown-demo.js'
])

const listFiles = (dir, extension) =>
  existsSync(dir)
    ? readdirSync(dir, { recursive: true, withFileTypes: true })
      .filter(entry => extension.test(entry.name))
      .map(entry => path.join(entry.parentPath, entry.name))
    : []

const toRoute = (dir, file, extension) =>
  path
    .relative(dir, file)
    .replace(extension, '')
    .replace(/(^|\/)index$/, '')
    .replace(/^/, '/')

const safeDecode = value => {
  try {
    return decodeURI(value)
  } catch {
    return value
  }
}

const normalize = link =>
  safeDecode(link.replace(PATH_SUFFIX, '')).replace(TRAILING_SLASH, '$1')

const isUnconditionalRedirect = redirect => !redirect.has && !redirect.missing

const unconditionalRedirects = JSON.parse(
  readFileSync(VERCEL_CONFIG, 'utf8')
).redirects.filter(isUnconditionalRedirect)

const staticRedirects = new Set(
  unconditionalRedirects
    .map(({ source }) => source)
    .filter(source => !DYNAMIC_SEGMENT.test(source))
    .map(normalize)
)

const toRedirectPattern = source =>
  new RegExp(
    `^${source
      .replace(/[.]/g, '\\.')
      .replace(/\/:\w+\*/g, '(?:/.*)?')
      .replace(/:\w+/g, '[^/]+')}$`
  )

const dynamicRedirects = unconditionalRedirects
  .map(({ source }) => source)
  .filter(source => NAMED_SEGMENT.test(source))
  .map(toRedirectPattern)

const isRedirect = link => {
  const route = normalize(link)
  return (
    staticRedirects.has(route) ||
    dynamicRedirects.some(pattern => pattern.test(route))
  )
}

const knownRoutes = new Set([
  ...listFiles(PAGES_DIR, SCRIPT_EXTENSION).map(file =>
    toRoute(PAGES_DIR, file, SCRIPT_EXTENSION)
  ),
  ...listFiles(CONTENT_DIR, MARKDOWN_EXTENSION).map(file =>
    toRoute(CONTENT_DIR, file, MARKDOWN_EXTENSION)
  ),
  ...listFiles(SKILLS_DIR, MARKDOWN_EXTENSION).map(
    file => `/skills/${path.basename(file).replace(MARKDOWN_EXTENSION, '')}`
  ),
  ...Object.keys(SKILL_CATEGORY).map(slug => `/skills/${slug}`),
  ...dists()
    .map(dist => path.relative(STATIC_DIR, dist))
    .filter(rel => !rel.startsWith('..') && path.extname(rel))
    .map(rel => `/${rel.split(path.sep).join('/')}`),
  ...Object.keys(recipes).map(name => `/recipes/${kebabCase(name)}`),
  GATSBY_SITEMAP_INDEX
])

const isStaticFile = route => {
  const file = path.join(STATIC_DIR, route)
  const relative = path.relative(STATIC_DIR, file)
  if (relative.startsWith('..') || path.isAbsolute(relative)) return false
  return existsSync(file) && !existsSync(path.join(file, '/'))
}

const resolves = link => {
  const route = normalize(link)
  return (
    knownRoutes.has(route.replace(/\.md$/, '')) ||
    isRedirect(link) ||
    isStaticFile(route)
  )
}

const collectLinks = (files, pattern) =>
  files.flatMap(file =>
    [...readFileSync(file, 'utf8').matchAll(pattern)].flatMap(([, ...groups]) =>
      groups.filter(Boolean).map(link => ({
        file: path.relative(ROOT, file),
        link
      }))
    )
  )

const internalLinks = [
  ...collectLinks(listFiles(CONTENT_DIR, MARKDOWN_EXTENSION), MARKDOWN_LINK),
  ...collectLinks(
    [
      ...listFiles(PAGES_DIR, SCRIPT_EXTENSION),
      ...listFiles(COMPONENTS_DIR, SCRIPT_EXTENSION)
    ],
    JSX_LINK
  )
]

test('scans internal links from markdown content and JSX pages', () => {
  const sources = new Set(internalLinks.map(({ file }) => file.split('/')[1]))
  expect([...sources].sort()).toEqual(['components', 'content', 'pages'])
  expect(internalLinks.length).toBeGreaterThan(1000)
})

test('every internal link resolves to a page, static file or redirect', () => {
  const broken = internalLinks.filter(({ link }) => !resolves(link))
  expect(broken).toEqual([])
})

test('no internal link points at a redirect instead of its destination', () => {
  const redirected = internalLinks.filter(({ link }) => isRedirect(link))
  expect(redirected).toEqual([])
})

const absoluteLinksIn = source =>
  [...source.matchAll(ABSOLUTE_SITE_LINK)].map(([, link]) => link || '/')

const absoluteSiteLinks = [
  ...listFiles(CONTENT_DIR, MARKDOWN_EXTENSION),
  ...listFiles(PAGES_DIR, SCRIPT_EXTENSION),
  ...listFiles(COMPONENTS_DIR, SCRIPT_EXTENSION)
].flatMap(file =>
  absoluteLinksIn(readFileSync(file, 'utf8')).map(link => ({
    file: path.relative(ROOT, file),
    link
  }))
)

test('internal page links are relative so they route client-side', () => {
  const absolute = absoluteSiteLinks.filter(
    ({ file, link }) =>
      !SAMPLE_OUTPUT_FILES.has(file) && !isStaticFile(normalize(link))
  )
  expect(absolute).toEqual([])
})

test('absolute site links are found with and without a path', () => {
  expect(
    absoluteLinksIn(
      [
        '[home](https://microlink.io)',
        "<Link href='https://www.microlink.io/' children='x' />",
        '<a href={`https://microlink.io/pricing`}>',
        "href: 'https://microlink.io/blog/x#h'",
        '[d](https://dashboard.microlink.io)',
        '[e](https://microlink.io.evil.test/x)',
        '[p](/pricing)'
      ].join('\n')
    )
  ).toEqual(['/', '/', '/pricing', '/blog/x#h'])
})

test('a linked image keeps the image and the href', () => {
  const linksOf = (pattern, sample) =>
    [...sample.matchAll(pattern)].flatMap(([, ...groups]) =>
      groups.filter(Boolean)
    )
  expect(linksOf(MARKDOWN_LINK, '[![](/images/pic.png)](/blog/gone)')).toEqual([
    '/images/pic.png',
    '/blog/gone'
  ])
  expect(
    linksOf(MARKDOWN_LINK, '[![](https://cdn.example/pic.png)](/blog/gone)')
  ).toEqual(['/blog/gone'])
  expect(
    linksOf(MARKDOWN_LINK, '[![](/images/pic.png)](https://example.com/x)')
  ).toEqual(['/images/pic.png'])
  expect(
    linksOf(MARKDOWN_LINK, '[![](/images/pic.png)](/blog/gone "Title")')
  ).toEqual(['/images/pic.png', '/blog/gone'])
  expect(
    linksOf(MARKDOWN_LINK, "[![](/images/pic.png)](/blog/gone 'Title')")
  ).toEqual(['/images/pic.png', '/blog/gone'])
})

test('protocol-relative URLs are not site links', () => {
  const linksOf = (pattern, sample) =>
    [...sample.matchAll(pattern)].map(([, ...groups]) => groups.find(Boolean))
  expect(
    linksOf(
      MARKDOWN_LINK,
      [
        '[pkg](//unpkg.com/@microlink/vanilla)',
        '<a href="//cdn.example.com/app.js">',
        '<a href="https://microlink.io/pricing">',
        '[pkg]: //unpkg.com/@microlink/vanilla',
        '[home]: https://microlink.io/pricing'
      ].join('\n')
    )
  ).toEqual(['/pricing', '/pricing'])
  expect(
    linksOf(
      JSX_LINK,
      [
        "href: '//unpkg.com/pkg'",
        "href: '//microlink.io/pricing'",
        "href='/pricing'"
      ].join('\n')
    )
  ).toEqual(['/pricing', '/pricing'])
})

test('conditional redirects stay off the unconditional list', () => {
  expect(isUnconditionalRedirect({ source: '/x', has: [{}] })).toBe(false)
  expect(isUnconditionalRedirect({ source: '/x', missing: [{}] })).toBe(false)
  expect(isUnconditionalRedirect({ source: '/x' })).toBe(true)
})

test('static and dynamic redirect sources match before a link is repointed', () => {
  expect(isRedirect('/docs')).toBe(true)
  expect(isRedirect('/oss')).toBe(true)
  expect(isRedirect('/docs/sdk-legacy/parameters/size')).toBe(true)
  expect(isRedirect('/docs/sdk-legacy/a/b')).toBe(true)
  expect(isRedirect('/docs/mql/data/attr')).toBe(true)
  expect(isRedirect('/docs/sdk/parameters/size')).toBe(true)
  expect(isRedirect('/docs/sdk/methods/insights/foo')).toBe(true)
  expect(isRedirect('/docs/sdk/methods/insights/foo/bar')).toBe(false)
  expect(isRedirect('/docs/sdk/methods/insights/foo.md')).toBe(true)
  const dotted = toRedirectPattern('/docs/v1.0/:name')
  expect(dotted.test('/docs/v1.0/intro')).toBe(true)
  expect(dotted.test('/docs/v1X0/intro')).toBe(false)
  expect(isRedirect('/customers/acme')).toBe(true)
  expect(isRedirect('/feature/proxy')).toBe(true)
  expect(isRedirect('/pricing')).toBe(false)
  expect(isRedirect('/docs/sdk/methods/extract')).toBe(false)
})

test('generated routes resolve before their files are fetched', () => {
  expect(resolves('/skills/microlink')).toBe(true)
  expect(resolves('/skills/microlink-api')).toBe(true)
  expect(resolves('/user-agents.json')).toBe(true)
  expect(resolves('/docs')).toBe(true)
  expect(resolves('/oss')).toBe(true)
  expect(resolves('/../data/skills.json')).toBe(false)
  expect(resolves('/data/hero-demo')).toBe(false)
  expect(isStaticFile('/robots.txt')).toBe(true)
  expect(isStaticFile('/images')).toBe(false)
  expect(isStaticFile('/../package.json')).toBe(false)
  expect(resolves('/../package.json')).toBe(false)
})

test('dynamic redirect markers are not literal paths', () => {
  expect(DYNAMIC_SEGMENT.test('/files/*')).toBe(true)
  expect(DYNAMIC_SEGMENT.test('/docs/:name')).toBe(true)
  expect(DYNAMIC_SEGMENT.test('/docs/(foo)')).toBe(true)
  expect(DYNAMIC_SEGMENT.test('/docs/[id]')).toBe(true)
  expect(DYNAMIC_SEGMENT.test('/pricing')).toBe(false)
})

test('internal images are scanned', () => {
  expect(
    internalLinks.some(
      ({ file, link }) =>
        file.endsWith('product-brief-1.md') &&
        link === '/images/1*JUalxjsY_tlU2txpxPsM9w-9417ef29.gif'
    )
  ).toBe(true)
})

test('a markdown twin of a page resolves', () => {
  expect(resolves('/pricing.md')).toBe(true)
})

test('malformed percent-encoding does not throw', () => {
  expect(() => resolves('/%')).not.toThrow()
  expect(resolves('/%')).toBe(false)
})
