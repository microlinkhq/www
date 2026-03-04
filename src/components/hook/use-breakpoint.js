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
    if (typeof window === 'undefined') return

    const queries = rawBreakpoints.map(bp =>
      window.matchMedia(`(max-width: ${bp - 1}px)`)
    )

    const handleChange = () => {
      setBreakpoint(calculateBreakpoint(window.innerWidth))
    }

    queries.forEach(query => {
      query.addEventListener('change', handleChange)
    })

    handleChange()

    return () => {
      queries.forEach(query => {
        query.removeEventListener('change', handleChange)
      })
    }
  }, [])

  return breakpoint
}
