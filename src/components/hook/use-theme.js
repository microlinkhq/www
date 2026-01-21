import { useCallback, useState, useEffect } from 'react'

export const useTheme = (themes, initialThemeKey) => {
  const [themeKey, setThemeKey] = useState(initialThemeKey)
  const [theme, setTheme] = useState(themes[initialThemeKey])

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

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.dataset.theme = initialThemeKey
    }
  }, [initialThemeKey])

  return [{ theme: themeKey, ...theme }, set]
}
