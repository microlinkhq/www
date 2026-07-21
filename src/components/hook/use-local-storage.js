import { isSSR } from 'helpers/is-ssr'
import { noop } from 'helpers/noop'
import { useState, useCallback, useEffect, useRef } from 'react'

const createUseLocalStorage = storage => (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue)
  const storedValueRef = useRef(initialValue)

  useEffect(() => {
    try {
      const item = storage.getItem(key)
      if (item == null) return
      const parsed = JSON.parse(item)
      storedValueRef.current = parsed
      setStoredValue(parsed)
    } catch (error) {
      console.log(error)
    }
  }, [key, storage])

  const setValue = useCallback(
    value => {
      const valueToStore =
        value instanceof Function ? value(storedValueRef.current) : value
      storedValueRef.current = valueToStore
      try {
        storage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.log(error)
      }
      setStoredValue(valueToStore)
    },
    [key, storage]
  )

  return [storedValue, setValue]
}

export const useLocalStorage = createUseLocalStorage(
  isSSR ? { getItem: noop, setItem: noop } : window.localStorage
)
