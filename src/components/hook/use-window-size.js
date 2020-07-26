import { useState, useEffect } from 'react'
import { isSSR } from 'helpers'

const getSize = isSSR
  ? () => ({})
  : () => ({ width: window.innerWidth, height: window.innerHeight })

export function useWindowSize () {
  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    const handleResize = () => setWindowSize(getSize())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
