import { useEffect, useRef } from 'react'

export const useTabIndicator = ({ barRef, indicatorRef, tab }) => {
  const firstPaint = useRef(true)

  useEffect(() => {
    const move = animate => {
      const bar = barRef.current
      const pill = indicatorRef.current
      const active = bar && bar.querySelector('[data-active="true"]')
      if (!bar || !pill || !active) return
      if (!animate) {
        const prev = pill.style.transition
        pill.style.transition = 'none'
        pill.style.transform = `translateX(${active.offsetLeft}px)`
        pill.style.width = `${active.offsetWidth}px`
        pill.getBoundingClientRect()
        pill.style.transition = prev
      } else {
        pill.style.transform = `translateX(${active.offsetLeft}px)`
        pill.style.width = `${active.offsetWidth}px`
      }
    }

    move(!firstPaint.current)
    if (firstPaint.current && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => move(false))
    }
    firstPaint.current = false

    const onResize = () => move(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [barRef, indicatorRef, tab])
}
