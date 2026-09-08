export const DOCS_CONTENT_SELECTOR = '[data-docs-content]'
export const MAIN_CONTENT_SELECTOR = '#main-content'

const EXCLUDED = [
  /^\/(404|dev-404-page|offline-plugin-app-shell-fallback)(\/|$)/,
  /^\/tools\/embed-url\/.+/,
  /^\/recipes(\/|$)/
]

export const isMarkdownPage = pathname =>
  !EXCLUDED.some(pattern => pattern.test(pathname))

const isDocsPage = pathname => pathname.startsWith('/docs/')

const selectorsFor = pathname =>
  isDocsPage(pathname)
    ? [DOCS_CONTENT_SELECTOR, MAIN_CONTENT_SELECTOR]
    : [MAIN_CONTENT_SELECTOR]

export const toMarkdownPath = pathname =>
  `${pathname.replace(/^\/+/, '').replace(/\/+$/, '') || 'index'}.md`

export const prependTitle = (title, markdown) =>
  title ? `# ${title}\n\n${markdown}` : markdown

export const SITE_URL = 'https://microlink.io'

export const notFoundLinks = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Documentation' },
  {
    href: '/llms.txt',
    label: 'llms.txt',
    detail: 'index of every page as markdown'
  },
  {
    href: '/openapi.json',
    label: 'OpenAPI',
    detail: 'machine-readable API specification'
  },
  { href: '/sitemap.xml', label: 'Sitemap' }
]

const toAbsolute = href =>
  href === '/' ? `${SITE_URL}/` : `${SITE_URL}${href}`

export const notFoundMarkdown = `# Page not found

The page you’re looking for doesn’t exist or has been moved.

## Where to look next

${notFoundLinks
  .map(({ href, label, detail }) => {
    const note = detail ? ` — ${detail}` : ''
    return `- [${label}](${toAbsolute(href)})${note}`
  })
  .join('\n')}
`

const NOT_FOUND_STATUS_CODE = 404

export const isNotDeployedYet = statusCode =>
  statusCode === NOT_FOUND_STATUS_CODE

export const retryStaleNotFound = async fetchOnce => {
  const first = await fetchOnce(false)
  if (!isNotDeployedYet(first.statusCode)) return first
  return fetchOnce(true)
}

export const extractMarkdown = async (fetchMarkdown, pathname) => {
  for (const selector of selectorsFor(pathname)) {
    const result = await fetchMarkdown(selector)
    if (isNotDeployedYet(result.statusCode)) {
      return {
        markdown: null,
        statusCode: NOT_FOUND_STATUS_CODE,
        selector: null
      }
    }
    if (result.markdown) return { ...result, selector }
  }
  const wholePage = await fetchMarkdown()
  return { ...wholePage, selector: null }
}
