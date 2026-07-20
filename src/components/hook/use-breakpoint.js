import { toRaw, breakpoints } from 'theme'
import { useState, useEffect } from 'react'

const rawBreakpoints = breakpoints.map(toRaw)

const calculateBreakpoint = width => {
  for (let index = 0; index < rawBreakpoints.length; index++) {
    if (width < rawBreakpoints[index]) {
      return index
    }
  }
  return rawBreakpoints.length - 1
}

export function useBreakpoint () {
  const [breakpoint, setBreakpoint] = useState(rawBreakpoints.length - 1)

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(calculateBreakpoint(window.innerWidth))
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return breakpoint
}
