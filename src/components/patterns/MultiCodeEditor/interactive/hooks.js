import { useCallback, useEffect, useRef } from 'react'

const isTextContentType = contentType => contentType.startsWith('text/')

const contentTypeOf = headers => (headers?.['content-type'] || '').toLowerCase()

export const responseBodyText = ({ body, headers }) => {
  const contentType = contentTypeOf(headers)

  if (!contentType) {
    return `Binary content (${contentType})\nSize: ${body.byteLength} bytes`
  }

  if (contentType.includes('application/json')) {
    const text = new TextDecoder().decode(body)
    try {
      const { data } = JSON.parse(text)
      return JSON.stringify(data, null, 2)
    } catch {
      return text
    }
  }

  if (isTextContentType(contentType)) {
    return new TextDecoder().decode(body)
  }

  if (contentType.startsWith('image/')) {
    return `Image content (${contentType})\nSize: ${body.byteLength} bytes`
  }

  throw new Error(`Unsupported content type: ${contentType}`)
}

export const showResponseFade = (responseData, showApiKeyInput) =>
  showApiKeyInput || !contentTypeOf(responseData?.headers).includes('image/')

export const useAutoExecute = ({
  autoExecute,
  url,
  mqlOpts,
  normalizedDefaultView,
  executeRequest
}) => {
  const autoExecutedRef = useRef('')

  useEffect(() => {
    if (!autoExecute || !url) return

    const key = `${url}:${JSON.stringify(mqlOpts)}:${normalizedDefaultView}`
    if (autoExecutedRef.current === key) return

    autoExecutedRef.current = key
    executeRequest()
  }, [autoExecute, executeRequest, mqlOpts, normalizedDefaultView, url])
}

export const currentViewText = ({ activeView, code, responseData }) => {
  switch (activeView) {
    case 'code':
      return code
    case 'body':
      return responseData ? responseBodyText(responseData) : ''
    case 'headers':
      return Object.entries(responseData?.headers || {})
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')
    default:
      return ''
  }
}

export const useCurrentViewText = ({ activeView, code, responseData }) =>
  useCallback(
    () => currentViewText({ activeView, code, responseData }),
    [activeView, code, responseData]
  )
