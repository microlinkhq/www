import { describe, expect, test } from 'vitest'
import {
  ACCOUNT_TTL_MS,
  CLERK_FRONTEND_API,
  SESSION_KEYS_URL,
  accountLoad,
  accountMenuMode,
  avatarSources,
  displayName,
  fetchAccount,
  initialOf,
  isFreeAccount,
  signOut,
  toProfile
} from '../../../src/helpers/dashboard-account'
import { UNAVATAR_TOKEN } from '../../../src/helpers/unavatar'

const USER = {
  first_name: 'Ada',
  last_name: 'Lovelace',
  image_url: 'https://img.clerk.com/ada.png',
  primary_email_address_id: 'idn_2',
  email_addresses: [
    { id: 'idn_1', email_address: 'old@example.com' },
    { id: 'idn_2', email_address: 'ada@example.com' }
  ]
}

const PROFILE = {
  email: 'ada@example.com',
  name: 'Ada Lovelace',
  imageUrl: 'https://img.clerk.com/ada.png'
}

const CLIENT = {
  response: {
    object: 'client',
    last_active_session_id: 'sess_1',
    sessions: [
      { id: 'sess_0', user: { ...USER, first_name: 'Other' } },
      { id: 'sess_1', user: USER }
    ]
  }
}

const NO_SESSION = { response: { last_active_session_id: null, sessions: [] } }

const CLIENT_URL = `${CLERK_FRONTEND_API}/client`
const TOKEN_URL = `${CLERK_FRONTEND_API}/client/sessions/sess_1/tokens`
const REMOVE_URL = `${CLERK_FRONTEND_API}/client/sessions/sess_1/remove`

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' }
  })

const fakeFetch = routes => {
  const calls = []
  const fetcher = async (url, init = {}) => {
    calls.push({
      url,
      method: init.method ?? 'GET',
      credentials: init.credentials,
      authorization: init.headers?.Authorization
    })
    const route = routes[url]
    if (route === undefined) throw new TypeError('Failed to fetch')
    return route()
  }
  return { calls, fetcher }
}

const signedIn = (keys = () => json({ apiKeys: ['dev', 'paid'] })) =>
  fakeFetch({
    [CLIENT_URL]: () => json(CLIENT),
    [TOKEN_URL]: () => json({ object: 'token', jwt: 'jwt_1' }),
    [SESSION_KEYS_URL]: keys
  })

const accountFor = (marker, fetcher, now) =>
  accountLoad(marker, fetcher, now).account

const settle = () => new Promise(resolve => setTimeout(resolve, 0))

const deferred = () => {
  let release
  const gate = new Promise(resolve => {
    release = resolve
  })
  return { gate, release }
}

describe('toProfile', () => {
  test('uses the primary email, the full name and the photo', () => {
    expect(toProfile(USER)).toEqual(PROFILE)
  })

  test('drops the photo when Clerk says the user has none', () => {
    expect(toProfile({ ...USER, has_image: false }).imageUrl).toBe('')
    expect(toProfile({ ...USER, has_image: true }).imageUrl).toBe(
      PROFILE.imageUrl
    )
  })

  test('falls back to the first email and empty fields', () => {
    expect(
      toProfile({ email_addresses: [{ id: 'x', email_address: 'a@b.co' }] })
    ).toEqual({ email: 'a@b.co', name: '', imageUrl: '' })
    expect(toProfile(undefined)).toEqual({ email: '', name: '', imageUrl: '' })
  })
})

describe('avatar and labels', () => {
  test('the avatar tries the photo, then unavatar.io by email', () => {
    const unavatar = `https://unavatar.io/ada%40example.com?token=${UNAVATAR_TOKEN}&fallback=false`
    expect(avatarSources(PROFILE)).toEqual([PROFILE.imageUrl, unavatar])
    expect(avatarSources({ imageUrl: '', email: PROFILE.email })).toEqual([
      unavatar
    ])
    expect(avatarSources({ imageUrl: PROFILE.imageUrl, email: '' })).toEqual([
      PROFILE.imageUrl
    ])
    expect(avatarSources({ imageUrl: '', email: '' })).toEqual([])
  })

  test('the initial and the display name prefer the name, then the email', () => {
    expect(initialOf(PROFILE)).toBe('A')
    expect(initialOf({ name: '', email: 'zoe@example.com' })).toBe('Z')
    expect(displayName(PROFILE)).toBe('Ada Lovelace')
    expect(displayName({ name: '', email: 'zoe@example.com' })).toBe(
      'zoe@example.com'
    )
  })
})

