/* global fetch, localStorage */

import { useState, useEffect } from 'react'
import { once } from 'helpers/once'

const STORAGE_KEY = 'fingerprint:v3'

const getFingerprint = once(() =>
  fetch('https://geolocation.microlink.io')
    .then(res => {
      if (!res.ok) throw new Error(res.statusText)
      return res.json()
    })
    .then(data => ({
      country: data.country.alpha2.toLowerCase(),
      ipAddress: data.ip.address
    }))
    .catch(() => null)
)

export const useFingerprint = () => {
  const [fingerprint, setFingerprint] = useState(null)

  useEffect(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (data) {
        setFingerprint(JSON.parse(data))
        return
      }
    } catch {}

    let active = true
    getFingerprint().then(data => {
      if (!active || !data) return
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      } catch {}
      setFingerprint(data)
    })
    return () => {
      active = false
    }
  }, [])

  return fingerprint
}
