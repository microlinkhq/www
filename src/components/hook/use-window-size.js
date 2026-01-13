import { useState, useEffect } from 'react'

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight
})

export function useWindowSize (fallback = { width: 1440, height: 798 }) {
  const [windowSize, setWindowSize] = useState(fallback)

  useEffect(() => {
    const handleResize = () => setWindowSize(getSize())
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
