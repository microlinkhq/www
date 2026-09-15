const SECRET_HEADERS = ['x-api-key', 'authorization', 'cookie']

export const toPlainHeaders = headers => {
  if (!headers) return {}
  if (typeof headers.entries === 'function') {
    return Object.fromEntries(headers.entries())
  }
  return { ...headers }
}

export const maskTraceHeaders = (headers, { full = false } = {}) => {
  const next = toPlainHeaders(headers)
  if (full) return next
  return Object.fromEntries(
    Object.entries(next).map(([key, value]) => [
      key,
      SECRET_HEADERS.includes(key.toLowerCase()) && value
        ? `${String(value).slice(0, 5)}…`
        : value
    ])
  )
}

export const toTracePayload = ({
  requestUrl,
  requestOptions = {},
  response,
  full = false
} = {}) => {
  const rest = { ...requestOptions }
  delete rest.responseType
  return {
    request: {
      url: requestUrl,
      ...rest,
      headers: maskTraceHeaders(rest.headers, { full })
    },
    response: {
      ...response,
      headers: toPlainHeaders(response?.headers)
    }
  }
}

export const readTraceBody = async response => {
  try {
    const text = await response.clone().text()
    if (!text) return undefined
    try {
      return JSON.parse(text)
    } catch (_) {
      return text
    }
  } catch (_) {}
}
