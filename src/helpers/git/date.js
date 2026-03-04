import createdTimestamps from '../../../data/git-timestamps-created.json'
import modifiedTimestamps from '../../../data/git-timestamps-modified.json'
import { toValidDate } from '../to-valid-date'

const normalizePathname = pathname => {
  if (!pathname) return '/'
  if (pathname === '/') return pathname
  return pathname.replace(/\/+$/, '')
}

const toPathCandidates = pathname => {
  const normalizedPathname = normalizePathname(pathname)
  const relativePath =
    normalizedPathname === '/' ? '/index' : normalizedPathname

  return [
    `src/pages${relativePath}.js`,
    `src/pages${relativePath}/index.js`,
    `src/pages${relativePath}.md`,
    `src/pages${relativePath}/index.md`,
    `src/content${relativePath}.md`,
    `src/content${relativePath}.mdx`,
    `src/content${relativePath}/index.md`,
    `src/content${relativePath}/index.mdx`
  ]
}

const getDateFromPathname = (pathname, timestamps) => {
  for (const candidate of toPathCandidates(pathname)) {
    const value = timestamps[candidate]
    const validDate = toValidDate(value)
    if (validDate) return validDate
  }
}

export const getLastModifiedFromPathname = pathname =>
  getDateFromPathname(pathname, modifiedTimestamps)

export const getCreatedFromPathname = pathname =>
  getDateFromPathname(pathname, createdTimestamps)
