import { useEffect, useState } from 'react'
import { accountApiKeys } from 'helpers/account-keys'

export const useAccountKeys = (load = accountApiKeys) => {
  const [keys, setKeys] = useState()
  useEffect(() => {
    let live = true
    load().then(loaded => {
      if (live) setKeys(loaded)
    })
    return () => {
      live = false
    }
  }, [load])
  return keys
}
