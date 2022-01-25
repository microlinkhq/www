import { toRaw, breakpoints } from 'theme'

import { useWindowSize } from './use-window-size'

const rawBreakpoints = breakpoints.map(toRaw)

export function useBreakpoint (mediaBreakpoints) {
  const { width } = useWindowSize()

  let findIndex = rawBreakpoints.length - 1

  for (let index = 0; index < rawBreakpoints.length; index++) {
    if (width < rawBreakpoints[index]) {
      findIndex = index
      break
    }
  }

  return mediaBreakpoints[findIndex]
}
