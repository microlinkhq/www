import { useCallback } from 'react'
import {
  extractNerdStats,
  buildMqlQuery
} from 'components/patterns/NerdStats/NerdStats'
import { normalizeApiError } from 'helpers/api-error'
import { trackEvent } from 'helpers/plausible'

export const useFetchScreenshot = ({
  onRequestTiming,
  abortRef,
  setIsLoading,
  setError,
  setShowNerdStats,
  setNerdStats,
  setNerdQuery,
  setNerdResponse,
  setScreenshotSrc,
  setImgKey,
  setImgVisible
}) =>
  useCallback(
    async (url, { track } = {}) => {
      if (track) trackEvent('demo submit', { product: 'screenshot' })
      if (abortRef.current) abortRef.current.abort()
      abortRef.current = new window.AbortController()

      setIsLoading(true)
      setError(null)
      setShowNerdStats(false)

      const t0 = Date.now()

      let waitForImageLoad = false
      try {
        const res = await window.fetch(
          `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot`,
          { signal: abortRef.current.signal }
        )
        const json = await res.json()
        const elapsedMs = Date.now() - t0

        if (!res.ok) {
          setError(normalizeApiError(json, res))
          return
        }

        onRequestTiming?.(elapsedMs, url)

        const stats = extractNerdStats(res.headers)
        setNerdStats(stats)
        setNerdQuery(buildMqlQuery(url, { screenshot: true }))
        setNerdResponse(JSON.stringify(json.data, null, 2))

        const src = json?.data?.screenshot?.url
        if (src) {
          setScreenshotSrc(src)
          setImgKey(k => k + 1)
          setImgVisible(false)
          waitForImageLoad = true
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(normalizeApiError.fromNetwork(err))
        }
      } finally {
        if (!waitForImageLoad) setIsLoading(false)
      }
    },
    [
      onRequestTiming,
      abortRef,
      setIsLoading,
      setError,
      setShowNerdStats,
      setNerdStats,
      setNerdQuery,
      setNerdResponse,
      setScreenshotSrc,
      setImgKey,
      setImgVisible
    ]
  )
