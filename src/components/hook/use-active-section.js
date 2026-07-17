import { useEffect, useState } from 'react'

export const useActiveSection = (ids, { offset = 0 } = {}) => {
  const [activeId, setActiveId] = useState(ids[0])
  const key = ids.join(',')

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('IntersectionObserver' in window)) return

    const sectionIds = key.split(',')
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean)

    if (sections.length === 0) return

    const intersecting = new Map()

    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry =>
          intersecting.set(entry.target.id, entry.isIntersecting)
        )

        const topmost = sectionIds.find(id => intersecting.get(id))
        if (topmost) setActiveId(topmost)
      },
      { rootMargin: `-${offset}px 0px -60% 0px` }
    )

    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [key, offset])

  return activeId
}
