import { useEffect, useState } from 'react'

export const useActiveSection = ids => {
  const [activeId, setActiveId] = useState(ids[0])

  const key = ids.join(',')

  useEffect(() => {
    const sectionIds = key.split(',').filter(Boolean)
    const sections = sectionIds.flatMap(id => {
      const section = document.getElementById(id)
      return section ? [section] : []
    })

    let anchors = []
    let frame
    let currentId

    const measure = () => {
      anchors = sections.map(
        section =>
          parseFloat(window.getComputedStyle(section).scrollMarginTop) || 0
      )
    }

    const commit = nextId => {
      if (nextId === currentId) return
      currentId = nextId
      setActiveId(nextId)
    }

    const update = () => {
      frame = undefined

      if (
        sectionIds.length > 0 &&
        document.documentElement.scrollHeight > window.innerHeight &&
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2
      ) {
        commit(sectionIds[sectionIds.length - 1])
        return
      }

      commit(
        sections.reduce(
          (active, section, index) =>
            section.getBoundingClientRect().top <= anchors[index] + 1
              ? section.id
              : active,
          sectionIds[0]
        )
      )
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
