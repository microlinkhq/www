import { isSSR } from 'helpers/is-ssr'
import { noop } from 'helpers/noop'
import { useState, useCallback, useEffect } from 'react'

const createUseLocalStorage = storage => (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue)

  useEffect(() => {
    try {
      const item = storage.getItem(key)
      if (item == null) return
      setStoredValue(JSON.parse(item))
    } catch (error) {
      console.log(error)
    }
  }, [key, storage])

  const setValue = useCallback(
    value => {
      setStoredValue(prev => {
        try {
          const valueToStore = value instanceof Function ? value(prev) : value
          storage.setItem(key, JSON.stringify(valueToStore))
          return valueToStore
        } catch (error) {
          console.log(error)
          return value instanceof Function ? value(prev) : value
        }
      })
    },
    [key, storage]
  )

  return [storedValue, setValue]
}

export const useLocalStorage = createUseLocalStorage(
  isSSR ? { getItem: noop, setItem: noop } : window.localStorage
)
