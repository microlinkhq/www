import { useState, useEffect } from 'react'

export const useTheme = (themes, initialThemeKey) => {
  const [themeKey, setThemeKey] = useState(initialThemeKey)
  const [theme, setTheme] = useState(themes[themeKey])

  const set = themeKey => {
    document.body.dataset.theme = themeKey
    setTheme(themes[themeKey])
    setThemeKey(themeKey)
  }

  useEffect(() => set(themeKey), [])

  return [{ theme: themeKey, ...theme }, set]
}
