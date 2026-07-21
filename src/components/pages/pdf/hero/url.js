export const ensureProtocol = value => {
  const trimmed = value.trim()
  if (!trimmed) return trimmed
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

export const stripProtocol = url => url.replace(/^https?:\/\//i, '')

export const stripForDisplay = url => stripProtocol(url).replace(/\?.*$/, '')
