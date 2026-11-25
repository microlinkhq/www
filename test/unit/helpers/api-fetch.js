import { describe, expect, test, vi } from 'vitest'
import {
  FREE_API_URL,
  PRO_API_URL,
  fetchApi
} from '../../../src/helpers/api-fetch'

const QUERY = 'url=https%3A%2F%2Fexample.com&screenshot'

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' }
  })

const SUCCESS = { status: 'success', data: { title: 'ok' } }
const RATE_LIMITED = { status: 'fail', code: 'ERATE' }
const REFUSED = { status: 'fail', code: 'EAUTH' }

const keysOf = keys => vi.fn(async () => keys)

const sentKey = call => call[1].headers?.['x-api-key']

describe('fetchApi', () => {
  test('a signed-out visitor calls the free endpoint without a key', async () => {
    const fetcher = vi.fn(async () => json(SUCCESS))
    const { res, json: body } = await fetchApi(QUERY, {
      fetcher,
      loadKeys: keysOf([])
    })
    expect(res.ok).toBe(true)
    expect(body).toEqual(SUCCESS)
    expect(fetcher.mock.calls[0][0]).toBe(`${FREE_API_URL}/?${QUERY}`)
    expect(sentKey(fetcher.mock.calls[0])).toBeUndefined()
  })

  test('with the account it calls the pro endpoint with the key as a header, never in the URL', async () => {
    const fetcher = vi.fn(async () => json(SUCCESS))
    await fetchApi(QUERY, {
      fetcher,
      loadKeys: keysOf(['dev'])
    })
    const [url] = fetcher.mock.calls[0]
    expect(url).toBe(`${PRO_API_URL}/?${QUERY}`)
    expect(url).not.toContain('dev')
    expect(sentKey(fetcher.mock.calls[0])).toBe('dev')
  })

  test('passes the abort signal to every attempt', async () => {
    const { signal } = new AbortController()
    const fetcher = vi.fn(async () => json(RATE_LIMITED, 429))
    await fetchApi(QUERY, {
      fetcher,
      signal,
      loadKeys: keysOf(['dev'])
    })
    expect(fetcher.mock.calls.every(call => call[1].signal === signal)).toBe(
      true
    )
  })

  test('a rate-limited key hands over to the paid key', async () => {
    const fetcher = vi.fn(async (url, init) =>
      sentKey([url, init]) === 'dev' ? json(RATE_LIMITED, 429) : json(SUCCESS)
    )
    const { json: body } = await fetchApi(QUERY, {
      fetcher,
      loadKeys: keysOf(['dev', 'paid'])
    })
    expect(body).toEqual(SUCCESS)
    expect(fetcher.mock.calls.map(sentKey)).toEqual(['dev', 'paid'])
  })

  test('a refused key hands over to the next one', async () => {
    const fetcher = vi.fn(async (url, init) =>
      sentKey([url, init]) === 'stale' ? json(REFUSED, 401) : json(SUCCESS)
    )
    await fetchApi(QUERY, {
      fetcher,
      loadKeys: keysOf(['stale', 'dev'])
    })
    expect(fetcher.mock.calls.map(sentKey)).toEqual(['stale', 'dev'])
  })

  test('a signed-in visitor never falls back to the free endpoint', async () => {
    const fetcher = vi.fn(async () => json(RATE_LIMITED, 429))
    const { res } = await fetchApi(QUERY, {
      fetcher,
      loadKeys: keysOf(['dev', 'paid'])
    })
    expect(res.status).toBe(429)
    expect(fetcher.mock.calls.map(sentKey)).toEqual(['dev', 'paid'])
    expect(
      fetcher.mock.calls.every(([url]) => url.startsWith(PRO_API_URL))
    ).toBe(true)
  })

  test('when everything is rate limited the caller still gets a response to render', async () => {
    const fetcher = vi.fn(async () => json(RATE_LIMITED, 429))
    const { res, json: body } = await fetchApi(QUERY, {
      fetcher,
      loadKeys: keysOf(['dev'])
    })
    expect(res.status).toBe(429)
    expect(body).toEqual(RATE_LIMITED)
  })

  test('an API error another key would not fix is returned as is', async () => {
    const fetcher = vi.fn(async () =>
      json({ status: 'fail', code: 'EUNREACHABLE' }, 400)
    )
    const { res } = await fetchApi(QUERY, {
      fetcher,
      loadKeys: keysOf(['dev', 'paid'])
    })
    expect(res.status).toBe(400)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  test('an aborted request is thrown, not retried', async () => {
    const abort = Object.assign(new Error('aborted'), { name: 'AbortError' })
    const fetcher = vi.fn(async () => {
      throw abort
    })
    await expect(
      fetchApi(QUERY, {
        fetcher,
        loadKeys: keysOf(['dev', 'paid'])
      })
    ).rejects.toBe(abort)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  test('a body that is not JSON reaches the caller as null', async () => {
    const fetcher = vi.fn(
      async () => new Response('<html>bad gateway</html>', { status: 502 })
    )
    const { res, json: body } = await fetchApi(QUERY, {
      fetcher,
      loadKeys: keysOf([])
    })
    expect(res.status).toBe(502)
    expect(body).toBeNull()
  })
})
