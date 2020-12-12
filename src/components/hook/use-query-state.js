import { useState, useEffect } from 'react'
import { flatten, unflatten } from 'flat'
import { isSSR, isEqual } from 'helpers'
import { decode, encode } from 'qss'
import { navigate } from 'gatsby'

const fromLocation = isSSR
  ? () => ({})
  : () => decode(window.location.search.substring(1))

const condition = isSSR ? [] : [window.location.search]

export const useQueryState = initialQuery => {
  const [query, setQuery] = useState(
    initialQuery ? flatten(initialQuery) : fromLocation()
  )

  useEffect(() => {
    const newQuery = fromLocation()
    if (!isEqual(query, newQuery)) setQuery(newQuery)
  }, condition)

  const set = (
    obj = {},
    { replace = false, navigate: isNavigate = true } = {}
  ) => {
    const newQuery = replace
      ? flatten(obj)
      : { ...fromLocation(), ...flatten(obj) }

    setQuery(newQuery)

    if (isNavigate) navigate(`${window.location.pathname}?${encode(newQuery)}`)
  }

  return [unflatten(query), set]
}
