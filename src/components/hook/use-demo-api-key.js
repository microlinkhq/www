import { useEffect, useState } from 'react'
import { useDashboardSession } from 'components/hook/use-dashboard-session'
import { useLocalStorage } from 'components/hook/use-local-storage'
import { fetchDemoApiKey, toSavedApiKey } from 'helpers/demo-api-key'

export const useDemoApiKey = () => {
  const [savedApiKey] = useLocalStorage('mql-api-key')
  const { isSignedIn } = useDashboardSession()
  const [sessionApiKey, setSessionApiKey] = useState(null)

  useEffect(() => {
    if (!isSignedIn) return
    let active = true
    fetchDemoApiKey().then(apiKey => {
      if (active) setSessionApiKey(apiKey)
    })
    return () => {
      active = false
    }
  }, [isSignedIn])

  return toSavedApiKey(savedApiKey) || sessionApiKey || undefined
}
