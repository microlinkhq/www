import { useCallback, useReducer } from 'react'

const INITIAL_STATE = {
  isGlowing: false,
  isAttractMode: false,
  isPulsing: false,
  isFocused: false,
  hasInteracted: false,
  showNerdStats: false
}

const reducer = (state, { flag, value }) => {
  const next = typeof value === 'function' ? value(state[flag]) : value
  return Object.is(state[flag], next) ? state : { ...state, [flag]: next }
}

export const useDemoUi = () => {
  const [ui, dispatch] = useReducer(reducer, INITIAL_STATE)
  const setIsGlowing = useCallback(
    value => dispatch({ flag: 'isGlowing', value }),
    []
  )
  const setIsAttractMode = useCallback(
    value => dispatch({ flag: 'isAttractMode', value }),
    []
  )
  const setIsPulsing = useCallback(
    value => dispatch({ flag: 'isPulsing', value }),
    []
  )
  const setIsFocused = useCallback(
    value => dispatch({ flag: 'isFocused', value }),
    []
  )
  const setHasInteracted = useCallback(
    value => dispatch({ flag: 'hasInteracted', value }),
    []
  )
  const setShowNerdStats = useCallback(
    value => dispatch({ flag: 'showNerdStats', value }),
    []
  )

  return {
    ...ui,
    setIsGlowing,
    setIsAttractMode,
    setIsPulsing,
    setIsFocused,
    setHasInteracted,
    setShowNerdStats
  }
}
