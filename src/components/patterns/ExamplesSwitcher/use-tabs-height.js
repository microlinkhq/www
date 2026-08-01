import { useLayoutEffect, useState } from 'react'
import { space, toRaw } from 'theme'

import measureVisibleTabsHeight from './measure-tabs-height'
import observeTabsResize from './observe-tabs-resize'

const TAB_GAP_PX = toRaw(space[2])

export default (listRef, panels, visibleTabs) => {
  const [tabsHeight, setTabsHeight] = useState(undefined)

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list || !visibleTabs) {
      setTabsHeight(undefined)
      return undefined
    }

    const update = () => {
      const measured = measureVisibleTabsHeight(list, visibleTabs, TAB_GAP_PX)
      setTabsHeight(measured ? `${measured}px` : undefined)
    }

    update()
    return observeTabsResize(list, update)
  }, [panels, visibleTabs])

  return tabsHeight
}
