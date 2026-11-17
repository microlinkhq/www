import { useCallback, useEffect, useRef } from 'react'

export const assignRef = (ref, node) => {
  if (typeof ref === 'function') ref(node)
  else if (ref) ref.current = node
}

export const focusOnMount = (element, shouldFocus = true) => {
  if (shouldFocus) element?.focus({ preventScroll: true })
}

export const useFocusOnMount = (shouldFocus, innerRef) => {
  const node = useRef(null)
  useEffect(() => {
    focusOnMount(node.current, shouldFocus)
  }, [shouldFocus])
  return useCallback(
    element => {
      node.current = element
      assignRef(innerRef, element)
    },
    [innerRef]
  )
}
