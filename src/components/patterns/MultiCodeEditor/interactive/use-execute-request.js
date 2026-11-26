import { useCallback, useLayoutEffect, useRef } from 'react'
import microlink from 'helpers/microlink'
import { toRawResponse } from './raw-response'

export const withoutSnippetKey = options =>
  Object.fromEntries(
    Object.entries(options).filter(([key]) => key !== 'apiKey')
  )

export const useExecuteRequest = ({
  url,
  mqlOpts,
  requestKey,
  onLoadingChange,
  setIsLoading,
  setResponseData
}) => {
  const latestKeyRef = useRef(requestKey)

  useLayoutEffect(() => {
    latestKeyRef.current = requestKey
  }, [requestKey])

  return useCallback(async () => {
    const startedKey = requestKey
    setIsLoading(true)
    onLoadingChange?.(true)
    let applied = false
    try {
      const result = await (async () => {
        try {
          const raw = await microlink.request(url, withoutSnippetKey(mqlOpts))
          return { status: 'fulfilled', ...toRawResponse(raw) }
        } catch (error) {
          const {
            headers,
            name,
            statusCode,
            message,
            url: errorUrl,
            ...body
          } = error
          const encoder = new TextEncoder()
          const errorBody = encoder.encode(JSON.stringify(body))

          return {
            status: 'rejected',
            headers: headers || {},
            body: errorBody
          }
        }
      })()

      if (latestKeyRef.current === startedKey) {
        setResponseData(result)
        applied = true
      }
    } finally {
      if (latestKeyRef.current === startedKey) {
        setIsLoading(false)
        onLoadingChange?.(false)
      }
    }
    return applied
  }, [url, mqlOpts, requestKey, onLoadingChange, setIsLoading, setResponseData])
}
