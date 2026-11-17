import { useCallback, useEffect, useRef } from 'react'

const assignRef = (ref, node) => {
  if (typeof ref === 'function') ref(node)
  else if (ref) ref.current = node
}

export const useFocusOnMount = (shouldFocus = true, innerRef) => {
  const node = useRef(null)
  useEffect(() => {
    if (shouldFocus) node.current?.focus({ preventScroll: true })
  }, [shouldFocus])
  return useCallback(
    element => {
      node.current = element
      assignRef(innerRef, element)
    },
    [innerRef]
  )
}
