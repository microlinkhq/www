import stringify from 'fast-safe-stringify'
import { useState, useEffect } from 'react'
import { decode, encode } from 'qss'
import { navigate } from 'gatsby'
import { isSSR } from 'helpers'
import flatten, { unflatten } from 'flat'

const eq = (str1, str2) => stringify(str1) === stringify(str2)

const fromLocation = isSSR
  ? () => ({})
  : () => unflatten(decode(window.location.search.substring(1)))

const condition = isSSR ? [] : [window.location.search]

export const useQueryState = () => {
  const [query, setQuery] = useState(fromLocation())

  useEffect(() => {
    const newQuery = fromLocation()
    if (!eq(query, newQuery)) setQuery(newQuery)
  }, condition)

  const set = (obj = {}, { navigate: isNavigate = true } = {}) => {
    const newQuery = flatten({ ...query, ...obj })
    if (isNavigate) navigate(`${window.location.pathname}?${encode(newQuery)}`)
  }

  return [query, set]
}
