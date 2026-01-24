/* global fetch, localStorage */

import { useState, useEffect } from 'react'

import { once } from 'helpers/once'

const STORAGE_KEY = 'fingerprint:v1'

const getFingerprint = once(() =>
  fetch('https://geolocation.microlink.io')
    .then(res => res.json())
    .then(data => ({
      country: data.country.alpha2.toLowerCase(),
      ipAddress: data.ip.address
    }))
)

export const useFingerprint = () => {
  const [fingerprint, setFingerprint] = useState(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (fingerprint) return
    getFingerprint().then(data => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      setFingerprint(data)
    })
  }, [fingerprint])

  return fingerprint
}
