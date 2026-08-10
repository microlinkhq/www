export const DOCS_CONTENT_SELECTOR = '[data-docs-content]'
export const MAIN_CONTENT_SELECTOR = '#main-content'

const GATSBY_INTERNAL =
  /^\/(404|dev-404-page|offline-plugin-app-shell-fallback)(\/|$)/

const EXCLUDED = [/^\/tools\/embed-url\/.+/, /^\/recipes(\/|$)/]

export const isMarkdownPage = pathname =>
  !GATSBY_INTERNAL.test(pathname) &&
  !EXCLUDED.some(pattern => pattern.test(pathname))

const isDocsPage = pathname => pathname.startsWith('/docs/')

// The docs template nests its article inside the page's main landmark, next to
// the sidebar; every other page is its main landmark.
const selectorsFor = pathname =>
  isDocsPage(pathname)
    ? [DOCS_CONTENT_SELECTOR, MAIN_CONTENT_SELECTOR]
    : [MAIN_CONTENT_SELECTOR]

export const toMarkdownPath = pathname =>
  `${pathname.replace(/^\/+/, '').replace(/\/+$/, '') || 'index'}.md`

export const prependTitle = (title, markdown) =>
  title ? `# ${title}\n\n${markdown}` : markdown

// The conversion runs against the deployed site, which is still the previous
// build, so a freshly added marker is not on the live HTML yet. Walk down to
// the whole page for that one deploy rather than failing the build.
export const extractMarkdown = async (fetchMarkdown, pathname) => {
  for (const selector of selectorsFor(pathname)) {
    const result = await fetchMarkdown(selector)
    if (result.markdown) return { ...result, selector }
  }
  const wholePage = await fetchMarkdown()
  return { ...wholePage, selector: null }
}
