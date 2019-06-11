import { useState, useEffect } from 'react'
import fromEntries from 'fromentries'
import { navigate } from 'gatsby'

export const useQueryState = () => {
  const [urlSearchParams, setUrlSearchParams] = useState(new URLSearchParams())
  useEffect(
    () => {
      setUrlSearchParams(new URLSearchParams(window.location.search))
    },
    window ? [window.location.search] : []
  )

  const query = fromEntries(urlSearchParams.entries())

  const setQuery = (obj = {}) => {
    Object.keys(obj).forEach(key => urlSearchParams.set(key, obj[key]))
    navigate(`${window.location.pathname}?${urlSearchParams.toString()}`)
  }

  return [query, setQuery]
}
