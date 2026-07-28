const ENTRY_RE = /^-\s+\[([^\]]+)\]\(([^)]+)\):\s+(.+)$/m
const MARKDOWN_LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/

const stripMarkdownLinks = text =>
  text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()

export const parseLatestChangelogEntry = markdown => {
  const match = String(markdown || '').match(ENTRY_RE)
  if (!match) return null

  const [, product, productHref, descriptionMarkdown] = match
  const description = stripMarkdownLinks(descriptionMarkdown)
  if (!description) return null

  const descriptionLink = descriptionMarkdown.match(MARKDOWN_LINK_RE)
  const href = descriptionLink?.[2] || productHref

  return { product, description, href }
}
