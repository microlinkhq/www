const ERROR_META = {
  ERATE: { title: 'Rate limit reached', showRetry: false },
  ETIMEOUT: { title: 'Request timed out', showRetry: true },
  EFATAL: { title: 'Processing failed', showRetry: true },
  EPDFTOOLARGE: { title: 'Document too large', showRetry: false },
  EPAGERANGE: { title: 'Page range not found', showRetry: false },
  EPROXYNEEDED: { title: 'Antibot detected', showRetry: false },
  EUNREACHABLE: { title: 'URL did not respond', showRetry: false },
  EMPTY_MARKDOWN: {
    title: 'This URL couldn\u2019t be analyzed',
    showRetry: true
  }
}

const DEFAULT_META = { title: 'Request failed', showRetry: true }

export const getErrorMeta = code => ERROR_META[code] || DEFAULT_META

export const isRateLimited = code => code === 429 || code === 'ERATE'

export const normalizeApiError = (json, res) => ({
  code: json?.code || (res?.status === 429 ? 'ERATE' : undefined),
  message:
    json?.message || (res ? `Error ${res.status}` : 'Something went wrong.')
})

normalizeApiError.fromMql = (err, fallbackMessage) => ({
  code: err.statusCode === 429 ? 'ERATE' : err.code || undefined,
  message:
    err.description ||
    err.message ||
    fallbackMessage ||
    'Something went wrong.',
  ...(err.keyed ? { keyed: true } : {})
})

normalizeApiError.fromNetwork = err => ({
  code: err.code,
  message: err.message || 'Something went wrong.'
})

const FORCED_ERROR_MESSAGE = 'Forced by the ?state= query parameter.'

export const toForcedError = state => {
  const code = typeof state === 'string' ? state.trim().toUpperCase() : ''
  return code ? { code, message: FORCED_ERROR_MESSAGE } : null
}

export const upgradeErrorFor = failedResults => {
  const rateLimited = failedResults.filter(result =>
    isRateLimited(result.error?.code)
  )
  if (
    rateLimited.length > 0 &&
    rateLimited.every(result => !result.error?.keyed)
  ) {
    return { code: 'ERATE' }
  }
  if (failedResults.some(result => result.error?.code === 'EPROXYNEEDED')) {
    return { code: 'EPROXYNEEDED' }
  }
  return null
}
