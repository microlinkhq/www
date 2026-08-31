export const CONSENT_STORAGE_KEY = 'microlink-cookie-consent'

const CONSENT_SIGNALS = [
  'ad_storage',
  'ad_user_data',
  'ad_personalization',
  'analytics_storage'
]

const GA_EVENT_NAME_MAX_LENGTH = 40

const toEventName = name =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .slice(0, GA_EVENT_NAME_MAX_LENGTH)

export function trackEvent (name, props = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', toEventName(name), props)
  } else {
    console.log(`[gtag] ${name}`, props)
  }
}

export function getStoredConsent () {
  if (typeof window === 'undefined') return undefined
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    return value === 'granted' || value === 'denied' ? value : undefined
  } catch {
    return undefined
  }
}

export function updateConsent (value) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value)
  } catch {}

  if (typeof window.gtag === 'function') {
    window.gtag(
      'consent',
      'update',
      Object.fromEntries(CONSENT_SIGNALS.map(signal => [signal, value]))
    )
    window.gtag('set', 'ads_data_redaction', value === 'denied')
  }
}
