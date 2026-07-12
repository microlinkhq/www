export const extractHeader = llmsTxt => {
  const sectionIndex = llmsTxt.indexOf('\n##')
  const header = sectionIndex === -1 ? llmsTxt : llmsTxt.slice(0, sectionIndex)
  return header.trim()
}

export const extractMarkdownUrls = llmsTxt =>
  llmsTxt.match(/^https?:\/\/\S+\.md$/gm) || []

export const orderPages = ({ index, pages }) => {
  const position = new Map(index.map((url, i) => [url, i]))
  return [...pages].sort((a, b) => {
    const posA = position.has(a.url) ? position.get(a.url) : Infinity
    const posB = position.has(b.url) ? position.get(b.url) : Infinity
    if (posA !== posB) return posA - posB
    return a.url.localeCompare(b.url)
  })
}

export const buildLlmsFullTxt = ({ header, pages }) => {
  const sections = pages
    .filter(page => page.markdown && page.markdown.trim())
    .map(page => `---\nurl: ${page.url}\n---\n\n${page.markdown.trim()}`)
  return [header.trim(), ...sections].join('\n\n') + '\n'
}
