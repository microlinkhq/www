import { useLayoutEffect, useState } from 'react'

import measureVisibleTabsHeight from './measure-tabs-height'
import observeTabsResize from './observe-tabs-resize'

export default (listRef, panels, visibleTabs) => {
  const [tabsHeight, setTabsHeight] = useState(undefined)

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list || !visibleTabs) {
      setTabsHeight(undefined)
      return undefined
    }

    const update = () => {
      const measured = measureVisibleTabsHeight(list, visibleTabs)
      setTabsHeight(measured ? `${measured}px` : undefined)
    }

    update()
    return observeTabsResize(list, update)
  }, [panels, visibleTabs])

  return tabsHeight
}
