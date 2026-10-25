import { createCodeLanguageStore, resolveLanguage } from 'helpers/code-language'
import { isSSR } from 'helpers/is-ssr'
import { useCallback, useSyncExternalStore } from 'react'

const browserStorage = () => {
  try {
    return window.localStorage
  } catch {
    return undefined
  }
}

const store = createCodeLanguageStore(
  isSSR ? {} : { storage: browserStorage(), target: window }
)

export const useCodeLanguage = (languages, defaultLanguage) => {
  const recent = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  )

  const language = resolveLanguage(languages, recent, defaultLanguage)

  const setLanguage = useCallback(
    next => {
      if (languages.includes(next)) store.remember(next)
    },
    [languages]
  )

  return [language, setLanguage]
}
