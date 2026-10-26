import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

const CLIENT_URL = 'https://clerk.microlink.io/v1/client'
const TOKEN_URL = 'https://clerk.microlink.io/v1/client/sessions/sess_1/tokens'
const DEMO_KEY_URL = 'https://dashboard.microlink.io/api/v1/demo-key'

const json = (body, status = 200) =>
  Promise.resolve({ ok: status < 400, status, json: async () => body })

const mockFetch = routes =>
  vi.fn((url, init) => {
    const route = routes[url]
    if (!route) throw new Error(`unexpected fetch ${url}`)
    return route(init)
  })

const signedInRoutes = {
  [CLIENT_URL]: () => json({ response: { last_active_session_id: 'sess_1' } }),
  [TOKEN_URL]: () => json({ jwt: 'session.jwt' }),
  [DEMO_KEY_URL]: () => json({ apiKey: 'ml_dev' })
}

const loadHelper = async () => {
  vi.resetModules()
  return import('../../../src/helpers/demo-api-key')
}

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch(signedInRoutes))
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('fetchDemoApiKey', () => {
  test('exchanges the Clerk session for the development key', async () => {
    const { fetchDemoApiKey } = await loadHelper()

    expect(await fetchDemoApiKey()).toBe('ml_dev')
    expect(fetch).toHaveBeenCalledWith(CLIENT_URL, { credentials: 'include' })
    expect(fetch).toHaveBeenCalledWith(TOKEN_URL, {
      method: 'POST',
      credentials: 'include'
    })
    expect(fetch).toHaveBeenCalledWith(DEMO_KEY_URL, {
      headers: { Authorization: 'Bearer session.jwt' }
    })
  })

  test('asks the dashboard once per page load', async () => {
    const { fetchDemoApiKey } = await loadHelper()

    await Promise.all([fetchDemoApiKey(), fetchDemoApiKey()])
    await fetchDemoApiKey()

    expect(fetch).toHaveBeenCalledTimes(3)
  })

  test('resolves null without an active Clerk session', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch({
        [CLIENT_URL]: () => json({ response: { last_active_session_id: null } })
      })
    )
    const { fetchDemoApiKey } = await loadHelper()

    expect(await fetchDemoApiKey()).toBeNull()
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  test('resolves null when the dashboard refuses the session', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch({
        ...signedInRoutes,
        [DEMO_KEY_URL]: () => json({ error: 'Unauthorized' }, 401)
      })
    )
    const { fetchDemoApiKey } = await loadHelper()

    expect(await fetchDemoApiKey()).toBeNull()
  })

  test('resolves null when the network fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new TypeError('Failed to fetch')))
    )
    const { fetchDemoApiKey } = await loadHelper()

    expect(await fetchDemoApiKey()).toBeNull()
  })
})

describe('toSavedApiKey', () => {
  test('reads the key the code editors save as a string', async () => {
    const { toSavedApiKey } = await loadHelper()

    expect(toSavedApiKey('ml_saved')).toBe('ml_saved')
  })

  test('reads the legacy object shape', async () => {
    const { toSavedApiKey } = await loadHelper()

    expect(toSavedApiKey({ apiKey: 'ml_saved' })).toBe('ml_saved')
  })

  test('is null when nothing usable is saved', async () => {
    const { toSavedApiKey } = await loadHelper()

    expect(toSavedApiKey(undefined)).toBeNull()
    expect(toSavedApiKey('')).toBeNull()
    expect(toSavedApiKey({})).toBeNull()
  })
})