describe('fetchAccount', () => {
  test('a session turns into the profile and the account keys', async () => {
    const { calls, fetcher } = signedIn()
    expect(await fetchAccount(fetcher)).toEqual({
      sessionId: 'sess_1',
      profile: PROFILE,
      apiKeys: ['dev', 'paid']
    })
    expect(calls).toEqual([
      {
        url: CLIENT_URL,
        method: 'GET',
        credentials: 'include',
        authorization: undefined
      },
      {
        url: TOKEN_URL,
        method: 'POST',
        credentials: 'include',
        authorization: undefined
      },
      {
        url: SESSION_KEYS_URL,
        method: 'GET',
        credentials: undefined,
        authorization: 'Bearer jwt_1'
      }
    ])
  })

  test('no active session is no account, and the dashboard is never asked', async () => {
    const { calls, fetcher } = fakeFetch({
      [CLIENT_URL]: () => json(NO_SESSION)
    })
    expect(await fetchAccount(fetcher)).toBe(null)
    expect(calls).toHaveLength(1)
  })

  test('keys are trimmed, deduped and stripped of blanks', async () => {
    const { fetcher } = signedIn(() =>
      json({ apiKeys: [' dev ', 'paid', 'dev', '', '   ', 1] })
    )
    expect((await fetchAccount(fetcher)).apiKeys).toEqual(['dev', 'paid'])
  })

  test('keys that fail to load leave the profile with unknown keys', async () => {
    const failures = [
      () => json({ apiKeys: ['nope'] }, 401),
      () => json({ apiKeys: 'nope' }),
      () => {
        throw new TypeError('Failed to fetch')
      }
    ]
    for (const keys of failures) {
      const account = await fetchAccount(signedIn(keys).fetcher)
      expect(account.profile.email).toBe(PROFILE.email)
      expect(account.apiKeys).toBe(null)
      expect(isFreeAccount(account)).toBe(false)
    }
  })

  test('a session with no token keeps the profile and skips the keys', async () => {
    const { calls, fetcher } = fakeFetch({
      [CLIENT_URL]: () => json(CLIENT),
      [TOKEN_URL]: () => json({ jwt: null })
    })
    const account = await fetchAccount(fetcher)
    expect(account.profile.email).toBe(PROFILE.email)
    expect(account.apiKeys).toBe(null)
    expect(calls).toHaveLength(2)
  })

  test('a failing token request keeps the profile with unknown keys', async () => {
    const { fetcher } = fakeFetch({
      [CLIENT_URL]: () => json(CLIENT),
      [TOKEN_URL]: () => json({ errors: [] }, 500)
    })
    expect((await fetchAccount(fetcher)).apiKeys).toBe(null)
  })

  test('Clerk failing is no account, never a thrown error', async () => {
    const { calls, fetcher } = fakeFetch({
      [CLIENT_URL]: () => json(CLIENT, 400)
    })
    expect(await fetchAccount(fetcher)).toBe(null)
    expect(calls).toHaveLength(1)
    expect(await fetchAccount(fakeFetch({}).fetcher)).toBe(null)
  })
})

