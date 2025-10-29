import { useCallback, useState, useLayoutEffect } from 'react'

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

  useLayoutEffect(() => set(themeKey), [set, themeKey])

  return [{ theme: themeKey, ...theme }, set]
}
