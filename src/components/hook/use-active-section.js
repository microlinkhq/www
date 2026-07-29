import { useEffect, useState } from 'react'

export const useActiveSection = ids => {
  const [activeId, setActiveId] = useState(null)

  const key = ids.join(',')

  useEffect(() => {
    const sectionIds = key.split(',').filter(Boolean)
    const sections = sectionIds.flatMap(id => document.getElementById(id) || [])

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
        null
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
