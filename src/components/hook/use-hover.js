import { useState, useEffect, useRef } from 'react'

export function useHover (initialRef) {
  const [isHover, setHovering] = useState(false)
  const ref = useRef(initialRef)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const handleMouseEnter = () => setHovering(true)
    const handleMouseLeave = () => setHovering(false)
    node.addEventListener('mouseenter', handleMouseEnter)
    node.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter)
      node.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return [ref, isHover]
}
