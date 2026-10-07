import { getStoredConsent } from './gtag'

export const ATTRIBUTION_STORAGE_KEY = 'microlink.attribution'
export const ATTRIBUTION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000
export const ATTRIBUTION_VALUE_MAX_LENGTH = 200
export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term'
]

const SITE_DOMAIN = 'microlink.io'

export const truncate = (value, max = ATTRIBUTION_VALUE_MAX_LENGTH) => {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed ? trimmed.slice(0, max) : undefined
}

export const normalizePath = pathname => {
  if (typeof pathname !== 'string' || !pathname.startsWith('/')) return '/'
  const [path] = pathname.split(/[?#]/)
  const withoutTrailingSlash = path.length > 1 ? path.replace(/\/+$/, '') : path
  return truncate(withoutTrailingSlash) || '/'
}

export const parseUtms = search => {
  const params = new URLSearchParams(search || '')
  return UTM_KEYS.reduce((utms, key) => {
    const value = truncate(params.get(key))
    return value ? { ...utms, [key]: value } : utms
  }, {})
}

export const hasUtms = entry =>
  Boolean(entry) && UTM_KEYS.some(key => Boolean(entry[key]))

export const pickUtms = entry =>
  UTM_KEYS.reduce(
    (utms, key) =>
      entry && entry[key] ? { ...utms, [key]: entry[key] } : utms,
    {}
  )

const isSiteHost = (hostname, currentHostname) =>
  hostname === currentHostname ||
  hostname === SITE_DOMAIN ||
  hostname.endsWith(`.${SITE_DOMAIN}`)

export const externalReferrer = (referrer, currentHostname) => {
  if (!referrer) return undefined
  try {
    const url = new URL(referrer)
    if (isSiteHost(url.hostname, currentHostname)) return undefined
    return truncate(`${url.origin}${url.pathname}`)
  } catch {
    return undefined
  }
}

const getStorage = () => {
  try {
    return typeof window === 'undefined' ? undefined : window.localStorage
  } catch {
    return undefined
  }
}

const isFresh = (entry, now) => {
  const firstSeenAt = Date.parse(entry.first_seen_at)
  return (
    Number.isFinite(firstSeenAt) && now - firstSeenAt <= ATTRIBUTION_MAX_AGE_MS
  )
}

const readEntry = (storage, now) => {
  try {
    const raw = storage.getItem(ATTRIBUTION_STORAGE_KEY)
    if (!raw) return undefined
    const entry = JSON.parse(raw)
    if (!entry || typeof entry !== 'object' || !isFresh(entry, now)) {
      storage.removeItem(ATTRIBUTION_STORAGE_KEY)
      return undefined
    }
    return entry
  } catch {
    return undefined
  }
}

const writeEntry = (storage, entry) => {
  try {
    storage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(entry))
  } catch {}
  return entry
}

const compact = entry =>
  Object.fromEntries(
    Object.entries(entry).filter(([, value]) => value !== undefined)
  )

export const canStoreAttribution = () => getStoredConsent() !== 'denied'

export const getAttribution = ({
  now = Date.now(),
  storage = getStorage()
} = {}) => (storage ? readEntry(storage, now) : undefined)

export const recordAttribution = ({
  location = typeof window === 'undefined' ? undefined : window.location,
  referrer = typeof document === 'undefined' ? '' : document.referrer,
  now = Date.now(),
  storage = getStorage()
} = {}) => {
  if (!storage || !location || !canStoreAttribution()) return undefined

  const landingUtms = parseUtms(location.search)
  const existing = readEntry(storage, now)

  if (existing) {
    if (hasUtms(existing) || !hasUtms(landingUtms)) return existing
    return writeEntry(storage, { ...existing, ...landingUtms })
  }

  return writeEntry(
    storage,
    compact({
      landing: normalizePath(location.pathname),
      ...landingUtms,
      referrer: externalReferrer(referrer, location.hostname),
      first_seen_at: new Date(now).toISOString()
    })
  )
}

export const clearAttribution = ({ storage = getStorage() } = {}) => {
  try {
    if (storage) storage.removeItem(ATTRIBUTION_STORAGE_KEY)
  } catch {}
}
