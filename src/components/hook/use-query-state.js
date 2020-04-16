import stringify from 'fast-safe-stringify'
import { useState, useEffect } from 'react'
import { flatten, unflatten } from 'flat'
import { decode, encode } from 'qss'
import { navigate } from 'gatsby'
import { isSSR } from 'helpers'

const eq = (str1, str2) => stringify(str1) === stringify(str2)

const fromLocation = isSSR
  ? () => ({})
  : () => decode(window.location.search.substring(1))

const condition = isSSR ? [] : [window.location.search]

export const useQueryState = () => {
  const [query, setQuery] = useState(unflatten(fromLocation()))

  useEffect(() => {
    const newQuery = fromLocation()
    if (!eq(query, newQuery)) setQuery(newQuery)
  }, condition)

  const set = (
    obj = {},
    { replace = false, navigate: isNavigate = true } = {}
  ) => {
    const newQuery = flatten(replace ? obj : { ...fromLocation(), ...obj })
    setQuery(newQuery)
    if (isNavigate) navigate(`${window.location.pathname}?${encode(newQuery)}`)
  }

  return [query, set]
}
