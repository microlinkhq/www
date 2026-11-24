import { afterEach, describe, expect, test, vi } from 'vitest'
import {
  ACCOUNT_CHANGE_EVENT,
  endSession,
  watchAccount
} from '../../../../src/components/hook/use-dashboard-account'
import {
  CLERK_FRONTEND_API,
  SESSION_KEYS_URL,
  forgetAccount
} from '../../../../src/helpers/dashboard-account'

const documentOf = (cookie, visibilityState = 'visible') => {
  const listeners = new Map()
  return {
    cookie,
    visibilityState,
    listeners,
    addEventListener: (type, fn) => listeners.set(type, fn),
    removeEventListener: (type, fn) => {
      if (listeners.get(type) === fn) listeners.delete(type)
    },
    dispatchEvent: event => listeners.get(event.type)?.(),
    show () {
      this.visibilityState = 'visible'
      listeners.get('visibilitychange')()
    }
  }
}

const json = body =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' }
  })

const SESSION = {
  response: {
    last_active_session_id: 'sess_1',
    sessions: [
      {
        id: 'sess_1',
        user: {
          first_name: 'Ada',
          email_addresses: [{ id: 'e', email_address: 'ada@example.com' }]
        }
      }
    ]
  }
}

const NO_SESSION = { response: { last_active_session_id: null, sessions: [] } }

const stubClerk = ({ client = SESSION, keys = Promise.resolve() } = {}) => {
  const calls = []
  const routes = {
    [`${CLERK_FRONTEND_API}/client`]: () => json(client),
    [`${CLERK_FRONTEND_API}/client/sessions/sess_1/tokens`]: () =>
      json({ jwt: 'jwt_1' }),
    [SESSION_KEYS_URL]: () => keys.then(() => json({ apiKeys: ['dev'] }))
  }
  vi.stubGlobal('fetch', async url => {
    calls.push(url)
    return routes[url]()
  })
  return calls
}

const settle = () => new Promise(resolve => setTimeout(resolve, 0))

const deferred = () => {
  let release
  const gate = new Promise(resolve => {
    release = resolve
  })
  return { gate, release }
}

const keysOf = states => states.map(({ account }) => account?.apiKeys)

afterEach(() => vi.unstubAllGlobals())

