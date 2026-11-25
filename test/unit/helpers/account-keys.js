import { describe, expect, test, vi } from 'vitest'
import {
  accountApiKeys,
  fetchWithKeys,
  hitsPlanLimit,
  requestKeys,
  runWithKeys,
  shouldTryNextKey
} from '../../../src/helpers/account-keys'

const SIGNED_IN = { cookie: '__client_uat=1732000000' }
const SIGNED_OUT = { cookie: '__client_uat=0' }

const loaderOf = account => vi.fn(() => ({ account: Promise.resolve(account) }))

const rateLimited = () =>
  Object.assign(new Error('limited'), { statusCode: 429, code: 'ERATE' })

const rejectedKey = () =>
  Object.assign(new Error('invalid key'), { statusCode: 401, code: 'EAUTH' })

describe('accountApiKeys', () => {
  test('a signed-out visitor makes no account request', async () => {
    const load = loaderOf({ apiKeys: ['dev'] })
    expect(await accountApiKeys(SIGNED_OUT, load)).toEqual([])
    expect(load).not.toHaveBeenCalled()
  })

  test('server rendering has no document and no keys', async () => {
    expect(await accountApiKeys(undefined, loaderOf(null))).toEqual([])
  })

  test('a signed-in visitor gets the account keys in dashboard order', async () => {
    const load = loaderOf({ apiKeys: ['dev', 'paid'] })
    expect(await accountApiKeys(SIGNED_IN, load)).toEqual(['dev', 'paid'])
    expect(load).toHaveBeenCalledWith('1732000000')
  })

  test('keys that failed to load or a missing session resolve to none', async () => {
    expect(await accountApiKeys(SIGNED_IN, loaderOf(null))).toEqual([])
    expect(
      await accountApiKeys(SIGNED_IN, loaderOf({ apiKeys: null }))
    ).toEqual([])
    const failing = () => ({ account: Promise.reject(new Error('down')) })
    expect(await accountApiKeys(SIGNED_IN, failing)).toEqual([])
  })
})

describe('requestKeys', () => {
  test('a pasted key goes first, then account keys, without duplicates', () => {
    expect(requestKeys(' pasted ', ['dev', 'pasted', 'paid'])).toEqual([
      'pasted',
      'dev',
      'paid'
    ])
  })

  test('drops empty and non-string keys', () => {
    expect(requestKeys('', ['  ', null, { apiKey: 'x' }, 'dev'])).toEqual([
      'dev'
    ])
    expect(requestKeys(undefined)).toEqual([])
  })
})

describe('shouldTryNextKey', () => {
  test('moves on when a key is out of quota or refused', () => {
    expect(shouldTryNextKey({ statusCode: 429 })).toBe(true)
    expect(shouldTryNextKey({ code: 'ERATE' })).toBe(true)
    expect(shouldTryNextKey({ code: 'EAUTH' })).toBe(true)
  })

  test('stays on errors another key would not fix', () => {
    expect(shouldTryNextKey({ statusCode: 500, code: 'EFATAL' })).toBe(false)
    expect(shouldTryNextKey({ name: 'AbortError' })).toBe(false)
    expect(shouldTryNextKey(undefined)).toBe(false)
  })
})

describe('runWithKeys', () => {
  test('without keys it runs once keyless', async () => {
    const attempt = vi.fn(async key => key)
    expect(await runWithKeys([], attempt)).toBeUndefined()
    expect(attempt.mock.calls).toEqual([[undefined]])
  })

  test('the first key that answers wins', async () => {
    const attempt = vi.fn(async key => key)
    expect(await runWithKeys(['dev', 'paid'], attempt)).toBe('dev')
    expect(attempt).toHaveBeenCalledTimes(1)
  })

  test('a rate-limited or refused key hands over to the next one', async () => {
    const attempt = vi.fn(async key => {
      if (key === 'stale') throw rejectedKey()
      if (key === 'dev') throw rateLimited()
      return key
    })
    expect(await runWithKeys(['stale', 'dev', 'paid'], attempt)).toBe('paid')
    expect(attempt.mock.calls.map(([key]) => key)).toEqual([
      'stale',
      'dev',
      'paid'
    ])
  })

  test('an error another key would not fix is thrown at once', async () => {
    const fatal = Object.assign(new Error('boom'), { code: 'EFATAL' })
    const attempt = vi.fn(async () => {
      throw fatal
    })
    await expect(runWithKeys(['dev', 'paid'], attempt)).rejects.toBe(fatal)
    expect(attempt).toHaveBeenCalledTimes(1)
  })
})

