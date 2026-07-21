import { prefersReducedMotion } from 'helpers/reduced-motion'
import { useEffect } from 'react'

import { CYCLE } from './constants'
import { readSharedState } from './requests'

export const useAttractCycle = ({ anim, sectionRef, setDText }) => {
  useEffect(() => {
    if (readSharedState() || prefersReducedMotion()) {
      return undefined
    }
    const a = anim.current
    a.paused = false
    a.inView = true
    const apply = t => {
      a.text = t
      setDText(t)
    }
    const tick = () => {
      if (a.userTook || a.paused) return
      if (a.phase === 'pause') {
        a.phase = 'deleting'
        a.timer = setTimeout(tick, 50)
        return
      }
      if (a.phase === 'deleting') {
        if (a.text.length > 0) {
          apply(a.text.slice(0, -1))
          a.timer = setTimeout(tick, 28)
          return
        }
        a.ci = (a.ci + 1) % CYCLE.length
        a.phase = 'typing'
        a.timer = setTimeout(tick, 160)
        return
      }
      const target = CYCLE[a.ci]
      if (a.text.length < target.length) {
        apply(target.slice(0, a.text.length + 1))
        a.timer = setTimeout(tick, 48 + Math.random() * 40)
        return
      }
      a.phase = 'pause'
      a.timer = setTimeout(tick, 2600)
    }
    const syncActivity = () => {
      const shouldPause = document.hidden || !a.inView
      if (shouldPause === a.paused) return
      a.paused = shouldPause
      clearTimeout(a.timer)
      if (!shouldPause && !a.userTook) a.timer = setTimeout(tick, 600)
    }
    document.addEventListener('visibilitychange', syncActivity)
    let observer
    if (window.IntersectionObserver && sectionRef.current) {
      observer = new window.IntersectionObserver(([entry]) => {
        a.inView = entry.isIntersecting
        syncActivity()
      })
      observer.observe(sectionRef.current)
    }
    a.timer = setTimeout(tick, 2400)
    return () => {
      clearTimeout(a.timer)
      document.removeEventListener('visibilitychange', syncActivity)
      if (observer) observer.disconnect()
    }
  }, [anim, sectionRef, setDText])
}
