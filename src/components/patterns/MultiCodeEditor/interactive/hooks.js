import { useCallback, useEffect, useRef } from 'react'

const isTextContentType = contentType => contentType.startsWith('text/')

export const useLanguageSync = ({
  url,
  bodyPreviewOnly,
  availableLanguages,
  codeSnippets,
  setLanguage,
  setCode,
  setActiveView,
  setLanguageIndex
}) => {
  useEffect(() => {
    if (!url) return

    const syncLanguage = nextLanguage => {
      setLanguage(nextLanguage)
      setCode(codeSnippets[nextLanguage])
      setActiveView(bodyPreviewOnly ? 'body' : 'code')
    }

    const handleStorageChange = e => {
      if (
        e.key === 'mql-code-editor-language' &&
        e.newValue &&
        availableLanguages.includes(e.newValue)
      ) {
        syncLanguage(e.newValue)
      }
    }

    const handleCustomEvent = e => {
      if (
        e.detail?.key === 'mql-code-editor-language' &&
        e.detail?.newValue &&
        availableLanguages.includes(e.detail.newValue)
      ) {
        setLanguageIndex(availableLanguages.indexOf(e.detail.newValue))
        syncLanguage(e.detail.newValue)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    window.addEventListener('mql-language-change', handleCustomEvent)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('mql-language-change', handleCustomEvent)
    }
  }, [
    url,
    bodyPreviewOnly,
    setLanguage,
    availableLanguages,
    codeSnippets,
    setCode,
    setActiveView,
    setLanguageIndex
  ])
}

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

export const useCurrentViewText = ({ activeView, code, responseData }) =>
  useCallback(() => {
    switch (activeView) {
      case 'code':
        return code
      case 'body': {
        if (!responseData) return ''
        const { body, headers } = responseData
        const contentType = (headers['content-type'] || '').toLowerCase()

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
      case 'headers':
        return Object.entries(responseData?.headers || {})
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n')
      default:
        return ''
    }
  }, [activeView, code, responseData])
