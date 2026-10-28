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
  [TOKEN_URL]: () => json({ response: { jwt: 'session.jwt' } }),
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

    expect(await fetchDemoApiKey('1760953560')).toBe('ml_dev')
    expect(fetch).toHaveBeenCalledWith(CLIENT_URL, { credentials: 'include' })
    expect(fetch).toHaveBeenCalledWith(TOKEN_URL, {
      method: 'POST',
      credentials: 'include'
    })
    expect(fetch).toHaveBeenCalledWith(DEMO_KEY_URL, {
      headers: { Authorization: 'Bearer session.jwt' }
    })
  })

  test('reads a token returned without the response envelope', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch({
        ...signedInRoutes,
        [TOKEN_URL]: () => json({ jwt: 'session.jwt' })
      })
    )
    const { fetchDemoApiKey } = await loadHelper()

    expect(await fetchDemoApiKey('1760953560')).toBe('ml_dev')
  })

  test('asks the dashboard once per session', async () => {
    const { fetchDemoApiKey } = await loadHelper()

    await Promise.all([
      fetchDemoApiKey('1760953560'),
      fetchDemoApiKey('1760953560')
    ])
    await fetchDemoApiKey('1760953560')

    expect(fetch).toHaveBeenCalledTimes(3)
  })

  test('fetches again when another session signs in', async () => {
    const { fetchDemoApiKey } = await loadHelper()

    await fetchDemoApiKey('1760953560')
    await fetchDemoApiKey('1760999999')

    expect(fetch).toHaveBeenCalledTimes(6)
  })

  test('resolves null without a session marker, without network', async () => {
    const { fetchDemoApiKey } = await loadHelper()

    expect(await fetchDemoApiKey(null)).toBeNull()
    expect(fetch).not.toHaveBeenCalled()
  })

  test('resolves null without an active Clerk session', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch({
        [CLIENT_URL]: () => json({ response: { last_active_session_id: null } })
      })
    )
    const { fetchDemoApiKey } = await loadHelper()

    expect(await fetchDemoApiKey('1760953560')).toBeNull()
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

    expect(await fetchDemoApiKey('1760953560')).toBeNull()
  })

  test('resolves null when the network fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new TypeError('Failed to fetch')))
    )
    const { fetchDemoApiKey } = await loadHelper()

    expect(await fetchDemoApiKey('1760953560')).toBeNull()
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

describe('selectDemoApiKey', () => {
  test('prefers the key saved from the code editors', async () => {
    const { selectDemoApiKey } = await loadHelper()

    expect(
      selectDemoApiKey({
        savedApiKey: 'ml_saved',
        isSignedIn: true,
        sessionApiKey: 'ml_dev'
      })
    ).toBe('ml_saved')
  })

  test('uses the session key while signed in', async () => {
    const { selectDemoApiKey } = await loadHelper()

    expect(
      selectDemoApiKey({ isSignedIn: true, sessionApiKey: 'ml_dev' })
    ).toBe('ml_dev')
  })

  test('drops the session key once signed out', async () => {
    const { selectDemoApiKey } = await loadHelper()

    expect(
      selectDemoApiKey({ isSignedIn: false, sessionApiKey: 'ml_dev' })
    ).toBeUndefined()
  })

  test('is keyless with nothing saved and no session', async () => {
    const { selectDemoApiKey } = await loadHelper()

    expect(selectDemoApiKey({ isSignedIn: false })).toBeUndefined()
  })
})
