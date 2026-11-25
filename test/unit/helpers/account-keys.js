import { describe, expect, test, vi } from 'vitest'
import {
  accountApiKeys,
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

  test('after every key is spent, one keyless run rescues the request', async () => {
    const attempt = vi.fn(async key => {
      if (key) throw rateLimited()
      return 'keyless'
    })
    expect(await runWithKeys(['dev', 'paid'], attempt)).toBe('keyless')
    expect(attempt.mock.calls.at(-1)).toEqual([undefined])
  })

  test('when the keyless run fails too, the reader sees the last key failure', async () => {
    const paidFailure = rateLimited()
    const attempt = vi.fn(async key => {
      if (key === 'paid') throw paidFailure
      throw rateLimited()
    })
    await expect(runWithKeys(['dev', 'paid'], attempt)).rejects.toBe(
      paidFailure
    )
  })
})
