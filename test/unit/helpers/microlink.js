import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { toRawResponse } from '../../../src/components/patterns/MultiCodeEditor/interactive/raw-response.js'
import microlink from '../../../src/helpers/microlink.js'
import {
  CLERK_FRONTEND_API,
  SESSION_KEYS_URL,
  forgetAccount
} from '../../../src/helpers/dashboard-account.js'
import {
  ACCOUNT_ERROR_CODE,
  SESSION_REQUEST_URL
} from '../../../src/helpers/session-request.js'
import { normalizeApiError } from '../../../src/helpers/api-error.js'

const URL_TO_FETCH = 'https://example.com'
const FORWARDED_HEADERS = { 'user-agent': 'googlebot', 'accept-language': 'en' }
const FREE_ENDPOINT = 'https://api.microlink.io/?url=https%3A%2F%2Fexample.com'

describe('apiUrl', () => {
  test('builds the free endpoint URL', () => {
    expect(microlink.apiUrl(URL_TO_FETCH, { embed: 'logo.url' })).toBe(
      `${FREE_ENDPOINT}&embed=logo.url`
    )
  })

  test('accepts a call without options', () => {
    expect(microlink.apiUrl(URL_TO_FETCH)).toBe(FREE_ENDPOINT)
  })

  test('flattens nested options into the query string', () => {
    expect(
      microlink.apiUrl(URL_TO_FETCH, {
        insights: true,
        screenshot: { fullPage: true }
      })
    ).toBe(`${FREE_ENDPOINT}&insights=true&screenshot.fullPage=true`)
  })

  test('targets the pro endpoint without leaking the key', () => {
    const apiUrl = microlink.apiUrl(URL_TO_FETCH, { apiKey: 'secret' })
    expect(apiUrl.startsWith('https://pro.microlink.io/')).toBe(true)
    expect(apiUrl).not.toContain('secret')
  })

  test('keeps forwarded headers as query parameters', () => {
    expect(
      microlink.apiUrl(URL_TO_FETCH, {
        meta: false,
        headers: FORWARDED_HEADERS,
        force: true
      })
    ).toBe(
      `${FREE_ENDPOINT}&meta=false&headers.user-agent=googlebot&headers.accept-language=en&force=true`
    )
  })

  test('flattens nested header values into the query string', () => {
    expect(
      microlink.apiUrl(URL_TO_FETCH, {
        headers: { foo: { bar: 'baz' }, 'x-list': ['a', 'b'] }
      })
    ).toBe(
      `${FREE_ENDPOINT}&headers.foo.bar=baz&headers.x-list.0=a&headers.x-list.1=b`
    )
  })

  test('omits null header values and a null headers option', () => {
    expect(
      microlink.apiUrl(URL_TO_FETCH, {
        headers: { 'user-agent': null, accept: 'text/html' }
      })
    ).toBe(`${FREE_ENDPOINT}&headers.accept=text%2Fhtml`)
    expect(microlink.apiUrl(URL_TO_FETCH, { meta: false, headers: null })).toBe(
      `${FREE_ENDPOINT}&meta=false`
    )
    expect(microlink.apiUrl(URL_TO_FETCH, { headers: undefined })).toBe(
      FREE_ENDPOINT
    )
    expect(microlink.apiUrl(URL_TO_FETCH, { headers: {} })).toBe(FREE_ENDPOINT)
  })

  test('keeps a scalar headers option as one query parameter', () => {
    expect(microlink.apiUrl(URL_TO_FETCH, { headers: 'googlebot' })).toBe(
      `${FREE_ENDPOINT}&headers=googlebot`
    )
    expect(microlink.apiUrl(URL_TO_FETCH, { headers: false })).toBe(
      `${FREE_ENDPOINT}&headers=false`
    )
    expect(microlink.apiUrl(URL_TO_FETCH, { headers: 0 })).toBe(
      `${FREE_ENDPOINT}&headers=0`
    )
    expect(microlink.apiUrl(URL_TO_FETCH, { headers: '' })).toBe(
      `${FREE_ENDPOINT}&headers=`
    )
  })

  test('flattens a list of header values into the query string', () => {
    expect(microlink.apiUrl(URL_TO_FETCH, { headers: ['a', 'b'] })).toBe(
      `${FREE_ENDPOINT}&headers.0=a&headers.1=b`
    )
  })
})

