import { useLayoutEffect, useState } from 'react'
import { space, toRaw } from 'theme'

import measureVisibleTabsHeight from './measure-tabs-height'

const TAB_GAP_PX = toRaw(space[2])

export default (listRef, panels, visibleTabs) => {
  const [viewportHeight, setViewportHeight] = useState(null)

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list || !visibleTabs) {
      setViewportHeight(null)
      return undefined
    }

    const update = () => {
      const next = measureVisibleTabsHeight(list, visibleTabs, TAB_GAP_PX)
      setViewportHeight(current => (current === next ? current : next))
    }

    update()
    const observer =
      typeof window.ResizeObserver !== 'undefined'
        ? new window.ResizeObserver(update)
        : null
    observer?.observe(list)
    ;[...list.children].forEach(child => observer?.observe(child))
    return () => observer?.disconnect()
  }, [panels, visibleTabs])

  return viewportHeight
}
