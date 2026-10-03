const MAX_CODE_POINT = 0x10ffff

const entityChar = (code, radix) => {
  const codePoint = parseInt(code, radix)
  return codePoint <= MAX_CODE_POINT ? String.fromCodePoint(codePoint) : ''
}

export const decodeEntities = value =>
  value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => entityChar(code, 10))
    .replace(/&#x([\da-f]+);/gi, (_, code) => entityChar(code, 16))
    .replace(/&amp;/g, '&')

export const metaContent = (html, property) => {
  const match = html.match(
    new RegExp(`<meta property="${property}" content="([^"]*)"`)
  )
  return match ? decodeEntities(match[1]) : undefined
}

export const withoutTrailingSlash = pathname =>
  pathname.replace(/\/+$/, '') || '/'

export const authorsByPathname = ({ posts, authors }) => {
  const authorByKey = new Map(authors.map(author => [author.key, author]))
  const entries = posts.flatMap(({ slug, authorKeys }) => {
    if (!slug) return []
    const postAuthors = (authorKeys || []).flatMap(key => {
      const author = authorByKey.get(key)
      return author ? [{ name: author.name, avatar: author.avatar }] : []
    })
    return postAuthors.length > 0
      ? [[withoutTrailingSlash(slug), postAuthors]]
      : []
  })
  return new Map(entries)
}

export const pageMetadata = html => ({
  title: metaContent(html, 'og:title'),
  description: metaContent(html, 'og:description')
})

export const cardMetadata = ({ html, authors }) => ({
  ...pageMetadata(html),
  date:
    metaContent(html, 'article:modified_time') ||
    metaContent(html, 'article:published_time'),
  authors
})

const AVATAR_TIMEOUT_MS = 10000

const toDataUri = async (url, fetchImage) => {
  const response = await fetchImage(url, {
    signal: AbortSignal.timeout(AVATAR_TIMEOUT_MS)
  })
  if (!response.ok) throw new Error(`responded with ${response.status}`)
  const contentType = response.headers.get('content-type')
  if (!contentType || !contentType.startsWith('image/')) {
    throw new Error(`is not an image (${contentType})`)
  }
  const body = Buffer.from(await response.arrayBuffer())
  return `data:${contentType.split(';')[0]};base64,${body.toString('base64')}`
}

const inlineAvatar = async (author, { fetchImage, onError }) => {
  if (!author.avatar) return author
  try {
    return { ...author, avatar: await toDataUri(author.avatar, fetchImage) }
  } catch (error) {
    if (onError) onError(author, error)
    return { ...author, avatar: undefined }
  }
}

export const inlineAvatars = (authors, { fetchImage = fetch, onError } = {}) =>
  Promise.all(
    authors.map(author => inlineAvatar(author, { fetchImage, onError }))
  )