describe('request', () => {
  let fetchMock

  const respondWith = (body, contentType) =>
    fetchMock.mockResolvedValue(
      new Response(body, { headers: { 'content-type': contentType } })
    )

  const jsonResponse = () =>
    new Response('{"status":"success","data":{}}', {
      headers: { 'content-type': 'application/json' }
    })

  beforeEach(() => {
    fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  test('sends forwarded headers in the query, not to the API', async () => {
    respondWith('{"status":"success","data":{}}', 'application/json')
    await microlink.request(URL_TO_FETCH, { headers: FORWARDED_HEADERS })
    const sent = fetchMock.mock.calls[0][0]
    expect(sent.url).toContain('headers.user-agent=googlebot')
    expect(sent.headers.get('accept-language')).toBeNull()
  })

  test('restores fetch after a scalar request', async () => {
    respondWith('{"status":"success","data":{}}', 'application/json')
    await microlink.request(URL_TO_FETCH, { headers: 'googlebot' })
    await globalThis.fetch('https://example.com/direct')
    expect(fetchMock.mock.calls.at(-1)[0]).toBe('https://example.com/direct')
  })

  test('sends a scalar headers option as one query parameter', async () => {
    respondWith('{"status":"success","data":{}}', 'application/json')
    await microlink.request(URL_TO_FETCH, { headers: 'googlebot' })
    const sent = fetchMock.mock.calls[0][0]
    expect(sent.url).toContain('headers=googlebot')
    expect(sent.url).not.toContain('headers.0')
    expect(sent.headers.get('headers')).toBeNull()
  })

  test('keeps each scalar header when two requests overlap', async () => {
    let release
    const gate = new Promise(resolve => {
      release = resolve
    })
    fetchMock.mockImplementation(async input => {
      if (input.url.includes('headers=googlebot')) await gate
      return jsonResponse()
    })
    const first = microlink.request(URL_TO_FETCH, { headers: 'googlebot' })
    const second = microlink.request(URL_TO_FETCH, { headers: 'bingbot' })
    await vi.waitFor(() => {
      expect(
        fetchMock.mock.calls.some(call =>
          call[0].url.includes('headers=googlebot')
        )
      ).toBe(true)
    })
    release()
    await Promise.all([first, second])
    const urls = fetchMock.mock.calls.map(call => call[0].url)
    expect(urls.some(url => url.includes('headers=googlebot'))).toBe(true)
    expect(urls.some(url => url.includes('headers=bingbot'))).toBe(true)
  })

  test('forwards object headers while a scalar request is in flight', async () => {
    let release
    const gate = new Promise(resolve => {
      release = resolve
    })
    fetchMock.mockImplementation(async input => {
      if (input.url.includes('headers=googlebot')) await gate
      return jsonResponse()
    })
    const scalar = microlink.request(URL_TO_FETCH, { headers: 'googlebot' })
    await vi.waitFor(() => {
      expect(
        fetchMock.mock.calls.some(call =>
          call[0].url.includes('headers=googlebot')
        )
      ).toBe(true)
    })
    await microlink.request(URL_TO_FETCH, {
      headers: { 'user-agent': 'googlebot' }
    })
    expect(
      fetchMock.mock.calls.some(call =>
        call[0].url.includes('headers.user-agent=googlebot')
      )
    ).toBe(true)
    release()
    await scalar
  })

  test('marks a failed request that sent an API key', async () => {
    fetchMock.mockRejectedValue(
      Object.assign(new Error('limited'), { code: 'ERATE' })
    )
    const keyed = await microlink
      .request(URL_TO_FETCH, { apiKey: 'secret' })
      .catch(err => err)
    const keyless = await microlink.request(URL_TO_FETCH).catch(err => err)
    expect(keyed.keyed).toBe(true)
    expect(keyless.keyed).toBeUndefined()
  })

  test('a failed scalar request does not block the next one', async () => {
    fetchMock.mockImplementation(async input => {
      if (input.url.includes('headers=googlebot')) throw new Error('down')
      return jsonResponse()
    })
    await expect(
      microlink.request(URL_TO_FETCH, { headers: 'googlebot' })
    ).rejects.toThrow()
    await microlink.request(URL_TO_FETCH, { headers: 'bingbot' })
    expect(fetchMock.mock.calls.at(-1)[0].url).toContain('headers=bingbot')
  })

  test('a JSON result reaches the code viewers as decodable bytes', async () => {
    const payload = { status: 'success', data: { title: 'Microlink' } }
    respondWith(JSON.stringify(payload), 'application/json')
    const result = await microlink.request(URL_TO_FETCH)
    expect(result.data).toEqual(payload.data)
    const raw = toRawResponse(result)
    expect(raw.headers['content-type']).toBe('application/json')
    expect(JSON.parse(new TextDecoder().decode(raw.body))).toEqual(payload)
  })

  test('an embed result reaches the code viewers as untouched bytes', async () => {
    const bytes = new Uint8Array([137, 80, 78, 71])
    respondWith(bytes, 'image/png')
    const result = await microlink.request(URL_TO_FETCH, {
      screenshot: true,
      embed: 'screenshot'
    })
    const raw = toRawResponse(result)
    expect(raw.headers['content-type']).toBe('image/png')
    expect(new Uint8Array(raw.body)).toEqual(bytes)
  })
})

describe('request on the signed-in account', () => {
  const CLIENT = {
    response: {
      last_active_session_id: 'sess_1',
      sessions: [{ id: 'sess_1', user: { email_addresses: [] } }]
    }
  }

  const apiJson = (body, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'content-type': 'application/json' }
    })

  let fetchMock

  const answerSession = handler =>
    fetchMock.mockImplementation(async (input, init) => {
      if (input === `${CLERK_FRONTEND_API}/client`) return apiJson(CLIENT)
      if (String(input).endsWith('/tokens')) return apiJson({ jwt: 'jwt' })
      if (input === SESSION_KEYS_URL) throw new Error('keys must not load')
      return handler(String(input), init)
    })

  const sessionCalls = () =>
    fetchMock.mock.calls.filter(([input]) =>
      String(input).startsWith(SESSION_REQUEST_URL)
    )

  beforeEach(() => {
    forgetAccount()
    fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    vi.stubGlobal('document', { cookie: '__client_uat=1732000000' })
  })

  afterEach(() => {
    forgetAccount()
    vi.unstubAllGlobals()
  })

  test('runs through the dashboard session request with the same query', async () => {
    answerSession(() => apiJson({ status: 'success', data: { title: 'ok' } }))
    const { data } = await microlink.request(URL_TO_FETCH, {
      screenshot: true,
      headers: { 'user-agent': 'googlebot' }
    })
    expect(data.title).toBe('ok')
    const [[url, init]] = sessionCalls()
    expect(url).toBe(
      `${SESSION_REQUEST_URL}?url=https%3A%2F%2Fexample.com&screenshot=true&headers.user-agent=googlebot`
    )
    expect(init.headers.authorization).toBe('Bearer jwt')
    expect(
      fetchMock.mock.calls.some(([input]) =>
        String(input?.url ?? input).includes('microlink.io/?')
      )
    ).toBe(false)
  })

  test('keeps a scalar headers option in the query', async () => {
    answerSession(() => apiJson({ status: 'success', data: {} }))
    await microlink.request(URL_TO_FETCH, { headers: 'googlebot' })
    expect(sessionCalls()[0][0]).toContain('headers=googlebot')
  })

  test('the result reaches the code viewers like a direct one', async () => {
    const payload = { status: 'success', data: { title: 'Microlink' } }
    answerSession(() => apiJson(payload))
    const result = await microlink.request(URL_TO_FETCH)
    const raw = toRawResponse(result)
    expect(raw.headers['content-type']).toBe('application/json')
    expect(JSON.parse(new TextDecoder().decode(raw.body))).toEqual(payload)
  })

  test('an embed result arrives as untouched bytes', async () => {
    const bytes = new Uint8Array([137, 80, 78, 71])
    answerSession(
      () => new Response(bytes, { headers: { 'content-type': 'image/png' } })
    )
    const result = await microlink.request(URL_TO_FETCH, {
      screenshot: true,
      embed: 'screenshot'
    })
    const raw = toRawResponse(result)
    expect(raw.headers['content-type']).toBe('image/png')
    expect(new Uint8Array(raw.body)).toEqual(bytes)
  })

  test('a stream result arrives as untouched bytes', async () => {
    const bytes = new Uint8Array([1, 2, 3, 4])
    answerSession(
      () =>
        new Response(bytes, {
          headers: { 'content-type': 'application/octet-stream' }
        })
    )
    const result = await microlink.request(URL_TO_FETCH, {
      stream: 'screenshot'
    })
    const raw = toRawResponse(result)
    expect(new Uint8Array(raw.body)).toEqual(bytes)
  })

  test('a 200 body that failed still throws the API error', async () => {
    answerSession(() =>
      apiJson({ status: 'fail', code: 'EUNREACHABLE', message: 'down' }, 200)
    )
    const err = await microlink.request(URL_TO_FETCH).catch(error => error)
    expect(err).toBeInstanceOf(Error)
    expect(err.code).toBe('EUNREACHABLE')
    expect(err.statusCode).toBe(200)
  })

  test('a 200 JSON failure is not returned as embed bytes', async () => {
    answerSession(
      () =>
        new Response(
          JSON.stringify({
            status: 'fail',
            code: 'EUNREACHABLE',
            message: 'down'
          }),
          {
            status: 200,
            headers: { 'content-type': 'application/json; charset=utf-8' }
          }
        )
    )
    const err = await microlink
      .request(URL_TO_FETCH, { embed: 'screenshot' })
      .catch(error => error)
    expect(err).toBeInstanceOf(Error)
    expect(err.code).toBe('EUNREACHABLE')
  })

  test('an embed error is the API error, not the raw body', async () => {
    answerSession(() =>
      apiJson({ status: 'fail', code: 'ERATE', message: 'limited' }, 429)
    )
    const err = await microlink
      .request(URL_TO_FETCH, { embed: 'screenshot' })
      .catch(error => error)
    expect(err).toBeInstanceOf(Error)
    expect(err.code).toBe('ERATE')
  })

  test('a spent account throws the API error, marked as keyed', async () => {
    answerSession(() =>
      apiJson({ status: 'fail', code: 'ERATE', message: 'limited' }, 429)
    )
    const err = await microlink.request(URL_TO_FETCH).catch(err => err)
    expect(err.code).toBe('ERATE')
    expect(err.statusCode).toBe(429)
    expect(err.keyed).toBe(true)
    expect(normalizeApiError.fromMql(err)).toEqual({
      code: 'ERATE',
      message: 'limited',
      keyed: true
    })
  })

  test('a session that cannot be reached throws an account error, with no keyless run', async () => {
    fetchMock.mockImplementation(async () => {
      throw new TypeError('Failed to fetch')
    })
    const err = await microlink.request(URL_TO_FETCH).catch(err => err)
    expect(err.code).toBe(ACCOUNT_ERROR_CODE)
    expect(
      fetchMock.mock.calls.some(([input]) =>
        String(input?.url ?? input).startsWith('https://api.microlink.io')
      )
    ).toBe(false)
  })

  test('a pasted key runs direct on the pro endpoint', async () => {
    answerSession(() => apiJson({ status: 'success', data: {} }))
    fetchMock.mockImplementation(async () =>
      apiJson({ status: 'success', data: {} })
    )
    await microlink.request(URL_TO_FETCH, { apiKey: 'pasted' })
    const [sent] = fetchMock.mock.calls[0]
    expect(sent.url.startsWith('https://pro.microlink.io/')).toBe(true)
    expect(sent.headers.get('x-api-key')).toBe('pasted')
    expect(sessionCalls()).toHaveLength(0)
  })

  test('a signed-out visitor stays on the free endpoint without touching Clerk', async () => {
    vi.stubGlobal('document', { cookie: '' })
    fetchMock.mockImplementation(async () =>
      apiJson({ status: 'success', data: {} })
    )
    await microlink.request(URL_TO_FETCH)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][0].url).toMatch(
      /^https:\/\/api\.microlink\.io\//
    )
  })
})
