import { useEffect, useState } from 'react'
import { accountLoad, signOut } from 'helpers/dashboard-account'
import { signedInMarker } from 'helpers/dashboard-session'

export const ACCOUNT_CHANGE_EVENT = 'microlink:account-change'
export const ACCOUNT_SIGN_OUT_EVENT = 'microlink:account-sign-out'

const SIGNED_OUT_STATE = { signedIn: false, account: null }

const hasKeysFor = (shown, session) =>
  shown?.sessionId === session.sessionId && shown.apiKeys !== null

const isNewProfile = (shown, session) =>
  session !== null && !hasKeysFor(shown, session)

const signOuts = new WeakMap()

export const watchAccount = (document, update, initial) => {
  let current = 0
  let shown = initial?.account
  const show = next => {
    shown = next.account
    update(next)
  }
  const sync = () => {
    if (signOuts.has(document)) {
      show(SIGNED_OUT_STATE)
      return
    }
    const request = ++current
    const marker = signedInMarker(document.cookie)
    if (marker === null) {
      show(SIGNED_OUT_STATE)
      return
    }
    update({ signedIn: true, account: shown })
    const { session, account } = accountLoad(marker)
    session.then(early => {
      if (request === current && isNewProfile(shown, early)) {
        show({ signedIn: true, account: early })
      }
    })
    account.then(next => {
      if (request !== current) return
      if (next?.apiKeys === null && hasKeysFor(shown, next)) return
      show({ signedIn: true, account: next })
    })
  }
  const forget = () => {
    ++current
    show(SIGNED_OUT_STATE)
  }
  const onVisible = () => document.visibilityState === 'visible' && sync()
  sync()
  document.addEventListener('visibilitychange', onVisible)
  document.addEventListener(ACCOUNT_CHANGE_EVENT, sync)
  document.addEventListener(ACCOUNT_SIGN_OUT_EVENT, forget)
  return () => {
    current = -1
    document.removeEventListener('visibilitychange', onVisible)
    document.removeEventListener(ACCOUNT_CHANGE_EVENT, sync)
    document.removeEventListener(ACCOUNT_SIGN_OUT_EVENT, forget)
  }
}

export const endSession = async (document, account, end = signOut) => {
  signOuts.set(document, (signOuts.get(document) ?? 0) + 1)
  document.dispatchEvent(new Event(ACCOUNT_SIGN_OUT_EVENT))
  try {
    await end(account)
  } finally {
    const left = signOuts.get(document) - 1
    if (left === 0) {
      signOuts.delete(document)
      document.dispatchEvent(new Event(ACCOUNT_CHANGE_EVENT))
    } else signOuts.set(document, left)
  }
}

const HYDRATION_STATE = { signedIn: false, account: undefined }

let lastKnown = HYDRATION_STATE

export const useDashboardAccount = () => {
  const [state, setState] = useState(lastKnown)

  useEffect(
    () =>
      watchAccount(
        document,
        next => {
          lastKnown = next
          setState(previous =>
            previous.signedIn === next.signedIn &&
            previous.account === next.account
              ? previous
              : next
          )
        },
        lastKnown
      ),
    []
  )

  return state
}
