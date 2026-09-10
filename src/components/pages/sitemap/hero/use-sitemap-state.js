import { useCallback, useEffect, useRef, useState } from 'react'
import prependHttp from 'prepend-http'
import { useQueryState } from 'components/hook/use-query-state'
import { hasDomainLikeHostname } from 'helpers/url-input'
import { fetchSitemapUrls } from 'helpers/get-sitemap-urls'
import { normalizeApiError } from 'helpers/api-error'

const DEFAULT_URL = 'https://microlink.io'

export const useSitemapState = () => {
  const [query, setQuery] = useQueryState()
  const [isMounted, setIsMounted] = useState(false)
  const [inputUrl, setInputUrl] = useState('')
  const [inputError, setInputError] = useState('')
  const [currentUrl, setCurrentUrl] = useState('')
  const [urls, setUrls] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const skipBlurRef = useRef(false)
  const lastSubmittedRef = useRef('')
  const requestIdRef = useRef(0)
  const didInitial = useRef(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    setInputUrl(query.url || '')
  }, [isMounted, query.url])

  const fetchSite = useCallback(
    async (rawUrl, { syncQuery = true, fillInput = true } = {}) => {
      const trimmedValue = rawUrl.trim()
      if (!trimmedValue) {
        setInputError('Enter a URL to inspect.')
        return
      }

      const normalizedUrl = prependHttp(trimmedValue)
      if (!hasDomainLikeHostname(normalizedUrl)) {
        setInputError('Enter a valid URL format.')
        return
      }

      const requestId = ++requestIdRef.current
      setInputError('')
      setError(null)
      setUrls(null)
      setIsLoading(true)
      if (fillInput) setInputUrl(trimmedValue)
      setCurrentUrl(trimmedValue)
      lastSubmittedRef.current = normalizedUrl

      if (syncQuery) {
        setQuery({ url: trimmedValue })
      }

      try {
        const pages = await fetchSitemapUrls(normalizedUrl)
        if (requestId !== requestIdRef.current) return
        setUrls(pages)
      } catch (err) {
        if (requestId !== requestIdRef.current) return
        setUrls(null)
        setError(
          normalizeApiError.fromMql(
            err,
            "We couldn't read this site's sitemap."
          )
        )
      } finally {
        if (requestId === requestIdRef.current) setIsLoading(false)
      }
    },
    [setQuery]
  )

  const loadFromQuery = useCallback(
    url => {
      if (url) {
        fetchSite(url, { syncQuery: false })
        return
      }
      setInputUrl('')
      fetchSite(DEFAULT_URL, { syncQuery: false, fillInput: false })
    },
    [fetchSite]
  )

  useEffect(() => {
    if (!isMounted || didInitial.current) return
    didInitial.current = true
    loadFromQuery(query.url)
  }, [isMounted, query.url, loadFromQuery])

  useEffect(() => {
    const onPopState = () => {
      loadFromQuery(new URLSearchParams(window.location.search).get('url'))
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [loadFromQuery])

  const handleBlur = useCallback(event => {
    if (skipBlurRef.current) {
      skipBlurRef.current = false
      return
    }
    const value = event.target.value
    if (prependHttp(value.trim()) === lastSubmittedRef.current) {
      setInputError('')
    }
  }, [])

  return {
    inputUrl,
    setInputUrl,
    inputError,
    setInputError,
    currentUrl,
    urls,
    error,
    isLoading,
    skipBlurRef,
    lastSubmittedRef,
    fetchSite,
    handleBlur
  }
}
