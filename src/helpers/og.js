import { imagePath } from '@microlink/og'

const FINGERPRINT_FIELDS = [
  'version',
  'title',
  'description',
  'date',
  'authors'
]

const fingerprint = content => {
  let hash = 5381
  for (let i = 0; i < content.length; i++) {
    hash = ((hash << 5) + hash) ^ content.charCodeAt(i)
  }
  return (hash >>> 0).toString(36)
}

export const ogImageUrl = (pathname, base, card) => {
  const path = imagePath(pathname)
  if (!base || !path) return null
  const url = `${base}/images${path}`
  if (!card) return url
  const fingerprintInput = FINGERPRINT_FIELDS.map(
    field => card[field] ?? ''
  ).join('\n')
  return `${url}?v=${fingerprint(fingerprintInput)}`
}
