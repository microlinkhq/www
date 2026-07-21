import { useCallback } from 'react'
import { normalizeApiError } from 'helpers/api-error'
import { trackEvent } from 'helpers/plausible'
import { DEFAULT_HISTORY } from './history'

export const useFetchPdf = ({
  onRequestTiming,
  abortRef,
  hasPdfRef,
  imgKeyRef,
  setIsLoading,
  setError,
  setPdfSrc
}) =>
  useCallback(
    async (url, { track } = {}) => {
      if (track) trackEvent('demo submit', { product: 'pdf' })
      if (abortRef.current) abortRef.current.abort()
      abortRef.current = new window.AbortController()

      setIsLoading(true)
      setError(null)

      const t0 = Date.now()

      let waitForPdfRender = false
      try {
        const scale = url === DEFAULT_HISTORY[0] || url === DEFAULT_HISTORY[1]
        const res = await window.fetch(
          `https://api.microlink.io?url=${encodeURIComponent(url)}&pdf` +
            (scale ? '&scale=1.2' : ''),
          { signal: abortRef.current.signal }
        )
        const json = await res.json()
        const elapsedMs = Date.now() - t0

        if (!res.ok) {
          setError(normalizeApiError(json, res))
          return
        }

        onRequestTiming?.(elapsedMs, url)

        const src = json?.data?.pdf?.url
        if (src) {
          hasPdfRef.current = true
          imgKeyRef.current += 1
          setPdfSrc(src)
          waitForPdfRender = true
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(normalizeApiError.fromNetwork(err))
        }
      } finally {
        if (!waitForPdfRender) setIsLoading(false)
      }
    },
    [
      onRequestTiming,
      abortRef,
      hasPdfRef,
      imgKeyRef,
      setIsLoading,
      setError,
      setPdfSrc
    ]
  )
