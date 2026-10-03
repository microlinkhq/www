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

const toDataUri = async (url, fetchImage) => {
  try {
    const response = await fetchImage(url)
    if (!response.ok) return undefined
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.startsWith('image/')) return undefined
    const body = Buffer.from(await response.arrayBuffer())
    return `data:${contentType.split(';')[0]};base64,${body.toString('base64')}`
  } catch {
    return undefined
  }
}

export const inlineAvatars = async (authors, fetchImage = fetch) =>
  Promise.all(
    authors.map(async author => ({
      ...author,
      avatar: author.avatar && (await toDataUri(author.avatar, fetchImage))
    }))
  )