describe('watchAccount', () => {
  test('signed out shows sign in at once and never calls Clerk', async () => {
    const calls = stubClerk()
    const states = []
    watchAccount(documentOf('__client_uat=0'), state => states.push(state))
    expect(states).toEqual([{ signedIn: false, account: null }])
    await settle()
    expect(states).toHaveLength(1)
    expect(calls).toEqual([])
  })

  test('signed in waits, shows the profile, then adds the keys', async () => {
    const { gate, release } = deferred()
    stubClerk({ keys: gate })
    const states = []
    watchAccount(documentOf('__client_uat=2001'), state => states.push(state))
    expect(states).toEqual([{ signedIn: true, account: undefined }])
    await settle()
    expect(keysOf(states)).toEqual([undefined, null])
    expect(states[1].account.profile.name).toBe('Ada')
    release()
    await settle()
    expect(keysOf(states)).toEqual([undefined, null, ['dev']])
  })

  test('a stale cookie with no Clerk session ends signed out', async () => {
    stubClerk({ client: NO_SESSION })
    const states = []
    watchAccount(documentOf('__client_uat=2002'), state => states.push(state))
    await settle()
    expect(states.at(-1)).toEqual({ signedIn: true, account: null })
  })

  test('a known empty key list is not replaced while the next load is still fetching keys', async () => {
    const { gate, release } = deferred()
    stubClerk({ keys: gate })
    const states = []
    watchAccount(documentOf('__client_uat=2011'), state => states.push(state), {
      signedIn: true,
      account: {
        sessionId: 'sess_1',
        profile: { name: 'Ada' },
        apiKeys: []
      }
    })
    await settle()
    expect(states.some(({ account }) => account?.apiKeys === null)).toBe(false)
    release()
    await settle()
    expect(states.at(-1).account.apiKeys).toEqual(['dev'])
  })

  test('a new session replaces the account already shown before its keys arrive', async () => {
    const { gate, release } = deferred()
    stubClerk({ keys: gate })
    const states = []
    watchAccount(documentOf('__client_uat=2012'), state => states.push(state), {
      signedIn: true,
      account: {
        sessionId: 'sess_old',
        profile: { name: 'Old' },
        apiKeys: ['paid']
      }
    })
    await settle()
    expect(
      states.some(
        ({ account }) =>
          account?.sessionId === 'sess_1' && account.apiKeys === null
      )
    ).toBe(true)
    release()
    await settle()
    expect(states.at(-1).account.apiKeys).toEqual(['dev'])
  })

  test('a remount starts from the account already shown, so nothing flashes', async () => {
    stubClerk()
    const shown = {
      sessionId: 'sess_1',
      profile: { name: 'Ada' },
      apiKeys: ['dev']
    }
    const states = []
    watchAccount(documentOf('__client_uat=2003'), state => states.push(state), {
      signedIn: true,
      account: shown
    })
    expect(states[0]).toEqual({ signedIn: true, account: shown })
  })

  test('returning to the tab never hides keys already shown', async () => {
    stubClerk()
    const document = documentOf('__client_uat=2004')
    const states = []
    watchAccount(document, state => states.push(state))
    await settle()
    const loaded = states.length
    document.show()
    await settle()
    expect(states.length).toBeGreaterThan(loaded)
    expect(
      states.slice(loaded).every(({ account }) => account.apiKeys !== null)
    ).toBe(true)
  })

  test('a hidden tab does not reload on visibilitychange', async () => {
    const calls = stubClerk()
    const document = documentOf('__client_uat=2005', 'hidden')
    watchAccount(document, () => {})
    await settle()
    const before = calls.length
    document.listeners.get('visibilitychange')()
    await settle()
    expect(calls).toHaveLength(before)
  })

  test('a load that finishes after the watcher stops is dropped', async () => {
    stubClerk()
    const document = documentOf('__client_uat=2006')
    const states = []
    const stop = watchAccount(document, state => states.push(state))
    stop()
    await settle()
    expect(states).toHaveLength(1)
    expect(document.listeners.size).toBe(0)
  })
})

describe('endSession', () => {
  test('shows sign in on the click and keeps it while Clerk answers', async () => {
    stubClerk()
    const document = documentOf('__client_uat=3001')
    const states = []
    watchAccount(document, state => states.push(state))
    await settle()
    const account = states.at(-1).account
    const { gate, release } = deferred()
    const ending = endSession(document, account, async () => {
      await gate
      forgetAccount()
    })
    expect(states.at(-1)).toEqual({ signedIn: false, account: null })
    document.show()
    expect(states.at(-1)).toEqual({ signedIn: false, account: null })
    stubClerk({ client: NO_SESSION })
    release()
    await ending
    await settle()
    expect(states.at(-1)).toEqual({ signedIn: true, account: null })
  })

  test('a session that survived a refused sign out comes back', async () => {
    stubClerk()
    const document = documentOf('__client_uat=3002')
    const states = []
    watchAccount(document, state => states.push(state))
    await settle()
    await endSession(document, states.at(-1).account, async () => false)
    await settle()
    expect(states.at(-1).account.profile.name).toBe('Ada')
  })

  test('reloads only after every overlapping sign out finishes', async () => {
    stubClerk()
    const document = documentOf('__client_uat=3003')
    const changes = vi.fn()
    watchAccount(document, () => {})
    await settle()
    const first = deferred()
    const second = deferred()
    const original = document.listeners.get(ACCOUNT_CHANGE_EVENT)
    document.listeners.set(ACCOUNT_CHANGE_EVENT, () => {
      changes()
      original()
    })
    const a = endSession(document, { sessionId: 'sess_1' }, () => first.gate)
    const b = endSession(document, { sessionId: 'sess_1' }, () => second.gate)
    first.release()
    await a
    expect(changes).not.toHaveBeenCalled()
    second.release()
    await b
    expect(changes).toHaveBeenCalledTimes(1)
  })
})
