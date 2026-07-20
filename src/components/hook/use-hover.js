import { useState, useEffect } from 'react'

export function useHover () {
  const [isHover, setHovering] = useState(false)
  const [node, setNode] = useState(null)

  useEffect(() => {
    if (!node) return

    const handleMouseEnter = () => setHovering(true)
    const handleMouseLeave = () => setHovering(false)

    node.addEventListener('mouseenter', handleMouseEnter)
    node.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter)
      node.removeEventListener('mouseleave', handleMouseLeave)
      setHovering(false)
    }
  }, [node])

  return [setNode, isHover]
}
