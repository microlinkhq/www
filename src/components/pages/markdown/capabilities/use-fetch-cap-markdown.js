import { useCallback } from 'react'
import { normalizeApiError } from 'helpers/api-error'
import { fetchApi } from 'helpers/api-fetch'

export const useFetchCapMarkdown = ({
  capAbortRef,
  capHtmlAbortRef,
  capHasContentRef,
  capLastFetchedRef,
  setCapLoading,
  setCapHtmlLoading,
  setCapError,
  setCapMarkdown,
  setCapHtml
}) =>
  useCallback(
    async (url, { withAccount } = {}) => {
      if (capAbortRef.current) capAbortRef.current.abort()
      if (capHtmlAbortRef.current) capHtmlAbortRef.current.abort()
      const controller = new window.AbortController()
      const htmlController = new window.AbortController()
      capAbortRef.current = controller
      capHtmlAbortRef.current = htmlController
      capLastFetchedRef.current = url
      setCapLoading(true)
      setCapHtmlLoading(true)
      setCapError(null)

      const htmlPromise = fetchApi(
        `data.html.attr=html&meta=false&url=${encodeURIComponent(url)}`,
        { signal: htmlController.signal, withAccount }
      )
        .then(({ res: r, json }) => {
          if (!r.ok) return { error: normalizeApiError(json, r) }
          const html = json?.data?.html
          return {
            html: html
              ? typeof html === 'string'
                ? html
                : JSON.stringify(html)
              : ''
          }
        })
        .catch(err => {
          if (err.name === 'AbortError') return { aborted: true }
          return { error: normalizeApiError.fromNetwork(err) }
        })

      const mdPromise = fetchApi(
        `url=${encodeURIComponent(url)}&data.markdown.attr=markdown&meta=true`,
        { signal: controller.signal, withAccount }
      )
        .then(({ res: r, json }) => {
          if (!r.ok) return { error: normalizeApiError(json, r) }
          const md = json?.data?.markdown
          return {
            md: md ? (typeof md === 'string' ? md : JSON.stringify(md)) : ''
          }
        })
        .catch(err => {
          if (err.name === 'AbortError') return { aborted: true }
          return { error: normalizeApiError.fromNetwork(err) }
        })

      let aborted = false
      const isStale = () =>
        controller.signal.aborted || htmlController.signal.aborted
      try {
        const [htmlResult, mdResult] = await Promise.all([
          htmlPromise,
          mdPromise
        ])

        aborted = Boolean(htmlResult.aborted || mdResult.aborted)
        if (aborted) return

        const capErr = htmlResult.error || mdResult.error
        if (capErr) {
          if (!isStale()) setCapError(capErr)
          return
        }

        if (mdResult.md) {
          capHasContentRef.current = true
          setCapMarkdown(mdResult.md)
        }
        if (htmlResult.html) setCapHtml(htmlResult.html)
      } finally {
        if (!aborted && !isStale()) {
          setCapLoading(false)
          setCapHtmlLoading(false)
        }
      }
    },
    [
      capAbortRef,
      capHtmlAbortRef,
      capHasContentRef,
      capLastFetchedRef,
      setCapLoading,
      setCapHtmlLoading,
      setCapError,
      setCapMarkdown,
      setCapHtml
    ]
  )
