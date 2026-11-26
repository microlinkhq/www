import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import {
  installFetch,
  sendFetch
} from '../../../../../src/components/pages/editor/with-script'
import {
  CLERK_FRONTEND_API,
  forgetAccount
} from '../../../../../src/helpers/dashboard-account'
import { SESSION_REQUEST_URL } from '../../../../../src/helpers/session-request'

const QUERY = 'url=https%3A%2F%2Fexample.com'
const FREE_URL = `https://api.microlink.io/?${QUERY}`

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' }
  })

const CLIENT = {
  response: {
    last_active_session_id: 'sess_1',
    sessions: [{ id: 'sess_1', user: { email_addresses: [] } }]
  }
}

const keyOf = ([input, init]) =>
  new Headers(init?.headers ?? input.headers).get('x-api-key')

const urlOf = ([input]) => (typeof input === 'string' ? input : input.url)

const nativeWith = answer => {
  const native = vi.fn(async (input, init) => {
    const url = urlOf([input])
    if (url === `${CLERK_FRONTEND_API}/client`) return json(CLIENT)
    if (url.endsWith('/tokens')) return json({ jwt: 'jwt' })
    return answer(input, init)
  })
  vi.stubGlobal('fetch', native)
  return native
}

describe('sendFetch', () => {
  beforeEach(() => {
    forgetAccount()
    vi.stubGlobal('document', { cookie: '__client_uat=1732000000' })
  })

  afterEach(() => {
    forgetAccount()
    vi.unstubAllGlobals()
  })

  test('a signed-in run goes through the session request with the same query', async () => {
    const native = nativeWith(async () => json({ data: { ok: true } }))
    const sent = await sendFetch(native, FREE_URL, {}, { onSession: true })
    const apiCall = native.mock.calls.at(-1)
    expect(urlOf(apiCall)).toBe(`${SESSION_REQUEST_URL}?${QUERY}`)
    expect(apiCall[1].headers.authorization).toBe('Bearer jwt')
    expect(await sent.response.json()).toEqual({ data: { ok: true } })
  })

  test('the reported request is the one the code wrote, without the token', async () => {
    const native = nativeWith(async () => json({}))
    const sent = await sendFetch(native, FREE_URL, {}, { onSession: true })
    expect(sent.requestUrl).toBe(FREE_URL)
    expect(JSON.stringify(sent.requestOptions)).not.toContain('jwt')
  })

  test('a session that cannot be reached answers with an account error, never keyless', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('Failed to fetch')
      })
    )
    const native = vi.fn(async () => {
      throw new TypeError('Failed to fetch')
    })
    const { response } = await sendFetch(
      native,
      FREE_URL,
      {},
      {
        onSession: true
      }
    )
    expect(response.status).toBe(401)
    expect((await response.json()).code).toBe('EACCOUNT')
    expect(native.mock.calls.some(call => urlOf(call) === FREE_URL)).toBe(false)
  })

  test('a pasted key runs direct on the pro endpoint', async () => {
    const native = vi.fn(async () => json({}))
    const sent = await sendFetch(native, FREE_URL, {}, { apiKey: 'pasted' })
    expect(native).toHaveBeenCalledTimes(1)
    expect(keyOf(native.mock.calls[0])).toBe('pasted')
    expect(sent.requestUrl.startsWith('https://pro.microlink.io/')).toBe(true)
  })

  test('a key set by the code itself is sent untouched', async () => {
    const native = vi.fn(async () => json({}))
    const init = { headers: { 'x-api-key': 'own' } }
    await sendFetch(native, FREE_URL, init, { onSession: true })
    await sendFetch(native, FREE_URL, init, { apiKey: 'pasted' })
    expect(native.mock.calls).toEqual([
      [FREE_URL, init],
      [FREE_URL, init]
    ])
  })

  test('a URL object keeps its query on the session route', async () => {
    const native = nativeWith(async () => json({}))
    await sendFetch(native, new URL(FREE_URL), {}, { onSession: true })
    expect(urlOf(native.mock.calls.at(-1))).toBe(
      `${SESSION_REQUEST_URL}?${QUERY}`
    )
  })

  test('a URL object for another site is sent untouched', async () => {
    const native = vi.fn(async () => json({}))
    const url = new URL('https://example.com/data.json')
    await sendFetch(native, url, {}, { onSession: true })
    expect(native.mock.calls).toEqual([[url, {}]])
  })

  test('a relative request stays on the page', async () => {
    const native = vi.fn(async () => json({}))
    const input = '/data.json?lang=en'
    await sendFetch(native, input, {}, { onSession: true })
    await sendFetch(
      native,
      input,
      {},
      {
        onSession: true,
        base: 'https://microlink.io/editor'
      }
    )
    expect(native.mock.calls).toEqual([
      [input, {}],
      [input, {}]
    ])
  })

  test('a protocol-relative API url keeps its query on the session route', async () => {
    const native = nativeWith(async () => json({}))
    await sendFetch(
      native,
      `//api.microlink.io/?${QUERY}`,
      {},
      {
        onSession: true,
        base: 'https://microlink.io/editor'
      }
    )
    expect(urlOf(native.mock.calls.at(-1))).toBe(
      `${SESSION_REQUEST_URL}?${QUERY}`
    )
  })

  test('a protocol-relative request to another site is sent untouched', async () => {
    const native = vi.fn(async () => json({}))
    const input = '//example.com/data.json'
    await sendFetch(
      native,
      input,
      {},
      {
        onSession: true,
        base: 'https://microlink.io/editor'
      }
    )
    expect(native.mock.calls).toEqual([[input, {}]])
  })

  test('a pasted key does not rewrite a relative request', async () => {
    const native = vi.fn(async () => json({}))
    await sendFetch(
      native,
      '/data.json',
      {},
      {
        apiKey: 'pasted',
        base: 'https://microlink.io/editor'
      }
    )
    expect(native.mock.calls).toEqual([['/data.json', {}]])
  })

  test('a pasted key rewrites a protocol-relative API url', async () => {
    const native = vi.fn(async () => json({}))
    const sent = await sendFetch(
      native,
      `//api.microlink.io/?${QUERY}`,
      {},
      { apiKey: 'pasted', base: 'https://microlink.io/editor' }
    )
    expect(sent.requestUrl).toBe(`https://pro.microlink.io/?${QUERY}`)
  })

  test('the installed fetch resolves against the window location', async () => {
    const native = nativeWith(async () => json({}))
    const target = {
      fetch: native,
      location: { href: 'https://microlink.io/editor' }
    }
    const restore = installFetch(target, () => {}, { onSession: true })
    await target.fetch(`//api.microlink.io/?${QUERY}`)
    expect(urlOf(native.mock.calls.at(-1))).toBe(
      `${SESSION_REQUEST_URL}?${QUERY}`
    )
    await target.fetch('/data.json')
    expect(native.mock.calls.at(-1)).toEqual(['/data.json', {}])
    restore()
  })

  test('requests to other sites are sent untouched', async () => {
    const native = vi.fn(async () => json({}))
    await sendFetch(
      native,
      'https://example.com/data.json',
      {},
      {
        onSession: true
      }
    )
    expect(native.mock.calls).toEqual([['https://example.com/data.json', {}]])
  })

  test('a request the session route cannot carry stays as written', async () => {
    const native = vi.fn(async () => json({}))
    const init = { method: 'POST', body: '{}' }
    await sendFetch(native, FREE_URL, init, { onSession: true })
    expect(native.mock.calls).toEqual([[FREE_URL, init]])
  })

  test('a key on the request is kept when the init carries other headers', async () => {
    const native = vi.fn(async () => json({}))
    const request = new Request(FREE_URL, {
      headers: { 'x-api-key': 'own' }
    })
    const init = { headers: { accept: 'application/json' } }
    await sendFetch(native, request, {}, { onSession: true })
    await sendFetch(native, request, init, {
      onSession: true,
      apiKey: 'pasted'
    })
    expect(native.mock.calls).toEqual([
      [request, {}],
      [request, init]
    ])
  })

  test('the method on the init wins, and a POST request stays off the session route', async () => {
    const native = vi.fn(async () => json({}))
    const posted = new Request(FREE_URL, { method: 'POST', body: '{}' })
    const gotten = new Request(FREE_URL)
    const init = { method: 'POST', body: '{}' }
    await sendFetch(native, posted, {}, { onSession: true })
    await sendFetch(native, gotten, init, { onSession: true })
    expect(native.mock.calls).toEqual([
      [posted, {}],
      [gotten, init]
    ])
  })

  test('an abort signal on the request or the init reaches the session request', async () => {
    const requestController = new AbortController()
    const initController = new AbortController()
    const request = new Request(FREE_URL, {
      signal: requestController.signal
    })
    const native = nativeWith(async () => json({}))
    await sendFetch(native, request, {}, { onSession: true })
    await sendFetch(
      native,
      FREE_URL,
      { signal: initController.signal },
      { onSession: true }
    )
    await sendFetch(
      native,
      new Request(FREE_URL, { signal: requestController.signal }),
      { signal: initController.signal },
      { onSession: true }
    )
    const signals = native.mock.calls
      .filter(([input]) =>
        String(urlOf([input])).startsWith(SESSION_REQUEST_URL)
      )
      .map(([, init]) => init.signal)
    expect(signals[0]).toBe(request.signal)
    expect(signals[1]).toBe(initController.signal)
    expect(signals[2]).toBe(initController.signal)
    requestController.abort()
    expect(signals[0].aborted).toBe(true)
    expect(signals[2].aborted).toBe(false)
  })

  test('a signed-out run goes keyless', async () => {
    const native = vi.fn(async () => json({}))
    await sendFetch(native, FREE_URL, {}, {})
    await sendFetch(native, FREE_URL)
    expect(native.mock.calls).toEqual([
      [FREE_URL, {}],
      [FREE_URL, {}]
    ])
  })
})
