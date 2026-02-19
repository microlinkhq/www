import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'

export const normalizeUrl = value => {
  const normalizedValue = value?.trim()
  return normalizedValue ? prependHttp(normalizedValue) : ''
}

export const getHostname = value => {
  try {
    return new URL(value).hostname
  } catch (_) {
    return ''
  }
}

export const hasDomainLikeHostname = value =>
  isUrl(value) && getHostname(value).includes('.')
