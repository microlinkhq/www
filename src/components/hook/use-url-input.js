import { useEffect, useMemo, useState } from 'react'
import {
  getHostname,
  hasDomainLikeHostname,
  normalizeUrl
} from 'helpers/url-input'

const getIconQuery = normalizedInputUrl => {
  if (!hasDomainLikeHostname(normalizedInputUrl)) return undefined
  return getHostname(normalizedInputUrl) || undefined
}

const hasSameNormalizedUrl = (left, right) =>
  normalizeUrl(left) === normalizeUrl(right)

export const useUrlInput = queryUrl => {
  const [inputUrl, setInputUrl] = useState('')

  useEffect(() => {
    if (!queryUrl) return

    setInputUrl(previousInputUrl =>
      hasSameNormalizedUrl(previousInputUrl, queryUrl)
        ? previousInputUrl
        : queryUrl
    )
  }, [queryUrl])

  const normalizedInputUrl = useMemo(() => normalizeUrl(inputUrl), [inputUrl])
  const isValidInputUrl = useMemo(
    () => hasDomainLikeHostname(normalizedInputUrl),
    [normalizedInputUrl]
  )
  const validInputUrl = isValidInputUrl ? normalizedInputUrl : undefined
  const iconQuery = useMemo(
    () => getIconQuery(normalizedInputUrl),
    [normalizedInputUrl]
  )

  return {
    iconQuery,
    inputUrl,
    isValidInputUrl,
    normalizedInputUrl,
    setInputUrl,
    validInputUrl
  }
}
