import { useEffect, useState } from 'react'

const NO_CUES = { up: false, down: false }

const getScrollCues = node => {
  if (!node || node.scrollHeight <= node.clientHeight + 2) return NO_CUES
  return {
    up: node.scrollTop > 2,
    down: node.scrollTop + node.clientHeight < node.scrollHeight - 2
  }
}

export default (listRef, deps) => {
  const [scrollCues, setScrollCues] = useState(NO_CUES)

  useEffect(() => {
    const node = listRef.current
    if (!node) return undefined
    let frame
    const update = () => {
      frame = undefined
      setScrollCues(current => {
        const next = getScrollCues(node)
        return next.up === current.up && next.down === current.down
          ? current
          : next
      })
    }
    const schedule = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(update)
    }
    update()
    node.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const observer =
      typeof window.ResizeObserver !== 'undefined'
        ? new window.ResizeObserver(schedule)
        : null
    observer?.observe(node)
    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame)
      node.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer?.disconnect()
    }
  }, deps)

  return scrollCues
}
