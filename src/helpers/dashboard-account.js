import { DASHBOARD_URL } from './dashboard-url'
import { UNAVATAR_TOKEN } from './unavatar'

export const CLERK_FRONTEND_API = 'https://clerk.microlink.io/v1'
export const SESSION_KEYS_URL = `${DASHBOARD_URL}/api/v1/session-keys`
export const ACCOUNT_SETTINGS_PATH = '/settings'
export const UPGRADE_PATH = '/plans/create'
export const ACCOUNT_TTL_MS = 5 * 60 * 1000

const UNAVATAR_URL = 'https://unavatar.io'

const fetchJson = async (fetcher, url, init) => {
  const response = await fetcher(url, init)
  if (!response.ok) throw new Error(`${url} responded ${response.status}`)
  return response.json()
}

const unwrap = body => body?.response ?? body

const primaryEmail = user =>
  user?.email_addresses?.find(
    address => address.id === user.primary_email_address_id
  )?.email_address ??
  user?.email_addresses?.[0]?.email_address ??
  ''

export const toProfile = user => ({
  email: primaryEmail(user),
  name: [user?.first_name, user?.last_name].filter(Boolean).join(' '),
  imageUrl:
    user?.has_image !== false && typeof user?.image_url === 'string'
      ? user.image_url
      : ''
})

export const avatarSources = ({ imageUrl, email }) =>
  [
    imageUrl,
    email
      ? `${UNAVATAR_URL}/${encodeURIComponent(
        email
      )}?token=${UNAVATAR_TOKEN}&fallback=false`
      : ''
  ].filter(Boolean)

export const initialOf = ({ name, email }) =>
  (name || email).slice(0, 1).toUpperCase()

export const displayName = ({ name, email }) => name || email

const activeSession = client =>
  client?.sessions?.find(
    session => session.id === client.last_active_session_id
  ) ?? null

const sessionPath = sessionId =>
  `${CLERK_FRONTEND_API}/client/sessions/${encodeURIComponent(sessionId)}`

const sessionToken = async (fetcher, sessionId) =>
  unwrap(
    await fetchJson(fetcher, `${sessionPath(sessionId)}/tokens`, {
      method: 'POST',
      credentials: 'include'
    })
  )?.jwt ?? null

const uniqueKeys = keys => [
  ...new Set(
    keys
      .filter(key => typeof key === 'string' && key.trim() !== '')
      .map(key => key.trim())
  )
]

const accountKeys = async (fetcher, token) => {
  const { apiKeys } = await fetchJson(fetcher, SESSION_KEYS_URL, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return Array.isArray(apiKeys) ? uniqueKeys(apiKeys) : null
}

const loadSession = async fetcher => {
  const session = activeSession(
    unwrap(
      await fetchJson(fetcher, `${CLERK_FRONTEND_API}/client`, {
        credentials: 'include'
      })
    )
  )
  return session === null
    ? null
    : { sessionId: session.id, profile: toProfile(session.user), apiKeys: null }
}

const fetchKeys = async (fetcher, sessionId) => {
  try {
    const token = await sessionToken(fetcher, sessionId)
    return token === null ? null : await accountKeys(fetcher, token)
  } catch {
    return null
  }
}

const withKeys = async (session, fetcher) =>
  session && {
    ...session,
    apiKeys: await fetchKeys(fetcher, session.sessionId)
  }

export const fetchAccount = async (fetcher = fetch) =>
  withKeys(await loadSession(fetcher).catch(() => null), fetcher)

const hasKnownKeys = account =>
  Array.isArray(account.apiKeys) && account.apiKeys.length > 0

const isWorthKeeping = (failed, account) =>
  !failed && (account === null || hasKnownKeys(account))

const SIGNED_OUT = {
  session: Promise.resolve(null),
  account: Promise.resolve(null)
}

const EMPTY_CACHE = { marker: null, loadedAt: 0, ...SIGNED_OUT }

let cached = EMPTY_CACHE

const isFresh = (marker, now) =>
  cached.marker === marker && now - cached.loadedAt < ACCOUNT_TTL_MS

export const accountLoad = (marker, fetcher = fetch, now = Date.now()) => {
  if (marker === null) return SIGNED_OUT
  if (isFresh(marker, now)) {
    return { session: cached.session, account: cached.account }
  }
  const attempt = loadSession(fetcher).then(
    found => ({ found, failed: false }),
    () => ({ found: null, failed: true })
  )
  const session = attempt.then(({ found }) => found)
  const account = session.then(loaded => withKeys(loaded, fetcher))
  cached = { marker, loadedAt: now, session, account }
  Promise.all([attempt, account]).then(([{ failed }, loaded]) => {
    if (!isWorthKeeping(failed, loaded) && cached.account === account) {
      cached = EMPTY_CACHE
    }
  })
  return { session, account }
}

export const forgetAccount = () => {
  cached = EMPTY_CACHE
}

export const signOut = async (account, fetcher = fetch) => {
  try {
    const response = await fetcher(`${sessionPath(account.sessionId)}/remove`, {
      method: 'POST',
      credentials: 'include'
    })
    return response.ok
  } catch {
    return false
  } finally {
    forgetAccount()
  }
}

export const isFreeAccount = account =>
  Array.isArray(account.apiKeys) && account.apiKeys.length <= 1

export const accountMenuMode = (account, signedIn) => {
  if (account) return 'account'
  if (account === null) return 'sign-in'
  return signedIn ? 'pending' : 'sign-in'
}
