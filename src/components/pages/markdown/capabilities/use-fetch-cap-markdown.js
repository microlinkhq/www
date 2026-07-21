import { useCallback } from 'react'
import { normalizeApiError } from 'helpers/api-error'

export const useFetchCapMarkdown = ({
  capAbortRef,
  capHtmlAbortRef,
  capHasContentRef,
  setCapLoading,
  setCapHtmlLoading,
  setCapError,
  setCapMarkdown,
  setCapHtml
}) =>
  useCallback(async url => {
    if (capAbortRef.current) capAbortRef.current.abort()
    if (capHtmlAbortRef.current) capHtmlAbortRef.current.abort()
    capAbortRef.current = new window.AbortController()
    capHtmlAbortRef.current = new window.AbortController()
    setCapLoading(true)
    setCapHtmlLoading(true)
    setCapError(null)

    const htmlPromise = window
      .fetch(
        `https://api.microlink.io/?data.html.attr=html&meta=false&url=${encodeURIComponent(
          url
        )}`,
        { signal: capHtmlAbortRef.current.signal }
      )
      .then(r =>
        r.json().then(json => {
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
      )
      .catch(err => {
        if (err.name === 'AbortError') return { aborted: true }
        return { error: normalizeApiError.fromNetwork(err) }
      })

    const mdPromise = window
      .fetch(
        `https://api.microlink.io?url=${encodeURIComponent(
          url
        )}&data.markdown.attr=markdown&meta=true`,
        { signal: capAbortRef.current.signal }
      )
      .then(r =>
        r.json().then(json => {
          if (!r.ok) return { error: normalizeApiError(json, r) }
          const md = json?.data?.markdown
          return {
            md: md ? (typeof md === 'string' ? md : JSON.stringify(md)) : ''
          }
        })
      )
      .catch(err => {
        if (err.name === 'AbortError') return { aborted: true }
        return { error: normalizeApiError.fromNetwork(err) }
      })

    let aborted = false
    try {
      const [htmlResult, mdResult] = await Promise.all([htmlPromise, mdPromise])

      aborted = Boolean(htmlResult.aborted || mdResult.aborted)
      if (aborted) return

      const capErr = htmlResult.error || mdResult.error
      if (capErr) {
        setCapError(capErr)
        return
      }

      if (mdResult.md) {
        capHasContentRef.current = true
        setCapMarkdown(mdResult.md)
      }
      if (htmlResult.html) setCapHtml(htmlResult.html)
    } finally {
      if (!aborted) {
        setCapLoading(false)
        setCapHtmlLoading(false)
      }
    }
  }, [])
