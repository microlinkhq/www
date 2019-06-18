import { useState, useEffect } from 'react'
import { decode, encode } from 'qss'
import { navigate } from 'gatsby'

const fromLocation = () => decode(window.location.search.substring(1))

export const useQueryState = () => {
  const [query, setQuery] = useState(fromLocation())

  useEffect(
    () => {
      setQuery(fromLocation())
    },
    global.window ? [window.location.search] : []
  )

  const set = (obj = {}, { navigate: isNavigate = true } = {}) => {
    const newQuery = { ...query, ...obj }
    if (isNavigate) navigate(`${window.location.pathname}?${encode(newQuery)}`)
  }

  return [query, set]
}
