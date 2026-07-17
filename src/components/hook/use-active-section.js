import { useEffect, useState } from 'react'

export const useActiveSection = (ids, boundaryRef) => {
  const [activeId, setActiveId] = useState(ids[0])
  const key = ids.join(',')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const sectionIds = key.split(',')
    let frame

    const update = () => {
      frame = undefined

      const boundary = boundaryRef.current
      const line = boundary ? boundary.getBoundingClientRect().bottom : 0

      const current = sectionIds.reduce((active, id) => {
        const section = document.getElementById(id)
        if (!section) return active
        return section.getBoundingClientRect().top <= line + 1 ? id : active
      }, sectionIds[0])

      setActiveId(current)
    }

    const schedule = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [key, boundaryRef])

  return activeId
}
