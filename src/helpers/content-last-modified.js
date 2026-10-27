const toIsoDate = value => {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}

export const contentLastModified = (node, lastModifiedDate) => {
  const modified = toIsoDate(node.frontmatter?.modified)
  if (modified) return modified
  return lastModifiedDate(node.internal.contentFilePath)
}