describe('accountLoad', () => {
  test('a single key is kept for the ttl', async () => {
    const { calls, fetcher } = signedIn(() => json({ apiKeys: ['dev'] }))
    const first = await accountFor('150', fetcher, 0)
    await settle()
    expect(await accountFor('150', fetcher, 1000)).toBe(first)
    expect(calls).toHaveLength(3)
  })

  test('one sign-in loads once, a new sign-in loads again, signed out loads nothing', async () => {
    const { calls, fetcher } = signedIn()
    const first = await accountFor('100', fetcher, 0)
    expect(await accountFor('100', fetcher, 1000)).toBe(first)
    expect(calls).toHaveLength(3)
    await accountFor('200', fetcher, 2000)
    expect(calls).toHaveLength(6)
    expect(await accountFor(null, fetcher, 3000)).toBe(null)
    expect(calls).toHaveLength(6)
  })

  test('an account loaded long ago loads again', async () => {
    const { calls, fetcher } = signedIn()
    await accountFor('300', fetcher, 0)
    await accountFor('300', fetcher, ACCOUNT_TTL_MS - 1)
    expect(calls).toHaveLength(3)
    await accountFor('300', fetcher, ACCOUNT_TTL_MS)
    expect(calls).toHaveLength(6)
  })

  test('a load whose keys failed is tried again on the next call', async () => {
    const failing = signedIn(() => json({ error: 'Unauthorized' }, 401))
    expect((await accountFor('400', failing.fetcher, 0)).apiKeys).toBe(null)
    await settle()
    const working = signedIn()
    expect((await accountFor('400', working.fetcher, 1)).apiKeys).toEqual([
      'dev',
      'paid'
    ])
    expect(working.calls).toHaveLength(3)
  })

  test('a stale cookie with no Clerk session is remembered for that sign-in', async () => {
    const none = fakeFetch({ [CLIENT_URL]: () => json(NO_SESSION) })
    expect(await accountFor('450', none.fetcher, 0)).toBe(null)
    await settle()
    expect(await accountFor('450', none.fetcher, 1)).toBe(null)
    expect(none.calls).toHaveLength(1)
  })

  test('Clerk failing is tried again on the next call', async () => {
    const down = fakeFetch({ [CLIENT_URL]: () => json({}, 503) })
    expect(await accountFor('460', down.fetcher, 0)).toBe(null)
    await settle()
    const up = signedIn()
    expect((await accountFor('460', up.fetcher, 1)).apiKeys).toEqual([
      'dev',
      'paid'
    ])
  })

  test('a slow load does not evict a newer sign-in from the cache', async () => {
    const { gate, release } = deferred()
    const slow = signedIn(() =>
      gate.then(() => json({ error: 'Unauthorized' }, 401))
    )
    const pending = accountFor('500', slow.fetcher, 0)
    const newer = signedIn()
    expect((await accountFor('600', newer.fetcher, 1)).apiKeys).toEqual([
      'dev',
      'paid'
    ])
    release()
    expect((await pending).apiKeys).toBe(null)
    await settle()
    await accountFor('600', newer.fetcher, 2)
    expect(newer.calls).toHaveLength(3)
  })

  test('the profile is ready after the first request, before the keys', async () => {
    const { gate, release } = deferred()
    const { calls, fetcher } = signedIn(() =>
      gate.then(() => json({ apiKeys: ['dev', 'paid'] }))
    )
    const { session, account } = accountLoad('900', fetcher, 0)
    expect(await session).toEqual({
      sessionId: 'sess_1',
      profile: PROFILE,
      apiKeys: null
    })
    release()
    expect((await account).apiKeys).toEqual(['dev', 'paid'])
    expect(calls).toHaveLength(3)
  })

  test('signed out settles both stages with no request', async () => {
    const { calls, fetcher } = signedIn()
    const { session, account } = accountLoad(null, fetcher, 0)
    expect(await session).toBe(null)
    expect(await account).toBe(null)
    expect(calls).toHaveLength(0)
  })
})

describe('signOut', () => {
  test('removes the active session and forgets the cached account', async () => {
    expect((await accountFor('700', signedIn().fetcher, 0)).sessionId).toBe(
      'sess_1'
    )
    const removed = fakeFetch({ [REMOVE_URL]: () => json({ response: {} }) })
    expect(await signOut({ sessionId: 'sess_1' }, removed.fetcher)).toBe(true)
    expect(removed.calls).toEqual([
      {
        url: REMOVE_URL,
        method: 'POST',
        credentials: 'include',
        authorization: undefined
      }
    ])
    const after = fakeFetch({ [CLIENT_URL]: () => json(NO_SESSION) })
    expect(await accountFor('700', after.fetcher, 1)).toBe(null)
    expect(after.calls).toHaveLength(1)
  })

  test('encodes a session id that would break the path', async () => {
    const removed = fakeFetch({
      [`${CLERK_FRONTEND_API}/client/sessions/ses%2Fs%201/remove`]: () =>
        json({ response: {} })
    })
    expect(await signOut({ sessionId: 'ses/s 1' }, removed.fetcher)).toBe(true)
  })

  test('a failed sign-out reports it and still forgets the cached account', async () => {
    await accountFor('800', signedIn().fetcher, 0)
    expect(
      await signOut({ sessionId: 'sess_1' }, async () => json({}, 401))
    ).toBe(false)
    expect(
      await signOut({ sessionId: 'sess_1' }, async () => {
        throw new TypeError('Failed to fetch')
      })
    ).toBe(false)
    const again = signedIn()
    await accountFor('800', again.fetcher, 1)
    expect(again.calls).toHaveLength(3)
  })
})

describe('menu state', () => {
  test('waits only when the cookie says signed in, then shows sign-in or the account', () => {
    expect(accountMenuMode(undefined, true)).toBe('pending')
    expect(accountMenuMode(undefined, false)).toBe('sign-in')
    expect(accountMenuMode(null, true)).toBe('sign-in')
    expect(accountMenuMode({ apiKeys: null }, true)).toBe('account')
  })

  test('offers the upgrade only once the keys show no paid plan', () => {
    expect(isFreeAccount({ apiKeys: null })).toBe(false)
    expect(isFreeAccount({ apiKeys: [] })).toBe(true)
    expect(isFreeAccount({ apiKeys: ['dev'] })).toBe(true)
    expect(isFreeAccount({ apiKeys: ['dev', 'pro'] })).toBe(false)
  })
})