const rejectedBy = name => ({
  data: { function: { isFulfilled: false, value: { name, message: name } } }
})

describe('hitsPlanLimit', () => {
  test('a function the free plan rejects is a plan limit', () => {
    expect(hitsPlanLimit(rejectedBy('CodeSizeError'))).toBe(true)
    expect(hitsPlanLimit(rejectedBy('OutgoingRequestError'))).toBe(true)
  })

  test('code that just throws, succeeds, or is not a function is not', () => {
    expect(hitsPlanLimit(rejectedBy('TypeError'))).toBe(false)
    expect(
      hitsPlanLimit({ data: { function: { isFulfilled: true, value: 1 } } })
    ).toBe(false)
    expect(hitsPlanLimit({ data: { title: 'x' } })).toBe(false)
    expect(hitsPlanLimit(undefined)).toBe(false)
  })
})

describe('runWithKeys on the free development key', () => {
  test('a signed-in visitor never runs keyless, even with every key spent', async () => {
    const devLimit = rateLimited()
    const paidLimit = rateLimited()
    const attempt = vi.fn(async key => {
      throw key === 'dev' ? devLimit : paidLimit
    })
    await expect(runWithKeys(['dev', 'paid'], attempt)).rejects.toBe(paidLimit)
    expect(attempt.mock.calls).toEqual([['dev'], ['paid']])
  })

  test('code over the free plan on the only key returns that rejection, with no keyless run', async () => {
    const attempt = vi.fn(async () => rejectedBy('OutgoingRequestError'))
    expect(await runWithKeys(['dev'], attempt)).toEqual(
      rejectedBy('OutgoingRequestError')
    )
    expect(attempt.mock.calls).toEqual([['dev']])
  })

  test('a refused paid key after a rate-limited one shows the rate limit', async () => {
    const devLimit = rateLimited()
    const attempt = vi.fn(async key => {
      throw key === 'dev' ? devLimit : rejectedKey()
    })
    await expect(runWithKeys(['dev', 'paid'], attempt)).rejects.toBe(devLimit)
  })

  test('a plan rejection on the development key hands over to the paid key', async () => {
    const attempt = vi.fn(async key =>
      key === 'dev' ? rejectedBy('CodeSizeError') : { data: { ok: key } }
    )
    expect(await runWithKeys(['dev', 'paid'], attempt)).toEqual({
      data: { ok: 'paid' }
    })
  })

  test('a paid key out of runs wins over the development key plan rejection', async () => {
    const paidLimit = rateLimited()
    const attempt = vi.fn(async key => {
      if (key === 'dev') return rejectedBy('CodeSizeError')
      throw paidLimit
    })
    await expect(runWithKeys(['dev', 'paid'], attempt)).rejects.toBe(paidLimit)
    expect(attempt).toHaveBeenCalledTimes(2)
  })

  test('without keys a plan-rejected keyless run is returned as is', async () => {
    const attempt = vi.fn(async () => rejectedBy('CodeSizeError'))
    expect(await runWithKeys([], attempt)).toEqual(rejectedBy('CodeSizeError'))
  })
})

describe('fetchWithKeys', () => {
  const json = (body, status = 200) =>
    new Response(JSON.stringify(body), { status })

  test('reads plan rejections from the response body and moves on', async () => {
    const send = vi.fn(async key =>
      key === 'dev' ? json(rejectedBy('CodeSizeError')) : json({ data: 1 })
    )
    const { body } = await fetchWithKeys(['dev', 'paid'], send)
    expect(body).toEqual({ data: 1 })
    expect(send.mock.calls.map(([key]) => key)).toEqual(['dev', 'paid'])
  })

  test('leaves the response body unread for the caller', async () => {
    const { response } = await fetchWithKeys([], async () => json({ data: 1 }))
    expect(await response.json()).toEqual({ data: 1 })
  })

  test('a spent last attempt is returned as a response, not thrown', async () => {
    const send = vi.fn(async () => json({ code: 'ERATE' }, 429))
    const { response, body } = await fetchWithKeys(['dev'], send)
    expect(response.status).toBe(429)
    expect(body).toEqual({ code: 'ERATE' })
  })
})
