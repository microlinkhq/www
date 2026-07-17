import { useEffect, useRef, useState } from 'react'

export const useActiveSection = ids => {
  const [activeId, setActiveId] = useState(ids[0])
  const idsRef = useRef(ids)
  idsRef.current = ids

  const key = ids.join(',')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const sections = idsRef.current
      .map(id => document.getElementById(id))
      .filter(Boolean)

    let anchors = []
    let frame

    const measure = () => {
      anchors = sections.map(
        section =>
          parseFloat(window.getComputedStyle(section).scrollMarginTop) || 0
      )
    }

    const update = () => {
      frame = undefined

      const current = sections.reduce(
        (active, section, index) =>
          section.getBoundingClientRect().top <= anchors[index] + 1
            ? section.id
            : active,
        idsRef.current[0]
      )

      setActiveId(current)
    }

    const schedule = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(update)
    }

    const remeasure = () => {
      measure()
      schedule()
    }

    measure()
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', remeasure)

    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', remeasure)
    }
  }, [key])

  return activeId
}
