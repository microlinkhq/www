import { useLayoutEffect, useRef } from 'react'

export const usePrevious = value => {
  const ref = useRef()
  useLayoutEffect(() => {
    ref.current = value // assign the value of ref to the argument
  }, [value]) // this code will run when the value of 'value' changes
  return ref.current // in the end, return the current ref value.
}

export default usePrevious
