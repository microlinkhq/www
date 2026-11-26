import { useCallback } from 'react'
import { normalizeApiError } from 'helpers/api-error'
import { fetchApi } from 'helpers/api-fetch'
import { trackEvent } from 'helpers/gtag'

export const useFetchMetadata = ({
  onRequestTiming,
  onUrlChange,
  onDataChange,
  abortRef,
  setIsLoading,
  setError,
  setMetaData
}) =>
  useCallback(
    async (url, { track } = {}) => {
      if (track) trackEvent('demo submit', { product: 'metadata' })
      if (abortRef.current) abortRef.current.abort()
      const controller = new window.AbortController()
      abortRef.current = controller

      setIsLoading(true)
      setError(null)

      const t0 = Date.now()

      try {
        const { res, json } = await fetchApi(
          `url=${encodeURIComponent(url)}&palette&video&audio`,
          { signal: controller.signal }
        )
        const elapsedMs = Date.now() - t0

        if (!res.ok) {
          if (!controller.signal.aborted) setError(normalizeApiError(json, res))
          return
        }

        onRequestTiming?.(elapsedMs, url)

        const data = json?.data
        if (data) {
          setMetaData(data)
          onUrlChange?.(url)
          onDataChange?.(data)
        }
      } catch (err) {
        if (err.name !== 'AbortError' && !controller.signal.aborted) {
          setError(normalizeApiError.fromNetwork(err))
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    },
    [
      onRequestTiming,
      onUrlChange,
      onDataChange,
      abortRef,
      setIsLoading,
      setError,
      setMetaData
    ]
  )
