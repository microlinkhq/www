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

export const extractMarkdown = async (fetchMarkdown, pathname) => {
  for (const selector of selectorsFor(pathname)) {
    const result = await fetchMarkdown(selector)
    if (result.markdown) return { ...result, selector }
  }
  const wholePage = await fetchMarkdown()
  return { ...wholePage, selector: null }
}
