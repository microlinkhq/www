import { toRaw, breakpoints } from 'theme'
import {
  useMemo,
  createElement,
  useEffect,
  useState,
  createContext,
  useContext
} from 'react'

import { useWindowSize } from './use-window-size'

const rawBreakpoints = breakpoints.map(toRaw)

const BreakpointContext = createContext({
  mounted: false,
  breakpoint: 0
})

/**
 * Provider component that handles breakpoint mounting state
 * Wrap your layout or app with this provider to manage SSR hydration
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components to wrap
 * @returns {JSX.Element} Provider wrapper
 *
 * @example
 * <BreakpointProvider>
 *   <Layout>
 *     <App />
 *   </Layout>
 * </BreakpointProvider>
 */
export function BreakpointProvider ({ children }) {
  const breakpoint = useBreakpoint()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until mounted (prevents SSR hydration mismatch)
  if (!mounted) {
    return null
  }

  return createElement(
    BreakpointContext.Provider,
    { value: { mounted, breakpoint } },
    children
  )
}

/**
 * Hook to access breakpoint context information
 * @returns {Object} Context value with mounted state and breakpoint
 */
export function useBreakpointContext () {
  return useContext(BreakpointContext)
}

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
