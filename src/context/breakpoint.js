import { createContext, useContext } from 'react'

export const BreakpointContext = createContext(3)
export const BreakpointProvider = BreakpointContext.Provider
export const BreakpointConsumer = BreakpointContext.Consumer

export const useBreakpoint = () => useContext(BreakpointContext)
