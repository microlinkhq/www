const CLERK_FRONTEND_API = 'https://clerk.microlink.io/v1'

const DEMO_KEY_URL = 'https://dashboard.microlink.io/api/v1/demo-key'

const fetchJson = async (url, init) => {
  const response = await fetch(url, init)
  if (!response.ok) throw new Error(`${url} responded ${response.status}`)
  return response.json()
}

const unwrap = body => body?.response ?? body

const getSessionToken = async () => {
  const client = unwrap(
    await fetchJson(`${CLERK_FRONTEND_API}/client`, { credentials: 'include' })
  )
  const sessionId = client?.last_active_session_id
  if (!sessionId) return null

  const token = unwrap(
    await fetchJson(
      `${CLERK_FRONTEND_API}/client/sessions/${sessionId}/tokens`,
      { method: 'POST', credentials: 'include' }
    )
  )
  return token?.jwt || null
}

const loadDemoApiKey = async () => {
  try {
    const token = await getSessionToken()
    if (!token) return null
    const { apiKey } = await fetchJson(DEMO_KEY_URL, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return apiKey || null
  } catch {
    return null
  }
}

let cached = { sessionMarker: null, apiKey: Promise.resolve(null) }

export const fetchDemoApiKey = sessionMarker => {
  if (!sessionMarker) return Promise.resolve(null)
  if (cached.sessionMarker !== sessionMarker) {
    cached = { sessionMarker, apiKey: loadDemoApiKey() }
  }
  return cached.apiKey
}

export const toSavedApiKey = value =>
  (typeof value === 'string' ? value : value?.apiKey) || null

export const selectDemoApiKey = ({ savedApiKey, isSignedIn, sessionApiKey }) =>
  toSavedApiKey(savedApiKey) || (isSignedIn ? sessionApiKey : null) || undefined
