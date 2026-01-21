/* global fetch, localStorage */

import { useState, useEffect } from 'react'

import { once } from 'helpers/once'

const getFingerprint = once(() =>
  fetch('https://geolocation.microlink.io')
    .then(res => res.json())
    .then(data => ({
      country: data.country.alpha2.toLowerCase(),
      ipAddress: data.ip.address
    }))
)

export const useFingerprint = initialState => {
  const [fingerprint, setFingerprint] = useState(initialState)

  useEffect(() => {
    const data = localStorage.getItem('fingerprint')
    if (data) return setFingerprint(JSON.parse(data))
    getFingerprint().then(data => {
      localStorage.setItem('fingerprint', JSON.stringify(data))
      setFingerprint(data)
    })
  }, [])

  return fingerprint
}
