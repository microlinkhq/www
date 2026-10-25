export const CODE_LANGUAGE_STORAGE_KEY = 'mql-code-editor-language'

const MAX_RECENT_LANGUAGES = 10

const EMPTY_LANGUAGES = Object.freeze([])

const safely = fn => {
  try {
    return fn()
  } catch {
    return undefined
  }
}

const sameLanguage = (left, right) =>
  String(left).trim().toLowerCase() === String(right).trim().toLowerCase()

export const rememberLanguage = (recent, language) =>
  [language, ...recent.filter(item => !sameLanguage(item, language))].slice(
    0,
    MAX_RECENT_LANGUAGES
  )

export const resolveLanguage = (languages, recent, fallback) => {
  for (const preferred of recent) {
    const match = languages.find(language => sameLanguage(language, preferred))
    if (match) return match
  }
  return fallback
}

const isLabel = value => typeof value === 'string' && value !== ''

const parseRecentLanguages = raw => {
  if (!isLabel(raw)) return EMPTY_LANGUAGES
  const parsed = safely(() => JSON.parse(raw))
  if (Array.isArray(parsed)) return parsed.filter(isLabel)
  if (isLabel(parsed)) return [parsed]
  return parsed === undefined ? [raw] : EMPTY_LANGUAGES
}

export const createCodeLanguageStore = ({ storage, target } = {}) => {
  const listeners = new Set()
  let snapshot

  const read = () =>
    parseRecentLanguages(
      safely(() => storage.getItem(CODE_LANGUAGE_STORAGE_KEY))
    )

  const getSnapshot = () => {
    if (snapshot === undefined) snapshot = read()
    return snapshot
  }

  const getServerSnapshot = () => EMPTY_LANGUAGES

  const notify = () => listeners.forEach(listener => listener())

  const onStorage = event => {
    if (event.key !== null && event.key !== CODE_LANGUAGE_STORAGE_KEY) return
    snapshot = read()
    notify()
  }

  const subscribe = listener => {
    if (listeners.size === 0) target?.addEventListener('storage', onStorage)
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
      if (listeners.size === 0) {
        target?.removeEventListener('storage', onStorage)
      }
    }
  }

  const remember = language => {
    snapshot = rememberLanguage(getSnapshot(), language)
    safely(() =>
      storage.setItem(CODE_LANGUAGE_STORAGE_KEY, JSON.stringify(snapshot))
    )
    notify()
  }

  return { getSnapshot, getServerSnapshot, subscribe, remember }
}
