import React, { useState, useEffect } from 'react'
import prependHttp from 'prepend-http'
import { useQueryState } from 'components/hook/use-query-state'

export const DEFAULT_URL = 'https://microlink.io'

export const useSharingDebuggerState = () => {
  const [query] = useQueryState()
  const [isMounted, setIsMounted] = useState(false)
  const [inputError, setInputError] = useState('')
  const [currentAnalyzedUrl, setCurrentAnalyzedUrl] = useState('')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const hasQuery = isMounted && !!query.url
  const [selectedPlatform, setSelectedPlatform] = useState('whatsapp')
  const [inputUrl, setInputUrl] = useState('')
  const [showValidation, setShowValidation] = useState(false)
  const [isDefaultDemo, setIsDefaultDemo] = useState(false)
  const defaultFetched = React.useRef(false)
  const doFetchRef = React.useRef(null)
  const prevFetchStatusRef = React.useRef('initial')

  useEffect(() => {
    if (!isMounted) return

    setInputUrl(query.url || '')
  }, [isMounted, query.url])

  useEffect(() => {
    if (query.url) {
      setShowValidation(true)
      setIsDefaultDemo(false)
      setInputError('')
      setCurrentAnalyzedUrl(query.url)
    }
  }, [query.url])

  useEffect(() => {
    if (defaultFetched.current || query.url) return
    defaultFetched.current = true
    setShowValidation(true)
    setIsDefaultDemo(true)
    setCurrentAnalyzedUrl(DEFAULT_URL)
    if (doFetchRef.current) {
      doFetchRef.current(DEFAULT_URL, { syncQuery: false })
    }
  }, [query.url])

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const url = params.get('url')

      if (url) {
        setInputUrl(url)
        setCurrentAnalyzedUrl(url)
        setShowValidation(true)
        setIsDefaultDemo(false)
        setInputError('')
        if (doFetchRef.current) {
          doFetchRef.current(prependHttp(url), { syncQuery: false })
        }
      } else {
        setInputUrl('')
        setShowValidation(true)
        setIsDefaultDemo(true)
        setCurrentAnalyzedUrl(DEFAULT_URL)
        setInputError('')
        if (doFetchRef.current) {
          doFetchRef.current(DEFAULT_URL, { syncQuery: false })
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return {
    query,
    hasQuery,
    inputError,
    setInputError,
    currentAnalyzedUrl,
    setCurrentAnalyzedUrl,
    selectedPlatform,
    setSelectedPlatform,
    inputUrl,
    setInputUrl,
    showValidation,
    setShowValidation,
    isDefaultDemo,
    setIsDefaultDemo,
    doFetchRef,
    prevFetchStatusRef
  }
}
