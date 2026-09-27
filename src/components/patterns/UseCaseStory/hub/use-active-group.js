import { useEffect, useRef, useState } from 'react'

export const useActiveGroup = (ids, containerRef) => {
  const [active, setActive] = useState(ids[0])
  const restored = useRef(false)

  useEffect(() => {
    const fromHash = () => {
      const id = globalThis.location.hash.slice(1)
      return ids.includes(id) ? id : null
    }

    if (!restored.current) {
      restored.current = true
      const initial = fromHash()
      if (initial) {
        setActive(initial)
        containerRef.current?.scrollIntoView({ block: 'start' })
      }
    }

    const onHashChange = () => {
      const id = fromHash()
      if (!id) return
      setActive(id)
      containerRef.current?.scrollIntoView({ block: 'start' })
    }

    globalThis.addEventListener('hashchange', onHashChange)
    return () => globalThis.removeEventListener('hashchange', onHashChange)
  }, [ids, containerRef])

  const select = id => {
    setActive(id)
    globalThis.history.replaceState(null, '', `#${id}`)
  }

  return [active, select]
}
