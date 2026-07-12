import { imagePath } from '@microlink/og'

const fingerprint = content => {
  let hash = 5381
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) + hash) ^ content.charCodeAt(i)
  }
  return (hash >>> 0).toString(36)
}

export const ogImageUrl = (pathname, base, content) => {
  const path = imagePath(pathname)
  if (!base || !path) return null
  const url = `${base}/images${path}`
  return content ? `${url}?v=${fingerprint(content)}` : url
}
