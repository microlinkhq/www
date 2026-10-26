import { once } from './once'

const CLERK_FRONTEND_API = 'https://clerk.microlink.io/v1'

const DEMO_KEY_URL = 'https://dashboard.microlink.io/api/v1/demo-key'

const fetchJson = async (url, init) => {
  const response = await fetch(url, init)
  if (!response.ok) throw new Error(`${url} responded ${response.status}`)
  return response.json()
}

const getSessionToken = async () => {
  const { response: client } = await fetchJson(`${CLERK_FRONTEND_API}/client`, {
    credentials: 'include'
  })
  const sessionId = client?.last_active_session_id
  if (!sessionId) return null

  const { jwt } = await fetchJson(
    `${CLERK_FRONTEND_API}/client/sessions/${sessionId}/tokens`,
    { method: 'POST', credentials: 'include' }
  )
  return jwt || null
}

export const fetchDemoApiKey = once(async () => {
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
})

export const toSavedApiKey = value =>
  (typeof value === 'string' ? value : value?.apiKey) || null
