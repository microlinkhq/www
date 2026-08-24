import { useCallback } from 'react'
import mql from '@microlink/mql'

const checkForProPlanRequired = responseText =>
  responseText && responseText.includes('You need a pro plan')

export const useExecuteRequest = ({
  url,
  mqlOpts,
  onLoadingChange,
  setIsLoading,
  setResponseData,
  setShowApiKeyInput
}) =>
  useCallback(
    async currentApiKey => {
      setIsLoading(true)
      onLoadingChange?.(true)
      try {
        const result = await (async () => {
          try {
            const raw = await mql.arrayBuffer(url, {
              ...mqlOpts,
              ...(currentApiKey && { apiKey: currentApiKey })
            })
            const { body, headers } = raw
            return {
              status: 'fulfilled',
              headers: Object.fromEntries(headers),
              body
            }
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

        setResponseData(result)

        if (result.status === 'rejected') {
          const errorText = new TextDecoder().decode(result.body)
          if (checkForProPlanRequired(errorText) && !currentApiKey) {
            setShowApiKeyInput(true)
          }
        }
      } finally {
        setIsLoading(false)
        onLoadingChange?.(false)
      }
    },
    [
      url,
      mqlOpts,
      onLoadingChange,
      setIsLoading,
      setResponseData,
      setShowApiKeyInput
    ]
  )
