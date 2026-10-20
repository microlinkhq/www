import { useEffect, useState } from 'react'
import { hasDashboardSession } from 'helpers/dashboard-session'

export const useDashboardSession = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    const sync = () => setIsSignedIn(hasDashboardSession(document.cookie))
    sync()
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [])

  return isSignedIn
}
