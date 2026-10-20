import { useEffect, useState } from 'react'
import { hasDashboardSession } from 'helpers/dashboard-session'

let lastKnownSignedIn = false

export const useDashboardSession = () => {
  const [session, setSession] = useState(() => ({
    isSignedIn: lastKnownSignedIn,
    hasChanged: false
  }))

  useEffect(() => {
    const sync = () => {
      lastKnownSignedIn = hasDashboardSession(document.cookie)
      setSession(previous =>
        previous.isSignedIn === lastKnownSignedIn
          ? previous
          : { isSignedIn: lastKnownSignedIn, hasChanged: true }
      )
    }
    sync()
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [])

  return session
}
