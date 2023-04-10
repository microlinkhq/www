/* global fetch, localStorage */

import { useState, useEffect } from 'react'

const once = (fn, value) => () => value || (value = fn())

const getFinterprint = once(() =>
  fetch('https://geolocation.microlink.io')
    .then(res => res.json())
    .then(data => ({
      country: data.country.alpha2.toLowerCase(),
      ip: data.ip.address
    }))
)

export const useFingerprint = () => {
  const [fingerprint, setFingerprint] = useState(null)

  useEffect(() => {
    const data = localStorage.getItem('fingerprint')
    if (data) return setFingerprint(JSON.parse(data))
    getFinterprint().then(data => {
      console.log(data)
      localStorage.setItem('fingerprint', JSON.stringify(data))
      setFingerprint(data)
    })
  }, [])

  return fingerprint
}
