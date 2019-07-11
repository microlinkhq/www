import stringify from 'fast-safe-stringify'
import { useState, useEffect } from 'react'
import { decode, encode } from 'qss'
import { navigate } from 'gatsby'

let hasWindow = !!global.window

const eq = (str1, str2) => stringify(str1) === stringify(str2)

const fromLocation = (() => {
  return hasWindow
    ? () => decode(window.location.search.substring(1))
    : () => {}
})()

const condition = hasWindow ? [window.location.search] : []

export const useQueryState = () => {
  const [query, setQuery] = useState(fromLocation())

  useEffect(() => {
    const newQuery = fromLocation()
    if (!eq(query, newQuery)) setQuery(fromLocation())
  }, condition)

  const set = (obj = {}, { navigate: isNavigate = true } = {}) => {
    const newQuery = { ...query, ...obj }
    if (isNavigate) navigate(`${window.location.pathname}?${encode(newQuery)}`)
  }

  return [query, set]
}
