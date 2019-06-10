import { useState, useEffect } from 'react'

const fromEntries = iterable =>
  [...iterable].reduce(
    (obj, { 0: key, 1: val }) => ({ ...obj, [key]: val }),
    {}
  )

export const useQueryState = () => {
  const [urlSearchParams, setUrlSearchParams] = useState(new URLSearchParams())
  useEffect(
    () => setUrlSearchParams(new URLSearchParams(window.location.search)),
    []
  )

  const query = fromEntries(urlSearchParams.entries())

  const setQuery = (obj = {}) => {
    Object.keys(obj).forEach(key => urlSearchParams.set(key, obj[key]))
    window.history.replaceState({}, null, `?${urlSearchParams.toString()}`)
  }

  return [query, setQuery]
}
