import { useState, useEffect } from 'react'
import { isSSR } from 'helpers'

const getSize = isSSR
  ? fallback => fallback
  : () => ({ width: window.innerWidth, height: window.innerHeight })

export function useWindowSize (fallback) {
  const [windowSize, setWindowSize] = useState(getSize(fallback))

  useEffect(() => {
    const handleResize = () => setWindowSize(getSize(fallback))
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
