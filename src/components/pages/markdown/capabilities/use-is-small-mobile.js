import { useState, useEffect } from 'react'

export const useIsSmallMobile = () => {
  const [small, setSmall] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 30em)')
    setSmall(mq.matches)
    const handler = e => setSmall(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return small
}
