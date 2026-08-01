import { useEffect, useState } from 'react'

import observeTabsResize from './observe-tabs-resize'

const NO_CUES = { up: false, down: false }

const getScrollCues = node => {
  if (node.scrollHeight <= node.clientHeight + 2) return NO_CUES
  return {
    up: node.scrollTop > 2,
    down: node.scrollTop + node.clientHeight < node.scrollHeight - 2
  }
}

export default (listRef, panels) => {
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
    const disconnect = observeTabsResize(node, schedule)
    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame)
      node.removeEventListener('scroll', schedule)
      disconnect()
    }
  }, [panels])

  return scrollCues
}
