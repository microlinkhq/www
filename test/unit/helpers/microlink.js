import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { toRawResponse } from '../../../src/components/patterns/MultiCodeEditor/interactive/raw-response.js'
import microlink from '../../../src/helpers/microlink.js'

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
})

describe('request', () => {
  let fetchMock

  const respondWith = (body, contentType) =>
    fetchMock.mockResolvedValue(
      new Response(body, { headers: { 'content-type': contentType } })
    )

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
