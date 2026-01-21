import { useState, useCallback, useRef } from 'react'

export function useHover () {
  const [isHover, setHovering] = useState(false)
  const nodeRef = useRef(null)
  const handlersRef = useRef(null)

  const setRef = useCallback(node => {
    if (nodeRef.current && handlersRef.current) {
      nodeRef.current.removeEventListener(
        'mouseenter',
        handlersRef.current.enter
      )
      nodeRef.current.removeEventListener(
        'mouseleave',
        handlersRef.current.leave
      )
    }

    nodeRef.current = node

    if (node) {
      const handleMouseEnter = () => setHovering(true)
      const handleMouseLeave = () => setHovering(false)

      handlersRef.current = {
        enter: handleMouseEnter,
        leave: handleMouseLeave
      }

      node.addEventListener('mouseenter', handleMouseEnter)
      node.addEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return [setRef, isHover]
}
