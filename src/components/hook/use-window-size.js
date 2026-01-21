import { useState, useEffect } from 'react'

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight
})

export function useWindowSize (fallback = { width: 1440, height: 798 }) {
  const [windowSize, setWindowSize] = useState(() => {
    if (typeof window !== 'undefined') {
      return getSize()
    }
    return fallback
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(prev => {
        const newWidth = window.innerWidth
        const newHeight = window.innerHeight
        if (prev.width === newWidth && prev.height === newHeight) {
          return prev
        }
        return { width: newWidth, height: newHeight }
      })
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
