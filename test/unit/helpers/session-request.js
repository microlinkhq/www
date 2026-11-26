import { describe, expect, test, vi } from 'vitest'
import {
  ACCOUNT_ERROR_CODE,
  SESSION_REQUEST_URL,
  isSignedIn,
  sessionRequest
} from '../../../src/helpers/session-request'

const QUERY = 'url=https%3A%2F%2Fexample.com&screenshot'

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' }
  })

const tokenOf = value => vi.fn(async () => value)

describe('isSignedIn', () => {
  test('reads the Clerk sign-in cookie', () => {
    expect(isSignedIn({ cookie: '__client_uat=1732000000' })).toBe(true)
    expect(isSignedIn({ cookie: '__client_uat=0' })).toBe(false)
    expect(isSignedIn({ cookie: '' })).toBe(false)
  })

  test('server rendering has no document and is signed out', () => {
    expect(isSignedIn(null)).toBe(false)
  })
})

describe('sessionRequest', () => {
  test('sends the query to the dashboard with a fresh Bearer token', async () => {
    const { signal } = new AbortController()
    const fetcher = vi.fn(async () => json({ status: 'success', data: {} }))
    const res = await sessionRequest(QUERY, {
      fetcher,
      signal,
      token: tokenOf('jwt')
    })
    expect(res.ok).toBe(true)
    const [url, init] = fetcher.mock.calls[0]
    expect(url).toBe(`${SESSION_REQUEST_URL}?${QUERY}`)
    expect(init.headers.authorization).toBe('Bearer jwt')
    expect(init.signal).toBe(signal)
  })

  test('never sends an API key from the browser', async () => {
    const fetcher = vi.fn(async () => json({ status: 'success' }))
    await sessionRequest(QUERY, { fetcher, token: tokenOf('jwt') })
    const [url, init] = fetcher.mock.calls[0]
    expect(url.startsWith('https://dashboard.microlink.io/')).toBe(true)
    expect(init.headers['x-api-key']).toBeUndefined()
  })

  test('a token that cannot be minted is an account error, never a keyless run', async () => {
    const fetcher = vi.fn()
    const failing = vi.fn(async () => {
      throw new Error('clerk down')
    })
    for (const token of [failing, tokenOf(null)]) {
      const res = await sessionRequest(QUERY, { fetcher, token })
      expect(res.status).toBe(401)
      expect((await res.json()).code).toBe(ACCOUNT_ERROR_CODE)
    }
    expect(fetcher).not.toHaveBeenCalled()
  })

  test('a dashboard refusal reads as a Microlink failure', async () => {
    for (const status of [401, 404, 502]) {
      const fetcher = vi.fn(async () => json({ error: 'nope' }, status))
      const res = await sessionRequest(QUERY, {
        fetcher,
        token: tokenOf('jwt')
      })
      const body = await res.json()
      expect(res.status).toBe(status)
      expect(body.status).toBe('fail')
      expect(body.code).toBe(ACCOUNT_ERROR_CODE)
      expect(body.message).toBe(
        status === 404
          ? 'Your Microlink account has no API keys yet.'
          : 'Your Microlink session could not be reached. Sign in again to run this on your account.'
      )
    }
  })

  test('a successful response is kept even when it names an error', async () => {
    const original = json({ error: 'notice', data: { ok: true } })
    const res = await sessionRequest(QUERY, {
      fetcher: async () => original,
      token: tokenOf('jwt')
    })
    expect(res).toBe(original)
  })

  test('an API failure that also names an error stays the API failure', async () => {
    const original = json({ status: 'fail', error: 'nope', code: 'ERATE' }, 429)
    const res = await sessionRequest(QUERY, {
      fetcher: async () => original,
      token: tokenOf('jwt')
    })
    expect(res).toBe(original)
    expect((await res.json()).code).toBe('ERATE')
  })

  test('a non-JSON response is returned unchanged', async () => {
    const original = new Response('<html>', { status: 502 })
    const res = await sessionRequest(QUERY, {
      fetcher: async () => original,
      token: tokenOf('jwt')
    })
    expect(res).toBe(original)
    expect(await res.text()).toBe('<html>')
  })

  test('an API error passes through untouched', async () => {
    const limited = json({ status: 'fail', code: 'ERATE' }, 429)
    const res = await sessionRequest(QUERY, {
      fetcher: async () => limited,
      token: tokenOf('jwt')
    })
    expect(res).toBe(limited)
    expect((await res.json()).code).toBe('ERATE')
  })

  test('an aborted request is thrown', async () => {
    const abort = Object.assign(new Error('aborted'), { name: 'AbortError' })
    await expect(
      sessionRequest(QUERY, {
        fetcher: async () => {
          throw abort
        },
        token: tokenOf('jwt')
      })
    ).rejects.toBe(abort)
  })
})
