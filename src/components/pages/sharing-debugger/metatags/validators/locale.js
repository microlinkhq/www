const getFlag = (value = '') => {
  const [lang, country] = value.split('-')
  const code = (country || lang).toUpperCase()
  if (code.length !== 2) return

  const common = {
    EN: '🇺🇸',
    ES: '🇪🇸',
    FR: '🇫🇷',
    DE: '🇩🇪',
    IT: '🇮🇹',
    PT: '🇵🇹',
    JA: '🇯🇵',
    ZH: '🇨🇳',
    KO: '🇰🇷',
    RU: '🇷🇺'
  }

  if (common[code]) return common[code]

  return String.fromCodePoint(...[...code].map(c => c.charCodeAt(0) + 127397))
}

const getLanguageName = (locale = '') => {
  const [lang] = locale.split('-')
  const code = (lang || '').toLowerCase()
  const languageNames = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    pt: 'Portuguese',
    ja: 'Japanese',
    zh: 'Chinese',
    ko: 'Korean',
    ru: 'Russian'
  }

  return languageNames[code]
}

export const locale = (field = {}) => {
  const value = field.value || ''
  const isIsoLocale = /^[a-z]{2}(-[A-Z]{2})?$/.test(value)
  const languageName = getLanguageName(value)
  const localeLabel = languageName ? `${value} (${languageName})` : value
  const formattedValue = [getFlag(value), localeLabel].filter(Boolean).join(' ')
  return {
    status: isIsoLocale ? 'OK' : 'WARNING',
    resume: formattedValue || 'Unknown',
    value: formattedValue,
    description: isIsoLocale
      ? "Locale field specifies the content language using ISO 639-1 format, helping search engines and social platforms understand your content's language."
      : "Locale should be in ISO 639-1 format (2-letter language code, e.g., 'en', 'es'). Optionally include country code (e.g., 'en-US')."
  }
}
