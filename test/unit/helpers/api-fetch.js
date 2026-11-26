import { describe, expect, test, vi } from 'vitest'
import { FREE_API_URL, fetchApi } from '../../../src/helpers/api-fetch'
import { SESSION_REQUEST_URL } from '../../../src/helpers/session-request'

const QUERY = 'url=https%3A%2F%2Fexample.com&screenshot'

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' }
  })

const SUCCESS = { status: 'success', data: { title: 'ok' } }

const signedIn = () => true
const signedOut = () => false
const token = async () => 'jwt'

describe('fetchApi', () => {
  test('a signed-out visitor calls the free endpoint without credentials', async () => {
    const fetcher = vi.fn(async () => json(SUCCESS))
    const { res, json: body } = await fetchApi(QUERY, {
      fetcher,
      signedIn: signedOut
    })
    expect(res.ok).toBe(true)
    expect(body).toEqual(SUCCESS)
    const [url, init] = fetcher.mock.calls[0]
    expect(url).toBe(`${FREE_API_URL}/?${QUERY}`)
    expect(init.headers).toBeUndefined()
  })

  test('a signed-in visitor runs on the dashboard session request', async () => {
    const fetcher = vi.fn(async () => json(SUCCESS))
    const { json: body } = await fetchApi(QUERY, {
      fetcher,
      signedIn,
      token
    })
    expect(body).toEqual(SUCCESS)
    expect(fetcher).toHaveBeenCalledTimes(1)
    expect(fetcher.mock.calls[0][0]).toBe(`${SESSION_REQUEST_URL}?${QUERY}`)
  })

  test('a signed-in visitor never falls back to the free endpoint', async () => {
    const fetcher = vi.fn(async () =>
      json({ status: 'fail', code: 'ERATE' }, 429)
    )
    const { res, json: body } = await fetchApi(QUERY, {
      fetcher,
      signedIn,
      token
    })
    expect(res.status).toBe(429)
    expect(body.code).toBe('ERATE')
    expect(
      fetcher.mock.calls.every(([url]) => url.startsWith(SESSION_REQUEST_URL))
    ).toBe(true)
  })

  test('passes the abort signal through', async () => {
    const { signal } = new AbortController()
    const fetcher = vi.fn(async () => json(SUCCESS))
    await fetchApi(QUERY, { fetcher, signal, signedIn, token })
    await fetchApi(QUERY, { fetcher, signal, signedIn: signedOut })
    expect(fetcher.mock.calls.every(call => call[1].signal === signal)).toBe(
      true
    )
  })

  test('a body that is not JSON reaches the caller as null', async () => {
    const fetcher = vi.fn(
      async () => new Response('<html>bad gateway</html>', { status: 502 })
    )
    const { res, json: body } = await fetchApi(QUERY, {
      fetcher,
      signedIn: signedOut
    })
    expect(res.status).toBe(502)
    expect(body).toBeNull()
  })
})
