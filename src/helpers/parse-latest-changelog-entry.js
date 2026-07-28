const ENTRY_RE = /^-\s+\[([^\]]+)\]\(([^)]+)\):\s+(.+)$/m

const stripMarkdownLinks = text =>
  text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()

export const parseLatestChangelogEntry = markdown => {
  const match = String(markdown || '').match(ENTRY_RE)
  if (!match) return null

  const [, product, , descriptionMarkdown] = match
  const description = stripMarkdownLinks(descriptionMarkdown)
  if (!product || !description) return null

  return { product, description }
}
