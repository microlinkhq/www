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
      const controller = new window.AbortController()
      abortRef.current = controller

      setIsLoading(true)
      setError(null)

      const t0 = Date.now()

      let waitForImageLoad = false
      try {
        const res = await window.fetch(
          `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot`,
          { signal: controller.signal }
        )
        const json = await res.json()
        const elapsedMs = Date.now() - t0

        if (!res.ok) {
          if (!controller.signal.aborted) setError(normalizeApiError(json, res))
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
        if (err.name !== 'AbortError' && !controller.signal.aborted) {
          setError(normalizeApiError.fromNetwork(err))
        }
      } finally {
        if (!waitForImageLoad && !controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    },
    [
      onRequestTiming,
      abortRef,
      setIsLoading,
      setError,
      setNerdStats,
      setNerdQuery,
      setNerdResponse,
      setScreenshotSrc,
      setImgKey,
      setImgVisible
    ]
  )
