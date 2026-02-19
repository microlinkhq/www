import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'

export const normalizeUrl = value => {
  const trimmedValue = value?.trim()
  if (!trimmedValue) return ''
  return prependHttp(trimmedValue)
}

export const getHostname = value => {
  try {
    return new URL(value).hostname
  } catch (_) {
    return ''
  }
}

export const hasDomainLikeHostname = value => {
  if (!isUrl(value)) return false
  return getHostname(value).includes('.')
}
