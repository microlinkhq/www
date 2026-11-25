import { describe, expect, test, vi } from 'vitest'
import { sendFetch } from '../../../../../src/components/pages/editor/with-script'

const FREE_URL = 'https://api.microlink.io/?url=https%3A%2F%2Fexample.com'

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status })

const rejectedBy = name => ({
  data: { function: { isFulfilled: false, value: { name } } }
})

const keyOf = ([input, init]) =>
  new Headers(init?.headers ?? input.headers).get('x-api-key')

const urlOf = ([input]) => (typeof input === 'string' ? input : input.url)

describe('sendFetch', () => {
  test('runs a Microlink request on the first key, on the pro endpoint', async () => {
    const native = vi.fn(async () => json({ data: {} }))
    const sent = await sendFetch(native, FREE_URL, {}, ['dev', 'paid'])
    expect(native).toHaveBeenCalledTimes(1)
    expect(keyOf(native.mock.calls[0])).toBe('dev')
    expect(
      urlOf(native.mock.calls[0]).startsWith('https://pro.microlink.io/')
    ).toBe(true)
    expect(sent.requestUrl.startsWith('https://pro.microlink.io/')).toBe(true)
  })

  test('a development key out of runs hands over to the paid key', async () => {
    const native = vi.fn(async (input, init) =>
      keyOf([input, init]) === 'dev'
        ? json({ code: 'ERATE' }, 429)
        : json({ data: { ok: true } })
    )
    const { response } = await sendFetch(native, FREE_URL, {}, ['dev', 'paid'])
    expect(await response.json()).toEqual({ data: { ok: true } })
    expect(native.mock.calls.map(keyOf)).toEqual(['dev', 'paid'])
  })

  test('code over the free plan on the development key reruns on the paid key', async () => {
    const native = vi.fn(async (input, init) =>
      keyOf([input, init]) === 'dev'
        ? json(rejectedBy('OutgoingRequestError'))
        : json({ data: { function: { isFulfilled: true, value: 1 } } })
    )
    const { response } = await sendFetch(native, FREE_URL, {}, ['dev', 'paid'])
    expect((await response.json()).data.function.isFulfilled).toBe(true)
  })

  test('the reported request matches the response the code receives', async () => {
    const native = vi.fn(async (input, init) =>
      keyOf([input, init]) === 'dev' ? json({ code: 'ERATE' }, 429) : json({})
    )
    const sent = await sendFetch(native, FREE_URL, {}, ['dev', 'paid'])
    expect(sent.requestOptions.headers.get('x-api-key')).toBe('paid')
  })

  test('a key set by the code itself is sent untouched', async () => {
    const native = vi.fn(async () => json({}))
    const init = { headers: { 'x-api-key': 'own' } }
    await sendFetch(native, FREE_URL, init, ['dev'])
    expect(native.mock.calls).toEqual([[FREE_URL, init]])
  })

  test('requests to other sites never carry a key', async () => {
    const native = vi.fn(async () => json({}))
    await sendFetch(native, 'https://example.com/data.json', {}, ['dev'])
    expect(native.mock.calls).toEqual([['https://example.com/data.json', {}]])
  })

  test('without keys a Microlink request goes keyless', async () => {
    const native = vi.fn(async () => json({}))
    await sendFetch(native, FREE_URL, {}, [])
    expect(native.mock.calls).toEqual([[FREE_URL, {}]])
  })
})
