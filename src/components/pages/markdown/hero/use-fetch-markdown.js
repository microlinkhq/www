import { useCallback } from 'react'
import {
  extractNerdStats,
  buildMqlQuery
} from 'components/patterns/NerdStats/NerdStats'
import { normalizeApiError } from 'helpers/api-error'
import { trackEvent } from 'helpers/plausible'

export const useFetchMarkdown = ({
  onRequestTiming,
  abortRef,
  streamRef,
  hasContentRef,
  fetchResolverRef,
  setIsLoading,
  setError,
  setNerdStats,
  setNerdQuery,
  setNerdResponse,
  setMarkdownContent
}) =>
  useCallback(
    async (url, { track } = {}) => {
      if (track) trackEvent('demo submit', { product: 'markdown' })
      if (abortRef.current) abortRef.current.abort()
      const controller = new window.AbortController()
      abortRef.current = controller
      if (streamRef.current) {
        clearTimeout(streamRef.current)
        streamRef.current = null
      }

      setIsLoading(true)
      setError(null)

      const t0 = Date.now()

      try {
        const res = await window.fetch(
          `https://api.microlink.io?url=${encodeURIComponent(
            url
          )}&data.markdown.attr=markdown&meta=false`,
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
        setNerdQuery(
          buildMqlQuery(url, {
            data: { markdown: { attr: 'markdown' } },
            meta: false
          })
        )
        setNerdResponse(JSON.stringify(json.data, null, 2))

        const md = json?.data?.markdown
        if (md) {
          hasContentRef.current = true
          setMarkdownContent(typeof md === 'string' ? md : JSON.stringify(md))
        }
        if (fetchResolverRef.current) {
          fetchResolverRef.current()
          fetchResolverRef.current = null
        }
      } catch (err) {
        if (err.name !== 'AbortError' && !controller.signal.aborted) {
          setError(normalizeApiError.fromNetwork(err))
        }
        if (fetchResolverRef.current) {
          fetchResolverRef.current()
          fetchResolverRef.current = null
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    },
    [
      onRequestTiming,
      abortRef,
      streamRef,
      hasContentRef,
      fetchResolverRef,
      setIsLoading,
      setError,
      setNerdStats,
      setNerdQuery,
      setNerdResponse,
      setMarkdownContent
    ]
  )
