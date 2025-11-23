import { useState, useEffect } from 'react'
import { isSSR } from 'helpers/is-ssr'

const getSize = isSSR
  ? fallback => fallback
  : () => ({ width: window.innerWidth, height: window.innerHeight })

export function useWindowSize (fallback = { width: 1440, height: 798 }) {
  const [windowSize, setWindowSize] = useState(getSize(fallback))

  useEffect(() => {
    const handleResize = () => setWindowSize(getSize())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
