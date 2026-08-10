export const DOCS_CONTENT_SELECTOR = '[data-docs-content]'

export const withTitle = (title, markdown) =>
  title ? `# ${title}\n\n${markdown}` : markdown

// The conversion runs against the deployed site, which is still the previous
// build, so a freshly added marker is not on the live HTML yet. Fall back to
// the whole page for that one deploy rather than failing the build.
export const extractMarkdown = async fetchMarkdown => {
  const scoped = await fetchMarkdown(DOCS_CONTENT_SELECTOR)
  if (scoped.markdown) return { ...scoped, isScoped: true }
  const wholePage = await fetchMarkdown()
  return { ...wholePage, isScoped: false }
}
