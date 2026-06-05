import prependHttp from 'prepend-http'

const SHARING_DEBUGGER_BASE_URL = 'https://microlink.io/tools/sharing-debugger'

const normalizeValue = value => {
  const trimmedValue = value?.trim()

  if (!trimmedValue) return ''

  return prependHttp(trimmedValue)
}

export const buildSharingDebuggerUrl = value => {
  const normalizedValue = normalizeValue(value)

  if (!normalizedValue) return ''

  return `${SHARING_DEBUGGER_BASE_URL}?url=${encodeURIComponent(
    normalizedValue
  )}`
}

export const buildSharingDebuggerDisplayUrl = value => {
  const normalizedValue = normalizeValue(value)

  if (!normalizedValue) return ''

  return `${SHARING_DEBUGGER_BASE_URL}?url=${normalizedValue}`
}

export { SHARING_DEBUGGER_BASE_URL }
