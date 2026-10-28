import { useEffect, useState } from 'react'
import { useDashboardSession } from 'components/hook/use-dashboard-session'
import { useLocalStorage } from 'components/hook/use-local-storage'
import { dashboardSessionMarker } from 'helpers/dashboard-session'
import { fetchDemoApiKey, selectDemoApiKey } from 'helpers/demo-api-key'

export const useDemoApiKey = () => {
  const [savedApiKey] = useLocalStorage('mql-api-key')
  const { isSignedIn } = useDashboardSession()
  const [sessionApiKey, setSessionApiKey] = useState(null)

  useEffect(() => {
    if (!isSignedIn) {
      setSessionApiKey(null)
      return
    }
    let active = true
    fetchDemoApiKey(dashboardSessionMarker(document.cookie)).then(apiKey => {
      if (active) setSessionApiKey(apiKey)
    })
    return () => {
      active = false
    }
  }, [isSignedIn])

  return selectDemoApiKey({ savedApiKey, isSignedIn, sessionApiKey })
}
