import { useCallback } from 'react'
import { normalizeApiError } from 'helpers/api-error'
import { trackEvent } from 'helpers/plausible'

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
      abortRef.current = new window.AbortController()

      setIsLoading(true)
      setError(null)

      const t0 = Date.now()

      try {
        const endpoint =
          `https://api.microlink.io?url=${encodeURIComponent(url)}` +
          '&palette&video&audio'
        const res = await window.fetch(endpoint, {
          signal: abortRef.current.signal
        })
        const json = await res.json()
        const elapsedMs = Date.now() - t0

        if (!res.ok) {
          setError(normalizeApiError(json, res))
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
        if (err.name !== 'AbortError') {
          setError(normalizeApiError.fromNetwork(err))
        }
      } finally {
        setIsLoading(false)
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
