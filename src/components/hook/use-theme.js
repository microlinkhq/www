import { useCallback, useState, useEffect } from 'react'

export const useTheme = (themes, initialThemeKey) => {
  const [themeKey, setThemeKey] = useState(initialThemeKey)
  const [theme, setTheme] = useState(themes[themeKey])

  const set = useCallback(
    themeKey => {
      document.body.dataset.theme = themeKey
      setTheme(themes[themeKey])
      setThemeKey(themeKey)
    },
    [themes]
  )

  useEffect(() => set(themeKey), [set, themeKey])

  return [{ theme: themeKey, ...theme }, set]
}
