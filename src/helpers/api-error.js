const ERROR_META = {
  ERATE: { title: 'Rate limit reached', showRetry: false },
  ETIMEOUT: { title: 'Request timed out', showRetry: true },
  EFATAL: { title: 'Processing failed', showRetry: true },
  EPROXYNEEDED: { title: 'Anti-bot protection', showRetry: false },
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
    err.description || err.message || fallbackMessage || 'Something went wrong.'
})

normalizeApiError.fromNetwork = err => ({
  code: err.code,
  message: err.message || 'Something went wrong.'
})
