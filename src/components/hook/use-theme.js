import { useCallback, useState, useRef } from 'react'

export const useTheme = (themes, initialThemeKey) => {
  const [themeKey, setThemeKey] = useState(initialThemeKey)
  const [theme, setTheme] = useState(themes[initialThemeKey])
  const isInitialMount = useRef(true)

  const set = useCallback(
    newThemeKey => {
      if (typeof document !== 'undefined') {
        document.body.dataset.theme = newThemeKey
      }
      setTheme(themes[newThemeKey])
      setThemeKey(newThemeKey)
    },
    [themes]
  )

  if (isInitialMount.current && typeof document !== 'undefined') {
    isInitialMount.current = false
    document.body.dataset.theme = initialThemeKey
  }

  return [{ theme: themeKey, ...theme }, set]
}
