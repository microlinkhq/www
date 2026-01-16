import { toRaw, breakpoints } from 'theme'
import { useMemo } from 'react'

import { useWindowSize } from './use-window-size'

const rawBreakpoints = breakpoints.map(toRaw)

export function useBreakpoint () {
  const { width } = useWindowSize()

  return useMemo(() => {
    let findIndex = rawBreakpoints.length - 1

    for (let index = 0; index < rawBreakpoints.length; index++) {
      if (width < rawBreakpoints[index]) {
        findIndex = index
        break
      }
    }
    return findIndex
  }, [width])
}
