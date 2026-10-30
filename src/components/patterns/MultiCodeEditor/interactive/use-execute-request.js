import { useCallback, useLayoutEffect, useRef } from 'react'
import microlink from 'helpers/microlink'
import { toRawResponse } from './raw-response'

const checkForProPlanRequired = responseText =>
  responseText && responseText.includes('You need a pro plan')

export const useExecuteRequest = ({
  url,
  mqlOpts,
  requestKey,
  onLoadingChange,
  setIsLoading,
  setResponseData,
  setShowApiKeyInput
}) => {
  const latestKeyRef = useRef(requestKey)

  useLayoutEffect(() => {
    latestKeyRef.current = requestKey
  }, [requestKey])

  return useCallback(
    async currentApiKey => {
      const startedKey = requestKey
      setIsLoading(true)
      onLoadingChange?.(true)
      let applied = false
      try {
        const result = await (async () => {
          try {
            const raw = await microlink.request(url, {
              ...mqlOpts,
              ...(currentApiKey && { apiKey: currentApiKey })
            })
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

          if (result.status === 'rejected') {
            const errorText = new TextDecoder().decode(result.body)
            if (checkForProPlanRequired(errorText) && !currentApiKey) {
              setShowApiKeyInput(true)
            }
          }
        }
      } finally {
        if (latestKeyRef.current === startedKey) {
          setIsLoading(false)
          onLoadingChange?.(false)
        }
      }
      return applied
    },
    [
      url,
      mqlOpts,
      requestKey,
      onLoadingChange,
      setIsLoading,
      setResponseData,
      setShowApiKeyInput
    ]
  )
}
